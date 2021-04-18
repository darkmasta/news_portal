const path = require("path");
const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");

module.exports = {
  transpileDependencies: [
    /\bbootstrap-vue\b/,
    /\bvuejs-datepicker\b/,
    /\bvue-echarts\b/,
    /\bresize-detector\b/,
    /\bvue-c3\b/,
    /\bvue-masonry\b/,
    /\bvue-cropper\b/,
    /\bvuedraggable\b/,
    /\bdropzone\b/,
    /\bmarked\b/,
    /\bvue-plyr\b/,
    /\bswiper\b/,
    /\bdom7\b/,
    /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,
  ],

  configureWebpack: {
    plugins: [
      // CKEditor needs its own plugin to be built using webpack.
      new CKEditorWebpackPlugin({
        // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
        language: "en",

        // Append translations to the file matching the `app` name.
        translationsOutputFile: /app/,
      }),
    ],
  },

  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    svgRule.exclude.add(path.join(__dirname, "node_modules", "@ckeditor"));

    // Add "node_modules" alias
    config.resolve.alias.set(
      "node_modules",
      path.join(__dirname, "./node_modules")
    );

    // Disable "prefetch" plugin since it's not properly working in some browsers
    config.plugins.delete("prefetch");

    config.module
      .rule("cke-svg")
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use("raw-loader")
      .loader("raw-loader");

    config.module
      .rule("cke-css")
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use("postcss-loader")
      .loader("postcss-loader")
      .tap(() => {
        return styles.getPostCssConfig({
          themeImporter: {
            themePath: require.resolve("@ckeditor/ckeditor5-theme-lark"),
          },
          minify: true,
        });
      });

    // Do not remove whitespaces
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.whitespace = "preserve";
        return options;
      });
  },
  lintOnSave: false,
};
