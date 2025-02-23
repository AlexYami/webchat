import { BaseWebComponent } from "../baseComponent/web";
import FormInputTemplate from "./formInput.hbs?raw";

export interface FormInputProps {
    label: string;
    placeholder: string;
    errorMessage: string;
    type: string;
}

export class FormInput extends BaseWebComponent<FormInputProps> {
    public constructor(props: FormInputProps) {
        super("input", props);
    }

    protected override render(): string {
        return FormInputTemplate as string;
    }
}
