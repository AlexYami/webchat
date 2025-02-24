// import { BaseWebComponent } from "../../components/baseComponent/web";

import { Layout, MessageBox } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import type { BaseProps } from "../../components/baseComponent/web";

import ChatPageTemplate from "./chat.hbs?raw";

const layoutTemplate = `{{{ MessageBox }}}`;

interface ChatPageProps extends BaseProps {}

export class ChatPage extends WebComponent<ChatPageProps> {
    public constructor() {
        super("div", {
            children: {
                Layout: new Layout({
                    partial: layoutTemplate,
                    searchText: "",
                    children: {
                        MessageBox: new MessageBox({}),
                    },
                }),
            },
        });
    }

    protected override render(): string {
        return ChatPageTemplate as string;
    }
}
