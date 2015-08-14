import tape from "tape-catch"
import React, { Component, PropTypes, addons } from "react/addons"

import TranslatorProvider from "../TranslatorProvider"

const { TestUtils } = addons

tape("TranslatorProvider", (test) => {

  class TestComponent extends Component {

    static contextTypes = {
      translator: PropTypes.object.isRequired,
    }

    render() {
      const { translator } = this.context
      test.equal(typeof translator.createComponentTranslator, "function")
      test.end()
      return <div />
    }
  }


  const rendered = TestUtils.renderIntoDocument(
    <TranslatorProvider translations={{ locale: "fr" }}>
      {() => <TestComponent />}
    </TranslatorProvider>
  )

  test.doesNotThrow(() =>
    TestUtils.findRenderedDOMComponentWithTag(rendered, "div")
  )

})
