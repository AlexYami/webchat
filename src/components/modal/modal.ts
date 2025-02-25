import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";

import ModalTemplate from "./modal.hbs?raw";

interface ModalProps extends BaseProps {
    partial: string;
    title: string;
}

export class Modal extends WebComponent<ModalProps> {
    public constructor(props: ModalProps) {
        super("div", props);
    }
    protected override render(): string {
        return (ModalTemplate as string).replace("{{{ partial }}}", this.props.partial);
    }
}

