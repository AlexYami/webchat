import { WebComponent } from "../baseComponent/component";
import { Form } from "../form";
import type { ComponentContainerProps } from "../partial/partial";

import ModalTemplate from "./modal.hbs?raw";

interface ModalProps extends ComponentContainerProps {
    title: string;
}

export class Modal extends WebComponent<ModalProps> {
    public constructor(props: ModalProps) {
        super("div", {
            ...props,
            children: {
                ...props.children,
                Form: new Form({
                    title: props.title,
                    Partial: props.Partial,
                }),
            },
        });
    }
    protected override render(): string {
        return ModalTemplate as string;
    }
}
