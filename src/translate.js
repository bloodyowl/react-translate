import React, { Component } from "react";
import PropTypes from "prop-types";

export default function translate(displayName, shouldComponentUpdate) {
  let t;
  let previousLocale = null;
  return ChildComponent => {
    class Translator extends Component {
      constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = shouldComponentUpdate;
      }

      render() {
        const { translator, locale } = this.context;
        const { forwardedRef, ...rest } = this.props;
        if (locale !== previousLocale) {
          t = translator(displayName);
          previousLocale = locale;
        }
        return <ChildComponent ref={forwardedRef} {...rest} t={t} />;
      }
    }

    Translator.contextTypes = {
      translator: PropTypes.func.isRequired,
      locale: PropTypes.string.isRequired
    };

    return React.forwardRef ? React.forwardRef((props, ref) => {
        return <Translator {...props} forwardedRef={ref} />;
    }) : Translator;
  };
}
