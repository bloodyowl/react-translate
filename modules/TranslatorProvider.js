import React, { Component, PropTypes, Children } from "react"
import createTranslator from "./createTranslator"

function isUsingOwnerContext() {
  const { version } = React
  if (typeof version !== "string") {
    return true
  }

  const sections = version.split(".")
  const major = parseInt(sections[0], 10)
  const minor = parseInt(sections[1], 10)

  return major === 0 && minor === 13
}

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
    if(isUsingOwnerContext()) {
      return Children.only(this.props.children)
    }
    return this.props.children()
  }
}

export default TranslatorProvider
