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
            {
                text: 'Social',
                items: [
                    {text: 'Weibo', link: 'https://weibo.com/u/5401315308'},
                    {text: 'Github', link: 'https://github.com/yulong88888'}
                ]
            }
        ],
        sidebar: {
            '/me/': [
                '',
                'list'
            ],
            '/blog/': [
                'hello-spring-cloud-alibaba',
                'two'
            ]
        }
    }
};