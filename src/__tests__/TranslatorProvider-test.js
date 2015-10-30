import TranslatorProvider from "../TranslatorProvider"
import React, { Component, PropTypes } from "react"
import { renderIntoDocument } from "react-addons-test-utils"

tape("TranslatorProvider", (test) => {
  class Dummy extends Component {
    static contextTypes = {
      locale: PropTypes.string,
      translator: PropTypes.object,
    }
    render() {
      test.equal(typeof this.context.translator, "function")
      test.equal(typeof this.context.locale, "string")
      test.end()
      return null
    }
  }
  renderIntoDocument(
    <TranslatorProvider translations={{ locale: "en" }}>
      <Dummy />
    </TranslatorProvider>
  )
})
