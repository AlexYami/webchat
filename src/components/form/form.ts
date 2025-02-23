import { BaseWebComponent } from "../baseComponent/web";
import FormTemplate from "./form.hbs?raw";

export interface FormProps {
    text: string;
}

export class Form extends BaseWebComponent<FormProps> {
    public constructor(props: FormProps) {
        super("form", props);
    }

    protected override render(): string {
        return FormTemplate as string;
    }
}
