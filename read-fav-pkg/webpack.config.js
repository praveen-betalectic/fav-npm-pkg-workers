const {
  WranglerJsCompatWebpackPlugin,
} = require("wranglerjs-compat-webpack-plugin");

module.exports = {
  target: "webworker",
  entry: "./src/index.js",
  mode: "production",
  externals: [{ "cross-fetch": "fetch" }],
  plugins: [new WranglerJsCompatWebpackPlugin()],
};

//  Set 'mode' option to 'development' or 'production
