import getPluralType from "./getPluralType"
import render from "./render"

const createTranslator = (keys) => {
  const pluralType = getPluralType(keys.locale)
  return (componentName) => {
    if (!keys.hasOwnProperty(componentName)) {
      return (key) => `${componentName}.${key}`
    }
    const componentKeys = keys[componentName]
    return (key, params) => {
      let translation = componentKeys[key]
      if (translation === undefined) {
        return `${componentName}.${key}`
      }
      if(Array.isArray(translation)) {
        // plural
        if (params != null && typeof params.n === "number") {
          translation = translation[pluralType(params.n)]
        }
        else {
          return render(translation.join("\n"), params)
        }
      }
      else if (typeof translation === 'object') {
        return translation
      }
      return render(translation, params)
    }
  }
}

export default createTranslator
