import { WebComponent } from "../baseComponent/component";
import { Partial, type ComponentContainerProps } from "../partial/partial";

import PopupTemplate from "./popup.hbs?raw";

interface PopupProps extends ComponentContainerProps {}

export class Popup extends WebComponent<PopupProps> {
    public constructor(props: PopupProps) {
        super("div", {
            ...props,
            children: {
                Partial: new Partial(props.Partial),
            },
        });
    }
    protected override render(): string {
        return PopupTemplate as string;
    }
}
