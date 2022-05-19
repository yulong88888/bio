module.exports = {
    title: 'lengmang',
    description: '软件开发者-顾玉龙',
    themeConfig: {
        logo: '/img/logo.png',
        search: false,
        lastUpdated: '上次更新',
        nav: [
            {text: '主页', link: '/'},
            {text: '博客', link: '/blog/'},
            {text: '关于', link: '/me/'},
            {
                text: '社交',
                items: [
                    {text: 'Github', link: 'https://github.com/yulong88888'},
                    {text: 'Bilibili', link: 'https://space.bilibili.com/10650301'},
                    {text: 'Weibo', link: 'https://weibo.com/u/5401315308'},
                ]
            },
            {
                text: '产品',
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
                'chapter1',
                'chapter2',
                'chapter3',
                'chapter4',
            ],
            '/ros/': [
                'chapter1',
                'chapter2',
                'chapter3',
                'chapter4',
                'chapter5',
                'chapter6',
                'chapter7',
                'chapter8',
                'chapter9',
                'chapter10',
                'chapter11',
                'chapter12',
            ],
            '/ros2/': [
                'chapter1',
                'chapter2'
            ],
            '/wsl2/': [
                'chapter1',
                'chapter2',
                'chapter3'
            ],
        }
    }
};
