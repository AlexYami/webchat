import { BaseModal } from "../../components/modal";
import { AddUserForm } from "./addUserForm";

export class AddUserModalForm extends BaseModal {
    public constructor() {
        super({
            children: {
                AddUserForm: new AddUserForm(),
            },
        });
    }

    protected override renderContent(): string {
        return `{{{ AddUserForm }}}`;
    }
}
