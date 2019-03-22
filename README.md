# react-translate

> Internationalization for react

## Getting started

```console
$ npm install --save react-translate
# or
$ yarn add react-trasnlate
```

## Usage

### With hooks

```javascript
import { TranslatorProvider, useTranslate } from "react-translate"

let translations = {
  locale: "en",
  Home: {
    "HELLO": "Helloworld!"
  }
};

function Home() {
  let t = useTranslate("Home");
  return <h1> {t("HELLO")} </h1>
}

function App() {
  return (
    <TranslatorProvider translations={translations}>
      <Home />
    </TranslatorProvider>
  )
}
```

### With legacy API


```javascript
import { TranslatorProvider, translate } from "react-translate"

let translations = {
  locale: "en",
  Home: {
    "HELLO": "Helloworld!"
  }
};

let Home = function({t}) {
  return <h1> {t("HELLO")} </h1>
}

Home = translate("Home")(Home);

function App() {
  return (
    <TranslatorProvider translations={translations}>
      <Home />
    </TranslatorProvider>
  )
}
```

## API

### `<TranslatorProvider translations={object} />`

Provides the translation data for descendant components.

```javascript
import { render } from "react-dom";
import { TranslatorProvider } from "react-translate";

// …

render(
  <TranslatorProvider translations={translations}>
    <App />
  </TranslatorProvider>,
  mountNode
);
```

### useTranslate(namespace)

Returns a `t` function that returns translations under `namespace`.

### translate(namespace)

Wraps a component and passes a `t` function as a prop.

#### Arguments

- `namespace` (_String_) 

#### Usage

```javascript
const Header = ({ t }) => <div> {t("TITLE")} </div>;

export default translate("Header")(Header);
```

### t(key [, params])

The `t` function is the one that returns your translations given the key, and optionally some parameters.

```javascript
// for a simple key
t("KEY"); // "value"
// for a key with a parameter
t("KEY", { foo: "bar" }); // replaces "{{foo}}" in the translation with "bar"
// for a key with a numeral parameter, which makes `t` choose between singular
// and plural
t("KEY", { n: 2 });
```

## Organizing the `translations` object

Translations should be grouped by component:

```js
const translations = {
  // the `locale` parameter is mandatory, it enables react-translate to use
  // the right rules for singular and plural
  locale: "fr",
  ComponentName: {
    SIMPLE_KEY: "Helloworld",
    KEY_WITH_PARAMS: "Hello {{name}}",
    KEY_WITH_PLURAL: ["You have {{n}} message", "You have {{n}} messages"]
  }
};
```

## How do I load translations ?

ReactTranslate does not give you a specific way to load translations, its goal is only to provide a way to pass translations down to your app components'.

You can use a simple XHR call, put translations in a `<script>` in
your HTML page, or any other way you find adequate.
