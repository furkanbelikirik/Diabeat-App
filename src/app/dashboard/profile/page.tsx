"use client";

import { skipToken } from "@reduxjs/toolkit/query";
import { Check, LoaderCircle, Pencil, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { UserInfoForm, UserMedicalForm } from "@/components/dashboard/profile";
import { Button } from "@/components/ui";
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
} from "@/lib/features/userData/userDataSlice";
import { useAppSelector } from "@/lib/hooks";
import type { TablesUpdate } from "@/utils/supabase/database.types";
import "react-loading-skeleton/dist/skeleton.css";

export default function Profile() {
	const formId = useId();
	const userId = useAppSelector((state) => state.auth.session?.user.id);
	const { data: profile, isLoading, isUninitialized } = useGetProfileQuery(userId ?? skipToken);
	const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

	const [isEditing, setIsEditing] = useState(false);

	const methods = useForm<TablesUpdate<"profiles">>({
		disabled: !isEditing || isUpdating || isLoading,
		defaultValues: profile,
	});
	const {
		reset,
		handleSubmit,
		formState: { isDirty },
	} = methods;

	useEffect(() => {
		if (profile) reset(profile);
	}, [profile, reset]);

	const onSubmit = handleSubmit((data: TablesUpdate<"profiles">) => {
		if (!profile?.id) return;
		updateProfile({ id: profile?.id, ...data });
		setIsEditing(false);
	});

	const handleEdit = () => {
		setIsEditing((prev) => !prev);
	};

	const handleCancel = () => {
		reset(profile);
		setIsEditing(false);
	};

	const showSkeleton = isUninitialized || isLoading;
	return (
		<>
			<div className="flex justify-between">
				<hgroup>
					<h1
						className="from-primary to-secondary max-w-fit bg-gradient-to-r bg-clip-text
							text-4xl font-bold text-transparent"
					>
						Profilim
					</h1>
					<h2 className="text-sm">Profil bilgilerinizi düzenleyin</h2>
				</hgroup>
				<div className="flex items-center gap-3">
					{!isEditing && (
						<Button disabled={isLoading} onClick={handleEdit} variant="gradient">
							{isLoading ? <LoaderCircle className="animate-spin" /> : <Pencil />}
						</Button>
					)}
					{isEditing && (
						<>
							<Button fullWidth onClick={handleCancel} variant="back">
								<X />
							</Button>
							<Button
								disabled={isUpdating || !isDirty}
								form={formId}
								type="submit"
								variant="menu"
							>
								{isUpdating ? <LoaderCircle className="animate-spin" /> : <Check />}
							</Button>
						</>
					)}
				</div>
			</div>
			<FormProvider {...methods}>
				<form className="space-y-6" id={formId} noValidate onSubmit={onSubmit}>
					<section>
						<h1
							className="from-primary to-secondary max-w-fit bg-gradient-to-r
								bg-clip-text text-xl font-bold text-transparent"
						>
							Kişisel Bilgilerim
						</h1>
						<h2 className="mb-3 text-sm">Profil bilgilerinizi düzenleyin</h2>

						{showSkeleton ? (
							<Skeleton
								baseColor="var(--color-secondary)"
								className="opacity-25"
								height={313}
								highlightColor="var(--color-primary)"
							/>
						) : (
							<UserInfoForm />
						)}
					</section>

					<section>
						<h1
							className="from-primary to-secondary max-w-fit bg-gradient-to-r
								bg-clip-text text-xl font-bold text-transparent"
						>
							Tıbbi Cihazlarım
						</h1>
						<h2 className="mb-3 text-sm">
							Tıbbi cihazlarınızın bilgilerini düzenleyin
						</h2>
						{showSkeleton ? (
							<Skeleton
								baseColor="var(--color-secondary)"
								className="opacity-25"
								height={313}
								highlightColor="var(--color-primary)"
							/>
						) : (
							<UserMedicalForm />
						)}
					</section>
				</form>
			</FormProvider>
		</>
	);
}
