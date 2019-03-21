const getPluralType = require("../getPluralType").default;

it("getPluralType", () => {
  expect(typeof getPluralType("fr")).toBe("function");
  expect(getPluralType("fr")(0)).toBe(0);
  expect(getPluralType("fr")(1)).toBe(0);
  expect(getPluralType("fr")(2)).toBe(1);
  expect(getPluralType("en")(0)).toBe(1);
  expect(getPluralType("en")(1)).toBe(0);
  expect(getPluralType("en")(2)).toBe(1);
  expect(getPluralType("et")(0)).toBe(1);
  expect(getPluralType("et")(1)).toBe(0);
  expect(getPluralType("et")(2)).toBe(1);
});

it("getPluralType throws if locale is undefined", () => {
  expect(() => {
    getPluralType();
  }).toThrow();
});

it("getPluralType throws if locale is unrecognized", () => {
  expect(() => {
    getPluralType("??");
  }).toThrow();
});
