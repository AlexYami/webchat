import type { BaseProps } from "../baseComponent/web";
import { WebComponent } from "../baseComponent/web";
import { Contact } from "../contact";
import type { ContactProps } from "../contact/contact";
import ContactListTemplate from "./contactList.hbs?raw";

interface ContactListProps extends BaseProps {
    contacts: ContactProps[];
}

export class ContactList extends WebComponent<ContactListProps> {
    public constructor(props: ContactListProps) {
        super("ul", {
            ...props,
            children: {
                ...props.children,
                Contacts: props.contacts.map((item) => {
                    return new Contact(item);
                }),
            },
        });
    }

    protected override render(): string {
        return ContactListTemplate;
    }
}
