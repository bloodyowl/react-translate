import pluralTypes from "./pluralTypes";
import pluralMap from "./pluralMap";
import invariant from "invariant";

const getPluralType = locale => {
  invariant(
    typeof locale === "string",
    "react-translate: locale must be specified"
  );
  invariant(
    pluralMap.hasOwnProperty(locale.slice(0, 2)),
    "react-translate: locale is not supported"
  );
  return pluralTypes[pluralMap[locale.slice(0, 2)]];
};

export default getPluralType;
