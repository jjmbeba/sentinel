import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import {
	EyeIcon,
	EyeOffIcon,
	Loader2Icon,
	MailIcon,
	UserIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { signUpSchema } from "@/schemas/auth";
import { Button } from "../ui/button";
import FieldErrorMessage from "../ui/field-error-msg";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AuthFormHeader from "./auth-form-header";

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
						<div className="grid gap-3">
							<Label htmlFor="email">Email</Label>
							<div className="relative">
								<Input
									aria-invalid={!!field.state.meta.errors.length}
									className="peer pe-9"
									id="email"
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="m@example.com"
									value={field.state.value}
								/>
								<div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
									<MailIcon aria-hidden="true" size={16} />
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
				<form.Field name="password">
					{(field) => (
						<div className="grid gap-3">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<a
									className="ml-auto text-sm underline-offset-4 hover:underline"
									href="/"
								>
									Forgot your password?
								</a>
							</div>
							<div className="relative">
								<Input
									aria-invalid={!!field.state.meta.errors.length}
									className="pe-9"
									id="password"
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									type={isVisible ? "text" : "password"}
									value={field.state.value}
								/>
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
				<form.Field name="confirmPassword">
					{(field) => (
						<div className="grid gap-3">
							<div className="flex items-center">
								<Label htmlFor="confirmPassword">Confirm Password</Label>
							</div>
							<div className="relative">
								<Input
									aria-invalid={!!field.state.meta.errors.length}
									className="pe-9"
									id="confirmPassword"
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									type={isVisible ? "text" : "password"}
									value={field.state.value}
								/>
								<Button
									aria-controls="confirmPassword"
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
				<form.Subscribe
					selector={({ isSubmitting, canSubmit }) => [isSubmitting, canSubmit]}
				>
					{([isSubmitting, canSubmit]) => (
						<Button
							className="w-full"
							disabled={!canSubmit || isSubmitting}
							size="sm"
							type="submit"
						>
							{isSubmitting ? (
								<div className="flex items-center gap-2">
									<Loader2Icon className="size-4 animate-spin" />
									Signing up...
								</div>
							) : (
								"Sign up"
							)}
						</Button>
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
