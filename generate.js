/**
 * Created by vonsh on 2019/5/22
 */
const utils = require('./utils')
const Info = require('./src/config')
const pages = utils.getJsonFiles('src/pages') // 多页面配置新数据
const libs = utils.getJsonFiles('src/libs') // 组件页面
const jsonfyPage = utils.getPagesJson(pages)

const wirteData = () => {
    /*自动生成data文件*/
    utils.writeFile('./src/data.json', (function () {

        console.log('--------------------------------------')
        console.log('/    ', '总共检索到' + jsonfyPage.length + '条文章', '     /')
        console.log('--------------------------------------')

        return JSON.stringify(jsonfyPage.filter(n => !n.isPrivate))
    })())

}

const writeReadme = () => {
    /*自动生成readme文件*/
    utils.writeFile('README.md', (function () {
        let string

        string = []
        string.push('### 目录')
        string.push('+ [首页](' + Info.host + ')')

        jsonfyPage.forEach(n => {
            if (!n.isPrivate) {
                string.push('+ [' + n.title + '](' + Info.host + n.uri + ')')
            }
        })

        console.log('--------------------------------------')
        console.log('/    ', 'readme.md目录生成成功', '     /')
        console.log('--------------------------------------')

        return string.join('\n')
    })())
}

const writeLibs = () => {
    let jsonfyPage = utils.getPagesJson(libs)
    var regExp = /(\"doc\"):(\"[0-9a-zA-Z\.\/]*\")/ig

    /*自动生成data文件*/
    utils.writeFile('./src/libs/data.js', (function () {
        let context = 'module.exports = '

        context += JSON.stringify(jsonfyPage.filter(n => {
            if (!n.doc) {
                n.doc = "../libs/help.md"
            }
            return !n.isPrivate
        }))

        console.log('--------------------------------------')
        console.log('/    ', '总共检测到组件类' + jsonfyPage.length + '个', '     /')
        console.log('--------------------------------------')

        return context.replace(regExp, '$1: require($2)')
    })())
}


module.exports = {
    exec() {
        wirteData()
        writeLibs()
        writeReadme()
    }
}