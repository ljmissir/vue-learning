const resolve = dir => require('path').join(__dirname, dir);

module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        config.module.rule('svg')
            .exclude.add(resolve('src/icons'))

        config.module.rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons')).end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({symbolId: 'icon-[name]'})
    }
}