import { createFileRoute } from "@tanstack/react-router";
import AuthContainer from "@/components/auth/common/auth-container";
import { LoginForm } from "@/components/auth/forms/login-form";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AuthContainer authForm={<LoginForm />} type="login" />;
}
