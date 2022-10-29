import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

// 解决报错信息：NavigationDuplicated: Avoided redundant navigation to current location
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const routes = [
    // {
    //   path: '/',
    //   redirect: {
    //     name: 'home'
    //   }
    // },
    {
        path: '/',
        name: 'HomeIndex',
        redirect: '/panorama',
        component: () =>
            import ( /* webpackChunkName: "HomeIndex" */ '@/views/Home/layout.vue'),
        children: [{
                path: 'drag',
                name: 'Drag',
                component: () =>
                    import (
                        /* webpackChunkName: "Drag" */
                        '@/views/functionItem/Drag.vue'
                    ),
                meta: {
                    title: '登录页面！'
                }
            },
            {
                path: 'scroll',
                name: 'Scroll',
                component: () =>
                    import (
                        /* webpackChunkName: "Scroll" */
                        '@/views/functionItem/scrollTable.vue'
                    )
            },
            {
                path: 'grape',
                name: 'Grape',
                component: () =>
                    import (
                        /* webpackChunkName: "Grape" */
                        '@/views/functionItem/Grape.vue'
                    )
            },
            {
                path: 'form',
                name: 'Form',
                component: () =>
                    import ( /* webpackChunkName: "Form" */ '@/views/functionItem/Form.vue')
            },
            {
                path: 'twoEn',
                name: 'TwoEn',
                component: () =>
                    import (
                        /* webpackChunkName: "Dialog" */
                        '@/views/functionItem/SecondaryEncapsulation.vue'
                    )
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () =>
                    import ( /* webpackChunkName: "Tree" */ '@/views/functionItem/Tree.vue')
            },
            {
                path: 'collapse',
                name: 'Collapse',
                component: () =>
                    import (
                        /* webpackChunkName: "Collapse" */
                        '@/views/functionItem/Collapse.vue'
                    )
            },
            {
                path: 'sign',
                name: 'Ensign',
                component: () =>
                    import (
                        /* webpackChunkName: "Ensign" */
                        '@/views/functionItem/Sign.vue'
                    )
            },
            {
                path: 'seal',
                name: 'EnSeal',
                component: () =>
                    import (
                        /* webpackChunkName: "EnSeal" */
                        '@/views/functionItem/E-Seal.vue'
                    )
            },
            {
                path: 'lineFeed',
                name: 'LineFeed',
                component: () =>
                    import (
                        /* webpackChunkName: "LineFeed" */
                        '@/views/functionItem/LineFeed.vue'
                    )
            },
            {
                path: 'toggle',
                name: 'Toggle',
                component: () =>
                    import (
                        /* webpackChunkName: "Toggle" */
                        '@/views/functionItem/toggle.vue'
                    )
            },
            {
                path: 'tabs',
                name: 'Tabs',
                component: () =>
                    import ( /* webpackChunkName: "Tabs" */ '@/views/functionItem/tabs.vue')
            },
            {
                path: 'clone',
                name: 'Clone',
                component: () =>
                    import (
                        /* webpackChunkName: "Clone" */
                        '@/views/functionItem/dragClone.vue'
                    )
            },
            {
                path: 'panorama',
                name: 'Panorama',
                component: () =>
                    import (
                        /* webpackChunkName: "Panorama" */
                        '../views/functionItem/360Panorama.vue'
                    ),
                meta: {
                    title: '登录页面！'
                }
            },
            {
                path: 'video',
                name: 'video',
                component: () =>
                    import (
                        /* webpackChunkName: "Panorama" */
                        '../views/functionItem/vedio.vue'
                    ),
                meta: {
                    title: '登录页面！'
                }
            },
            {
                path: 'test',
                name: 'Test',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '@/views/Test.vue')
            }
        ]
    },
    {
        path: '/dragEcharts',
        name: 'dragEcharts',
        component: () =>
            import (
                /* webpackChunkName: "about" */
                '../views/functionItem/dragEcharts.vue'
            )
    },
    {
        path: '/low',
        name: 'LowCode',
        component: () =>
            import ( /* webpackChunkName: "LowCode" */ '@/views/LowCode/index.vue'),
        meta: {
            title: '低代码'
        }
    },
    {
        path: '/echartsLow',
        name: 'EchartsLow',
        component: () =>
            import ( /* webpackChunkName: "LowCode" */ '@/views/echarts/index.vue'),
        meta: {
            title: '低代码'
        }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    to.meta.title && (document.title = to.meta.title)
    next()
})

export default router