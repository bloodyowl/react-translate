const TranslatorProvider = require("../TranslatorProvider").default
const React = require("react")
const { renderIntoDocument } = require("react-addons-test-utils")
const PropTypes = require('prop-types')

it("TranslatorProvider", () => {
  class Dummy extends React.Component {
    render() {
      expect(typeof this.context.translator).toBe("function")
      expect(typeof this.context.locale).toBe("string")
      return null
    }
  }

  Dummy.contextTypes = {
    locale: PropTypes.string,
    translator: PropTypes.func,
  }

  renderIntoDocument(
    <TranslatorProvider translations={{ locale: "en" }}>
      <Dummy />
    </TranslatorProvider>
  )
})
