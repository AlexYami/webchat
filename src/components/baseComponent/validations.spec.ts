import { expect } from "chai";
import { EMAIL_REGEX, LOGIN_REGEX, NAME_REGEX, PASSWORD_REGEX, PHONE_REGEX } from "../../utils/validations";

describe("Validations", () => {
    it("should validate login expr", () => {
        expect(LOGIN_REGEX.test("aa")).eql(false);
        expect(LOGIN_REGEX.test("aaa")).eql(true);
        expect(LOGIN_REGEX.test("123456")).eql(false);
        expect(LOGIN_REGEX.test("user!@#")).eql(false);
        expect(LOGIN_REGEX.test("aaaaaaaaaaaaaaaaaaaaa")).eql(false);
        expect(LOGIN_REGEX.test("a a")).eql(false);
        expect(LOGIN_REGEX.test("valid_-1")).eql(true);
    });

    it("should validate password expr", () => {
        expect(PASSWORD_REGEX.test("123456A")).eql(false);
        expect(PASSWORD_REGEX.test("1234567A")).eql(true);
        expect(PASSWORD_REGEX.test("12345678")).eql(false);
        expect(PASSWORD_REGEX.test("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaA")).eql(true);
        expect(PASSWORD_REGEX.test("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAA")).eql(false);
    });

    it("should validate email expr", () => {
        expect(EMAIL_REGEX.test("us-er_1@ex-amp_le1.com")).eql(true);
        expect(EMAIL_REGEX.test("user@com")).eql(false);
        expect(EMAIL_REGEX.test("user@.com")).eql(false);
        expect(EMAIL_REGEX.test("user@domain.123")).eql(false);
        expect(EMAIL_REGEX.test("u#s-er_1@ex-amp_le1.com")).eql(false);
    });

    it("should validate phone expr", () => {
        expect(PHONE_REGEX.test("012345678")).eql(false);
        expect(PHONE_REGEX.test("0123456789")).eql(true);
        expect(PHONE_REGEX.test("+012345678")).eql(false);
        expect(PHONE_REGEX.test("+0123456789")).eql(true);
        expect(PHONE_REGEX.test("-123456789")).eql(false);
        expect(PHONE_REGEX.test("111111111111111")).eql(true);
        expect(PHONE_REGEX.test("1111111111111111")).eql(false);
    });

    it("should validate name expr", () => {
        expect(NAME_REGEX.test("A")).eql(true);
        expect(NAME_REGEX.test("a")).eql(false);
        expect(NAME_REGEX.test("AaAa-")).eql(true);
        expect(NAME_REGEX.test("A#")).eql(false);
        expect(NAME_REGEX.test("Ёё")).eql(true);
        expect(NAME_REGEX.test("ёё")).eql(false);
    });
});
