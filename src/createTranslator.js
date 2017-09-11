import render from "./render"
import getPluralType from "./getPluralType"

const createTranslator = (keys) => {
  const pluralType = getPluralType(keys.locale)
  return (componentName) => {

    const componentNames = (false === Array.isArray(componentName))
      ? [ componentName ]
      : componentName

    if ((1 === componentNames.length) &&
      (false === keys.hasOwnProperty(componentNames[0]))
    ) {
      return (key) => `${componentNames[0]}.${key}`
    }

    const componentKeys = componentNames.reverse().reduce((translations, name) => {
      return Object.assign(translations, keys[name])
    }, {})
    return (key, params) => {
      let translation = componentKeys[key]
      if (translation === undefined) {
        return `${componentNames[0]}.${key}`
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
      return render(translation, params)
    }
  }
}

export default createTranslator
