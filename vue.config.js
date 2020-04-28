module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                "/read": {
                    target: "http://api.zhuishushenqi.com",
                    changeOrigin: true,
                    pathRewrite: { "^/read": "" }
                },
                "/chapter": {
                    target: "http://chapterup.zhuishushenqi.com/chapter",
                    changeOrigin: true,
                    pathRewrite: { "^/chapter": "" }
                },
            }
        }
    }
}