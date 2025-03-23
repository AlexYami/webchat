import ChatApi from "../../api/auth/chat";
import TokenApi from "../../api/auth/token";
import { getMessages } from "../../api/messageTransport";
import { connect } from "../../utils/connect";
import type { BaseProps } from "../baseComponent/web";
import { WebComponent } from "../baseComponent/web";
import { Button } from "../button";
import type { ContactProps } from "../contact/contact";
import { ContactList } from "../contactList";
import { MessageBox } from "../messageBox";
import { SearchBox } from "../searchbox";

const tokenUrl = "/api/v2/chats/token/53428";

const chatApi = new ChatApi();
const tokenApi = new TokenApi();

// const addUserModalForm = new AddUserModalForm();

interface LayoutProps extends BaseProps {
    searchText: string;
    contacts: ContactProps[];
    activeChat: number;
}

const AddNewChatButton = new Button({
    text: "Добавить новый чат",
    role: "link",
    events: {
        click: () => {
            let title = prompt("Введите название чата");

            debugger;

            if (title) {
                chatApi
                    .createChat(title)
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
                messageBox: new MessageBox({ messages: [] }),
                SearchBox: new SearchBox({
                    searchText: props.searchText,
                    onSearch: (search) => {
                        this.setProps({
                            searchText: search,
                        });
                    },
                }),
                AddNewChatButton,
                // addUserModalForm: new AddUserModalForm({
                //     onUserAdd: () => {},
                // }),
                // ContactList: new ContactList({ contacts: props.contacts }),
            },
        });

        // chatApi.getChats().then((res) => {
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

        // window.store.set({
        //     contacts: res.map((item) => {
        //         return {
        //             id: item.id,
        //             name: item.title,
        //             image: item.avatar,
        //             notifiesNumber: item.unread_count,
        //             lastMessageDate: item.last_message,
        //             preview: item.last_message,
        //         };
        //     }),
        // });

        // chatApi.createChat();
        // });
    }

    protected override render(): string {
        // debugger;
        console.log("rerendered");
        const contacts = (this.props.contacts || []).filter((contact) => {
            return contact.name.includes(this.props.searchText);
        });

        this.props.children!.ContactList = new ContactList({
            contacts,
            contactClick: (contact: Contact) => {
                // chatApi.getToken(chatId).then((res) => {
                //     const { token } = JSON.parse(res);

                const chatId = contact.id;

                // debugger;

                getMessages(window.store.getState().user.id, chatId);
                // });

                this.props.children!.messageBox.setProps({
                    chatId,
                    name: contact.name,
                });
                // debugger;
                // this.props.activeChat = index;
                // this.setProps({
                //     activeChat: index,
                // });
            },
        });

        return `
            <template class="layout">
                <aside class="layout__sidebar">
                    <a class="profile-link" href="/profile">Профиль</a>
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

    // protected abstract renderLayoutContent(): string;
    protected renderLayoutContent(): string {
        // return `
        //     {{#if activeChat includeZero=true}}
        //         {{{ messageBox }}}
        //          {{{ addUserModalForm1 }}}
        //     {{else}}
        //         <div class="message-box message-box--empty">
        //             <span>Выберите чат чтобы отправить сообщение</span>
        //         </div>
        //     {{/if}}`;

        return `
                {{{ messageBox }}}`;
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
    };
};

export default connect(mapStateToProps)(BaseLayout);
