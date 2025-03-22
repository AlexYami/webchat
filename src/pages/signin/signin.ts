import AuthApi, { __AuthAPI } from "../../api/auth/auth";
import { Input } from "../../components";
import { Button } from "../../components/button/button";
import { Router } from "../../router/router";
import { ROUTES } from "../../router/routes";
import { EMAIL_REGEX, LOGIN_REGEX, NAME_REGEX, PASSWORD_REGEX, PHONE_REGEX } from "../../utils/validations";
import { BaseAuthForm } from "../login/login";
import { default as SignInPageTemplate } from "./form.hbs?raw";

const authApi = new AuthApi();

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
    type: "password",
    validationRegex: PASSWORD_REGEX,
    errorMessage: "Введите более сложный пароль",
    value: "",
});

const ButtonSignup = new Button({
    text: "Зарегестрироваться",
    role: "primary",
    events: {
        click: (e: Event): void => {
            // debugger;
            // const data = {
            //     first_name: InputFirstName.getValue(),
            //     second_name: InputSecondName.getValue(),
            //     login: InputLogin.getValue(),
            //     email: InputEmail.getValue(),
            //     password: InputPassword.getValue(),
            //     phone: InputPhone.getValue(),
            // };
            // debugger;
            // const data = {
            //     first_name: "Alexisss" + Date.now(),
            //     second_name: "Bareolids" + Date.now(),
            //     login: "Al" + Date.now(),
            //     email: `Al${Date.now()}@gmail.com`,
            //     password: "aabcAAVC@!" + Date.now(),
            //     phone: "123456789",
            // };
            // email: "Al1742038344302@gmail.com";
            // first_name: "Alexisss1742038344302";
            // login: "Al1742038344302";
            // password: "aabcAAVC@!1742038344302";
            // phone: "123456789";
            // second_name: "Bareolids1742038344302";
            // e.preventDefault();
            // authApi
            //     .create(data)
            //     .then(async (res) => {
            //         return authApi.login(data);
            //     })
            //     .then(() => {
            //         Router.get().go(ROUTES.chat);
            //     })
            //     .catch((err) => {
            //         // debugger;
            //     });
        },
    },
});

const ButtonLogin = new Button({
    text: "Войти",
    role: "link",
    type: "submit",
    events: {
        click: () => {
            Router.get().go(ROUTES.login);
        },
    },
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
            onFormSubmit: () => {
                const formData = this.getValues();

                __AuthAPI
                    .create(formData)
                    .then((res) => {
                        Router.get().go(ROUTES.chat);
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            },
        });
    }

    protected override renderContent(): string {
        return SignInPageTemplate;
    }
}
