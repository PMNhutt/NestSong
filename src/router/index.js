import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import NotFound from '../pages/NotFound/NotFound'

// ** public routes (no need login)
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '*', component: NotFound }
]

// ** private routes (need login)
const privateRoutes = [
    { path: '*', component: NotFound },
]

export { publicRoutes, privateRoutes }