export default [
    //------------------------- common pages------------------------------
    {
        path: '/home',
        name: 'home',
        component: () => import('@views/home/index'),
        meta: {
            guest: true,
        },
    },

    {
        path: '/',
        redirect: '/home',
    }, {
        path: '/*',
        redirect: '/home',
    },
];
