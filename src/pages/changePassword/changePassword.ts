import { Button, GoBackLayout, Profile } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import ChangePasswordPageTemplate from "./changePassword.hbs?raw";

const profileTemplate = `
    {{{ ButtonSave }}}
`;

export class ChangePasswordPage extends WebComponent<object> {
    public constructor() {
        super("div", {
            children: {
                GoBackLayout: new GoBackLayout({
                    partial: "{{{ Profile }}}",
                    children: {
                        Profile: new Profile({
                            partial: profileTemplate,
                            image: "https://placehold.co/130x130/orange/white",
                            name: "Иван",
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
                            children: {
                                ButtonSave: new Button({ text: "Сохранить", type: "primary" }),
                            },
                        }),
                    },
                }),
            },
        });
    }

    protected override render(): string {
        return ChangePasswordPageTemplate as string;
    }
}
