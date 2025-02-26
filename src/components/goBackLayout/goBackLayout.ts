import { WebComponent } from "../baseComponent/component";
import { Partial, type ComponentContainerProps } from "../partial/partial";
import GoBackLayoutTemplate from "./goBackLayout.hbs?raw";

interface GoBackLayoutProps extends ComponentContainerProps {}

export class GoBackLayout extends WebComponent<GoBackLayoutProps> {
    public constructor(props: GoBackLayoutProps) {
        super("div", {
            ...props,
            children: {
                ...props.children,
                Partial: new Partial(props.Partial),
            },
        });
    }

    protected override render(): string {
        return GoBackLayoutTemplate as string;
    }
}
