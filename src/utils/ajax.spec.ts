import { expect } from "chai";
import { HttpRequest, RequestMethod, type HttpRequestOptions } from "./ajax";

describe("HttpRequest", () => {
    it("should prepare request options", () => {
        let options = {
            method: RequestMethod.GET,
            url: "http://example.com",
            data: {
                name: "John",
                age: 99,
            },
        } as HttpRequestOptions;

        options = HttpRequest.prepareRequestOptions(options);

        expect(options).eql({
            data: null,
            headers: undefined,
            method: RequestMethod.GET,
            url: "http://example.com?name=John&age=99",
        });
    });
});
