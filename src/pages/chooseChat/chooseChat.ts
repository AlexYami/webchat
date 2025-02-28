import { BaseLayout } from "../../components/layout/layout";

export class ChooseChatPage extends BaseLayout {
    public constructor() {
        super({
            searchText: "",
        });
    }

    protected override renderLayoutContent(): string {
        return `<div class="message-box message-box--empty">
                    <span>Выберите чат чтобы отправить сообщение</span>
                </div>`;
    }
}
