import ChatApi from "../../api/auth/chat";
import BaseLayout from "../../components/layout/layout";
import { contacts } from "../../mockData";

const chatApi = new ChatApi();

export class ChatPage extends BaseLayout {
    public constructor() {
        super({
            searchText: "",
            contacts,
            children: {},
        });
    }

    // protected override renderLayoutContent(): string {
    //     return "{{{ messageBox }}}";
    // }
}
