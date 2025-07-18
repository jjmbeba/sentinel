import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { signInSchema } from "@/schemas/auth";
import FieldErrorMessage from "../../ui/field-error-msg";
import AuthFormHeader from "../common/auth-form-header";
import AuthSubmitBtn from "../common/auth-submit-button";
import EmailInput from "../common/email-auth-input";
import ForgotPasswordLink from "../common/forgot-password-link";
import FormField from "../common/form-field";
import PasswordInput from "../common/password-auth-input";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible((prevState) => !prevState);
	const navigate = useNavigate();

	const form = useForm({
		validators: {
			onBlur: signInSchema,
		},
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await signIn.email(
				{
					...value,
				},
				{
					onSuccess: () => {
						navigate({ to: "/" });
						toast.success("Login successful");
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
				description="Enter your email below to login to your account"
				title="Login to your account"
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
							htmlFor="email"
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
				<form.Field name="password">
					{(field) => (
						<FormField
							errors={field.state.meta.errors.map((error) => (
								<FieldErrorMessage
									key={error?.message}
									message={error?.message}
								/>
							))}
							htmlFor="password"
							label="Password"
							optionalLink={<ForgotPasswordLink />}
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
							label="Login"
							loading={isSubmitting}
							submittingLabel="Logging in..."
						/>
					)}
				</form.Subscribe>
				{/* <SocialAuthButtons /> */}
			</div>
			<div className="text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link className="underline underline-offset-4" to="/sign-up">
					Sign up
				</Link>
			</div>
		</form>
	);
}
