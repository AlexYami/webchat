import { Button, Input } from "../../components";
import { LOGIN_REGEX } from "../../utils/validations";
import { BaseAuthForm } from "../login/login";

const InputLogin = new Input({
    label: "Логин",
    name: "login",
    placeholder: "Введите логин",
    errorMessage: "Неверный логин",
    validationRegex: LOGIN_REGEX,
    value: "",
});

const ButtonAddUser = new Button({
    text: "Добавить",
    role: "primary",
});

export class AddUserForm extends BaseAuthForm {
    public constructor() {
        super({
            title: "Добавить пользователя",
            children: {
                InputLogin,
                ButtonAddUser,
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
}
