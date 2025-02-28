import "./input.scss";

import { WebComponent } from "../baseComponent/component";
import { InputField } from "../inputField";
import type { ComponentContainerProps } from "../partial/partial";
import InputTemplate from "./input.hbs?raw";
import InputProfileTemplate from "./inputProfile.hbs?raw";

export interface InputProps extends ComponentContainerProps {
    errorMessage?: string;
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    isValid?: boolean;
    validationRegex?: RegExp;
    value: string;
}

export class Input extends WebComponent<InputProps> {
    // private isValid: boolean;
    public constructor(props: InputProps) {
        super("div", {
            ...props,
            ...{
                isValid: props.isValid ?? true,
            },
            children: {
                ...props.children,
                Input: new InputField({
                    ...props,
                    events: {
                        change: (e: Event): void => {
                            debugger;
                            const inputEl = e.target as HTMLInputElement;

                            const value = inputEl.value || "";

                            this.setProps({
                                value,
                                isValid: this.validate(value, true),
                            });
                        },
                    },
                }),
            },
        });

        // this.isValid = false;
    }

    protected override render(): string {
        return InputTemplate as string;
    }

    // private get inputField(): InputField {
    //     return this.props.children?.Input as InputField;
    // }

    public IsValid(): boolean {
        return !!this.props.isValid;
    }

    public validate(value?: string, silent: boolean = false): boolean {
        debugger;

        value ??= this.props.value;

        const regex = this.props.validationRegex;

        if (regex) {
            const isValid = regex.test(value);

            if (!silent) this.setProps({ isValid });

            return isValid;
        }

        return true;
    }

    public getKeyValue(): [string, string] {
        return [this.props.name, this.props.value];
    }
}

export class InputProfile extends Input {
    protected override render(): string {
        return InputProfileTemplate as string;
    }
}
