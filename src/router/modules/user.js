export default [
    // 个人中心
    {
        path: '/user',
        component: () => import('@/views/user/index'),
        children: [
            // 账户余额
            {
                path: 'setting',
                component: () => import('@/views/user/children/setting')
            }
        ]
    },
]