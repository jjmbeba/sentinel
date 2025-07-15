import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { UserIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { signUpSchema } from "@/schemas/auth";
import FieldErrorMessage from "../../ui/field-error-msg";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import AuthFormHeader from "../common/auth-form-header";
import AuthSubmitBtn from "../common/auth-submit-button";
import EmailInput from "../common/email-auth-input";
import FormField from "../common/form-field";
import PasswordInput from "../common/password-auth-input";

export function SignUpForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const form = useForm({
		validators: {
			onBlur: signUpSchema,
		},
		defaultValues: {
			email: "",
			name: "",
			password: "",
			confirmPassword: "",
		},
		onSubmit: ({ value: _value }) => {
			// TODO: Implement sign up logic
			// console.log(_value);
		},
	});

	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

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
				description="Enter your email below to create an account"
				title="Create an account"
			/>
			<div className="grid gap-6">
				<form.Field name="name">
					{(field) => (
						<div className="grid gap-3">
							<Label htmlFor="name">Full Name</Label>
							<div className="relative">
								<Input
									aria-invalid={!!field.state.meta.errors.length}
									className="peer pe-9"
									id="name"
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="John Doe"
									value={field.state.value}
								/>
								<div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
									<UserIcon aria-hidden="true" size={16} />
								</div>
							</div>
							{field.state.meta.errors.map((error) => (
								<FieldErrorMessage
									key={error?.message}
									message={error?.message}
								/>
							))}
						</div>
					)}
				</form.Field>
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
							label="Sign up"
							loading={isSubmitting}
							submittingLabel="Signing up..."
						/>
					)}
				</form.Subscribe>
			</div>
			<div className="text-center text-sm">
				Already have an account?{" "}
				<Link className="underline underline-offset-4" to="/login">
					Login
				</Link>
			</div>
		</form>
	);
}
