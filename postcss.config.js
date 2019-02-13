module.exports = {
    parser: 'postcss-scss',
    plugins: [
        require('postcss-import'),
        require('precss'),
        require('autoprefixer')({
            browsers: ['last 5 versions']
        })
    ]
}