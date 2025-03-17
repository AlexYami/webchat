import AuthApi from "../../api/auth/auth";
import { BaseForm, Button, Input } from "../../components";
import type { BaseProps } from "../../components/baseComponent/web";
import { Router } from "../../router/router";
import { ROUTES } from "../../router/routes";
import { LOGIN_REGEX, PASSWORD_REGEX } from "../../utils/validations";
import LoginFormTemplate from "./form.hbs?raw";

const authApi = new AuthApi();

const test_login = "Al1742038344302";
const test_password = "aabcAAVC@!1742038344302";
const id = 3643;

const chatId = 53428;

// const test_login = "Al1742065066352";
// const test_password = "aabcAAVC@!1742065066352";

// {
//     "first_name": "Alexisss1742065066352",
//     "second_name": "Bareolids1742065066352",
//     "login": "Al1742065066352",
//     "email": "Al1742065066352@gmail.com",
//     "password": "aabcAAVC@!1742065066352",
//     "phone": "123456789"
// id: 3647
// }

const InputLogin = new Input({
    label: "Логин",
    name: "login",
    placeholder: "Введите логин",
    errorMessage: "Неверный логин",
    validationRegex: LOGIN_REGEX,
    value: test_login,
});

const InputPassword = new Input({
    label: "Пароль",
    name: "password",
    placeholder: "Введите пароль",
    errorMessage: "Введите более сложный пароль",
    type: "password",
    validationRegex: PASSWORD_REGEX,
    value: test_password,
});

const ButtonAuth = new Button({
    text: "Авторизоваться",
    role: "primary",
    type: "submit",
    events: {
        click: (e: Event): void => {
            e.preventDefault();

            const data = {
                login: InputLogin.getValue(),
                password: InputPassword.getValue(),
            };

            // window.store.set({ isLoading: true });

            authApi
                .login(data)
                .then(async (res) => {
                    return authApi.me();
                })
                .then((res) => {
                    debugger;

                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    window.store.set({
                        user: JSON.parse(res),
                    });

                    Router.get().go(ROUTES.chat);
                })
                .catch((err) => {
                    void authApi.logout();
                });
        },
    },
});

const ButtonNoAccount = new Button({
    text: "Нет Аккаунта?",
    role: "link",
    type: "button",
    events: {
        click: (e: Event) => {
            alert("me");
            authApi.me().then((res) => {
                debugger;
            });
        },
    },
});

interface BaseAuthFormProps extends BaseProps {
    title: string;
}

export abstract class BaseAuthForm extends BaseForm<BaseAuthFormProps> {
    protected constructor(props: BaseAuthFormProps) {
        super(props);
    }

    protected override render(): string {
        return `<template class="${this.getClassName()}">
            ${this.renderTitle()}
            ${this.renderContent()}
        </template>`;
    }
    protected getClassName(): string {
        return `form`;
    }

    protected renderTitle(): string {
        return `<h2 class="form__title">{{ title }}</h2>`;
    }

    protected abstract renderContent(): string;
}

export class LoginPage extends BaseAuthForm {
    public constructor() {
        super({
            title: "Вход",
            children: {
                InputLogin,
                InputPassword,
                ButtonAuth,
                ButtonNoAccount,
            },
        });
    }

    protected override renderContent(): string {
        return LoginFormTemplate;
    }
}
