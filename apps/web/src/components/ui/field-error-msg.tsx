const FieldErrorMessage = ({
	message = "Validation error",
}: {
	message?: string;
}) => {
	return (
		<p className="text-red-500 text-xs" key={message}>
			{message}
		</p>
	);
};

export default FieldErrorMessage;
