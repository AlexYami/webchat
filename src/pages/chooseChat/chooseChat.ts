import { BaseLayout } from "../../components/layout/layout";
import { contacts } from "../../mockData";

export class ChooseChatPage extends BaseLayout {
    public constructor() {
        super({
            searchText: "",
            contacts,
        });
    }

    protected override renderLayoutContent(): string {
        return `<div class="message-box message-box--empty">
                    <span>Выберите чат чтобы отправить сообщение</span>
                </div>`;
    }
}
