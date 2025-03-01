import "./link.scss";

import { BaseWebComponent, type BaseProps } from "../baseComponent/web";
import LinkTemplate from "./link.hbs?raw";

interface LinkProps extends BaseProps {
    text: string;
    type?: string;
}

export class Link extends BaseWebComponent<LinkProps> {
    public constructor(props: LinkProps) {
        super("a", props);
    }

    protected override render(): string {
        return LinkTemplate;
    }
}
