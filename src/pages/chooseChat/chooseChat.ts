import { Layout } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import type { BaseProps } from "../../components/baseComponent/web";

import ChooseChatPageTemplate from "./chooseChat.hbs?raw";

const layoutTemplate = `
    <div class="message-box message-box--empty">
        <span>Выберите чат чтобы отправить сообщение</span>
    </div>`;

interface ChooseChatPageProps extends BaseProps {}

const messages = [];

export class ChooseChatPage extends WebComponent<ChooseChatPageProps> {
    public constructor() {
        super("div", {
            children: {
                Layout: new Layout({
                    partial: layoutTemplate,
                    searchText: "",
                }),
            },
        });
    }

    protected override render(): string {
        return ChooseChatPageTemplate as string;
    }
}
