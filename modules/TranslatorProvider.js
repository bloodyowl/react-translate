import React, { Component, PropTypes } from "react"
import createTranslator from "./createTranslator"

class TranslatorProvider extends Component {

  static propTypes = {
    translations: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    translator: PropTypes.object.isRequired,
  }

  getChildContext() {
    const { translations } = this.props
    return {
      translator: createTranslator(translations),
    }
  }

  render() {
    if(typeof this.props.children !== "function") {
      throw new Error(
        "TranslatorProvider must have a single, function child"
      )
    }
    return this.props.children()
  }
}

export default TranslatorProvider
