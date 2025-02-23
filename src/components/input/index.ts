import { BaseWebComponent } from "../baseComponent/web";
import "./input.scss";

import InputTemplate from "./input.hbs?raw";

interface InputProps {
    errorMessage?: string;
    label: string;
    name: string;
    type?: string;
    placeholder: string;
}

export class Input extends BaseWebComponent<InputProps> {
    public constructor(props: InputProps) {
        super("div", props);
    }

    protected override render(): string {
        return InputTemplate as string;
    }
}
