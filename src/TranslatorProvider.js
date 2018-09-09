import React, { Children, Component } from "react"
import PropTypes from 'prop-types'
import createTranslator from "./createTranslator"

class TranslatorProvider extends Component {
  getChildContext() {
    const { translations } = this.props;
    return {
      translator: createTranslator(translations),
      locale: translations.locale
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

TranslatorProvider.propTypes = {
  translations: PropTypes.object.isRequired
};

TranslatorProvider.childContextTypes = {
  translator: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
};

export default TranslatorProvider;
