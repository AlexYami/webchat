import { BaseAuthForm } from "../../pages/login/login";
import { ChatService } from "../../services";
import { LOGIN_REGEX } from "../../utils/validations";
import type { BaseProps } from "../baseComponent/web";
import { WebComponent } from "../baseComponent/web";
import { Button } from "../button";
import { Input } from "../input";

// const InputLogin = new Input({
//     label: "Логин",
//     name: "login",
//     placeholder: "Введите логин",
//     errorMessage: "Неверный логин",
//     validationRegex: LOGIN_REGEX,
//     value: "",
// });

// const ButtonAddUser = new Button({
//     text: "Добавить",
//     role: "primary",
// });

interface SearchUserFormData {
    login: string;
}

export class AddUserForm extends BaseAuthForm {
    public constructor(props) {
        super({
            ...props,
            title: "Добавить пользователя",
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
            onFormSubmit: async ({ login }: SearchUserFormData) => {
                ChatService.addUserToChat(login, this.props.chatId).then(() => {
                    this.props.onUserAdd();
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
}

export class DeleteUserForm extends BaseAuthForm {
    public constructor(props) {
        debugger;

        super({
            ...props,
            title: "Удалить пользователя",
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
            onFormSubmit: async ({ login }: SearchUserFormData) => {
                ChatService.deleteUserFromChat(login, this.props.chatId).then(() => {
                    this.props.onUserDelete();
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
            {{{ ButtonDeleteUser }}}
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
                    <div class="modal__content">
                        ${this.renderContent()}
                    </div>
                </template>`;
    }

    protected abstract renderContent(): string;
}

export class AddUserModalForm extends BaseModal {
    public constructor(props) {
        super({
            children: {
                AddUserForm: new AddUserForm(props),
            },
        });
    }

    override setProps(props: Partial<ModalProps | null>): void {
        super.setProps(props);

        this.props.children?.AddUserForm.setProps({ chatId: props?.chatId });
    }

    protected override renderContent(): string {
        return `{{{ AddUserForm }}}`;
    }
}

export class DeleteUserModalForm extends BaseModal {
    public constructor(props) {
        super({
            children: {
                DeleteUserForm: new DeleteUserForm(props),
            },
        });
    }

    override setProps(props: Partial<ModalProps | null>): void {
        super.setProps(props);

        this.props.children?.DeleteUserForm.setProps({ chatId: props?.chatId });
    }

    protected override renderContent(): string {
        // debugger;

        return `{{{ DeleteUserForm }}}`;
    }
}
