import { WebComponent } from "../baseComponent/component";
import type { Input } from "../input";
import { Partial, type ComponentContainerProps } from "../partial/partial";

import FormTemplate from "./form.hbs?raw";

interface FormProps extends ComponentContainerProps {
    title: string;
}

export class Form extends WebComponent<FormProps> {
    private readonly inputs: Input[];

    public constructor(props: FormProps, inputs: Input[]) {
        super("form", {
            ...props,
            children: {
                ...props.children,
                Partial: new Partial(props.Partial),
            },
            events: {
                submit: function (this: Form, evt) {
                    evt.preventDefault();

                    const data = this.getValues();

                    if (this.validate()) {
                        console.log(
                            "%cForm was successfuly posted to the server.",
                            "color: black; font-size: 16px; background-color: lightgreen; padding: 5px;"
                        );
                    } else {
                        console.log(
                            "%cForm was not posted to the server due to validation errors.",
                            "color: white; font-size: 16px; background-color: darkred; padding: 5px;"
                        );
                    }

                    console.table(data);
                },
            },
        });

        this.inputs = inputs;
    }

    public validate(): boolean {
        let res = true;

        for (const input of this.inputs) {
            res &&= input.validate();
        }

        return res;
    }

    public getValues(): Record<string, string> {
        const res: Record<string, string> = {};

        for (const input of this.inputs) {
            const [key, value] = input.getKeyValue();

            res[key] = value;
        }

        return res;
    }

    protected override render(): string {
        return FormTemplate as string;
    }
}
