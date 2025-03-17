import ChatApi from "../../api/auth/chat";
import { connect } from "../../utils/connect";
import type { BaseProps } from "../baseComponent/web";
import { WebComponent } from "../baseComponent/web";
// import { ChatTitle } from "../chatTitle";
import { ImageButton } from "../imageButton";
import { Message, type MessageProps } from "../message/message";
import { AddUserModalForm } from "../modal/modal";
import { BasePopup } from "../popup";
import { SendMessage } from "../sendMessage";
import MessageBoxTemplate from "./messageBox.hbs?raw";

interface MessageBoxProps extends BaseProps {
    messages: MessageProps[];
    showAddUserPopup?: boolean;
    chatId: number;
}

const addUserIcon = `<img src="/images/addUser.svg" alt="Добавить пользователя" />`;
const delteUserIcon = `<img src="/images/deleteUser.svg" alt="Удалить пользователя" />`;
const showAddUserPopupIcon = `<img src="/images/burgerMenu.svg" alt="Меню" />`;

// const addUserModalForm = new AddUserModalForm();

const chatApi = new ChatApi();

class AddUserPopup extends BasePopup {
    public constructor(props) {
        super({
            children: {
                AddUser: new ImageButton({
                    content: addUserIcon,
                    text: "Добавить пользователя",
                    events: {
                        click: props.onAddUser,
                    },
                }),
                DeleteUser: new ImageButton({ content: delteUserIcon, text: "Удалить пользователя" }),
            },
        });
    }

    protected override renderContent(): string {
        return `
            <div class="message-box__command-popup">
                {{{ AddUser }}}
                {{{ DeleteUser }}}
            </div>`;
    }
}

class MessageBox extends WebComponent<MessageBoxProps> {
    public constructor(props: MessageBoxProps) {
        super("div", {
            ...props,
            children: {
                Popup: new AddUserPopup({
                    onAddUser: () => {
                        this.setProps({
                            showAddUserModalForm: true,
                        });
                    },
                }),
                addUserModalForm: new AddUserModalForm({
                    onUserAdd: () => {
                        alert("kekekeke");
                        console.log(this);

                        chatApi
                            .addUsersToChat(this.props.chatId, [3643, 3647])
                            .then((res) => {
                                this.setProps({
                                    showAddUserModalForm: false,
                                    showAddUserPopup: false,
                                });
                            })
                            .catch((res) => {
                                this.setProps({
                                    showAddUserModalForm: false,
                                    showAddUserPopup: false,
                                });
                            });
                    },
                }),
                ShowAddUserPopupButton: new ImageButton({
                    content: showAddUserPopupIcon,
                    text: "",
                    events: {
                        click: () => {
                            this.setProps({
                                showAddUserPopup: true,
                            });
                        },
                    },
                }),

                Messages: props.messages.map((m) => new Message(m)),
                // ChatTitle: new ChatTitle({ showAddUserPopup: !!props.showAddUserPopup, title: "Вадим" }),
                FormSend: new SendMessage(),
            },
        });
    }
    protected override render(): string {
        debugger;

        // chat_id: 53428;
        // content: "Моё первое сообщение миру!";
        // file: null;
        // id: 1;
        // is_read: true;
        // time: "2025-03-16T15:15:37+00:00";
        // type: "message";
        // user_id: 3643;

        this.props.children!.Messages = this.props.messages.map(
            (m) =>
                new Message({
                    // my?: ;
                    read: m.is_read,
                    text: m.content,
                    // attachment?: string;
                    date: m.time,
                })
        );

        return MessageBoxTemplate;
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
    };
};

export default connect(mapStateToProps)(MessageBox);
