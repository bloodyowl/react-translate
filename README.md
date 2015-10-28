# react-translate

> react utilities for simple i18n

[![Build Status](https://travis-ci.org/bloodyowl/react-translate.svg?branch=master)](https://travis-ci.org/bloodyowl/react-translate)

## install

```console
$ npm install --save react-translate
```

## import

```javascript
// at the top of your app
import { TranslatorProvider } from "react-translator"
// when you require a translator
import { translate } from "react-translator"
```

## api

### TranslatorProvider

`TranslatorProvider` is a component to put at the top of your app. It provides
the context for the higher-order component introduced by the `translate`
decorators.

```javascript
React.render(
  <TranslatorProvider translations={object}>
    {() => <App />} {/* react 0.13- */}
    <App /> {/* react 0.14+ */}
  </TranslatorProvider>,
  mountNode
)
```

### @translate(displayName[, shouldComponentUpdate]) class

`@translate` is a decorator that wraps a given class in a higher-order
component. This component passes a `t` function as props, which returns
translations for a given key.

```javascript
@translate("Header")
class Header extends Component {
  render() {
    const { t } = this.props
    return (
      <div>
        {t("TITLE")}
      </div>
    )
  }
}
```

### string t(key [, params])

Returns a translation.

```javascript
t("KEY") // "value"
t("KEY", { foo: "bar" }) // replaces "{{foo}}" in the translation with "bar"
t("KEY", { n: 2 }) // special case, replaces "{{n}}" and gets the adequate
                   // translation, singular or plural
```

## how to organise the translations

Translations should be grouped by component:

```js
const translations = {
  locale: "fr", // you must define the locale parameter
  ComponentName: {
    SIMPLE_KEY: "Helloworld",
    KEY_WITH_PARAMS: "Hello {{name}}",
    KEY_WITH_PLURAL: [
      "You have {{n}} message",
      "You have {{n}} messages",
    ],
  },
}
```

## example

You can check the [example repository](https://github.com/bloodyowl/react-translate-example)
