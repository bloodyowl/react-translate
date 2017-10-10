import React, { Component, Children } from 'react'
import createTranslator from './createTranslator'
import PropTypes from 'prop-types'

class TranslatorProvider extends React.Component {

  getChildContext() {
    const { translations } = this.props
    return {
      translator: createTranslator(translations),
      locale: translations.locale,
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}


TranslatorProvider.propTypes = {
  translations: PropTypes.object.isRequired,
}

TranslatorProvider.childContextTypes = {
  translator: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
}


export default TranslatorProvider
