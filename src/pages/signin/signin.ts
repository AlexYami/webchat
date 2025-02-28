import { Form, Input } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import { Button } from "../../components/button/button";
import type { PartialProps } from "../../components/partial/partial";
import { EMAIL_REGEX, LOGIN_REGEX, PASSWORD_REGEX, PHONE_REGEX } from "../../utils/validations";
import FormTemplate from "./form.hbs?raw";
import SignInPageTemplate from "./signin.hbs?raw";

const Partial: PartialProps = {
    template: FormTemplate as string,
    children: {
        InputEmail: new Input({
            label: "Почта",
            name: "email",
            placeholder: "Введите почту",
            validationRegex: EMAIL_REGEX,
            errorMessage: "Неправильный электронный адрес",
        }),
        InputLogin: new Input({
            label: "Логин",
            name: "login",
            placeholder: "Введите логин",
            validationRegex: LOGIN_REGEX,
            errorMessage: "Неправильный логин",
        }),
        InputFirstName: new Input({
            label: "Имя",
            name: "first_name",
            placeholder: "Иван",
        }),
        InputSecondName: new Input({
            label: "Фамилия",
            name: "second_name",
            placeholder: "Иванов",
        }),
        InputPhone: new Input({
            label: "Телефон",
            name: "phone",
            placeholder: "+7 (123) 456-78-90",
            validationRegex: PHONE_REGEX,
            errorMessage: "Неправильный телефон",
        }),
        InputPassword: new Input({
            label: "Пароль",
            name: "password",
            placeholder: "Введите пароль",
            type: "password",
            validationRegex: PASSWORD_REGEX,
            errorMessage: "Введите более сложный пароль",
        }),
        InputPassword2: new Input({
            label: "Пароль (еще раз)",
            name: "password2",
            placeholder: "Введите пароль (еще раз)",
            type: "password2",
            validationRegex: PASSWORD_REGEX,
            errorMessage: "Введите более сложный пароль",
        }),
        ButtonSignup: new Button({
            text: "Зарегестрироваться",
            role: "primary",
        }),
        ButtonLogin: new Button({
            text: "Войти",
            role: "link",
        }),
    },
};

export class SigninPage extends WebComponent<object> {
    public constructor() {
        super("div", {
            children: {
                Form: new Form({
                    title: "Регистрация",
                    Partial,
                }),
            },
        });
    }

    protected override render(): string {
        return SignInPageTemplate as string;
    }
}
