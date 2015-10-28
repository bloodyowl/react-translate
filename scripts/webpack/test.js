import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import path from "path"

import JsdomTapePlugin from "webpack-jsdom-tape-plugin"

const location = {
  protocol: "http://",
  host: "0.0.0.0",
  port: 3001,
  open: true,
}

const serverUrl = `${ location.protocol }${ location.host }:${ location.port }`

const config = {
  entry: {
    "test": "./scripts/webpack/webpack.tests.js",
  },
  output: {
    path: path.join(__dirname, "../../dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  plugins: [
    new JsdomTapePlugin({
      url: serverUrl,
      entry: ["test.js"],
    }),
  ],
  module: {
    loaders: [
      {
          test: /\.js$/,
          loader: "babel",
          exclude: /node_modules/,
          query: {
            stage: 0,
          },
        },
    ],
  },
  node: {
    fs: "empty",
  },
}

const server = new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  hot: true,
  stats: {
    colors: true,
    chunkModules: false,
    assets: true,
  },
  noInfo: true,
  historyApiFallback: true,
})

server.listen(
  location.port,
  location.host
)

export default config
