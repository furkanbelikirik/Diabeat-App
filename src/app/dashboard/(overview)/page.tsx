import { GlucoseChart, Metrics, WelcomeUser } from "@/components/dashboard";

export default async function Dashboard() {
	return (
		<>
			<WelcomeUser />

			<GlucoseChart />

			<Metrics />
		</>
	);
}
