const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var commonConfig = {
  output: {
    path: path.resolve(__dirname + "/dist/")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        loader: "style!less!css"
      }
    ]
  },
  externals: {
    lodash: "lodash",
    vuetify: "vuetify"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  }
};

module.exports = [
  // Config 1: For browser environment
  merge(commonConfig, {
    entry: path.resolve(__dirname + "/src/plugin.js"),
    output: {
      filename: "v-tree-data-table.min.js",
      libraryTarget: "window",
      library: "VueClock"
    }
  }),

  // Config 2: For Node-based development environments
  merge(commonConfig, {
    entry: path.resolve(__dirname + "/src/v-tree-data-table.vue"),
    output: {
      filename: "v-tree-data-table.js",
      libraryTarget: "umd",

      // These options are useful if the user wants to load the module with AMD
      library: "v-tree-data-table",
      umdNamedDefine: true
    }
  })
];
