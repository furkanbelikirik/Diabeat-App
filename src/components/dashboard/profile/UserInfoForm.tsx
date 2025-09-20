"use client";

import { ErrorMessage } from "@hookform/error-message";
import { CircleAlert } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { SelectInput, SelectInputOption, TextInput } from "@/components/input";
import { Card } from "@/components/ui";

export default function UserInfoForm() {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	return (
		<Card>
			<div className="grid grid-cols-2 gap-6">
				<div className="flex flex-col gap-2">
					<TextInput
						error={!!errors.first_name}
						label="Ad"
						placeholder="Adınızı giriniz"
						type="text"
						{...register("first_name", { required: "Ad alanı zorunludur" })}
					/>
					<ErrorMessage
						errors={errors}
						name="first_name"
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
						error={!!errors.last_name}
						label="Soyad"
						placeholder="Soyadınızı giriniz"
						type="text"
						{...register("last_name", { required: "Soyad alanı zorunludur" })}
					/>
					<ErrorMessage
						errors={errors}
						name="last_name"
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
						error={!!errors.birthday}
						label="Doğum Tarihi"
						placeholder="Doğum tarihini giriniz"
						type="date"
						{...register("birthday", { required: "Doğum tarihi zorunludur" })}
					/>
					<ErrorMessage
						errors={errors}
						name="birthday"
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
						error={!!errors.gender}
						label="Cinsiyet"
						{...register("gender", {
							required: "Cinsiyet seçimi zorunludur",
							validate: (value) => value !== "select" || "Lütfen bir değer seçiniz",
						})}
					>
						<SelectInputOption value="select">Seçiniz</SelectInputOption>
						<SelectInputOption value="male">Erkek</SelectInputOption>
						<SelectInputOption value="female">Kadın</SelectInputOption>
					</SelectInput>
					<ErrorMessage
						errors={errors}
						name="gender"
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
						error={!!errors.diabetes_type}
						label="Diyabet Tipi"
						{...register("diabetes_type", {
							required: "Diyabet tipi seçimi zorunludur",
							validate: (value) => value !== "select" || "Lütfen bir değer seçiniz",
						})}
					>
						<SelectInputOption value="select">Seçiniz</SelectInputOption>
						<SelectInputOption value="type1">Tip 1</SelectInputOption>
						<SelectInputOption value="type2">Tip 2</SelectInputOption>
						<SelectInputOption value="mody">MODY</SelectInputOption>
						<SelectInputOption value="gestational">Gestasyonel</SelectInputOption>
					</SelectInput>
					<ErrorMessage
						errors={errors}
						name="diabetes_type"
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
						error={!!errors.year_of_diagnosis}
						label="Teşhis Yılı"
						placeholder="Teşhis yılı giriniz"
						type="number"
						{...register("year_of_diagnosis", {
							required: "Teşhis yılı zorunludur",
							min: { value: 1900, message: "Teşhis yılı 1900'den büyük olmalıdır" },
							max: {
								value: new Date().getFullYear(),
								message: "Teşhis yılı gelecek yıl olamaz",
							},
						})}
					/>
					<ErrorMessage
						errors={errors}
						name="year_of_diagnosis"
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
