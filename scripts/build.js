import webpack from "webpack"
import config from "../webpack.config"

import Test from "./Test"

const test = process.argv.includes("--test")

webpack({
  ...config,
  ...test && {
    plugins: [
      ...config.plugins,
      test && new Test(),
    ],
  },
}, (err, stats) => {
  if(err) {
    throw err
  }

  if(!test) {
    console.log(stats.toString())
  }
})
