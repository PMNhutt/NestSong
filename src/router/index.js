import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import NotFound from '../pages/NotFound/NotFound'

// ** public routes (no need login)
const publicRoutes = [
    { path: '/', component: Home, title: 'Yến Sào Nesty' },
    { path: '/about', component: About, title: 'Giới thiệu' },
    { path: '*', component: NotFound, title: '404 Page not found', layout: null }
]

// ** private routes (need login)
const privateRoutes = [
    { path: '*', component: NotFound, title: '404 Page not found', layout: null },
]

export { publicRoutes, privateRoutes }