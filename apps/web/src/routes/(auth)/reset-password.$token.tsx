import { createFileRoute } from "@tanstack/react-router";
import AuthContainer from "@/components/auth/common/auth-container";
import { ResetPasswordForm } from "@/components/auth/forms/reset-password-form";

export const Route = createFileRoute("/(auth)/reset-password/$token")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AuthContainer authForm={<ResetPasswordForm />} type="login" />;
}
