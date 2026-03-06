module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();
    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader")
      .options({
        svgo: {
          plugins: [{ prefixIds: true }],
        },
      })
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]",
      });
  },
  devServer: {
    proxy: [
      "timetech",
      "maximumhardware",
      "elnekhely",
      "highendstore",
      "elbadrgroup",
      "computrade",
      "rameg",
      "alfrensia",
      "deltacomputer",
      "titanseg",
      "uptodate",
      "sigmacomputer",
      "arabhardware",
      "elnourtech",
      "tagme3ty",
    ].reduce((proxy, store) => {
      proxy[`/api-proxy/${store}`] = {
        target: `https://pcp.${store}.workers.dev`,
        changeOrigin: true,
        secure: false, // In case of certificate issues during scraping
        pathRewrite: { [`^/api-proxy/${store}`]: "" },
      };
      return proxy;
    }, {}),
  },
};
