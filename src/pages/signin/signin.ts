import { Input } from "../../components";
import { Button } from "../../components/button/button";
import { EMAIL_REGEX, LOGIN_REGEX, NAME_REGEX, PASSWORD_REGEX, PHONE_REGEX } from "../../utils/validations";
import { BaseAuthForm } from "../login/login";
import { default as SignInPageTemplate } from "./form.hbs?raw";

const InputEmail = new Input({
    label: "Почта",
    name: "email",
    placeholder: "Введите почту",
    validationRegex: EMAIL_REGEX,
    errorMessage: "Неправильный электронный адрес",
    value: "",
});

const InputLogin = new Input({
    label: "Логин",
    name: "login",
    placeholder: "Введите логин",
    validationRegex: LOGIN_REGEX,
    errorMessage: "Неправильный логин",
    value: "",
});

const InputFirstName = new Input({
    label: "Имя",
    name: "first_name",
    placeholder: "Иван",
    value: "",
    errorMessage: "Неправильное имя",
    validationRegex: NAME_REGEX,
});

const InputSecondName = new Input({
    label: "Фамилия",
    name: "second_name",
    placeholder: "Иванов",
    value: "",
    errorMessage: "Неправильная фамилия",
    validationRegex: NAME_REGEX,
});

const InputPhone = new Input({
    label: "Телефон",
    name: "phone",
    placeholder: "+7 (123) 456-78-90",
    validationRegex: PHONE_REGEX,
    errorMessage: "Неправильный телефон",
    value: "",
});

const InputPassword = new Input({
    label: "Пароль",
    name: "password",
    placeholder: "Введите пароль",
    type: "password",
    validationRegex: PASSWORD_REGEX,
    errorMessage: "Введите более сложный пароль",
    value: "",
});

const InputPassword2 = new Input({
    label: "Пароль (еще раз)",
    name: "password2",
    placeholder: "Введите пароль (еще раз)",
    type: "password2",
    validationRegex: PASSWORD_REGEX,
    errorMessage: "Введите более сложный пароль",
    value: "",
});

const ButtonSignup = new Button({
    text: "Зарегестрироваться",
    role: "primary",
});

const ButtonLogin = new Button({
    text: "Войти",
    role: "link",
});

const inputs = { InputEmail, InputLogin, InputFirstName, InputSecondName, InputPhone, InputPassword, InputPassword2 };

export class SigninPage extends BaseAuthForm {
    public constructor() {
        super({
            title: "Вход",
            children: {
                ...inputs,
                ButtonSignup,
                ButtonLogin,
            },
        });
    }

    protected override renderContent(): string {
        return SignInPageTemplate;
    }
}
