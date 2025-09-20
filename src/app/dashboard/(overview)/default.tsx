import { GlucoseChart, Metrics, WelcomeUser } from "@/components/dashboard";

export default function DashboardOverviewDefault() {
	return (
		<>
			<WelcomeUser />

			<GlucoseChart />

			<Metrics />
		</>
	);
}
