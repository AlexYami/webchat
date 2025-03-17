import { HttpRequest } from "../../utils/ajax";
import type { CreateUser, LoginRequestData } from "./types";

const baseUrl = "https://ya-praktikum.tech/api/v2/auth";

function getEndpointUrl(targetUrl: string): string {
    return `${baseUrl}${targetUrl}`;
}

const signUpUrl = getEndpointUrl("/signup");
const signInUrl = getEndpointUrl("/signin");
const userUrl = getEndpointUrl("/user");
const logoutUrl = getEndpointUrl("/logout");

export default class AuthApi {
    public async create(data: CreateUser): Promise<string> {
        // return authApi.post<SignUpResponse>("/signup", { data });
        // HttpRequest.post();

        return HttpRequest.post(signUpUrl, { ...data });
    }

    public async login(data: LoginRequestData): Promise<string> {
        // return authApi.post("/signin", { data });
        return HttpRequest.post(signInUrl, { ...data });
    }

    public async me(): Promise<string> {
        return HttpRequest.get(userUrl);
    }

    public async logout(): Promise<string> {
        return HttpRequest.post(logoutUrl, {});
    }
}

export const __AuthAPI = new AuthApi();
