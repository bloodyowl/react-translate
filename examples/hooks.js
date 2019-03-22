import { TranslatorProvider, useTranslate } from "react-translate";

let translations = {
  locale: "en",
  Home: {
    HELLO: "Helloworld!"
  }
};

function Home() {
  let t = useTranslate("Home");
  return <h1> {t("HELLO")} </h1>;
}

export function App() {
  return (
    <TranslatorProvider translations={translations}>
      <Home />
    </TranslatorProvider>
  );
}
