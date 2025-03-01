import { Button } from "../../components";
import { InputProfile } from "../../components/input";
import { BaseProfile } from "../../components/profile/profile";
import { EMAIL_REGEX, LOGIN_REGEX, PHONE_REGEX } from "../../utils/validations";

const InputEmail = new InputProfile({
    label: "Почта",
    name: "email",
    type: "email",
    value: "pochta@yandex.ru",
    placeholder: "Введите почту",
    errorMessage: "Неправильный адрес электронной почты",
    validationRegex: EMAIL_REGEX,
});

const InputLogin = new InputProfile({
    label: "Логин",
    value: "ivanivanov",
    name: "login",
    type: "text",
    placeholder: "Введите логин",
    validationRegex: LOGIN_REGEX,
});

const InputName = new InputProfile({
    label: "Имя",
    value: "Иван",
    name: "first_name",
    type: "text",
    placeholder: "Введите имя",
});

const InputSecondName = new InputProfile({
    label: "Фамилия",
    value: "Иванов",
    name: "second_name",
    type: "text",
    placeholder: "Введите фамилию",
});

const InputDisplayName = new InputProfile({
    label: "Имя в чате",
    value: "Иван",
    name: "display_name",
    type: "text",
    placeholder: "Введите имя в чате",
});

const InputPhone = new InputProfile({
    label: "Телефон",
    value: "+7(909)967-30-30",
    name: "phone",
    type: "text",
    placeholder: "Введите телефон",
    validationRegex: PHONE_REGEX,
    errorMessage: "Неправильный телефон",
});

export class ProfilePage extends BaseProfile {
    public constructor() {
        super({
            title: "Вадим",
            image: "https://placehold.co/130x130/orange/white",
            children: {
                ButtonChangeData: new Button({ text: "Изменить данные" }),
                ButtonChangePassword: new Button({ text: "Изменить пароль" }),
                ButtonLogout: new Button({ text: "Выйти", role: "danger" }),
                InputEmail,
                InputLogin,
                InputName,
                InputSecondName,
                InputDisplayName,
                InputPhone,
            },
        });
    }

    protected override renderContent(): string {
        return `
            <div class="profile__buttons">
                {{{ ButtonChangeData }}}
                {{{ ButtonChangePassword }}}
                {{{ ButtonLogout }}}
            </div>
        `;
    }

    protected override renderInputs(): string {
        return `
            {{{ InputEmail }}}
            {{{ InputLogin }}}
            {{{ InputName }}}
            {{{ InputSecondName }}}
            {{{ InputDisplayName }}}
            {{{ InputPhone }}}
        `;
    }
}
