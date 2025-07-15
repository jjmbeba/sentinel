import { Link } from "@tanstack/react-router";
import { GalleryVerticalEndIcon } from "../icons/gallery-vertical-end";

type Props = {
	authForm: React.ReactNode;
	type: "login" | "signup";
};

const AuthContainer = ({ authForm, type }: Props) => {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link className="flex items-center gap-2 font-medium" to="/">
						<div className="flex size-6 items-center justify-center rounded-md">
							<GalleryVerticalEndIcon />
						</div>
						Sentinel.
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">{authForm}</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<img
					alt="Placeholder"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
					src={
						type === "login"
							? "https://df4174a30r.ufs.sh/f/v02GcThk7I16o5P44VfjJqZtWflPxRkhop9KsDaQ1rUiBOMu"
							: "https://df4174a30r.ufs.sh/f/v02GcThk7I16i7LQ83t9cIgTaUmGWoASQM5pXt2enhvP0Fzs"
					}
				/>
			</div>
		</div>
	);
};

export default AuthContainer;
