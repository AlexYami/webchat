import { Button, GoBackLayout, Profile } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import { InputProfile } from "../../components/input";
import { PASSWORD_REGEX } from "../../utils/validations";
import ChangePasswordPageTemplate from "./changePassword.hbs?raw";

const profileTemplate = `
    {{{ ButtonSave }}}
`;

const InputOldPassword = new InputProfile({
    label: "Старый пароль",
    value: "",
    name: "oldPassword",
    type: "password",
    placeholder: "Введите старый пароль",
    errorMessage: "Введите более сложный пароль",
    validationRegex: PASSWORD_REGEX,
});

const InputNewPassword = new InputProfile({
    label: "Новый пароль",
    value: "",
    name: "newPassword",
    type: "password",
    placeholder: "Введите новый пароль",
    errorMessage: "Введите более сложный пароль",
    validationRegex: PASSWORD_REGEX,
});

const InputNewPassword2 = new InputProfile({
    label: "Повторите новый пароль",
    value: "",
    name: "newPassword2",
    type: "password",
    placeholder: "Повторите новый пароль",
    errorMessage: "Введите более сложный пароль",
    validationRegex: PASSWORD_REGEX,
});

const inputs: InputProfile[] = [InputOldPassword, InputNewPassword, InputNewPassword2];

export class ChangePasswordPage extends WebComponent<object> {
    public constructor() {
        super("div", {
            children: {
                GoBackLayout: new GoBackLayout({
                    Partial: {
                        template: "{{{ Profile }}}",
                        children: {
                            Profile: new Profile(
                                {
                                    Partial: {
                                        template: profileTemplate,
                                        children: {
                                            ButtonSave: new Button({ text: "Сохранить", role: "primary" }),
                                        },
                                    },
                                    image: "https://placehold.co/130x130/orange/white",
                                    title: "Иван",
                                },
                                inputs
                            ),
                        },
                    },
                }),
            },
        });
    }

    protected override render(): string {
        return ChangePasswordPageTemplate as string;
    }
}
