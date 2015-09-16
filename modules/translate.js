import React, { Component, PropTypes } from "react"

export default function translate(displayName) {
  let t
  return (ChildComponent) => {
    return class Translator extends Component {

      static contextTypes = {
        translator: PropTypes.object.isRequired,
      }

      render() {
        t = t || this.context.translator.createComponentTranslator(displayName)
        return (
          <ChildComponent {...this.props} t={t} />
        )
      }
    }
  }
}
