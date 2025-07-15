import { MailIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
	value: string;
	hasErrors: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: () => void;
};

const EmailInput = ({ value, hasErrors, onChange, onBlur }: Props) => {
	return (
		<>
			<Input
				aria-invalid={hasErrors}
				className="peer pe-9"
				id="email"
				onBlur={onBlur}
				onChange={onChange}
				placeholder="m@example.com"
				value={value}
			/>
			<div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
				<MailIcon aria-hidden="true" size={16} />
			</div>
		</>
	);
};

export default EmailInput;
