"use client";

import { CalendarPlus } from "lucide-react";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LogForm } from "@/components/dashboard";
import { Button, Modal } from "@/components/ui";
import useModal from "@/components/ui/Modal/useModal";
import { useAddDiabetesLogMutation } from "@/lib/features/userData/userDataSlice";
import { useAppSelector } from "@/lib/hooks";
import type { TablesInsert } from "@/utils/supabase/database.types";

export default function DiabetesAddLog() {
	const userId = useAppSelector((state) => state.auth.session?.user.id);
	const [addLog, { isLoading }] = useAddDiabetesLogMutation();

	const { isOpen, modalRef, toggleModal, closeModal } = useModal();

	const methods = useForm<TablesInsert<"diabetes_logs">>({
		defaultValues: {
			blood_glucose: null,
			insulin_bolus: null,
			insulin_basal: null,
			carbohydrates: null,
			exercise_duration: null,
			measurement_time: "select",
			exercise_name: null,
		},
		mode: "onChange",
	});
	const { handleSubmit, reset } = methods;

	const onSubmit = handleSubmit((data: TablesInsert<"diabetes_logs">) => {
		if (!userId) return;
		addLog(data)
			.unwrap()
			.then(() => {
				reset();
				closeModal();
			});
	});

	const toggleModalWithReset = useCallback(() => {
		reset();
		toggleModal();
	}, [reset, toggleModal]);

	return (
		<>
			<Button onClick={toggleModalWithReset} variant="gradient">
				<CalendarPlus />
			</Button>

			<Modal open={isOpen} ref={modalRef} toggleModal={toggleModal}>
				<h1 className="text-center text-lg">Yeni Veri Ekle</h1>
				<FormProvider {...methods}>
					<form noValidate onSubmit={onSubmit}>
						<LogForm loading={isLoading} />
					</form>
				</FormProvider>
			</Modal>
		</>
	);
}
