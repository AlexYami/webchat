import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";
import { Link } from "../link";
import ErrorPageBaseTemplate from "./error.hbs?raw";

interface ErrorPageBaseProps extends BaseProps {
    title: string;
    text: string;
}

export class ErrorPageBase extends WebComponent<ErrorPageBaseProps> {
    public constructor(props: ErrorPageBaseProps) {
        super("div", {
            ...props,
            children: {
                LinkBackToChats: new Link({ text: "Назад к чатам" }),
            },
        });
    }
    protected override render(): string {
        return ErrorPageBaseTemplate as string;
    }
}
