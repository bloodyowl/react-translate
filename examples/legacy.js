import { TranslatorProvider, translate } from "react-translate";

let translations = {
  locale: "en",
  Home: {
    HELLO: "Helloworld!"
  }
};

let Home = function({ t }) {
  return <h1> {t("HELLO")} </h1>;
};

Home = translate("Home")(Home);

export function App() {
  return (
    <TranslatorProvider translations={translations}>
      <Home />
    </TranslatorProvider>
  );
}
