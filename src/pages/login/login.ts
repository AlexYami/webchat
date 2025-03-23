import { BaseForm, Button, Input } from "../../components";
import type { BaseFormProps } from "../../components/form/form";
import { Router } from "../../router/router";
import { ROUTES } from "../../router/routes";
import { AuthService, ToastService } from "../../services";
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
    events: {
        click: (): void => {
            Router.get().go(ROUTES.signin);
        },
    },
});

interface BaseAuthFormProps extends BaseFormProps {
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

interface LoginFormData {
    login: string;
    password: string;
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
            onFormSubmit: ({ login, password }: LoginFormData) => {
                void AuthService.login(login, password);
            },
        });
    }

    protected override renderContent(): string {
        return LoginFormTemplate;
    }
}
