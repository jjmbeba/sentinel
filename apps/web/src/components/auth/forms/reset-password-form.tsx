import { useForm } from "@tanstack/react-form";
import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import FieldErrorMessage from "@/components/ui/field-error-msg";
import { resetPassword } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { resetPasswordSchema } from "@/schemas/auth";
import AuthFormHeader from "../common/auth-form-header";
import AuthSubmitBtn from "../common/auth-submit-button";
import FormField from "../common/form-field";
import PasswordInput from "../common/password-auth-input";

export function ResetPasswordForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible((prevState) => !prevState);
	const { token } = getRouteApi("/(auth)/reset-password/$token").useParams();

	const form = useForm({
		validators: {
			onBlur: resetPasswordSchema,
		},
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		onSubmit: async ({ value }) => {
			await resetPassword(
				{
					newPassword: value.password,
					token,
				},
				{
					onSuccess: () => {
						toast.success("Password reset successfully");
					},
					onError: (error) => {
						toast.error(error.error.message);
					},
				}
			);
		},
	});
	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault();

				form.handleSubmit();
			}}
			{...props}
		>
			<AuthFormHeader
				description="Enter your new password below"
				title="Reset Password"
			/>
			<div className="grid gap-6">
				<form.Field name="password">
					{(field) => (
						<FormField
							errors={field.state.meta.errors.map((error) => (
								<FieldErrorMessage
									key={error?.message}
									message={error?.message}
								/>
							))}
							label="Password"
						>
							<PasswordInput
								hasErrors={!!field.state.meta.errors.length}
								isVisible={isVisible}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								toggleVisibility={toggleVisibility}
								value={field.state.value}
							/>
						</FormField>
					)}
				</form.Field>
				<form.Field name="confirmPassword">
					{(field) => (
						<FormField
							errors={field.state.meta.errors.map((error) => (
								<FieldErrorMessage
									key={error?.message}
									message={error?.message}
								/>
							))}
							label="Confirm Password"
						>
							<PasswordInput
								hasErrors={!!field.state.meta.errors.length}
								isVisible={isVisible}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								toggleVisibility={toggleVisibility}
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
