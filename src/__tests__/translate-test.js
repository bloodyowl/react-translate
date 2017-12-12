const translate = require("../translate").default
const TranslatorProvider = require("../TranslatorProvider").default
const React = require("react")
const { renderIntoDocument } = require("react-addons-test-utils")

it("translate", () => {
  expect(typeof translate).toBe("function")
  expect(typeof translate("Foo")).toBe("function")
})


it("translate passes `t` function", () => {
  const Dummy = ({ t }) => {
    expect(typeof t).toBe("function")
    expect(t("foo")).toBe("bar")
    return <div />
  }
  const WrappedDummy = translate("Dummy")(Dummy)
  renderIntoDocument(
    <TranslatorProvider
      translations={{
        locale: "en",
        "Dummy": {"foo": "bar"},
      }}
    >
      <WrappedDummy />
    </TranslatorProvider>
  )
})

it("`t` returns key if component is not specified", () => {
  const Dummy = ({ t }) => {
    expect(typeof t).toBe("function")
    expect(t("foo")).toBe("DummyError.foo")
    return <div />
  }
  const WrappedDummy = translate("DummyError")(Dummy)
  renderIntoDocument(
    <TranslatorProvider
      translations={{
        locale: "en",
        "Dummy": {"foo": "bar"},
      }}
    >
      <WrappedDummy />
    </TranslatorProvider>
  )
})

it("`t` returns key if not specified", () => {
  const Dummy = ({ t }) => {
    expect(typeof t).toBe("function")
    expect(t("foo")).toBe("Dummy.foo")
    return <div />
  }
  const WrappedDummy = translate("Dummy")(Dummy)
  renderIntoDocument(
    <TranslatorProvider
      translations={{
        locale: "en",
        "Dummy": {},
      }}
    >
      <WrappedDummy />
    </TranslatorProvider>
  )
})

it("`t` can deal with extended translations", () => {
  const Dummy = ({ t }) => {
    expect(typeof t).toBe("function")
    expect(t("foo")).toBe("parent-foo")
    expect(t("overwrite")).toBe("overwrite")
    expect(t("child-translation")).toBe("child-translation")
    return <div />
  }
  const WrappedDummy = translate([ "Dummy", "Child" ])(Dummy)
  renderIntoDocument(
    <TranslatorProvider
      translations={{
        locale: "en",
        "Dummy": {
          "foo": "parent-foo",
          "overwrite": "overwrite"
        },
        "Child": {
          "overwrite": "child",
          "child-translation": "child-translation"
        }
      }}
    >
      <WrappedDummy />
    </TranslatorProvider>
  )
})

it("Uses fall back string if key does not exist and string provided", () => {
  const Dummy = ({ t }) => {
    const fallBack = 'this is my fall back string'
    expect(t("foo", undefined, fallBack)).toBe(fallBack)
    return <div />
  }
  const WrappedDummy = translate([ "Dummy" ])(Dummy)
  renderIntoDocument(
    <TranslatorProvider
      translations={{
        locale: "en",
        "Dummy": {}
      }}
    >
      <WrappedDummy />
    </TranslatorProvider>
  )
})

it("Uses fall back string if key does not exist and string provided", () => {
  const Dummy = ({ t }) => {
    const fallBack = 'this is my fall back string'
    expect(t("foo", undefined, fallBack)).toBe(fallBack)
    return <div />
  }
  const WrappedDummy = translate([ "Dummy", "Child" ])(Dummy)
  renderIntoDocument(
    <TranslatorProvider
      translations={{
        locale: "en",
        "Dummy": {},
        "Child": {}
      }}
    >
      <WrappedDummy />
    </TranslatorProvider>
  )
})
