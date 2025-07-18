import Logo from "./logo";

type Props = {
	authForm: React.ReactNode;
	type: "login" | "signup";
};

const AuthContainer = ({ authForm, type }: Props) => {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Logo />
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">{authForm}</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<img
					alt={
						type === "login"
							? "Login page background"
							: "Sign up page background"
					}
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
					src={
						type === "login"
							? "/login-background.webp"
							: "/sign-up-background.webp"
					}
				/>
			</div>
		</div>
	);
};

export default AuthContainer;
