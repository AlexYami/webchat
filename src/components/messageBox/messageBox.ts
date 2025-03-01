import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";
import { ChatTitle } from "../chatTitle";
import { Message, type MessageProps } from "../message/message";
import { SendMessage } from "../sendMessage";
import MessageBoxTemplate from "./messageBox.hbs?raw";

interface MessageBoxProps extends BaseProps {
    messages: MessageProps[];
    showAddUserPopup?: boolean;
}

export class MessageBox extends WebComponent<MessageBoxProps> {
    public constructor(props: MessageBoxProps) {
        super("div", {
            ...props,
            children: {
                Messages: props.messages.map((m) => new Message(m)),
                ChatTitle: new ChatTitle({ showAddUserPopup: !!props.showAddUserPopup, title: "Вадим" }),
                FormSend: new SendMessage(),
            },
        });
    }
    protected override render(): string {
        return MessageBoxTemplate;
    }
}
