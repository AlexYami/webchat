import range from "../../utils/range";
import { WebComponent } from "../baseComponent/component";
import { ContactList } from "../contactList";
import { SearchBox } from "../messageBox/sendMessage";
import { Partial, type ComponentContainerProps } from "../partial/partial";
import LayoutTemplate from "./layout.hbs?raw";

interface LayoutProps extends ComponentContainerProps {
    searchText: string;
}

const messages = range(10).map((i) => {
    return {
        name: `Контакт #${i}`,
        image: "https://placehold.co/47x47/orange/white",
        preview: `Так увлёкся работой по курсу, что совсем забыл его анонсировать`,
        lastMessageDate: "Пт",
        notifiesNumber: i % 3,
    };
});

const ContactListComponent = new ContactList({
    items: messages,
});

export class Layout extends WebComponent<LayoutProps> {
    public constructor(props: LayoutProps) {
        super("div", {
            ...props,
            children: {
                ...props.children,
                SearchBox: new SearchBox({}),
                ContactList: ContactListComponent,
                //     items: range(10)
                //         .map((i) => {
                //             return {
                //                 name: `Контакт #${i}`,
                //                 image: "https://placehold.co/47x47/orange/white",
                //                 preview: `Так увлёкся работой по курсу, что совсем забыл его анонсировать`,
                //                 lastMessageDate: "Пт",
                //                 notifiesNumber: i % 3,
                //             };
                //         })
                //         .filter((i) => i.name.includes(props.searchText)),
                // }),
                Partial: new Partial(props.Partial),
            },
        });
    }
    protected override render(): string {
        return LayoutTemplate as string;
    }
}
