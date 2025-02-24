import range from "../../utils/range";
import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";
import { ContactList } from "../contactList";
import LayoutTemplate from "./layout.hbs?raw";

interface LayoutProps extends BaseProps {
    partial: string;
    searchText: string;
}

export class Layout extends WebComponent<LayoutProps> {
    public constructor(props: LayoutProps) {
        super("div", {
            ...props,
            children: {
                ...props.children,
                ContactList: new ContactList({
                    items: range(10).map((i) => {
                        return {
                            name: `Контакт #${i}`,
                            image: "https://placehold.co/47x47/orange/white",
                            preview: `Так увлёкся работой по курсу, что совсем забыл его анонсировать`,
                            lastMessageDate: "Пт",
                            notifiesNumber: i % 3,
                        };
                    }),
                }),
            },
        });
    }
    protected override render(): string {
        return (LayoutTemplate as string).replace("{{{ partial }}}", this.props.partial);
    }
}
