"use client";

import { ErrorMessage } from "@hookform/error-message";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { SelectInput, SelectInputOption, TextInput } from "@/components/input";
import { Button } from "@/components/ui";

type LogFormProps = {
	loading?: boolean;
};

export default function LogForm({ loading }: LogFormProps) {
	const {
		register,
		formState: { errors, isDirty },
		getFieldState,
		getValues,
		resetField,
	} = useFormContext();

	const bloodGlucose = getValues("blood_glucose");
	const bloodGlucoseFieldState = getFieldState("blood_glucose");
	useEffect(() => {
		if (bloodGlucose === null || bloodGlucoseFieldState.invalid) {
			resetField("measurement_time");
		}
	}, [bloodGlucose, bloodGlucoseFieldState.invalid, resetField]);

	return (
		<div className="space-y-3">
			<div className="flex flex-col gap-2">
				<TextInput
					error={!!errors.blood_glucose}
					inputMode="numeric"
					label="Kan Şekeri (mg/dL)"
					max={900}
					min={10}
					placeholder="Ölçtüğünüz kan şekeri değerini giriniz (mg/dL)"
					type="number"
					{...register("blood_glucose", {
						setValueAs: (v) => (v === "" ? null : v === null ? null : Number(v)),
						min: { value: 10, message: "Kan şeker değer 10'dan büyük olmalıdır" },
						max: { value: 900, message: "Kan şeker değer 900'den küçük olmalıdır" },
					})}
				/>
				<ErrorMessage
					errors={errors}
					name="blood_glucose"
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
					error={!!errors.measurement_time}
					label="Ölçüm Zamanı"
					{...register("measurement_time", {
						disabled:
							getValues("blood_glucose") === null ||
							getFieldState("blood_glucose").invalid,
						validate: (value) => value !== "select" || "Lütfen ölçüm zamanını seçiniz",
					})}
				>
					<SelectInputOption value="select">Seçiniz</SelectInputOption>
					<SelectInputOption value="beforeMeal">Açlık</SelectInputOption>
					<SelectInputOption value="afterMeal">Tokluk</SelectInputOption>
				</SelectInput>
				<ErrorMessage
					errors={errors}
					name="measurement_time"
					render={({ message }) => (
						<span className="text-accent mt-1 flex items-center gap-1 text-sm">
							<CircleAlert className="h-5 w-5" />
							{message}
						</span>
					)}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<TextInput
					error={!!errors.insulin_bolus}
					inputMode="numeric"
					label="İnsülin (Bolus)"
					max={500}
					min={0}
					placeholder="Kısa etkili insülin değerini giriniz (U)"
					type="number"
					{...register("insulin_bolus", {
						setValueAs: (v) => (v === "" ? null : v === null ? null : Number(v)),
						min: { value: 0, message: "İnsülin ünite değeri 0'dan büyük olmalıdır" },
						max: {
							value: 500,
							message: "İnsülin ünite değeri 500'den küçük olmalıdır",
						},
					})}
				/>
				<ErrorMessage
					errors={errors}
					name="insulin_bolus"
					render={({ message }) => (
						<span className="text-accent mt-1 flex items-center gap-1 text-sm">
							<CircleAlert className="h-5 w-5" />
							{message}
						</span>
					)}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<TextInput
					error={!!errors.insulin_basal}
					inputMode="numeric"
					label="İnsülin (Bazal)"
					max={500}
					min={0}
					placeholder="Uzun etkili insülin değerini giriniz (U)"
					type="number"
					{...register("insulin_basal", {
						setValueAs: (v) => (v === "" ? null : v === null ? null : Number(v)),
						min: { value: 0, message: "İnsülin ünite değeri 0'dan büyük olmalıdır" },
						max: {
							value: 500,
							message: "İnsülin ünite değeri 500'den küçük olmalıdır",
						},
					})}
				/>
				<ErrorMessage
					errors={errors}
					name="insulin_basal"
					render={({ message }) => (
						<span className="text-accent mt-1 flex items-center gap-1 text-sm">
							<CircleAlert className="h-5 w-5" />
							{message}
						</span>
					)}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<TextInput
					error={!!errors.carbohydrates}
					inputMode="numeric"
					label="Karbonhidrat"
					max={600}
					min={0}
					placeholder="Karbonhidrat değerini giriniz (gr)"
					type="number"
					{...register("carbohydrates", {
						setValueAs: (v) => (v === "" ? null : v === null ? null : Number(v)),
						min: { value: 0, message: "Karbonhidrat değeri 0'dan büyük olmalıdır" },
						max: { value: 600, message: "Karbonhidrat değeri 600'den küçük olmalıdır" },
					})}
				/>
				<ErrorMessage
					errors={errors}
					name="carbohydrates"
					render={({ message }) => (
						<span className="text-accent mt-1 flex items-center gap-1 text-sm">
							<CircleAlert className="h-5 w-5" />
							{message}
						</span>
					)}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<TextInput
					error={!!errors.exercise_name}
					inputMode="text"
					label="Egzersiz İsmi"
					placeholder="Egzersiz ismini giriniz"
					type="text"
					{...register("exercise_name", {
						setValueAs: (v) => (v === "" ? null : v === null ? null : String(v)),
						maxLength: { value: 20, message: "Egzersiz ismi çok uzun" },
						minLength: { value: 2, message: "Egzersiz ismi çok kısa" },
					})}
				/>
				<ErrorMessage
					errors={errors}
					name="exercise_name"
					render={({ message }) => (
						<span className="text-accent mt-1 flex items-center gap-1 text-sm">
							<CircleAlert className="h-5 w-5" />
							{message}
						</span>
					)}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<TextInput
					error={!!errors.exercise_duration}
					inputMode="numeric"
					label="Egzersiz Süresi"
					placeholder="Dakika cinsinden egzersiz süresini giriniz"
					type="time"
					{...register("exercise_duration", {
						setValueAs: (v) => (v === "" ? null : v === null ? null : String(v)),
					})}
				/>
				<ErrorMessage
					errors={errors}
					name="exercise_duration"
					render={({ message }) => (
						<span className="text-accent mt-1 flex items-center gap-1 text-sm">
							<CircleAlert className="h-5 w-5" />
							{message}
						</span>
					)}
				/>
			</div>

			<Button disabled={!isDirty || loading} fullWidth type="submit" variant="gradient">
				{loading ? <LoaderCircle className="animate-spin" /> : "Kaydet"}
			</Button>
		</div>
	);
}
