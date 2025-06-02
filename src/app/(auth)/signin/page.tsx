import React from "react";
import { SigninForm } from "./form";

function SigninPage() {
	return (
		<div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10 md:pt-32 pt-20">
			<div className="w-full max-w-sm">
				<SigninForm />
			</div>
		</div>
	);
}

export default SigninPage;
