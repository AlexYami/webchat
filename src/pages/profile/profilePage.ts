import { Button, GoBackLayout, Profile } from "../../components";
import { WebComponent } from "../../components/baseComponent/component";
import { InputProfile } from "../../components/input";
import { EMAIL_REGEX, LOGIN_REGEX, PHONE_REGEX } from "../../utils/validations";
import ProfilePageTemplate from "./profile.hbs?raw";

// const profileTemplate = `
//     <div class="profile__buttons">
//         <div class="profile__layout-item">
//             <div class="profile__layout-item-key">
//                 {{{ ButtonChangeData }}}
//             </div>
//         </div>
//         <div class="profile__layout-item">
//             <div class="profile__layout-item-key">
//                 {{{ ButtonChangePassword }}}
//             </div>
//         </div>
//         <div class="profile__layout-item">
//             <div class="profile__layout-item-key">
//                 {{{ ButtonLogout }}}
//             </div>
//         </div>
//     </div>
// `;

const profileTemplate = `
    <div class="profile__buttons">
                {{{ ButtonChangeData }}}
                {{{ ButtonChangePassword }}}
                {{{ ButtonLogout }}}
    </div>    
`;

debugger;

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

const inputs = [InputEmail, InputLogin, InputName, InputSecondName, InputDisplayName, InputPhone];

// const items: InputProps[] = [
//     {
//         label: "Почта",
//         value: "pochta@yandex.ru",
//         name: "email",
//         type: "email",
//         placeholder: "Введите электронный адрес",
//     },
//     { label: "Логин", value: "ivanivanov", name: "login", type: "text", placeholder: "Введите логин" },
//     { label: "Имя", value: "Иван", name: "first_name", type: "text", placeholder: "Введите имя" },
//     { label: "Фамилия", value: "Иванов", name: "second_name", type: "text", placeholder: "Введите фамилию" },
//     {
//         label: "Имя в чате",
//         value: "Иван",
//         name: "display_name",
//         type: "text",
//         placeholder: "Введите Имя в чате",
//     },
//     {
//         label: "Телефон",
//         value: "+7(909)967-30-30",
//         name: "phone",
//         type: "text",
//         placeholder: "Введите телефон",
//     },
// ];

// export class ProfilePage extends WebComponent<object> {
//     public constructor() {
//         super("div", {
//             children: {
//                 GoBackLayout: new GoBackLayout({
//                     Partial: {
//                         template: "{{{ Profile }}}",
//                         children: {
//                             Profile: new Profile(
//                                 {
//                                     Partial: {
//                                         template: profileTemplate,
//                                         children: {
//                                             // InputEmail,
//                                             // InputLogin,
//                                             // InputName,
//                                             // InputSecondName,
//                                             // InputDisplayName,
//                                             // InputPhone,
//                                             ButtonChangeData: new Button({ text: "Изменить данные" }),
//                                             ButtonChangePassword: new Button({ text: "Изменить пароль" }),
//                                             ButtonLogout: new Button({ text: "Выйти", role: "danger" }),
//                                         },
//                                     },
//                                     children: {
//                                         // InputEmail,
//                                         // InputLogin,
//                                         // InputName,
//                                         // InputSecondName,
//                                         // InputDisplayName,
//                                         // InputPhone,
//                                     },
//                                     image: "https://placehold.co/130x130/orange/white",
//                                     title: "Kekeke",
//                                 },
//                                 inputs
//                             ),
//                         },
//                     },
//                 }),
//             },
//         });
//     }

//     protected override render(): string {
//         return ProfilePageTemplate as string;
//     }
// }

export class ProfilePage extends WebComponent<object> {
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
                                            // InputEmail,
                                            // InputLogin,
                                            // InputName,
                                            // InputSecondName,
                                            // InputDisplayName,
                                            // InputPhone,
                                            ButtonChangeData: new Button({ text: "Изменить данные" }),
                                            ButtonChangePassword: new Button({ text: "Изменить пароль" }),
                                            ButtonLogout: new Button({ text: "Выйти", role: "danger" }),
                                        },
                                    },
                                    children: {
                                        // InputEmail,
                                        // InputLogin,
                                        // InputName,
                                        // InputSecondName,
                                        // InputDisplayName,
                                        // InputPhone,
                                    },
                                    image: "https://placehold.co/130x130/orange/white",
                                    title: "Kekeke",
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
        return ProfilePageTemplate as string;
    }
}
