const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: process.env.NODE_ENV=="production"?"https://qymk-res.cmicrwx.cn/":"./",
    // publicPath: "./",
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@imgs', resolve('src/assets/imgs'))
            .set('@components', resolve('src/components'))
    },
    devServer: {
        proxy: {
            '/testApi':{
                target: 'http://testqymk.cmicrwx.cn',
                pathRewrite: {
                    "^/testApi" : "",
                },
                changeOrigin: true
            },
            '/prodApi':{
                target: 'http://qymk.cmicrwx.cn',
                pathRewrite: {
                    "^/prodApi" : "",
                },
                changeOrigin: true
            },
            '/swaggerApi': {
                target: 'http://10.3.99.99:3051/',
                pathRewrite: {
                    "^/swaggerApi" : "",
                    changeOrigin:true
                }
            },
            '/devApi': {
                target: 'http://devqymk.cmicrwx.cn',
                pathRewrite: {
                    "^/devApi" : "",
                    changeOrigin:true
                }
            }
        }
    }
}
