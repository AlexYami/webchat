import { MessageBox } from "../../components";
import BaseLayout from "../../components/layout/layout";
import { contacts, messages } from "../../mockData";

export class SearchPage extends BaseLayout {
    public constructor() {
        super({
            searchText: "Контакт #4",
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
