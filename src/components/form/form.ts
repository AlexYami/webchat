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
                    debugger;

                    if (!this.validate()) {
                        evt.preventDefault();
                        alert(JSON.stringify(this.getValues()));
                    }
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
