import { BaseWebComponent } from "../baseComponent/web";
import ButtonTemplate from "./button.hbs?raw";

export interface ButtonProps {
    text: string;
}

export class Button extends BaseWebComponent<ButtonProps> {
    public constructor(props: ButtonProps) {
        super("button", props);
    }

    protected override render(): string {
        return ButtonTemplate as string;
    }
}
