import { __ChatAPI } from "../../api/auth/chat";
import { __UserAPI } from "../../api/auth/user";
import { BaseAuthForm } from "../../pages/login/login";
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

export class AddUserForm extends BaseAuthForm {
    public constructor(props) {
        debugger;

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
                    events: {
                        click: props.onUserAdd,
                    },
                }),
            },
            onFormSubmit: async () => {
                // alert("kekekeke");
                console.log(this);

                debugger;

                const user = await __UserAPI.searchUser(this.getValues().login);

                __ChatAPI
                    .addUsersToChat(this.props.chatId, [JSON.parse(user)[0].id])
                    .then((res) => {
                        debugger;
                        this.setProps({
                            showAddUserModalForm: false,
                            showAddUserPopup: false,
                        });
                    })
                    .catch((res) => {
                        debugger;

                        this.setProps({
                            showAddUserModalForm: false,
                            showAddUserPopup: false,
                        });
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
        // debugger;

        return `{{{ AddUserForm }}}`;
    }
}
