import { BaseAuthForm, type BaseAuthFormProps } from "../../pages/login/login";
import { ChatService } from "../../services";
import type { State } from "../../store";
import { connect } from "../../utils/connect";
import { LOGIN_REGEX } from "../../utils/validations";
import { Button } from "../button";
import { Input } from "../input";
import type { SearchUserFormData } from "./modal";

export interface AddUserFormProps extends BaseAuthFormProps {
    onUserAdd: Function;
    chatId?: number;
}

const addUserForm = class extends BaseAuthForm<AddUserFormProps> {
    public constructor(props: AddUserFormProps) {
        super({
            ...props,
            children: {
                InputLogin: new Input({
                    label: "Логин",
                    name: "login",
                    placeholder: "Введите логин",
                    errorMessage: "Неверный логин",
                    validationRegex: LOGIN_REGEX,
                    value: "",
                }),
                ButtonAddUser: new Button({
                    text: "Добавить",
                    role: "primary",
                }),
            },
            onFormSubmit: (formData: Record<string, string>) => {
                const { login } = formData as unknown as SearchUserFormData;

                void ChatService.addUserToChat(login, this.props.chatId!).then(() => {
                    this.props.onUserAdd.call(this);
                });
            },
        });
    }

    protected override renderContent(): string {
        return `
        <div class="form__inputs">
            <div class="form__input-container">
                {{{ InputLogin }}}
            </div>
        </div>
        <div class="form__buttons">
            {{{ ButtonAddUser }}}
        </div>`;
    }
};

const mapStateToProps = (state: State): Record<string, unknown> => {
    return {
        chatId: state.activeChat?.id,
    };
};

export const AddUserForm = connect<AddUserFormProps>(mapStateToProps)(addUserForm);
