import { Button, Form, Input } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import { LOGIN_REGEX, PASSWORD_REGEX } from "../../utils/validations";
import FormTemplate from "./form.hbs?raw";
import LoginPageTemplate from "./login.hbs?raw";

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

export class LoginPage extends WebComponent<object> {
    public constructor() {
        super("div", {
            children: {
                Form: new Form(
                    {
                        title: "Вход",
                        Partial: {
                            template: FormTemplate as string,
                            children: {
                                InputLogin,
                                InputPassword,
                                ButtonAuth,
                                ButtonNoAccount,
                            },
                        },
                    },
                    [InputLogin, InputPassword]
                ),
            },
        });
    }

    protected override render(): string {
        return LoginPageTemplate as string;
    }
}
