import { Form, Input } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import type { BaseWebComponent } from "../../components/baseComponent/web";
import { Button } from "../../components/button/button";
import FormTemplate from "./form.hbs?raw";
import LoginPageTemplate from "./login.hbs?raw";

export class LoginPage extends WebComponent<object> {
    public constructor() {
        super("div", {
            children: {
                Form: new Form({
                    title: "Вход",
                    Partial: {
                        template: FormTemplate as string,
                        children: {
                            InputLogin: new Input({
                                label: "Логин",
                                name: "login",
                                placeholder: "Введите логин",
                                errorMessage: "Неверный логин",
                            }),
                            InputPassword: new Input({
                                label: "Пароль",
                                name: "password",
                                placeholder: "Введите пароль",
                                type: "password",
                            }),
                            ButtonAuth: new Button({
                                text: "Авторизоваться",
                                type: "primary",
                            }),
                            ButtonNoAccount: new Button({
                                text: "Нет Аккаунта?",
                                type: "link",
                            }),
                        },
                    },
                }),
            },
        });
    }

    protected override getChildComponents(): Record<string, BaseWebComponent<object>> {
        return {
            InputLogin: new Input({
                label: "Логин",
                name: "login",
                placeholder: "Введите логин",
                errorMessage: "Неверный логин",
            }),
            InputPassword: new Input({
                label: "Пароль",
                name: "password",
                placeholder: "Введите пароль",
                type: "password",
            }),
            ButtonAuth: new Button({
                text: "Авторизоваться",
                type: "primary",
            }),
            ButtonNoAccount: new Button({
                text: "Нет Аккаунта?",
                type: "link",
            }),
        };
    }

    protected override render(): string {
        return LoginPageTemplate as string;
    }
}
