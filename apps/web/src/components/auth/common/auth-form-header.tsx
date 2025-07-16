type Props = {
	title: string;
	description: string;
};

const AuthFormHeader = ({ title, description }: Props) => {
	return (
		<div className="flex flex-col items-center gap-2 text-center">
			<h1 className="font-bold text-2xl">{title}</h1>
			<p className="text-balance text-muted-foreground text-sm">
				{description}
			</p>
		</div>
	);
};

export default AuthFormHeader;
