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
  ...!test && {
    externals : [
      {
        "react" : {
          root : "React",
          commonjs2 : "react",
          commonjs : "react",
          amd : "react",
        },
      },
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
