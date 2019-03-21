import React, { createContext, useMemo, useContext } from "react";
import createTranslator from "./createTranslator";

function translator(namespace) {
  return key => namespace + "." + key;
}

let Context = createContext({ translator, locale: null });

export function useTranslate(namespace) {
  let { translator, locale } = useContext(Context);
  let t = useMemo(() => translator(namespace), [namespace, locale]);
  return t;
}

export function TranslatorProvider({ translations, children }) {
  return (
    <Context.Provider
      value={{
        translator: createTranslator(translations),
        locale: translations.locale
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function translate(displayName) {
  return function(Component) {
    return function ReactTranslateLegacy(props) {
      let t = useTranslate(displayName);
      return <Component {...props} t={t} />;
    };
  };
}
