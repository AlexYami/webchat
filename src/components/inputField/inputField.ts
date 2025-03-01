import { BaseWebComponent, type BaseProps } from "../baseComponent/web";

import InputFieldTemplate from "./inputField.hbs?raw";

interface InputFieldProps extends BaseProps {
    name: string;
    type?: string;
    value: string;
    placeholder: string;
    isValid?: boolean;
}

export class InputField extends BaseWebComponent<InputFieldProps> {
    public constructor(props: InputFieldProps) {
        super("input", {
            ...props,
        });
    }

    protected override render(): string {
        return InputFieldTemplate;
    }
}
