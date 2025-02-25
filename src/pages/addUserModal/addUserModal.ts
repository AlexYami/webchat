import { Button, Input, Layout, MessageBox, Modal } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";

interface AddUserModalPageProps extends BaseProps {}

import type { BaseProps } from "../../components/baseComponent/web";
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

// {{!-- {{#> Layout }}
//     {{> MessageBox messages=messages }}
//     {{#if showAddUserModal}}
//         {{#> Modal title="Добавить пользователя" }}
//             <div class="form__inputs">
//                 <div class="form__input-container">
//                     {{> Input label="Логин" placeholder="Введите логин" }}
//                 </div>
//                 <div class="form__buttons">
//                     {{> Button text="Добавить" type="primary" }}
//                 </div>
//             </div>
//         {{/Modal}}
//     {{/if}}
// {{/Layout}} --}}

const messages = [
    {
        text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
        date: "11:56",
    },
    {
        attachment: "https://placehold.co/316x211/orange/white",
        date: "11:57",
    },
    {
        my: true,
        read: true,
        text: "Круто!",
        date: "11:57",
    },
    {
        my: true,
        text: "Я добавлю этот блок, чтобы проверить как работает скролл в этом чате. Так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
        date: "11:59",
    },
];

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
                                partial: modalTemplate,
                                title: "Добавить пользователя",
                                children: {
                                    InputEnterLogin: new Input({
                                        label: "Логин",
                                        name: "login",
                                        placeholder: "Введите логин",
                                    }),
                                    ButtonAddUser: new Button({ text: "Добавить", type: "primary" }),
                                },
                            }),
                        },
                    },
                    showAddUserModal: true,
                    searchText: "",
                    children: {
                        MessageBox: new MessageBox({
                            messages,
                        }),
                        AddUserModal: new Modal({
                            partial: modalTemplate,
                            title: "Добавить пользователя",
                            children: {
                                InputEnterLogin: new Input({
                                    label: "Логин",
                                    name: "login",
                                    placeholder: "Введите логин",
                                }),
                                ButtonAddUser: new Button({ text: "Добавить", type: "primary" }),
                            },
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
