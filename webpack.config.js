const path = require("path");

module.exports = {
  entry: path.join(__dirname, "src", "content", "index.js"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "content_bundle.js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};
