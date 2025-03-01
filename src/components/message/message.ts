import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";
import MessageTemplate from "./message.hbs?raw";

export interface MessageProps extends BaseProps {
    my?: boolean;
    read?: boolean;
    text?: string;
    attachment?: string;
    date: string;
}

export class Message extends WebComponent<MessageProps> {
    public constructor(props: MessageProps) {
        super("div", props);
    }
    protected override render(): string {
        return MessageTemplate;
    }
}
