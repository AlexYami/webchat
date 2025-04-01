import { expect } from "chai";
import { Router } from "./router";
import { ROUTES } from "./routes";
import { WebComponent } from "../components/baseComponent/web";

class TestWebComponent1 extends WebComponent<object> {
    public constructor(props: object) {
        super("Test1", props);
    }

    public render(): string {
        return `<template>hello</template>`;
    }
}

class TestWebComponent2 extends WebComponent<object> {
    public constructor(props: object) {
        super("Test2", props);
    }

    public render(): string {
        return `<template>hello</template>`;
    }
}

describe("Router", () => {
    it("should rerender component on route navigation", () => {
        const router = Router.create("body");

        router.use(ROUTES.login, TestWebComponent1 as unknown as ObjectConstructor);
        router.use(ROUTES.signup, TestWebComponent2 as unknown as ObjectConstructor);

        router.start();

        router.go(ROUTES.login);

        expect((document.body.firstChild as HTMLElement).tagName).eql("TEST1");

        router.go(ROUTES.signup);

        expect((document.body.firstChild as HTMLElement).tagName).eql("TEST2");
    });
});
