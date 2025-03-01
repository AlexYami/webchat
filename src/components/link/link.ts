import "./link.scss";

import { WebComponent, type BaseProps } from "../baseComponent/web";
import LinkTemplate from "./link.hbs?raw";

interface LinkProps extends BaseProps {
    text: string;
    type?: string;
}

export class Link extends WebComponent<LinkProps> {
    public constructor(props: LinkProps) {
        super("a", props);
    }

    protected override render(): string {
        return LinkTemplate;
    }
}
