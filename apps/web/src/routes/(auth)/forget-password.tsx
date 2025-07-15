import { createFileRoute } from "@tanstack/react-router";
import AuthContainer from "@/components/auth/common/auth-container";
import { ForgotPasswordForm } from "@/components/auth/forms/forgot-password-form";

export const Route = createFileRoute("/(auth)/forget-password")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AuthContainer authForm={<ForgotPasswordForm />} type="login" />;
}
