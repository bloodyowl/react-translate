import "babel/polyfill"

const context = require.context("../../src", true, /__tests__\/\S+\.js$/)

context.keys().forEach(context)
