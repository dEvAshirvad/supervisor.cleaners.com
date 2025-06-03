import React from "react";
import { SigninForm } from "./form";
import Image from "next/image";

function SigninPage() {
	return (
		<div className="flex min-h-svh flex-col relative items-center gap-6 p-6 md:p-10 md:pt-32 pt-20">
			<div className="w-full max-w-sm p-6 bg-background border-2 rounded-lg">
				<SigninForm />
			</div>
			<Image
				src="/background.png"
				alt="app-bg"
				className="absolute top-0 left-0 w-full h-full object-fill -z-10 opacity-50 grayscale-[20%]"
				width={1000}
				height={1000}
			/>
		</div>
	);
}

export default SigninPage;
