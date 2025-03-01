import { MessageBox } from "../../components";
import { BaseLayout } from "../../components/layout/layout";
import { contacts, messages } from "../../mockData";

export class ChatPage extends BaseLayout {
    public constructor() {
        super({
            searchText: "",
            contacts,
            children: {
                messageBox: new MessageBox({ messages }),
            },
        });
    }

    protected override renderLayoutContent(): string {
        return "{{{ messageBox }}}";
    }
}
