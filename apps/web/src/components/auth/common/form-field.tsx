import { Label } from "@/components/ui/label";

type Props = {
	label: string;
	optionalLink?: React.ReactNode;
	children: React.ReactNode;
	errors: React.ReactNode;
};

const FormField = ({ label, optionalLink, children, errors }: Props) => {
	return (
		<div className="grid gap-3">
			<div className="flex items-center">
				<Label htmlFor="password">{label}</Label>
				{optionalLink}
			</div>
			<div className="relative">{children}</div>
			{errors}
		</div>
	);
};

export default FormField;
