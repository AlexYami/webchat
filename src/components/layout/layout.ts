import ChatApi from "../../api/auth/chat";
import { connect } from "../../utils/connect";
import type { BaseProps } from "../baseComponent/web";
import { WebComponent } from "../baseComponent/web";
import { Button } from "../button";
import type { ContactProps } from "../contact/contact";
import { ContactList } from "../contactList";
import { SearchBox } from "../searchbox";

const chatApi = new ChatApi();

interface LayoutProps extends BaseProps {
    searchText: string;
    contacts: ContactProps[];
}

const AddNewChatButton = new Button({
    text: "Добавить новый чат",
    role: "link",
    events: {
        click: () => {
            let title = prompt("Введите название чата");

            if (title) {
                chatApi
                    .createChat()
                    .then(async () => {
                        return chatApi.getChats();
                    })
                    .then((res) => {
                        window.store.set({
                            contacts: res.map((item) => {
                                return {
                                    name: item.title,
                                    image: item.avatar,
                                    notifiesNumber: item.unread_count,
                                    lastMessageDate: item.last_message,
                                    preview: item.last_message,
                                };
                            }),
                        });
                    });
            }
        },
    },
});

abstract class BaseLayout extends WebComponent<LayoutProps> {
    public constructor(props: LayoutProps) {
        super("div", {
            ...props,
            children: {
                ...props.children,
                SearchBox: new SearchBox({ searchText: props.searchText }),
                AddNewChatButton,
                // ContactList: new ContactList({ contacts: props.contacts }),
            },
        });

        chatApi.getChats().then((res) => {
            // debugger;

            console.log(this.props);

            // this.setProps({
            //     contacts: res.map((item) => {
            //         return {
            //             name: item.title,
            //             image: item.avatar,
            //             notifiesNumber: item.unread_count,
            //             lastMessageDate: item.last_message,
            //             preview: item.last_message,
            //         };
            //     }),
            // });

            debugger;

            window.store.set({
                contacts: res.map((item) => {
                    return {
                        name: item.title,
                        image: item.avatar,
                        notifiesNumber: item.unread_count,
                        lastMessageDate: item.last_message,
                        preview: item.last_message,
                    };
                }),
            });

            // chatApi.createChat();
        });
    }

    protected override render(): string {
        debugger;
        this.props.contacts = this.props.contacts || [];

        this.props.children!.ContactList = new ContactList({ contacts: this.props.contacts });

        return `
            <template class="layout">
                <aside class="layout__sidebar">
                    <a class="profile-link" href="#">Профиль</a>
                    {{{ AddNewChatButton }}}
                    {{{ SearchBox }}}
                    {{{ ContactList }}}
                </aside>
                <div class="layout__content">
                    ${this.renderLayoutContent()}
                </div>
            </template>
        `;
    }

    protected abstract renderLayoutContent(): string;
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
    };
};

export default connect(mapStateToProps)(BaseLayout);
