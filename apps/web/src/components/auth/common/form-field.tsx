import { Label } from "@/components/ui/label";

type Props = {
	label: string;
	optionalLink?: React.ReactNode;
	children: React.ReactNode;
	htmlFor: string;
	errors: React.ReactNode;
};

const FormField = ({
	label,
	optionalLink,
	children,
	errors,
	htmlFor,
}: Props) => {
	return (
		<div className="grid gap-3">
			<div className="flex items-center">
				<Label htmlFor={htmlFor}>{label}</Label>
				{optionalLink}
			</div>
			<div className="relative">{children}</div>
			{errors}
		</div>
	);
};

export default FormField;
