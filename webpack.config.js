import webpack from "webpack"
import path from "path"

import { version as __VERSION__ } from "./package"

export default {
  colors: true,
  progress: true,

  entry: {
    index: [
      "./modules/index",
    ],
    test: [
      "./test",
    ],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    library: "react-translate",
    libraryTarget: "umd",
    filename: "[name].js",
  },

  resolve: {
    extensions: [
      "",
      ".js",
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: `"${ __VERSION__ }"`
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          "babel?stage=0",
        ],
        exclude: /node_modules/,
      },
    ],
  },

  node: {
    "fs": "empty",
  },
}
