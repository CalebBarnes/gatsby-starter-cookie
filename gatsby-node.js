var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [new CaseSensitivePathsPlugin()],
  })
}
