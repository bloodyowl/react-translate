import render from "./render";
import getPluralType from "./getPluralType";

const createTranslator = keys => {
  const pluralType = getPluralType(keys.locale);
  return componentName => {
    if (!keys.hasOwnProperty(componentName)) {
      return key => `${componentName}.${key}`;
    }
    const componentKeys = keys[componentName];
    return (key, params) => {
      let translation = componentKeys[key];
      if (translation === undefined) {
        return `${componentName}.${key}`;
      }
      const translationObjType = typeof translation;
      if ("string" !== translationObjType && "number" !== translationObjType && "boolean" !== translationObjType) {
        // Dictionary of values
        return translation
      }
      else if(Array.isArray(translation)) {
        // plural
        if (params != null && typeof params.n === "number") {
          translation = translation[pluralType(params.n)];
        } else {
          return render(translation.join("\n"), params);
        }
      }
      return render(translation, params);
    };
  };
};

export default createTranslator;
