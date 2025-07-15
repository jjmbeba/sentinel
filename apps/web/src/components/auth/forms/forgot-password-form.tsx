import { useForm } from "@tanstack/react-form";
import FieldErrorMessage from "@/components/ui/field-error-msg";
import { cn } from "@/lib/utils";
import { forgotPasswordSchema } from "@/schemas/auth";
import AuthFormHeader from "../common/auth-form-header";
import AuthSubmitBtn from "../common/auth-submit-button";
import EmailInput from "../common/email-auth-input";
import FormField from "../common/form-field";

export function ForgotPasswordForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const form = useForm({
		validators: {
			onBlur: forgotPasswordSchema,
		},
		defaultValues: {
			email: "",
		},
		onSubmit: ({ value: _value }) => {
			// console.log(_value);
		},
	});
	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault();

				// form.handleSubmit();
			}}
			{...props}
		>
			<AuthFormHeader
				description="Enter your email below to reset your password"
				title="Forgot Password"
			/>
			<div className="grid gap-6">
				<form.Field name="email">
					{(field) => (
						<FormField
							errors={field.state.meta.errors.map((error) => (
								<FieldErrorMessage
									key={error?.message}
									message={error?.message}
								/>
							))}
							label="Email"
						>
							<EmailInput
								hasErrors={!!field.state.meta.errors.length}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								value={field.state.value}
							/>
						</FormField>
					)}
				</form.Field>
				<form.Subscribe
					selector={({ isSubmitting, canSubmit }) => [isSubmitting, canSubmit]}
				>
					{([isSubmitting, canSubmit]) => (
						<AuthSubmitBtn
							canSubmit={canSubmit}
							label="Reset Password"
							loading={isSubmitting}
							submittingLabel="Resetting password..."
						/>
					)}
				</form.Subscribe>
			</div>
		</form>
	);
}
