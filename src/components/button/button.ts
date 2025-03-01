import { BaseWebComponent, type BaseProps } from "../baseComponent/web";
import ButtonTemplate from "./button.hbs?raw";

type ButtonRole = "primary" | "link" | "danger";
type ButtonType = "button" | "submit";

interface ButtonProps extends BaseProps {
    text: string;
    role?: ButtonRole;
    type?: ButtonType;
}

export class Button extends BaseWebComponent<ButtonProps> {
    public constructor(props: ButtonProps) {
        super("button", props);
    }

    protected override render(): string {
        return ButtonTemplate;
    }
}
