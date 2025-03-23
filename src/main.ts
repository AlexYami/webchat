import "../scss/styles.scss";
import { __AuthAPI } from "./api/auth/auth";

import * as Pages from "./pages";
import { Router } from "./router/router";
import * as AuthService from "./services/auth";
import { Store } from "./store";

const pages: Record<string, unknown> = {
    login: Pages.LoginPage,
    signup: Pages.SignupPage,
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

window.__AuthAPI = __AuthAPI;

const APP_ROOT = "#app";

const router = Router.create(APP_ROOT);

router
    .use("/", pages.chat as ObjectConstructor)
    .use("/login", pages.login as ObjectConstructor)
    .use("/signup", pages.signup as ObjectConstructor)
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
    .use("*", pages.page404 as ObjectConstructor);
// .start();

async function main() {
    await AuthService.ensureStore();

    router.start();
    // router.go(window.location.pathname as ROUTES);
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
