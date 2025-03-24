import { ChatService } from "../../services";
import { connect } from "../../utils/connect";
import type { BaseProps } from "../baseComponent/web";
import { WebComponent } from "../baseComponent/web";
// import { ChatTitle } from "../chatTitle";
import { ImageButton } from "../imageButton";
import { InputField } from "../inputField";
import { Message, type MessageProps } from "../message/message";
import { AddUserModalForm, DeleteUserModalForm } from "../modal/modal";
import { BasePopup } from "../popup";
import { SendMessage } from "../sendMessage";
import MessageBoxTemplate from "./messageBox.hbs?raw";

interface MessageBoxProps extends BaseProps {
    messages: MessageProps[];
    showAddUserPopup?: boolean;
    chatId: number;
    name: string;
    image: string;
}

const addUserIcon = `<img src="/images/addUser.svg" alt="Добавить пользователя" />`;
const delteUserIcon = `<img src="/images/deleteUser.svg" alt="Удалить пользователя" />`;
const showAddUserPopupIcon = `<img src="/images/burgerMenu.svg" alt="Меню" />`;

// const addUserModalForm = new AddUserModalForm();

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
                DeleteUser: new ImageButton({
                    content: delteUserIcon,
                    text: "Удалить пользователя",
                    events: {
                        click: props.onDeleteUser,
                    },
                }),
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
    // private handleDocumentClickFn: (() => void) | undefined;

    public constructor(props: MessageBoxProps) {
        debugger;

        super("div", {
            ...props,
            children: {
                AvatarUpload: new InputField({
                    name: "avatar",
                    type: "file",
                    placeholder: "",
                    value: "",
                    id: "upload-avatar",
                    events: {
                        change: (e) => {
                            const input = e.target as HTMLInputElement;

                            if (input.files) {
                                const file = input.files[0];

                                if (file) {
                                    ChatService.updateAvatar(this.props.chatId, file);
                                }
                            }
                        },
                    },
                }),
                Popup: new AddUserPopup({
                    onAddUser: () => {
                        this.setProps({
                            showAddUserModalForm: true,
                        });
                    },
                    onDeleteUser: () => {
                        this.setProps({
                            showDeleteUserModalForm: true,
                        });
                    },
                }),
                addUserModalForm: new AddUserModalForm({
                    chatId: props.chatId,
                    onUserAdd: () => {
                        this.setProps({
                            showAddUserModalForm: false,
                            showDeleteUserModalForm: false,
                            showAddUserPopup: false,
                        });
                    },
                }),
                deleteUserModalForm: new DeleteUserModalForm({
                    chatId: props.chatId,
                    onUserDelete: () => {
                        this.setProps({
                            showAddUserModalForm: false,
                            showDeleteUserModalForm: false,
                            showAddUserPopup: false,
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
                FormSend: new SendMessage({ chatId: props.chatId }),
            },
        });

        document.addEventListener("click", this.handlePopupWindows.bind(this));
    }

    public override setProps(props: Partial<MessageBoxProps | null>): void {
        super.setProps(props);


        this.props.children?.addUserModalForm.setProps({ chatId: this.props.chatId });
        this.props.children?.deleteUserModalForm.setProps({ chatId: this.props.chatId });
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

        this.props.children.FormSend = new SendMessage({ chatId: this.props.chatId });

        const now = new Date();

        // Настройки для локализации на русском языке
        const options = {
            weekday: "short", // день недели
            month: "short", // месяц
            day: "numeric", // день месяца
            hour: "2-digit", // часы
            minute: "2-digit", // минуты
        };

        this.props.children!.Messages = this.props.messages
            .sort((a, b) => {
                // debugger;
                return new Date(a.time) - new Date(b.time);
            })
            .map(
                (m) =>
                    new Message({
                        my: m.user_id === window.store.getState().user.id,
                        read: m.is_read,
                        text: m.content,
                        // attachment?: string;
                        date: new Date(m.time).toLocaleString("ru-RU", options),
                    })
            );

        return MessageBoxTemplate;
    }

    protected handlePopupWindows(e: Event): void {
        let el: HTMLElement | null = e.target as HTMLElement;

        while (el) {
            if (
                el.className === "popup" ||
                el.className === "modal__content" ||
                el.classList.contains("message-box__menu")
            ) {
                return;
            }

            el = el.parentElement;
        }

        if (this.props.showAddUserPopup || this.props.showAddUserModalForm || this.props.showDeleteUserModalForm) {
            this.setProps({
                showAddUserPopup: false,
                showAddUserModalForm: false,
                showDeleteUserModalForm: false,
            });
        }
    }

    protected override handleRender(): void {
        super.handleRender();

        setTimeout(() => {
            const messageList = document.querySelector(".message-box__messages");

            if (messageList) messageList.scrollTop = 99999;
        }, 0);
    }

    // private handleDocumentClick(): void {
    //     alert("keks");
    // }
}

const mapStateToProps = (state) => {
    debugger;

    return {
        messages: state.messages,
    };
};

export default connect(mapStateToProps)(MessageBox);
