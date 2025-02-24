import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";
import MessageBoxTemplate from "./messageBox.hbs?raw";

interface MessageBoxProps extends BaseProps {
    messages: undefined;
}

export class MessageBox extends WebComponent<MessageBoxProps> {
    public constructor(props: MessageBoxProps) {
        super("div", props);
    }
    protected override render(): string {
        debugger;
        return MessageBoxTemplate as string;
    }
}
