const fs = require('fs')
const join = require('path').join

module.exports = {
    getJsonFiles(jsonPath) {
        let jsonFiles = []

        function findJsonFile(path) {
            let files = fs.readdirSync(path);
            files.forEach(function (item, index) {
                let fPath = join(path, item)
                let stat = fs.statSync(fPath)
                if (stat.isDirectory() === true) {
                    findJsonFile(fPath)
                }
                if (stat.isFile() === true) {
                    jsonFiles.push(fPath)
                }
            })
        }

        findJsonFile(jsonPath)
        return jsonFiles
    },
    getFileContent(path) {
        var data = fs.readFileSync(path, 'utf-8')

        return JSON.parse(data)
    },
    writeFile(path, content) {
        fs.writeFile(path, content, function(err) {
            if (err) {
                throw err;
            }
        });
    },
    getPagesJson (pages) {
        let content = []
        let path
        let tmp
        let prevFolder
        let curFolder

        pages.forEach(n => {
            path = n.split('\\')
            path.pop()
            curFolder = path[path.length - 1]
            path = path.join('\\')

            if (path.indexOf('index') < 0 && curFolder !== prevFolder) {
                prevFolder = curFolder
                tmp = this.getFileContent(path + '\\config.json')
                tmp && content.push(tmp)
            }
        })
        return content
    }
}