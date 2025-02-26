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
}

export class InputField extends BaseWebComponent<InputFieldProps> {
    public constructor(props: InputFieldProps) {
        super("input", {
            ...props,
            // events: {
            //     change: (evt) => {
            //         this.onChange(evt);
            //     },
            // },
        });
    }

    private onChange(evt: Event): void {
        const target = evt.target as HTMLInputElement;

        // this.validate()

        // this.setProps({
        //     value: target.value,
        //     isValid: true,
        // });
    }

    protected override render(): string {
        return InputFieldTemplate as string;
    }

    public validate(): boolean {
        return false;
    }

    public getValue(): string {
        return "test";
    }
}
