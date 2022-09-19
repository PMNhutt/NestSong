import { lazy } from 'react'
const Home = lazy(() => import('../pages/Home/Home'))
const About = lazy(() => import('../pages/About/About'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))
const Login = lazy(() => import('../pages/Auth/Login'))
const Register = lazy(() => import('../pages/Auth/Register'))

// ** public routes (no need login)
const publicRoutes = [
    { path: '/', component: Home, title: 'Yến Sào Nesty' },
    { path: '/about', component: About, title: 'Giới thiệu' },
    { path: '*', component: NotFound, title: '404 Page not found', layout: null },
    { path: '/sign-in', component: Login, title: 'Yến Sào Nesty - Đăng nhập', layout: null},
    { path: '/register', component: Register, title: 'Yến Sào Nesty - Đăng ký', layout: null}
]

// ** private routes (need login)
const privateRoutes = [
    { path: '*', component: NotFound, title: '404 Page not found', layout: null },
]

export { publicRoutes, privateRoutes }