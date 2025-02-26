import { Button, Form, Input } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import FormTemplate from "./form.hbs?raw";
import LoginPageTemplate from "./login.hbs?raw";

const InputLogin = new Input({
    label: "Логин",
    name: "login",
    placeholder: "Введите логин",
    errorMessage: "Неверный логин",
});

const InputPassword = new Input({
    label: "Пароль",
    name: "password",
    placeholder: "Введите пароль",
    type: "password",
});

const ButtonAuth = new Button({
    text: "Авторизоваться",
    type: "primary",
});

const ButtonNoAccount = new Button({
    text: "Нет Аккаунта?",
    type: "link",
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
