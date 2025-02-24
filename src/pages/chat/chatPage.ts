// import { BaseWebComponent } from "../../components/baseComponent/web";

import { Layout, MessageBox } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import type { BaseProps } from "../../components/baseComponent/web";

import ChatPageTemplate from "./chat.hbs?raw";

const layoutTemplate = `{{{ MessageBox }}}`;

interface ChatPageProps extends BaseProps {}

const messages = [
    {
        text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
        date: "11:56",
    },
    {
        attachment: "https://placehold.co/316x211/orange/white",
        date: "11:57",
    },
    {
        my: true,
        read: true,
        text: "Круто!",
        date: "11:57",
    },
    {
        my: true,
        text: "Я добавлю этот блок, чтобы проверить как работает скролл в этом чате. Так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
        date: "11:59",
    },
];

export class ChatPage extends WebComponent<ChatPageProps> {
    public constructor() {
        super("div", {
            children: {
                Layout: new Layout({
                    partial: layoutTemplate,
                    searchText: "",
                    children: {
                        MessageBox: new MessageBox({
                            messages,
                        }),
                    },
                }),
            },
        });
    }

    protected override render(): string {
        return ChatPageTemplate as string;
    }
}
