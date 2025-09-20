export default function DashboardOverviewLayout({
	children,
	logs,
}: {
	children: React.ReactNode;
	logs: React.ReactNode;
}) {
	return (
		<>
			{children}
			<section>{logs}</section>
		</>
	);
}
