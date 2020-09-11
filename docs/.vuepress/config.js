module.exports = {
    title: 'lengmang',
    description: '软件开发者-顾玉龙',
    themeConfig: {
        logo: '/img/logo.png',
        search: false,
        lastUpdated: '上次更新',
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Blog', link: '/blog/'},
            {text: 'About Me', link: '/me/'},
            {
                text: 'Social',
                items: [
                    {text: 'Github', link: 'https://github.com/yulong88888'},
                    {text: 'Bilibili', link: 'https://space.bilibili.com/10650301'},
                    {text: 'Weibo', link: 'https://weibo.com/u/5401315308'},
                ]
            },
            {
                text: 'Product',
                items: [
                    {text: 'FrogBot', link: '/frogbot/'}
                ]
            }
        ],
        sidebar: {
            '/me/': [
                '',
                'list'
            ],
            '/blog/': [],
            '/iot/': [
                ''
            ],
            '/vue/': [
                ''
            ],
            '/ai/': [
                ''
            ],
            '/jetbot/': [
                ''
            ],
            '/ros/': [
                'chapter1',
                'chapter2',
                'chapter3',
                'chapter4',
                'chapter5',
                'chapter6',
                'chapter7',
            ],
        }
    }
};