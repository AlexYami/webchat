/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+.tsx?$": ["ts-jest", { useESM: true, tsconfig: "tsconfig.jest.json" }],
    },
};
