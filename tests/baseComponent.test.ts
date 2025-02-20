import type { TestProps } from "./mocks/testBaseComponents";
import { TestBaseComponent } from "./mocks/testBaseComponents";

// NOTE: need cast to any to avoid TypeScript protection:
/* eslint-disable-next-line */
const TestBaseComponentPrototype = TestBaseComponent.prototype as any;

const props: TestProps = {
    login: "login",
    email: "email",
};

describe("Base component", () => {
    beforeEach(() => {});

    it("should call to lifecycle methods", () => {
        const handleInitSpy = jest.spyOn(TestBaseComponentPrototype, "handleInit");
        const handleComponentDidMountSpy = jest.spyOn(TestBaseComponentPrototype, "handleComponentDidMount");
        const handleRenderSpy = jest.spyOn(TestBaseComponentPrototype, "handleRender");

        new TestBaseComponent("test", props);
        expect(handleInitSpy).toHaveBeenCalledTimes(1);
        expect(handleComponentDidMountSpy).toHaveBeenCalledTimes(1);
        expect(handleRenderSpy).toHaveBeenCalledTimes(1);

        handleInitSpy.mockRestore();
        handleComponentDidMountSpy.mockRestore();
        handleRenderSpy.mockRestore();
    });

    it("should call to lifecycle methods on settings set", (done) => {
        const baseComponent = new TestBaseComponent("test", props);

        const handleComponentDidUpdateSpy = jest.spyOn(TestBaseComponentPrototype, "handleComponentDidUpdate");
        const handleComponentDidMountSpy = jest.spyOn(TestBaseComponentPrototype, "handleComponentDidMount");
        const handleRenderSpy = jest.spyOn(TestBaseComponentPrototype, "handleRender");

        baseComponent.setProps({
            login: "ivan",
            email: "ivan@email.com",
        });

        setTimeout(() => {
            expect(handleComponentDidUpdateSpy).toHaveBeenCalledTimes(2);
            expect(handleComponentDidMountSpy).toHaveBeenCalledTimes(1);
            expect(handleRenderSpy).toHaveBeenCalledTimes(1);

            handleComponentDidUpdateSpy.mockRestore();
            handleComponentDidMountSpy.mockRestore();
            handleRenderSpy.mockRestore();

            done();
        });
    });
});
