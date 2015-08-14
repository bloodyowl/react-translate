import React, { Component, PropTypes } from "react"
import createTranslator from "./createTranslator"

class TranslatorProvider extends Component {

  static propTypes = {
    translations: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    translator: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  }

  getChildContext() {
    const { translations } = this.props
    return {
      translator: createTranslator(translations),
      locale: translations.locale,
    }
  }

  render() {
    return this.props.children()
  }
}

export default TranslatorProvider
