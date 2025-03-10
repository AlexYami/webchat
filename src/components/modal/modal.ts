import { BaseAuthForm } from "../../pages/login/login";
import { LOGIN_REGEX } from "../../utils/validations";
import type { BaseProps } from "../baseComponent/web";
import { WebComponent } from "../baseComponent/web";
import { Button } from "../button";
import { Input } from "../input";

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

interface ModalProps extends BaseProps {}

export abstract class BaseModal extends WebComponent<ModalProps> {
    public constructor(props: ModalProps) {
        super("div", {
            ...props,
            children: {
                ...props.children,
            },
        });
    }
    protected override render(): string {
        return `<template class="modal">
                    <div class="modal__bg"></div>
                    ${this.renderContent()}
                </template>`;
    }

    protected abstract renderContent(): string;
}

export class AddUserModalForm extends BaseModal {
    public constructor() {
        super({
            children: {
                AddUserForm: new AddUserForm(),
            },
        });
    }

    protected override renderContent(): string {
        return `{{{ AddUserForm }}}`;
    }
}
