"use client";

import { skipToken } from "@reduxjs/toolkit/query";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
	BloodGlucose,
	Carbonhydrate,
	Exercise,
	InsulinBasal,
	InsulinBolus,
	LogForm,
} from "@/components/dashboard";
import { Button, Modal } from "@/components/ui";
import useModal from "@/components/ui/Modal/useModal";
import {
	useDeleteDiabetesLogMutation,
	useGetDiabetesLogsQuery,
	useUpdateDiabetesLogMutation,
} from "@/lib/features/userData/userDataSlice";
import { useAppSelector } from "@/lib/hooks";
import type { Tables, TablesUpdate } from "@/utils/supabase/database.types";

export default function DiabetesLogsDetails({ slug }: { slug: Tables<"diabetes_logs">["id"] }) {
	const router = useRouter();
	const {
		isOpen: isEditOpen,
		modalRef: editModalRef,
		toggleModal: toggleEditModal,
		closeModal: closeEditModal,
	} = useModal();
	const {
		isOpen: isDeleteOpen,
		modalRef: deleteModalRef,
		toggleModal: toggleDeleteModal,
		closeModal: closeDeleteModal,
	} = useModal();

	const userId = useAppSelector((state) => state.auth.session?.user.id);
	const { log } = useGetDiabetesLogsQuery(userId ?? skipToken, {
		selectFromResult: ({ data }) => ({
			log: data?.flatMap((item) => item.logs).find(({ id }) => id === slug),
		}),
	});
	const [updateLog, { isLoading }] = useUpdateDiabetesLogMutation();
	const [deleteLog, { isLoading: isDeleting }] = useDeleteDiabetesLogMutation();

	const methods = useForm<TablesUpdate<"diabetes_logs">>({
		defaultValues: {
			blood_glucose: null,
			measurement_time: "select",
			insulin_bolus: null,
			insulin_basal: null,
			carbohydrates: null,
			exercise_name: null,
			exercise_duration: null,
		},
		mode: "onChange",
	});

	const { reset, handleSubmit } = methods;

	const onSubmit = handleSubmit((data: TablesUpdate<"diabetes_logs">) => {
		if (!log?.id) return;
		updateLog({ id: log.id, ...data })
			.unwrap()
			.then(() => closeEditModal());
	});

	const onDelete = () => {
		if (!log?.id) return;
		deleteLog(log.id)
			.unwrap()
			.then(() => router.back());
	};

	const toggleEditModalWithReset = useCallback(() => {
		if (log) reset(log);
		toggleEditModal();
	}, [log, reset, toggleEditModal]);

	return (
		<>
			<h1 className="text-center font-semibold">
				{format(log?.created_at ?? new Date(), "d MMMM yyyy EEEE", { locale: tr })}
			</h1>
			{log?.blood_glucose && (
				<BloodGlucose
					measurementTime={log?.measurement_time ?? "beforeMeal"}
					value={log?.blood_glucose ?? 0}
					variant="details"
				/>
			)}
			{log?.carbohydrates && (
				<Carbonhydrate value={log?.carbohydrates ?? 0} variant="details" />
			)}
			{log?.insulin_basal && (
				<InsulinBasal value={log?.insulin_basal ?? 0} variant="details" />
			)}
			{log?.insulin_bolus && (
				<InsulinBolus value={log?.insulin_bolus ?? 0} variant="details" />
			)}
			{log?.exercise_duration && (
				<Exercise
					exerciseName={log?.exercise_name ?? undefined}
					value={log?.exercise_duration ?? "00:00:00"}
					variant="details"
				/>
			)}

			<div className="mt-6 flex gap-3">
				<Button fullWidth onClick={toggleEditModalWithReset} variant="gradient">
					Düzenle
				</Button>
				<Button fullWidth onClick={toggleDeleteModal} variant="back">
					Sil
				</Button>
			</div>

			{/* Düzenleme Modal */}
			<Modal open={isEditOpen} ref={editModalRef} toggleModal={toggleEditModal}>
				<h1 className="text-center text-lg">
					{format(log?.created_at ?? new Date(), "d MMMM yyyy EEEE", { locale: tr })}
				</h1>
				<FormProvider {...methods}>
					<form noValidate onSubmit={onSubmit}>
						<LogForm loading={isLoading} />
					</form>
				</FormProvider>
			</Modal>

			{/* Silme Modal */}
			<Modal open={isDeleteOpen} ref={deleteModalRef} toggleModal={toggleDeleteModal}>
				<h1 className="text-center text-lg">Silmek istediğinize emin misiniz?</h1>
				<Button disabled={isDeleting} fullWidth onClick={onDelete} variant="back">
					{isDeleting ? "Siliniyor..." : "Sil"}
				</Button>
				<Button
					disabled={isDeleting}
					fullWidth
					onClick={() => closeDeleteModal()}
					variant="gradient"
				>
					Kapat
				</Button>
			</Modal>
		</>
	);
}
