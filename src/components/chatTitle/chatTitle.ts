import type { BaseProps } from "../baseComponent/web";
import { WebComponent } from "../baseComponent/web";
import { ImageButton } from "../imageButton";
import { BasePopup } from "../popup/popup";
import ChatTitleTemplate from "./chatTitle.hbs?raw";

interface ChatTitleProps extends BaseProps {
    title: string;
    showAddUserPopup: boolean;
}

const addUserIcon = `<img src="/images/addUser.svg" alt="Добавить пользователя" />`;
const delteUserIcon = `<img src="/images/deleteUser.svg" alt="Удалить пользователя" />`;
const showAddUserPopupIcon = `<img src="/images/burgerMenu.svg" alt="Меню" />`;

// class AddUserPopup extends BasePopup {
//     public constructor() {
//         super({
//             children: {
//                 AddUser: new ImageButton({
//                     content: addUserIcon,
//                     text: "Добавить пользователя",
//                     events: {
//                         click: () => {
//                             alert("add user");
//                         },
//                     },
//                 }),
//                 DeleteUser: new ImageButton({ content: delteUserIcon, text: "Удалить пользователя" }),
//             },
//         });
//     }

//     protected override renderContent(): string {
//         return `
//             <div class="message-box__command-popup">
//                 {{{ AddUser }}}
//                 {{{ DeleteUser }}}
//             </div>`;
//     }
// }

// export class ChatTitle extends WebComponent<ChatTitleProps> {
//     public constructor(props: ChatTitleProps) {
//         super("div", {
//             ...props,
//             children: {
//                 Popup: new AddUserPopup(),
//                 ShowAddUserPopupButton: new ImageButton({
//                     content: showAddUserPopupIcon,
//                     text: "",
//                     events: {
//                         click: () => {
//                             this.setProps({
//                                 showAddUserPopup: true,
//                             });
//                         },
//                     },
//                 }),
//             },
//         });
//     }

//     protected override render(): string {
//         return ChatTitleTemplate;
//     }
// }
