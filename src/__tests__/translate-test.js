import translate from "../translate"
import TranslatorProvider from "../TranslatorProvider"
import React from "react"
import { renderIntoDocument } from "react-addons-test-utils"

tape("translate", (test) => {
  test.equal(typeof translate, "function")
  test.equal(typeof translate("Foo"), "function")
  test.end()
})


tape("translate passes `t` function", (test) => {
  const Dummy = ({ t }) => {
    test.equal(typeof t, "function")
    test.deepEqual(t("foo"), ["bar"])
    test.end()
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

tape("`t` returns key if component is not specified", (test) => {
  const Dummy = ({ t }) => {
    test.equal(typeof t, "function")
    test.equal(t("foo"), "DummyError.foo")
    test.end()
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

tape("`t` returns key if not specified", (test) => {
  const Dummy = ({ t }) => {
    test.equal(typeof t, "function")
    test.equal(t("foo"), "Dummy.foo")
    test.end()
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
