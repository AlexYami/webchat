import { Button } from "../../components";
import { WebComponent, type BaseProps } from "../../components/baseComponent/web";
import { Router } from "../../router/router";
import { ROUTES } from "../../router/routes";
import NavigatePageTemplate from "./navigate.hbs?raw";

export class NavigatePage extends WebComponent<BaseProps> {
    public constructor() {
        super("nav", {
            children: {
                LoginButton: new Button({
                    text: "Login",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.login);
                        },
                    },
                }),

                SigninButton: new Button({
                    text: "Sign In",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.signin);
                        },
                    },
                }),

                ChooseChatButton: new Button({
                    text: "Choose Chat",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.chooseChat);
                        },
                    },
                }),

                ChatButton: new Button({
                    text: "Chat",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.chat);
                        },
                    },
                }),

                SearchButton: new Button({
                    text: "Search",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.search);
                        },
                    },
                }),

                AddUserButton: new Button({
                    text: "Add User",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.addUser);
                        },
                    },
                }),

                AddUserModalButton: new Button({
                    text: "Add User Modal",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.addUserModal);
                        },
                    },
                }),

                ProfileButton: new Button({
                    text: "Profile",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.profile);
                        },
                    },
                }),

                ChangeProfileButton: new Button({
                    text: "Change Profile",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.changeProfile);
                        },
                    },
                }),

                ChangePasswordButton: new Button({
                    text: "Change Password",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.changePassword);
                        },
                    },
                }),

                Page404Button: new Button({
                    text: "Page 404",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.page404);
                        },
                    },
                }),

                Page500Button: new Button({
                    text: "Page 500",
                    events: {
                        click: (): void => {
                            Router.get().go(ROUTES.page500);
                        },
                    },
                }),
            },
        });
    }
    protected override render(): string {
        return NavigatePageTemplate;
    }
}
