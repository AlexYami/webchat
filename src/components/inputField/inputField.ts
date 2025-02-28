import { BaseWebComponent, type BaseProps } from "../baseComponent/web";

import InputFieldTemplate from "./inputField.hbs?raw";

// <template name="{{name}}" type="{{#if type}}{{type}}{{else}}text{{/if}}" placeholder="{{placeholder}}">
// </template>

interface InputFieldProps extends BaseProps {
    errorMessage?: string;
    label: string;
    name: string;
    type?: string;
    value: string;
    placeholder: string;
    isValid?: boolean;
    // validationRegex?: RegExp;
}

export class InputField extends BaseWebComponent<InputFieldProps> {
    public constructor(props: InputFieldProps) {
        super("input", {
            ...props,
        });
    }

    protected override render(): string {
        return InputFieldTemplate as string;
    }

    // public validate(): boolean {
    //     const regex = this.props.validationRegex;
    //     if (regex) return regex.test(this.props.value);
    //     return true;
    // }

    // public getValue(): string {
    //     return "test";
    // }
}
