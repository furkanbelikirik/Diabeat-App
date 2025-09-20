import { DiabetesAddLog, DiabetesLogs } from "@/components/dashboard";
import { Card } from "@/components/ui";

export default function Logs() {
	return (
		<>
			<div className="mb-3 flex items-center justify-between">
				<div>
					<h1
						className="from-primary to-secondary max-w-fit bg-gradient-to-r bg-clip-text
							text-xl font-bold text-transparent"
					>
						Günlük Kayıtlar
					</h1>
					<h2 className="text-sm">Günlük kayıtlarınızı görüntüleyin</h2>
				</div>
				<div>
					<DiabetesAddLog />
				</div>
			</div>
			<Card className="max-h-[calc(100vh-12rem)] flex-grow overflow-y-auto">
				<DiabetesLogs />
			</Card>
		</>
	);
}
