import { Button, Form } from "../../components";
import { CreateComponentContructorNotFoundError } from "../../utils/errors";
// import { Form } from "../form";
import type { ButtonProps } from "../button/button";
import type { FormProps } from "../form/form";

import type { BaseWebComponent } from "./web";

export interface CreateComponentArgs {
    name: string;
    params: Record<string, unknown>;
}

const COMPONENT_CONSTRUCTORS: Record<string, Function> = {
    Button: (props: ButtonProps) => new Button(props),
    Form: (props: FormProps) => new Form(props),
};

export function createComponent({ name, props }: CreateComponentArgs): BaseWebComponent<object> {
    const constructorFn = COMPONENT_CONSTRUCTORS[name];

    if (!constructorFn) throw new CreateComponentContructorNotFoundError(name);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return constructorFn(props);
}
