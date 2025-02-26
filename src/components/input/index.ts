import "./input.scss";

import { WebComponent } from "../baseComponent/component";
import { InputField } from "../inputField";
import type { ComponentContainerProps } from "../partial/partial";
import InputTemplate from "./input.hbs?raw";

interface InputProps extends ComponentContainerProps {
    errorMessage?: string;
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    isValid?: boolean;
}

export class Input extends WebComponent<InputProps> {
    public constructor(props: InputProps) {
        super("div", {
            ...props,
            children: {
                ...props.children,
                Input: new InputField({
                    ...props,
                    events: {
                        change: () => {
                            this.setProps({
                                errorMessage: "Kokokoko",
                            });
                        },
                    },
                }),
            },
        });
    }

    protected override render(): string {
        debugger;

        return InputTemplate as string;
    }

    private get inputField(): InputField {
        return this.props.children?.Input as InputField;
    }

    public validate(): boolean {
        return this.inputField.validate();
    }

    public getKeyValue(): [string, string] {
        return [this.props.name, this.inputField.getValue()];
    }
}
