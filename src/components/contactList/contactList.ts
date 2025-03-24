import type { BaseProps } from "../baseComponent/web";
import { WebComponent } from "../baseComponent/web";
import { Contact } from "../contact";
import type { ContactProps } from "../contact/contact";
import ContactListTemplate from "./contactList.hbs?raw";

interface ContactListProps extends BaseProps {
    contacts: ContactProps[];
    activeIndex: number;
    contactClick: Function;
    id: number;
}

export class ContactList extends WebComponent<ContactListProps> {
    private activeIndex: number | null;
    public constructor(props: ContactListProps) {
        super("ul", {
            ...props,
            children: {
                ...props.children,
            },
        });

        this.activeIndex = null;
    }

    public getActiveIndex(): number {
        return this.props.activeIndex;
    }

    public getActiveContact() {
        if (typeof this.activeIndex === "number") {
            const contact = this.props.children!.Contacts[this.activeIndex];

            if (!contact) return null;

            return contact;
        }

        return null;
    }

    protected override render(): string {
        debugger;

        this.props.children!.Contacts = this.props.contacts.map((item, index) => {
            return new Contact({
                ...item,
                image:
                    item.image || "e5fdefa5-ecc6-4894-bf37-3ecc64127707/dfd81303-407e-48f5-8d89-65319e6c30ad_vimeo.jpg",
                events: {
                    click: () => {
                        // alert("asfsdf");
                        console.log(item);

                        this.props.contactClick(item);

                        // debugger;

                        // if (typeof this.activeIndex === "number") {
                        //     this.props.children!.Contacts[this.activeIndex].setProps({ isActive: false });
                        // }

                        this.getActiveContact()?.setProps({ isActive: false });

                        this.activeIndex = index;

                        this.getActiveContact()?.setProps({ isActive: true });

                        // this.setProps({
                        //     activeIndex: index,
                        // });
                    },
                },
            });
        });

        return ContactListTemplate;
    }
}
