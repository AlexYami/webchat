import { WebComponent, type BaseProps } from "../baseComponent/web";

import InputFieldTemplate from "./inputField.hbs?raw";

interface InputFieldProps extends BaseProps {
    name: string;
    type?: string;
    id?: string;
    value: string;
    placeholder: string;
    isValid?: boolean;
}

export class InputField extends WebComponent<InputFieldProps> {
    public constructor(props: InputFieldProps) {
        super("input", {
            ...props,
        });
    }

    protected override render(): string {
        return InputFieldTemplate;
    }
}
