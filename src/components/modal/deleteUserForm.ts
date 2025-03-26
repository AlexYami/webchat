import { BaseAuthForm, type BaseAuthFormProps } from "../../pages/login/login";
import { ChatService } from "../../services";
import type { State } from "../../store";
import { connect } from "../../utils/connect";
import { LOGIN_REGEX } from "../../utils/validations";
import { Button } from "../button";
import { Input } from "../input";
import type { SearchUserFormData } from "./modal";

export interface DeleteUserFormProps extends BaseAuthFormProps {
    onUserDelete: Function;
    chatId?: number;
}

const deleteUserForm = class extends BaseAuthForm<DeleteUserFormProps> {
    public constructor(props: DeleteUserFormProps) {
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
                ButtonDeleteUser: new Button({
                    text: "Удалить",
                    role: "primary",
                }),
            },
            onFormSubmit: (formData: Record<string, string>) => {
                const { login } = formData as unknown as SearchUserFormData;

                if (this.props.chatId) {
                    void ChatService.deleteUserFromChat(login, this.props.chatId).then(() => {
                        this.props.onUserDelete.call(this);
                    });
                }
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
            {{{ ButtonDeleteUser }}}
        </div>`;
    }
};

const mapStateToProps = (state: State): Record<string, unknown> => {
    return {
        chatId: state.activeChat?.id,
    };
};

export const DeleteUserForm = connect<DeleteUserFormProps>(mapStateToProps)(deleteUserForm);
