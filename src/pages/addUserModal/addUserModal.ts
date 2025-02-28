import { Button, Input, Layout, MessageBox, Modal } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";

interface AddUserModalPageProps extends BaseProps {}

import type { BaseProps } from "../../components/baseComponent/web";
import { messages } from "../../mockData";
import AddUserModalPageTemplate from "./addUserModal.hbs?raw";

const layoutTemplate = `
    {{{ MessageBox }}}
    {{#if showAddUserModal}}
        {{{ AddUserModal }}}
    {{/if}}
`;

const modalTemplate = `
    <div class="form__inputs">
        <div class="form__input-container">
            {{{ InputEnterLogin }}}
        </div>
        <div class="form__buttons">
            {{{ ButtonAddUser }}}
        </div>
    </div>
`;


export class AddUserModalPage extends WebComponent<AddUserModalPageProps> {
    public constructor() {
        super("div", {
            children: {
                Layout: new Layout({
                    Partial: {
                        template: layoutTemplate,
                        showAddUserModal: true,
                        text: "Hello, world!",
                        children: {
                            MessageBox: new MessageBox({
                                messages,
                            }),
                            AddUserModal: new Modal({
                                title: "Добавить пользователя",
                                Partial: {
                                    template: modalTemplate,
                                    children: {
                                        InputEnterLogin: new Input({
                                            label: "Логин",
                                            name: "login",
                                            placeholder: "Введите логин",
                                        }),
                                        ButtonAddUser: new Button({ text: "Добавить", role: "primary" }),
                                    },
                                },
                            }),
                        },
                    },
                    searchText: "",
                    children: {
                        MessageBox: new MessageBox({
                            messages,
                        }),
                        AddUserModal: new Modal({
                            Partial: {
                                template: modalTemplate,
                                children: {
                                    InputEnterLogin: new Input({
                                        label: "Логин",
                                        name: "login",
                                        placeholder: "Введите логин",
                                    }),
                                    ButtonAddUser: new Button({ text: "Добавить", role: "primary" }),
                                },
                            },
                            title: "Добавить пользователя",
                        }),
                    },
                }),
            },
        });
    }

    protected override render(): string {
        return AddUserModalPageTemplate as string;
    }
}
