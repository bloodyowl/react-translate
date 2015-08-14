import tape from "tape-catch"
import React, { Component, addons } from "react/addons"

const { TestUtils } = addons

import TranslatorProvider from "../TranslatorProvider"
import translate from "../translate"

tape("translate", (test) => {
  const hoc = translate("Foo")
  test.equal(typeof hoc, "function")

  class TestComponent extends Component {
    render() {
      const { t } = this.props
      test.equal(typeof t, "function")
      test.equal(t("FOO"), "bar")
      test.end()
      return null
    }
  }

  const instance = hoc(TestComponent)
  TestUtils.renderIntoDocument(
    <TranslatorProvider translations={{locale: "fr", Foo: {FOO:"bar"}}}>
      {() => React.createElement(instance)}
    </TranslatorProvider>
  )
})
