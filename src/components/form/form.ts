import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";
import { Input } from "../input";

export abstract class BaseForm<TProps extends BaseProps> extends WebComponent<TProps> {
    protected constructor(props: TProps) {
        super("form", {
            ...props,
            children: {
                ...props.children,
            },
            events: {
                submit: function (this: BaseForm<TProps>, evt) {
                    this.onFormSubmit(evt);
                },
            },
        });
    }

    protected onFormSubmit(evt: Event): void {
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
    }

    protected getInputs(): Input[] {
        if (!this.props.children) return [];

        return Object.values(this.props.children).filter((child) => child instanceof Input);
    }

    public validate(): boolean {
        let res = true;

        for (const input of this.getInputs()) {
            const isValid = input.validate();
            res &&= isValid;
        }

        return res;
    }

    public getValues(): Record<string, string> {
        const res: Record<string, string> = {};

        for (const input of this.getInputs()) {
            const [key, value] = input.getKeyValue();

            res[key] = value;
        }

        return res;
    }
}
