import "../scss/styles.scss";

import Handlebars from "handlebars";
import type { WebComponent } from "./components/baseComponent/web";
import * as Pages from "./pages";
import { renderDOM } from "./utils/dom";

const pages: Record<string, unknown> = {
    login: Pages.LoginPage,
    signin: Pages.SigninPage,
    chooseChat: Pages.ChooseChatPage,
    chat: Pages.ChatPage,
    search: Pages.SearchPage,
    addUser: Pages.AddUserPage,
    addUserModal: Pages.AddUserModalPage,
    profile: Pages.ProfilePage,
    changeProfile: Pages.ChangeProfilePage,
    changePassword: Pages.ChangePasswordPage,
    page404: Pages.Page404,
    page500: Pages.Page500,
    nav: Pages.NavigatePage,
};

function navigate(page: string): void {
    const pageInfo = pages[page];

    const ctor = pageInfo as ObjectConstructor;

    if (typeof pageInfo === "function") {
        renderDOM(new ctor({}) as WebComponent<object>);
    } else {
        const container = document.getElementById("app")!;
        const temlpatingFunction = Handlebars.compile(pageInfo);

        container.innerHTML = temlpatingFunction({});
    }
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
});
