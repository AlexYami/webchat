import { ChatService } from "../../services";
import type { State } from "../../store";
import { connect } from "../../utils/connect";
import { isClickInsidePopup } from "../../utils/dom";
import { mapToMessage } from "../../utils/mappings";
import { sort } from "../../utils/sort";
import type { BaseProps } from "../baseComponent/web";
import { WebComponent } from "../baseComponent/web";
import { ImageButton } from "../imageButton";
import { InputField } from "../inputField";
import { Message } from "../message/message";
import { AddUserModalForm, DeleteUserModalForm } from "../modal/modal";
import { BasePopup } from "../popup";
import { SendMessage } from "../sendMessage";
import MessageBoxTemplate from "./messageBox.hbs?raw";

interface MessageBoxProps extends BaseProps {
    userId?: number;
    messages?: MessageResult[];
    showAddUserPopup?: boolean;
    showAddUserModalForm?: boolean;
    showDeleteUserModalForm?: boolean;
    chatId?: number;
    name?: string;
    image?: string;
}

export interface MessageResult {
    chat_id: number;
    content: string;
    id: number;
    is_read: true;
    time: string;
    type: string;
    user_id: number;
}

const addUserIcon = `<img src="/images/addUser.svg" alt="Добавить пользователя" />`;
const deleteUserIcon = `<img src="/images/deleteUser.svg" alt="Удалить пользователя" />`;
const showAddUserPopupIcon = `<img src="/images/burgerMenu.svg" alt="Меню" />`;

interface AddUserPopupProps extends BaseProps {
    onAddUserClick: EventListener;
    onDeleteUserClick: EventListener;
}
class AddUserPopup extends BasePopup {
    public constructor(props: AddUserPopupProps) {
        super({
            children: {
                AddUser: new ImageButton({
                    content: addUserIcon,
                    text: "Добавить пользователя",
                    events: {
                        click: props.onAddUserClick,
                    },
                }),
                DeleteUser: new ImageButton({
                    content: deleteUserIcon,
                    text: "Удалить пользователя",
                    events: {
                        click: props.onDeleteUserClick,
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
    public constructor(props: MessageBoxProps) {
        super("div", {
            ...props,
            children: {
                AvatarUpload: new InputField({
                    name: "avatar",
                    type: "file",
                    accept: "image/png, image/jpeg",
                    placeholder: "",
                    value: "",
                    id: "upload-avatar",
                    events: {
                        change: (e): void => {
                            if (!this.props.chatId) return;

                            const input = e.target as HTMLInputElement;

                            if (input.files) {
                                const [file] = input.files;

                                if (file) {
                                    void ChatService.updateAvatar(this.props.chatId, file);
                                }
                            }
                        },
                    },
                }),
                Popup: new AddUserPopup({
                    onAddUserClick: (): void => {
                        this.setProps({
                            showAddUserModalForm: true,
                        });
                    },
                    onDeleteUserClick: (): void => {
                        this.setProps({
                            showDeleteUserModalForm: true,
                        });
                    },
                }),
                addUserModalForm: new AddUserModalForm({
                    chatId: props.chatId,
                    title: "Добавить пользователя",
                    onUserAdd: (): void => {
                        this.hideAllPopupWindows();
                    },
                }),
                deleteUserModalForm: new DeleteUserModalForm({
                    chatId: props.chatId,
                    title: "Удалить пользователя",
                    onUserDelete: (): void => {
                        this.hideAllPopupWindows();
                    },
                }),
                ShowAddUserPopupButton: new ImageButton({
                    content: showAddUserPopupIcon,
                    text: "",
                    events: {
                        click: (): void => {
                            this.setProps({
                                showAddUserPopup: true,
                            });
                        },
                    },
                }),

                Messages: (props.messages ?? []).map((m) => new Message(mapToMessage(m, props.userId!))),
                FormSend: new SendMessage({ chatId: props.chatId }),
            },
        });

        document.addEventListener("click", this.handlePopupWindows.bind(this));
    }

    protected override render(): string {
        if (this.props.messages) {
            this.props.children!.Messages = sort<MessageResult>(this.props.messages, (a, b) => {
                const aDate = new Date(a!.time);
                const bDate = new Date(b!.time);

                return aDate.getTime() - bDate.getTime();
            }).map((m) => new Message(mapToMessage(m, this.props.userId!)));
        }

        return MessageBoxTemplate;
    }

    protected handlePopupWindows(e: Event): void {
        if (!isClickInsidePopup(e.target as HTMLElement)) {
            if (this.props.showAddUserPopup || this.props.showAddUserModalForm || this.props.showDeleteUserModalForm) {
                this.hideAllPopupWindows();
            }
        }
    }

    protected override handleRender(): void {
        super.handleRender();

        setTimeout(() => {
            const messageList = document.querySelector(".message-box__messages");

            if (messageList) messageList.scrollTop = 99999;
        }, 0);
    }

    private hideAllPopupWindows(): void {
        this.setProps({
            showAddUserModalForm: false,
            showDeleteUserModalForm: false,
            showAddUserPopup: false,
        });
    }
}

const mapStateToProps = (state: State): Record<string, unknown> => {
    return {
        messages: state.messages,
        chatId: state.activeChat?.id,
        name: state.activeChat?.name,
        image: state.activeChat?.image,
        userId: state.user?.id,
    };
};

export default connect<MessageBoxProps>(mapStateToProps)(MessageBox);
