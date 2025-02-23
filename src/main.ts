import "../scss/styles.scss";

import Handlebars, { type Template } from "handlebars";
import * as Components from "./components";
import { Button } from "./components/button/button";
import * as Pages from "./pages";
import range from "./utils/range";
import { renderDOM } from "./utils/dom";

type Component = [string, Template];

const contacts = range(10).map((i) => {
    return {
        name: `Контакт #${i}`,
        preview: `Так увлёкся работой по курсу, что совсем забыл его анонсировать`,
        lastMessageDate: "Пт",
        notifiesNumber: i % 3,
    };
});

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
    const [source, context] = pages[page];

    if (typeof source === "function") {
        renderDOM(new source({}));

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
