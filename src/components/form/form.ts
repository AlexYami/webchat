import { WebComponent } from "../baseComponent/component";
import { Partial, type ComponentContainerProps } from "../partial/partial";

import FormTemplate from "./form.hbs?raw";

interface FormProps extends ComponentContainerProps {
    title: string;
}

export class Form extends WebComponent<FormProps> {
    public constructor(props: FormProps) {
        super("form", {
            ...props,
            children: {
                ...props.children,
                Partial: new Partial(props.Partial),
            },
        });
    }
    protected override render(): string {
        return FormTemplate as string;
    }
}
