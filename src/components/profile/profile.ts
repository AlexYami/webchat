import { Form } from "../form";
import type { FormProps } from "../form/form";
import type { InputProfile } from "../input";

import ProfileTemplate from "./profile.hbs?raw";

interface ProfileProps extends FormProps {
    title: string;
    image: string;
}

export class Profile extends Form {
    public constructor(props: ProfileProps, inputs: InputProfile[]) {
        // super({ ...props, children: { ...props.children, Inputs: inputs } } as FormProps, inputs);
           super({ ...props, children: { ...props.children, Inputs: inputs } } as FormProps, inputs);
    }

    protected override render(): string {
        debugger;

        return ProfileTemplate as string;
    }
}
