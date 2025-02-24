import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";
import GoBackLayoutTemplate from "./goBackLayout.hbs?raw";

interface GoBackLayoutProps extends BaseProps {
    partial: string;
}

export class GoBackLayout extends WebComponent<GoBackLayoutProps> {
    public constructor(props: GoBackLayoutProps = { partial: "" }) {
        super("div", props);
    }

    protected override render(): string {
        return (GoBackLayoutTemplate as string).replace("{{{ partial }}}", this.props.partial);
    }
}
