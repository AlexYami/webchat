import { BaseWebComponent } from "../../components/baseComponent/web";
import LoginPageTemplate from "./login.hbs?raw";

interface LoginPageProps {
    title: "";
}

export default class LoginPage extends BaseWebComponent<LoginPageProps> {
    public constructor(props: LoginPageProps) {
        super("form", props);
    }

    protected override render(): string {
        return LoginPageTemplate as string;
    }
}
