module.exports = {
    transpileDependencies: true,
    lintOnSave: false,
    // server: {
    //   port: 8080,
    //   proxy: {
    //     '/api': {
    //       target: 'http://localhost:6060',
    //       changeOrigin: true,
    //       pathRewrite: {
    //         '^/api': ''
    //       }
    //       // rewrite: path => path.replace(new RegExp("^/api"), "")
    //     }
    //   },
    // },
    devServer: {
        // proxy: {
        //   '/api': {
        //     target: 'http://localhost:6060',
        //     changeOrigin: true,
        //     pathRewrite: {
        //       '^/api': ''
        //     }
        //     // rewrite: path => path.replace(new RegExp("^/api"), "")
        //   },
        // },
        client: {
            //当出现编译错误或警告时，在浏览器中是否显示全屏覆盖。  示例为只显示错误信息
            overlay: {
                runtimeErrors: false,
            },

        },
    },
}
