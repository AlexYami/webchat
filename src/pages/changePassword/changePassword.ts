import { Button } from "../../components";
import { InputProfile } from "../../components/input";
import { BaseProfile } from "../../components/profile/profile";
import { PASSWORD_REGEX } from "../../utils/validations";

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

export class ChangePasswordPage extends BaseProfile {
    public constructor() {
        super({
            image: "https://placehold.co/130x130/orange/white",
            title: "Иван",
            children: {
                ButtonSave: new Button({ text: "Сохранить", role: "primary" }),
                InputOldPassword,
                InputNewPassword,
                InputNewPassword2,
            },
        });
    }

    protected override renderContent(): string {
        return `{{{ ButtonSave }}}`;
    }

    protected override renderInputs(): string {
        return `
            {{{ InputOldPassword }}}
            {{{ InputNewPassword }}}
            {{{ InputNewPassword2 }}}
        `;
    }
}
