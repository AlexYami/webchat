import { Button, Form as BaseForm, Input } from "../../components";
import { LOGIN_REGEX, PASSWORD_REGEX } from "../../utils/validations";
import LoginFormTemplate from "./form.hbs?raw";

const InputLogin = new Input({
    label: "Логин",
    name: "login",
    placeholder: "Введите логин",
    errorMessage: "Неверный логин",
    validationRegex: LOGIN_REGEX,
    value: "",
});

const InputPassword = new Input({
    label: "Пароль",
    name: "password",
    placeholder: "Введите пароль",
    errorMessage: "Введите более сложный пароль",
    type: "password",
    validationRegex: PASSWORD_REGEX,
    value: "",
});

const ButtonAuth = new Button({
    text: "Авторизоваться",
    role: "primary",
    type: "submit",
});

const ButtonNoAccount = new Button({
    text: "Нет Аккаунта?",
    role: "link",
    type: "button",
});

export abstract class BaseAuthForm extends BaseForm {
    protected override renderFormTitle(): string {
        return `<h2 class="form__title">{{ title }}</h2>`;
    }
    protected override getFormClassName(): string {
        return `form`;
    }
}

export class LoginPage extends BaseAuthForm {
    public constructor() {
        super(
            {
                title: "Вход",
                children: {
                    InputLogin,
                    InputPassword,
                    ButtonAuth,
                    ButtonNoAccount,
                },
            },
            [InputLogin, InputPassword]
        );
    }

    protected override renderFormContent(): string {
        return LoginFormTemplate as string;
    }
}
