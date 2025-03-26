import type { State } from "../../store";
import { connect } from "../../utils/connect";
import { DEFAULT_AVATAR_URL } from "../../utils/constants";
import type { BaseProps } from "../baseComponent/web";
import { WebComponent } from "../baseComponent/web";
import { Contact } from "../contact";
import type { ContactProps } from "../contact/contact";
import { onContactClick } from "./contactClick";
import ContactListTemplate from "./contactList.hbs?raw";

interface ContactListProps extends BaseProps {
    contacts: ContactProps[];
    contactClick: Function;
    activeIndex?: number;
}

class ContactList extends WebComponent<ContactListProps> {
    public constructor(props: ContactListProps) {
        super("ul", {
            ...props,
            children: {
                ...props.children,
                Contacts: props.contacts.map((item) => {
                    const contact = new Contact({
                        ...item,
                        image: item.image,
                        events: {
                            click: (): void => {
                                onContactClick(item);
                            },
                        },
                    });

                    return contact as unknown as WebComponent<ContactProps>;
                }),
            },
        });
    }

    protected override render(): string {
        return ContactListTemplate;
    }
}

const mapStateToProps = (state: State): Record<string, unknown> => {
    return {
        title: state.user?.first_name,
        image: state.user?.avatar ?? DEFAULT_AVATAR_URL,
    };
};

export default connect<ContactListProps>(mapStateToProps)(ContactList);
