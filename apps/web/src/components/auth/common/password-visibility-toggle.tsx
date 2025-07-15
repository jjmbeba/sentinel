import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../../ui/button";

type Props = {
	isVisible: boolean;
	toggleVisibility: () => void;
};

const PasswordVisibiltyToggle = ({ isVisible, toggleVisibility }: Props) => {
	return (
		<Button
			aria-controls="password"
			aria-label={isVisible ? "Hide password" : "Show password"}
			aria-pressed={isVisible}
			className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground hover:text-foreground focus:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
			onClick={toggleVisibility}
			size="sm"
			type="button"
			variant="ghost"
		>
			{isVisible ? (
				<EyeOffIcon aria-hidden="true" size={16} />
			) : (
				<EyeIcon aria-hidden="true" size={16} />
			)}
		</Button>
	);
};

export default PasswordVisibiltyToggle;
