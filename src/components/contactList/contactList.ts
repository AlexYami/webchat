import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";
import { Contact } from "../contact";
import type { ContactProps } from "../contact/contact";
import ContactListTemplate from "./contactList.hbs?raw";

interface ContactListProps extends BaseProps {
    items: ContactProps[];
}

export class ContactList extends WebComponent<ContactListProps> {
    public constructor(props: ContactListProps) {
        super("ul", {
            ...props,
            children: {
                ...props.children,
                Contacts: props.items.map((item) => {
                    return new Contact(item);
                }),
            },
        });
    }
    protected override render(): string {
        return ContactListTemplate as string;
    }
}
