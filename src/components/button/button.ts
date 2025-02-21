// class BaseComponent1<TProps extends object> {
//     private readonly props: TProps;

import { BaseWebComponent } from "../baseComponent/web";
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

interface ButtonProps {
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
