import { Input } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import type { BaseWebComponent } from "../../components/baseComponent/web";
import { Button } from "../../components/button/button";
import LoginPageTemplate from "./login.hbs?raw";

// {{#> Form title="Вход" }}
// <div class="form__inputs">
//     <div class="form__input-container">
//         {{> Input label="Логин" name="login" placeholder="Введите логин" errorMessage="Неверный логин" }}
//     </div>
//     <div class="form__input-container">
//         {{> Input label="Пароль" name="password" placeholder="Введите пароль" type="password" }}
//     </div>
// </div>
// <div class="form__buttons">
//     {{> Button text="Авторизоваться" type="primary" }}
//     {{> Button text="Нет аккаунта?" type="link" }}
// </div>
// {{/Form}}

// interface LoginPageProps {
//     InputLogin: Input;
//     InputPassword: Input;
//     ButtonAuth: Button;
//     ButtonNoAccount: Button;
// }

export class LoginPage extends WebComponent<object> {
    public constructor() {
        super("div", {
            children: {
                InputLogin: new Input({
                    label: "Логин",
                    name: "login",
                    placeholder: "Введите логин",
                    errorMessage: "Неверный логин",
                }),
                InputPassword: new Input({
                    label: "Пароль",
                    name: "password",
                    placeholder: "Введите пароль",
                    type: "password",
                }),
                ButtonAuth: new Button({
                    text: "Авторизоваться",
                    type: "primary",
                }),
                ButtonNoAccount: new Button({
                    text: "Нет Аккаунта?",
                    type: "link",
                }),
            },
        });
    }

    protected override getChildComponents(): Record<string, BaseWebComponent<object>> {
        return {
            InputLogin: new Input({
                label: "Логин",
                name: "login",
                placeholder: "Введите логин",
                errorMessage: "Неверный логин",
            }),
            InputPassword: new Input({
                label: "Пароль",
                name: "password",
                placeholder: "Введите пароль",
                type: "password",
            }),
            ButtonAuth: new Button({
                text: "Авторизоваться",
                type: "primary",
            }),
            ButtonNoAccount: new Button({
                text: "Нет Аккаунта?",
                type: "link",
            }),
        };
    }

    protected override render(): string {
        return LoginPageTemplate as string;
    }
}
