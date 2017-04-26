const translate = require("../translate").default
const TranslatorProvider = require("../TranslatorProvider").default
const React = require("react")
const renderIntoDocument = require("react-dom/lib/ReactTestUtils").renderIntoDocument

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

it("`t` returns dictionary if value of key in translations is a dictionary", () => {
  const Dummy = ({ t }) => {
    expect(typeof t).toBe("function")
    expect(t("foo")["bar"]).toBe("baz")
    return <div />
  }
  const WrappedDummy = translate("Dummy")(Dummy)
  renderIntoDocument(
    <TranslatorProvider
      translations={{
        locale: "en",
        "Dummy": {"foo": {"bar":"baz"}},
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
