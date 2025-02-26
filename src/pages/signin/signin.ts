import { Form, Input } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import { Button } from "../../components/button/button";
import type { PartialProps } from "../../components/partial/partial";
import FormTemplate from "./form.hbs?raw";
import SignInPageTemplate from "./signin.hbs?raw";

const Partial: PartialProps = {
    template: FormTemplate as string,
    children: {
        InputEmail: new Input({
            label: "Почта",
            name: "email",
            placeholder: "Введите почту",
        }),
        InputLogin: new Input({
            label: "Логин",
            name: "login",
            placeholder: "Введите логин",
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
        }),
        InputPassword: new Input({
            label: "Пароль",
            name: "password",
            placeholder: "Введите пароль",
            type: "password",
            errorMessage: "Пароли не совпадают",
        }),
        InputPassword2: new Input({
            label: "Пароль (еще раз)",
            name: "password2",
            placeholder: "Введите пароль (еще раз)",
            type: "password2",
        }),
        ButtonSignup: new Button({
            text: "Зарегестрироваться",
            type: "primary",
        }),
        ButtonLogin: new Button({
            text: "Войти",
            type: "link",
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
