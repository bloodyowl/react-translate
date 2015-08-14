const CHINESE = "chinese"
const GERMAN = "german"
const FRENCH = "french"
const RUSSIAN = "russian"
const CZECH = "czech"
const POLISH = "polish"
const ICELANDIC = "icelandic"

const pluralMap = {
  id: CHINESE,
  ja: CHINESE,
  ko: CHINESE,
  ms: CHINESE,
  th: CHINESE,
  tr: CHINESE,
  zh: CHINESE,

  da: GERMAN,
  de: GERMAN,
  en: GERMAN,
  es: GERMAN,
  fi: GERMAN,
  el: GERMAN,
  he: GERMAN,
  hu: GERMAN,
  it: GERMAN,
  nl: GERMAN,
  no: GERMAN,
  pt: GERMAN,
  sv: GERMAN,

  fr: FRENCH,
  tl: FRENCH,

  hr: RUSSIAN,
  ru: RUSSIAN,

  cs: CZECH,

  pl: POLISH,

  is: ICELANDIC,
}

class Translator {

  static pluralTypes = {
    chinese(n) {
      return 0
    },
    german(n) {
      return n !== 1 ? 1 : 0
    },
    french(n) {
      return n > 1 ? 1 : 0
    },
    russian(n) {
      return n % 10 === 1 && n % 100 !== 11 ?
        0 :
          n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ?
            1 :
              2
    },
    czech(n) {
      return (n === 1) ? 0 : (n >= 2 && n <= 4) ? 1 : 2
    },
    polish(n) {
      return (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 &&
        (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)
    },
    icelandic(n) {
      return (n % 10 !== 1 || n % 100 === 11) ? 1 : 0
    },
  }

  constructor(keys) {
    if(!keys.hasOwnProperty("locale") || typeof keys.locale !== "string") {
      throw new TypeError("missing locale parameter")
    }
    this.keys = keys
    this.pluralType =
      Translator.pluralTypes[pluralMap[keys.locale.slice(0, 2)]]
    if(typeof this.pluralType !== "function") {
      throw new TypeError("unsupported language")
    }
  }
  // abbr for `translate`
  createComponentTranslator(componentName) {
    if (!this.keys.hasOwnProperty(componentName)) {
      return (key, params) => {
        return `${componentName}.${key}`
      }
    }

    const keys = this.keys[componentName]
    return (key, params) => {
      var value = keys[key]
      if (value === undefined) {
        return `${componentName}.${key}`
      }
      if(params === undefined) {
        return value
      }

      const replace = string => string.replace(
        /\{{2}(\w+)\}{2}/g,
        (whole, $1) => {
          return params[$1]
        }
      )

      if(Array.isArray(value)) {
        if (params.n !== undefined) {
          value = value[this.pluralType(params.n)]
        }
        else {
          return value.map(v => replace(v))
        }
      }

      return replace(value)
    }
  }
}

export default (keys) => new Translator(keys)

