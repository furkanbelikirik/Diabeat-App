import { DiabetesLogsDetails } from "@/components/dashboard";
import { Card } from "@/components/ui";
import type { Tables } from "@/utils/supabase/database.types";

export default async function LogPage({
	params,
}: {
	params: Promise<{ slug: Tables<"diabetes_logs">["id"][] }>;
}) {
	const { slug } = await params;
	return (
		<Card>
			<DiabetesLogsDetails slug={slug[0]} />
		</Card>
	);
}
