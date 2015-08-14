import React, { Component, PropTypes } from "react"

export default function translate(displayName) {
  return (ChildComponent) => {
    return class Translator extends Component {

      static contextTypes = {
        translator: PropTypes.object.isRequired,
      }

      render() {
        const t = this.context.translator
          .createComponentTranslator(displayName)
        return (
          <ChildComponent {...this.props} t={t} />
        )
      }
    }
  }
}

