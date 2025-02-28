import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";
import type { Input } from "../input";

export interface FormProps extends BaseProps {
    title: string;
}

export abstract class Form extends WebComponent<FormProps> {
    private readonly inputs: Input[];

    public constructor(props: FormProps, inputs: Input[]) {
        super("form", {
            ...props,
            children: {
                ...props.children,
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
            const isValid = input.validate();
            res &&= isValid;
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
        return `<template class="${this.getFormClassName()}">
                    ${this.renderFormTitle()}
                    ${this.renderFormContent()}
                </template>`;
    }

    protected abstract getFormClassName(): string;
    protected abstract renderFormTitle(): string;
    protected abstract renderFormContent(): string;
}
