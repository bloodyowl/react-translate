import React from "react"
import render from "../render"

tape("render", (test) => {
  test.deepEqual(
    render("TEST_STRING"),
    ["TEST_STRING"]
  )
  test.deepEqual(
    render("TEST_STRING {{value}}", { value: "BAR" }),
    ["TEST_STRING ", "BAR" ,""]
  )
  test.end()
})

tape("render can render react elements", (test) => {
  test.deepEqual(
    render("TEST_STRING {{value}}", { value: React.createElement("div") }),
    ["TEST_STRING ", React.createElement("div", { key: "0" }) ,""]
  )
  test.end()
})

tape("render preserves boolean values", (test) => {
  test.deepEqual(
    render("TEST_STRING {{value}}", { value: true }),
    ["TEST_STRING ", true,""]
  )
  test.end()
})

tape("render preserves null values", (test) => {
  test.deepEqual(
    render("TEST_STRING {{value}}", { value: null }),
    ["TEST_STRING ", null,""]
  )
  test.end()
})

tape("render preserves number values", (test) => {
  test.deepEqual(
    render("TEST_STRING {{value}}", { value: 1 }),
    ["TEST_STRING ", 1,""]
  )
  test.end()
})
