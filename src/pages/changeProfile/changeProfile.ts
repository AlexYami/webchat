import { Button, GoBackLayout, Profile } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import ProfilePageTemplate from "./changeProfile.hbs?raw";

const profileTemplate = `
    {{{ ButtonSave }}}
`;

export class ChangeProfilePage extends WebComponent<object> {
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
        return ProfilePageTemplate as string;
    }
}
