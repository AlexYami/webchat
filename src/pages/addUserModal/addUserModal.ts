import { MessageBox } from "../../components";
import BaseLayout from "../../components/layout/layout";
import { contacts, messages } from "../../mockData";

// const addUserModalForm = new AddUserModalForm();

export class AddUserModalPage extends BaseLayout {
    public constructor() {
        super({
            searchText: "",
            contacts,
            children: {
                messageBox: new MessageBox({ messages, showAddUserPopup: false }),
                // addUserModalForm: new AddUserModalForm(pr),
            },
        });
    }

    protected override renderLayoutContent(): string {
        return `
            {{{ addUserModalForm }}}
            {{{ messageBox }}}
        `;
    }
}
