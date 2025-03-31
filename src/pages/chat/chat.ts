import type { BaseProps } from "../../components/baseComponent/web";
import { WebComponent } from "../../components/baseComponent/web";
import { Button } from "../../components/button";
import type { ContactProps } from "../../components/contact/contact";
import { ContactList } from "../../components/contactList";
import { MessageBox } from "../../components/messageBox";
import { SearchBox } from "../../components/searchbox";
import { ChatService } from "../../services";
import type { State } from "../../store";
import { connect } from "../../utils/connect";

interface ChatProps extends BaseProps {
    searchText: string;
    contacts: ContactProps[];
}

const AddNewChatButton = new Button({
    text: "Добавить новый чат",
    role: "link",
    events: {
        click: (): void => {
            let title = prompt("Введите название чата");

            if (title) {
                void ChatService.createChat(title);
            }
        },
    },
});

class Chat extends WebComponent<ChatProps> {
    public constructor(props: ChatProps) {
        super("div", {
            ...props,
            searchText: "",
            children: {
                ...props.children,
                messageBox: new MessageBox({
                    messages: [],
                }),
                SearchBox: new SearchBox({
                    searchText: "text",
                    onSearch: (search): void => {
                        this.setProps({
                            searchText: search,
                        });
                    },
                }),
                AddNewChatButton,
            },
        });
    }

    protected override render(): string {
        const contacts = this.props.contacts.filter((contact) => {
            return contact.name.includes(this.props.searchText);
        });

        this.props.children!.ContactList = new ContactList({
            contacts,
            contactClick: (contact: ContactProps): void => {
                const chatId = contact.id;

                this.getMessageBox().setProps({
                    chatId,
                    name: contact.name,
                    image: contact.image,
                });
            },
        });

        return `
            <template class="layout">
                <aside class="layout__sidebar">
                    <div class="layout__links">
                        {{{ AddNewChatButton }}}
                        <button class="button button--link"><a href="/settings">Профиль</a></button>
                    </div>
                    {{{ SearchBox }}}
                    {{{ ContactList }}}
                </aside>
                <div class="layout__content">
                    ${this.renderLayoutContent()}
                </div>
            </template>
        `;
    }

    protected renderLayoutContent(): string {
        return `{{{ messageBox }}}`;
    }

    private getMessageBox(): WebComponent<object> {
        return this.props.children?.messageBox as WebComponent<object>;
    }
}

const mapStateToProps = (state: State): Record<string, unknown> => {
    return {
        contacts: state.contacts,
    };
};

export default connect<ChatProps>(mapStateToProps)(Chat);
