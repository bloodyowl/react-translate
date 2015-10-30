import getPluralType from "../getPluralType"

tape("getPluralType", (test) => {
  test.equal(typeof getPluralType("fr"), "function")
  test.equal(getPluralType("fr")(0), 0)
  test.equal(getPluralType("fr")(1), 0)
  test.equal(getPluralType("fr")(2), 1)
  test.equal(getPluralType("en")(0), 1)
  test.equal(getPluralType("en")(1), 0)
  test.equal(getPluralType("en")(2), 1)
  test.end()
})

tape("getPluralType throws if locale is undefined", (test) => {
  test.throws(() => {
    getPluralType()
  })
  test.end()
})

tape("getPluralType throws if locale is unrecognized", (test) => {
  test.throws(() => {
    getPluralType("??")
  })
  test.end()
})
