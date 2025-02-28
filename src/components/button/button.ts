// class BaseComponent1<TProps extends object> {
//     private readonly props: TProps;

import { BaseWebComponent, type BaseProps } from "../baseComponent/web";
import ButtonTemplate from "./button.hbs?raw";

//     public constructor(props: TProps) {
//         this.props = props;

//         console.log(this.props);
//     }
// }

// const TAG_NAME = "button";

// interface ButtonProps {
//     text: string;
// }

// export class Button extends BaseComponent1<ButtonProps> {
//     public constructor(props: ButtonProps) {
//         super(props);
//     }
// }

// export class Button2 extends BaseWebComponent<ButtonProps> {
//     public constructor(props: ButtonProps) {
//         super("button2", props);
//     }
// }

type ButtonRole = "primary" | "link";
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
        return ButtonTemplate as string;
    }
}
