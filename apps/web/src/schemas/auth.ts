import z from "zod";

export const signInSchema = z.object({
	email: z.email(),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signUpSchema = z
	.object({
		email: z.email(),
		name: z.string().min(1, "Name is required"),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z
			.string()
			.min(8, "Password must be at least 8 characters long"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const forgotPasswordSchema = signInSchema.omit({
	password: true,
});

export const resetPasswordSchema = z
	.object({
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z
			.string()
			.min(8, "Confirm Password must be at least 8 characters long"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
