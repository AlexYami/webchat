import "./contact.scss";

import { BaseWebComponent, type BaseProps } from "../baseComponent/web";
import ContactTemplate from "./contact.hbs?raw";

export interface ContactProps extends BaseProps {
    image: string;
    name: string;
    preview: string;
    lastMessageDate: string;
    notifiesNumber: number;
}

export class Contact extends BaseWebComponent<ContactProps> {
    public constructor(props: ContactProps) {
        super("li", props);
    }

    protected override render(): string {
        return ContactTemplate;
    }
}
