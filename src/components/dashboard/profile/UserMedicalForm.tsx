"use client";

import { ErrorMessage } from "@hookform/error-message";
import { CircleAlert } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { SelectInput, SelectInputOption } from "@/components/input";
import { Card } from "@/components/ui";

export default function UserMedicalForm() {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	return (
		<Card>
			<div className="grid grid-cols-1 gap-6">
				<div className="flex flex-col gap-2">
					<SelectInput
						error={!!errors.glucose_meter}
						label="Kan Şeker Ölçüm Cihazı"
						{...register("glucose_meter", {
							required: "Kan şeker ölçüm cihazı seçimi zorunludur",
							validate: (value) => value !== "select" || "Lütfen bir değer seçiniz",
						})}
					>
						<SelectInputOption value="select">Seçiniz</SelectInputOption>
						<SelectInputOption value="accuchek">AccuChek</SelectInputOption>
						<SelectInputOption value="contour">Contour</SelectInputOption>
						<SelectInputOption value="freestyle">FreeStyle</SelectInputOption>
						<SelectInputOption value="onetouch">OneTouch</SelectInputOption>
						<SelectInputOption value="other">Diğer</SelectInputOption>
						<SelectInputOption value="none">Kullanmıyorum</SelectInputOption>
					</SelectInput>
					<ErrorMessage
						errors={errors}
						name="glucose_meter"
						render={({ message }) => (
							<span className="text-accent mt-1 flex items-center gap-1 text-sm">
								<CircleAlert className="h-5 w-5" />
								{message}
							</span>
						)}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<SelectInput
						error={!!errors.cgm}
						label="CGM Sensörü"
						{...register("cgm", {
							required: "CGM sensörü seçimi zorunludur",
							validate: (value) => value !== "select" || "Lütfen bir değer seçiniz",
						})}
					>
						<SelectInputOption value="select">Seçiniz</SelectInputOption>
						<SelectInputOption value="dexcomg6">Dexcom G6</SelectInputOption>
						<SelectInputOption value="dexcomg7">Dexcom G7</SelectInputOption>
						<SelectInputOption value="freestylelibre2">
							FreeStyle Libre 2
						</SelectInputOption>
						<SelectInputOption value="other">Diğer</SelectInputOption>
						<SelectInputOption value="none">Kullanmıyorum</SelectInputOption>
					</SelectInput>
					<ErrorMessage
						errors={errors}
						name="cgm"
						render={({ message }) => (
							<span className="text-accent mt-1 flex items-center gap-1 text-sm">
								<CircleAlert className="h-5 w-5" />
								{message}
							</span>
						)}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<SelectInput
						error={!!errors.insulin_type}
						label="İnsülin Tipi"
						{...register("insulin_type", {
							required: "İnsülin tipi seçimi zorunludur",
							validate: (value) => value !== "select" || "Lütfen bir değer seçiniz",
						})}
					>
						<SelectInputOption value="select">Seçiniz</SelectInputOption>
						<SelectInputOption value="pen">Kalem / Şırınga</SelectInputOption>
						<SelectInputOption value="pump">Pompa</SelectInputOption>
						<SelectInputOption value="pill">İlaç</SelectInputOption>
						<SelectInputOption value="none">Kullanmıyorum</SelectInputOption>
					</SelectInput>
					<ErrorMessage
						errors={errors}
						name="insulin_type"
						render={({ message }) => (
							<span className="text-accent mt-1 flex items-center gap-1 text-sm">
								<CircleAlert className="h-5 w-5" />
								{message}
							</span>
						)}
					/>
				</div>
			</div>
		</Card>
	);
}
