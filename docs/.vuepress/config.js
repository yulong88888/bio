import { defaultTheme } from '@vuepress/theme-default'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'

module.exports = {
    title: 'lengmang',
    description: '软件开发者-顾玉龙',
    theme: defaultTheme({
        logo: '/img/logo.png',
        search: false,
        contributors: false,
        lastUpdatedText: '上次更新',
        navbar: [
            { text: '主页', link: '/' },
            {
                text: '博客',
                link: '/blog',
                activeMatch: '^/blog',
                children: [
                    {
                        text: 'VPN',
                        link: '/blog/vpn',
                    },
                    {
                        text: 'ROS',
                        link: '/blog/ros',
                    },
                    {
                        text: 'WSL2',
                        link: '/blog/wsl2',
                    },
                    {
                        text: 'Jetson',
                        link: '/blog/jetson',
                    },
                    {
                        text: 'CARLA',
                        link: '/blog/carla',
                    },
                    {
                        text: 'Python',
                        link: '/blog/python',
                    },
                    {
                        text: 'Music',
                        link: '/blog/music',
                    },
                    {
                        text: 'Linux',
                        link: '/blog/linux',
                    },
                ],
            },
            { text: '关于', link: '/me' },
            {
                text: '社交',
                children: [
                    { text: 'Github', link: 'https://github.com/yulong88888' },
                    { text: 'Bilibili', link: 'https://space.bilibili.com/10650301' },
                    { text: 'Douyin', link: 'https://www.douyin.com/user/MS4wLjABAAAAL_El12aqF_JQE5RdA8vjSNMQM9s5ek2P9MDReko4Sws' },
                    { text: 'Weibo', link: 'https://weibo.com/u/5401315308' },
                ]
            }
        ]
    }),
    plugins: [
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
    ],
}