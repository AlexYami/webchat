import "../scss/styles.scss";
import { __AuthAPI } from "./api/auth/auth";
import { __ChatAPI } from "./api/auth/chat";

import * as Pages from "./pages";
import { Router } from "./router/router";
import { ROUTES } from "./router/routes";
import { Store } from "./store";

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

window.store = new Store({
    isLoading: false,
    user: null,
    loginError: null,
    contacts: [],
    messages: [],
});

const APP_ROOT = "#app";

const router = Router.create(APP_ROOT);

router
    .use("/login", pages.login as ObjectConstructor)
    .use("/signin", pages.signin as ObjectConstructor)
    .use("/chooseChat", pages.chooseChat as ObjectConstructor)
    .use("/chat", pages.chat as ObjectConstructor)
    .use("/search", pages.search as ObjectConstructor)
    .use("/addUser", pages.addUser as ObjectConstructor)
    .use("/addUserModal", pages.addUserModal as ObjectConstructor)
    .use("/profile", pages.profile as ObjectConstructor)
    .use("/changeProfile", pages.changeProfile as ObjectConstructor)
    .use("/changePassword", pages.changePassword as ObjectConstructor)
    .use("/page404", pages.page404 as ObjectConstructor)
    .use("/page500", pages.page500 as ObjectConstructor)
    .use("*", pages.nav as ObjectConstructor)
    .start();

async function main() {
    try {
        const userInfo = await __AuthAPI.me();

        window.store.set({
            user: JSON.parse(userInfo),
        });

        const chats = await __ChatAPI.getChats();

        window.store.set({
            contacts: chats.map((item) => {
                return {
                    id: item.id,
                    name: item.title,
                    image: item.avatar,
                    notifiesNumber: item.unread_count,
                    lastMessageDate: item.last_message,
                    preview: item.last_message,
                };
            }),
        });

        router.go(ROUTES.chat);
    } catch (err: Error) {
        debugger;

        if (err.code === 401) {
            router.go(ROUTES.login);
        } else

        router.go(ROUTES.page500);
    }
}

void main();

// function navigate(page: string): void {
//     const pageInfo = pages[page];

//     const ctor = pageInfo as ObjectConstructor;

//     if (typeof pageInfo === "function") {
//         renderDOM(new ctor({}) as WebComponent<object>);
//     } else {
//         const container = document.getElementById("app")!;
//         const temlpatingFunction = Handlebars.compile(pageInfo);

//         container.innerHTML = temlpatingFunction({});
//     }
// }

// document.addEventListener("DOMContentLoaded", () => {
//     navigate("nav");
// });

// document.addEventListener("click", (e: MouseEvent) => {
//     const { target } = e;

//     if (target instanceof HTMLElement) {
//         const page = target.getAttribute("page");
//         if (page) {
//             navigate(page);

//             e.preventDefault();
//             e.stopImmediatePropagation();
//         }
//     }
// });
