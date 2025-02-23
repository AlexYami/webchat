import { WebComponent } from "../baseComponent/component";
import type { BaseProps } from "../baseComponent/web";

import ProfileTemplate from "./profile.hbs?raw";

interface ProfileProps extends BaseProps {
    partial: string;
}

export class Profile extends WebComponent<ProfileProps> {
    public constructor(props: ProfileProps = { partial: "" }) {
        super("div", props);
    }

    protected override render(): string {
        return (ProfileTemplate as string).replace("{{{ partial }}}", this.props.partial);
    }
}
