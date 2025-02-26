import { GoBackLayout, Link, Profile } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import ProfilePageTemplate from "./profile.hbs?raw";

const profileTemplate = `
    <div class="profile__layout-item">
        <div class="profile__layout-item-key">
            {{{ LinkChangeData }}}
        </div>
    </div>
    <div class="profile__layout-item">
        <div class="profile__layout-item-key">
            {{{ LinkChangePassword }}}
        </div>
    </div>
    <div class="profile__layout-item">
        <div class="profile__layout-item-key">
            {{{ LinkLogout }}}
        </div>
    </div>
`;

export class ProfilePage extends WebComponent<object> {
    public constructor() {
        super("div", {
            children: {
                GoBackLayout: new GoBackLayout({
                    Partial: {
                        template: "{{{ Profile }}}",
                        children: {
                            Profile: new Profile({
                                Partial: {
                                    template: profileTemplate,
                                    children: {
                                        LinkChangeData: new Link({ text: "Изменить данные" }),
                                        LinkChangePassword: new Link({ text: "Изменить пароль" }),
                                        LinkLogout: new Link({ text: "Выйти", type: "danger" }),
                                    },
                                },
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
                            }),
                        },
                    },
                }),
            },
        });
    }

    protected override render(): string {
        return ProfilePageTemplate as string;
    }
}
