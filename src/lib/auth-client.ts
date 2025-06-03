import { createAuthClient } from "better-auth/react";
import {
	adminClient,
	multiSessionClient,
	usernameClient,
} from "better-auth/client/plugins";
import { supervisor, admin, ac } from "./permissions";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3030", // The base URL of your auth server
	plugins: [
		multiSessionClient(),
		usernameClient(),
		adminClient({
			ac,
			defaultRole: "supervisor",
			adminRoles: ["admin"],
			roles: {
				supervisor,
				admin,
			},
		}),
	],
});

export const { useSession } = authClient;
