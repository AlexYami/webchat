import { EMAIL_REGEX, LOGIN_REGEX, PASSWORD_REGEX, PHONE_REGEX } from "../src/utils/validations";

describe("Validations", () => {
    it("should validate login expr", () => {
        expect(LOGIN_REGEX.test("aa")).toBe(false);
        expect(LOGIN_REGEX.test("aaa")).toBe(true);
        expect(LOGIN_REGEX.test("123456")).toBe(false);
        expect(LOGIN_REGEX.test("user!@#")).toBe(false);
        expect(LOGIN_REGEX.test("aaaaaaaaaaaaaaaaaaaaa")).toBe(false);
        expect(LOGIN_REGEX.test("a a")).toBe(false);
        expect(LOGIN_REGEX.test("valid_-1")).toBe(true);
    });

    it("should validate password expr", () => {
        expect(PASSWORD_REGEX.test("123456A")).toBe(false);
        expect(PASSWORD_REGEX.test("1234567A")).toBe(true);
        expect(PASSWORD_REGEX.test("12345678")).toBe(false);
        expect(PASSWORD_REGEX.test("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaA")).toBe(true);
        expect(PASSWORD_REGEX.test("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAA")).toBe(false);
    });

    it("should validate email expr", () => {
        expect(EMAIL_REGEX.test("us-er_1@ex-amp_le1.com")).toBe(true);
        expect(EMAIL_REGEX.test("user@com")).toBe(false);
        expect(EMAIL_REGEX.test("user@.com")).toBe(false);
        expect(EMAIL_REGEX.test("user@domain.123")).toBe(false);
        expect(EMAIL_REGEX.test("u#s-er_1@ex-amp_le1.com")).toBe(false);
    });

    it("should validate phone expr", () => {
        expect(PHONE_REGEX.test("012345678")).toBe(false);
        expect(PHONE_REGEX.test("0123456789")).toBe(true);
        expect(PHONE_REGEX.test("+012345678")).toBe(false);
        expect(PHONE_REGEX.test("+0123456789")).toBe(true);
        expect(PHONE_REGEX.test("-123456789")).toBe(false);
        expect(PHONE_REGEX.test("111111111111111")).toBe(true);
        expect(PHONE_REGEX.test("1111111111111111")).toBe(false);
    });
});
