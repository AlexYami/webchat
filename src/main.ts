import "../scss/styles.scss";

import Handlebars, { type Template } from "handlebars";
import * as Components from "./components";
import type { BaseWebComponent } from "./components/baseComponent/web";
import { Button } from "./components/button/button";
import * as Pages from "./pages";
import { renderDOM } from "./utils/dom";
import { contacts, messages } from "./mockData";

type Component = [string, Template];

const profileBaseOpts = {
    image: "https://placehold.co/130x130/orange/white",
    name: "Иван",
};

const searchText = "Контакт #4";

const profileOpts = {
    ...profileBaseOpts,
    items: [
        { label: "Почта", value: "pochta@yandex.ru", name: "email", type: "email" },
        { label: "Логин", value: "ivanivanov", name: "login", type: "text" },
        { label: "Имя", value: "Иван", name: "first_name", type: "text" },
        { label: "Фамилия", value: "Иванов", name: "second_name", type: "text" },
        { label: "Имя в чате", value: "Иван", name: "display_name", type: "text" },
        {
            label: "Телефон",
            value: "+7(909)967-30-30",
            name: "phone",
            type: "text",
        },
    ],
};

const changePasswordOpts = {
    ...profileBaseOpts,
    items: [
        {
            label: "Старый пароль",
            value: "*********",
            name: "oldPassword",
            type: "password",
        },
        {
            label: "Новый пароль",
            value: "*********",
            name: "newPassword",
            type: "password",
        },
        {
            label: "Повторите новый пароль",
            value: "*********",
            name: "newPassword2",
            type: "password",
        },
    ],
};

const pages: Record<string, unknown[]> = {
    login: [Pages.LoginPage],
    signin: [Pages.SigninPage],
    chooseChat: [
        Pages.ChooseChatPage,
        {
            contacts,
        },
    ],
    chat: [
        Pages.ChatPage,
        {
            contacts,
            messages,
        },
    ],
    search: [
        Pages.SearchPage,
        {
            contacts: contacts.filter((c) => c.name.includes(searchText)),
            searchText,
            messages,
        },
    ],
    addUser: [
        Pages.AddUserPage,
        {
            contacts,
            messages,
            showAddUserPopup: true,
        },
    ],
    addUserModal: [
        Pages.AddUserModalPage,
        {
            contacts,
            messages,
            showAddUserModal: true,
        },
    ],
    profile: [Pages.ProfilePage, profileOpts],
    changeProfile: [Pages.ChangeProfilePage, profileOpts],
    changePassword: [Pages.ChangePasswordPage, changePasswordOpts],
    page404: [Pages.Page404],
    page500: [Pages.Page500],
    nav: [Pages.NavigatePage],
};

Object.entries(Components).forEach((component: Component) => {
    const [name, template] = component;

    Handlebars.registerPartial(name, template);
});

function navigate(page: string): void {
    // const [source, context] = pages[page];

    const pageInfo = pages[page] as [unknown, unknown];

    const [source, context] = pageInfo;

    const ctor = source as ObjectConstructor;

    if (typeof source === "function") {
        renderDOM(new ctor({}) as BaseWebComponent<object>);

        return;
    }

    const container = document.getElementById("app")!;

    const temlpatingFunction = Handlebars.compile(source);
    container.innerHTML = temlpatingFunction(context);
}

document.addEventListener("DOMContentLoaded", () => {
    navigate("nav");
});

document.addEventListener("click", (e: MouseEvent) => {
    const { target } = e;

    if (target instanceof HTMLElement) {
        const page = target.getAttribute("page");
        if (page) {
            navigate(page);

            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }

    new Button({ text: "hello" });
});
