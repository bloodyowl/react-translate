import React from 'react'
import PropTypes from 'prop-types'

export default function translate(displayName, shouldComponentUpdate, fallBackString) {
  let t
  let previousLocale = null
  return (ChildComponent) => {

     class Translator extends React.Component {

        constructor(props, context) {
          super(props, context)
          this.shouldComponentUpdate = shouldComponentUpdate
        }

        render() {
          const { translator, locale } = this.context
          if (locale !== previousLocale) {
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
