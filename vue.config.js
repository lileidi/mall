// 此文件是跟webpack的合并
module.exports = {
    configureWebpack:{
        resolve:{
            // 定义路径别名
            alias:{
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
            }
        }
    }
}