import React, { Component, PropTypes } from "react"

export default function translate(displayName, shouldComponentUpdate) {
  let t
  let previousLocale = null
  return (ChildComponent) => {

     class Translator extends Component {

        constructor(props, context) {
          super(props, context)
          this.shouldComponentUpdate = shouldComponentUpdate
        }

        render() {
          const { translator, locale } = this.context
          if(locale !== previousLocale) {
            t = translator(displayName)
            previousLocale = locale
          }
          return (
            <ChildComponent {...this.props} t={t} />
          )
        }
      }

      Translator.contextTypes = {
        translator: PropTypes.func.isRequired,
        locale: PropTypes.string.isRequired,
      }

      return Translator
  }
}
