import { createAccessControl } from "better-auth/plugins/access";
import {
	defaultStatements,
	adminAc,
	userAc,
} from "better-auth/plugins/admin/access";

const statement = {
	...defaultStatements,
} as const;

const ac = createAccessControl(statement);

const admin = ac.newRole({
	...adminAc.statements,
});

const supervisor = ac.newRole({
	...userAc.statements,
});

export { ac, supervisor, admin };
