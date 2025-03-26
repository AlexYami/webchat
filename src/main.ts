import "../scss/styles.scss";

import * as Pages from "./pages";
import { Router } from "./router/router";
import * as AuthService from "./services/auth";
import { Store } from "./store";

declare global {
    interface Window {
        store: Store;
    }
}

const pages: Record<string, unknown> = {
    login: Pages.LoginPage,
    signup: Pages.SignupPage,
    chat: Pages.Chat,
    settings: Pages.Settings,
    settingsEdit: Pages.SettingsEdit,
    settingsPassword: Pages.SettingsPassword,
    page404: Pages.Page404,
    page500: Pages.Page500,
};

Store.create({
    user: null,
    contacts: [],
    messages: [],
    activeChat: null,
});

const APP_ROOT = "#app";

const router = Router.create(APP_ROOT);

router
    .use("/", pages.chat as ObjectConstructor)
    .use("/login", pages.login as ObjectConstructor)
    .use("/signup", pages.signup as ObjectConstructor)
    .use("/chat", pages.chat as ObjectConstructor)
    .use("/settings", pages.settings as ObjectConstructor)
    .use("/settings/edit", pages.settingsEdit as ObjectConstructor)
    .use("/settings/password", pages.settingsPassword as ObjectConstructor)
    .use("/page404", pages.page404 as ObjectConstructor)
    .use("/page500", pages.page500 as ObjectConstructor)
    .use("*", pages.page404 as ObjectConstructor);

async function main(): Promise<void> {
    await AuthService.ensureStore();

    router.start();
}

void main();
