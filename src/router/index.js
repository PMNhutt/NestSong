import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import NotFound from '../pages/NotFound/NotFound'

// ** public routes (no need login)
const publicRoutes = [
    { path: '/', component: Home, title: 'Nesty' },
    { path: '/about', component: About, title: 'Giới thiệu' },
    { path: '*', component: NotFound, title: '404 Page not found' }
]

// ** private routes (need login)
const privateRoutes = [
    { path: '*', component: NotFound, title: '404 Page not found' },
]

export { publicRoutes, privateRoutes }