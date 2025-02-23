import { Link, Profile } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import ProfilePageTemplate from "./profile.hbs?raw";

const partial = `
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
                GoBackLayout: new Profile({
                    partial: "{{{ Profile }}}",
                    children: {
                        Profile: new Profile({
                            partial,
                            children: {
                                LinkChangeData: new Link({ text: "Изменить данные" }),
                                LinkChangePassword: new Link({ text: "Изменить пароль" }),
                                LinkLogout: new Link({ text: "Выйти", type: "danger" }),
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
