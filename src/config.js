module.exports = {
    avator () {
        let tester = /github.io/
        let path = './'

        if (window.location.href.match(tester)) {
            path = '../../dist/'
        }
        return require(path + 'assets/images/avator.jpg')
    },
    nickname: 'wangs1991',
    description: 'lorem asdfasdf',
    title: 'wangs1991日常汇总'
}