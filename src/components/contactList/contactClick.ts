import { getMessages } from "../../api/messageTransport";
import { Store } from "../../store";
import type { ContactProps } from "../contact/contact";

export function onContactClick(contact: ContactProps): void {
    Store.get().set({
        activeChat: contact,
    });

    const { user } = Store.get().getState();

    getMessages(user!.id, contact.id);
}
