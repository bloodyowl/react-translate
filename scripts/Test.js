import http from "http"
import jsdom from "jsdom"
import fs from "fs"
import path from "path"

export default function Test() {
  return function() {
    this.plugin("done", (stats) => {

      const server = http.createServer((req, res) => {
        fs.createReadStream(path.resolve(__dirname, "./fixtures/index.html"))
          .pipe(res)
      })

      server.listen(9000)

      const virtualConsole = jsdom.createVirtualConsole()

      virtualConsole.on("log", (message) => {
        console.log(message)
      })

      jsdom.env({
        virtualConsole,
        url: "http://localhost:9000",
        src: [stats.compilation.assets["test.js"]._cachedSource],
        done: (errors, window) => {
          if(errors) {
            console.error(errors)
          }
          server.close()
          // window.close()
        },
      })

    })
  }
}
