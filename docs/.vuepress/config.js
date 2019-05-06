module.exports = {
    title: 'LengMangTech',
    description: 'LengMangTech',
    themeConfig: {
        search: false,
        lastUpdated: '上次更新',
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Blog', link: '/blog/'},
            {text: 'About Me', link: '/me/'},
        ],
        // sidebar: 'auto'
        sidebar: {
            '/blog/': [
                'one', /* /foo/one.html */
                'two'   /* /foo/two.html */
            ],
        }
    }
};