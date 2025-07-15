import { createFileRoute } from "@tanstack/react-router";
import AuthContainer from "@/components/auth/common/auth-container";
import { SignUpForm } from "@/components/auth/forms/sign-up-form";

export const Route = createFileRoute("/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AuthContainer authForm={<SignUpForm />} type="signup" />;
}
