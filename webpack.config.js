const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const plugins = function () {
  return [
    new CopyPlugin({
      patterns: [
        {
          from: "public/",
          to: "./",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/index.html"],
          },
        },
        {
          from: "assets",
          to: "assets",
        },
      ],
    }),
  ];
};

const common_config = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  devServer: {
    static: "./dist",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
    ],
  },
};

const dev_config = {
  ...common_config,
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: "Webpack React Typescript Library Template",
      template: "public/index.html",
    }),
    ...plugins(),
  ],
};

const prod_config = {
  ...common_config,
  mode: "production",
  output: {
    publicPath: "./",
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: "Webpack React Typescript Library Template",
      template: "public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    ...plugins(),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    return dev_config;
  }

  if (argv.mode === "production") {
    return prod_config;
  }
};
