// 用于后处理 CSS，优化 CSS

// 加属性前缀
const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
        autoprefixer()
    ]
}