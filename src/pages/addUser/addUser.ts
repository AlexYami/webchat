import { MessageBox } from "../../components";
import { BaseLayout } from "../../components/layout/layout";
import { contacts, messages } from "../../mockData";

export class AddUserPage extends BaseLayout {
    public constructor() {
        super({
            searchText: "",
            contacts,
            children: {
                messageBox: new MessageBox({ messages, showAddUserPopup: true }),
            },
        });
    }

    protected override renderLayoutContent(): string {
        return `
            {{{ messageBox }}}
        `;
    }
}
