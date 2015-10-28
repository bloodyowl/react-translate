import React, { Component, PropTypes } from "react"

export default function translate(displayName, shouldComponentUpdate) {
  let t
  let previousLocale = null
  return (ChildComponent) => {
    return class Translator extends Component {

      static contextTypes = {
        translator: PropTypes.object.isRequired,
      }

      shouldComponentUpdate = shouldComponentUpdate

      render() {
        const { translator } = this.context
        if(translator.keys.locale !== previousLocale) {
          t = this.context.translator.createComponentTranslator(displayName)
          previousLocale = translator.keys.locale
        }
        return (
          <ChildComponent {...this.props} t={t} />
        )
      }
    }
  }
}
