import { Input } from "@/components/ui/input";
import PasswordVisibiltyToggle from "./password-visibility-toggle";

type Props = {
	isVisible: boolean;
	toggleVisibility: () => void;
	value: string;
	hasErrors: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: () => void;
};

const PasswordInput = ({
	isVisible,
	toggleVisibility,
	value,
	hasErrors,
	onChange,
	onBlur,
}: Props) => {
	return (
		<>
			<Input
				aria-invalid={hasErrors}
				className="pe-9"
				id="password"
				onBlur={onBlur}
				onChange={onChange}
				type={isVisible ? "text" : "password"}
				value={value}
			/>
			<PasswordVisibiltyToggle
				isVisible={isVisible}
				toggleVisibility={toggleVisibility}
			/>
		</>
	);
};

export default PasswordInput;
