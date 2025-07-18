import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
	cardTitle: React.ReactNode;
	cardContent: React.ReactNode;
};

const DashboardCardContainer = ({ cardTitle, cardContent }: Props) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex flex-col gap-2 sm:gap-4">
					{cardTitle}
				</CardTitle>
			</CardHeader>
			<CardContent>{cardContent}</CardContent>
		</Card>
	);
};

export default DashboardCardContainer;
