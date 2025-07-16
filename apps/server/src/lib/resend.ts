import { Resend } from "resend";
import { must } from "./utils";

export const resend = new Resend(
	must(
		process.env.RESEND_API_KEY,
		"RESEND_API_KEY environment variable is not set"
	)
);
