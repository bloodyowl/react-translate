const React = require("react");
const render = require("../render").default;

it("render", () => {
  expect(render("TEST_STRING")).toEqual("TEST_STRING");
  expect(render("TEST_STRING {{value}}", { value: "BAR" })).toEqual(
    "TEST_STRING BAR"
  );
});

it("render can render react elements", () => {
  expect(
    render("TEST_STRING {{value}}", { value: React.createElement("div") })
  ).toEqual(["TEST_STRING ", React.createElement("div", { key: "0" }), ""]);
});

it("render preserves boolean values", () => {
  expect(render("TEST_STRING {{value}}", { value: true })).toEqual([
    "TEST_STRING ",
    true,
    ""
  ]);
});

it("render preserves null values", () => {
  expect(render("TEST_STRING {{value}}", { value: null })).toEqual([
    "TEST_STRING ",
    null,
    ""
  ]);
});

it("render preserves number values", () => {
  expect(render("TEST_STRING {{value}}", { value: 1 })).toEqual(
    "TEST_STRING 1"
  );
});
