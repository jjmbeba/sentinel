import { Loader2Icon } from "lucide-react";
import { Button } from "../../ui/button";

type Props = {
	canSubmit: boolean;
	loading: boolean;
	submittingLabel: string;
	label: string;
};

const AuthSubmitBtn = ({
	canSubmit,
	loading,
	label,
	submittingLabel,
}: Props) => {
	return (
		<Button
			className="w-full"
			disabled={!canSubmit || loading}
			size="sm"
			type="submit"
		>
			{loading ? (
				<div className="flex items-center gap-2">
					<Loader2Icon className="size-4 animate-spin" />
					{submittingLabel}
				</div>
			) : (
				label
			)}
		</Button>
	);
};

export default AuthSubmitBtn;
