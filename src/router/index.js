import { lazy } from 'react'
const Home = lazy(() => import('../pages/Home/Home'))
const About = lazy(() => import('../pages/About/About'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))
const Login = lazy(() => import('../pages/Auth/Login/Login'))
const Register = lazy(() => import('../pages/Auth/Register/Register'))
const ProductList = lazy(() => import('../pages/Products/ProductList'))
const ProductDetails = lazy(() => import('../pages/ProductDetails/ProductDetails'))
const Cart = lazy(() => import('../pages/Cart/Cart'))
const Order = lazy(() => import('../pages/Order/Order'))
const Admin = lazy(() => import('../pages/Admin/Admin'))
const Profile = lazy(() => import('../pages/Profile/Profile'))

// ** public routes (no need authen)
const publicRoutes = [
    { path: '/', component: Home, title: 'Yến Sào Nesty' },
    { path: '/about', component: About, title: 'Giới thiệu' },
    { path: '*', component: NotFound, title: '404 Page not found', layout: null },
    { path: '/sign-in', component: Login, title: 'Yến Sào Nesty - Đăng nhập', layout: null },
    { path: '/register', component: Register, title: 'Yến Sào Nesty - Đăng ký', layout: null },
    { path: '/products', component: ProductList, title: 'Yến Sào Nesty - Sản phẩm' },
    { path: '/products/detail/:name', component: ProductDetails },
    { path: '/cart', component: Cart, title: 'Yến Sào Nesty - Giỏ hàng' },
]

// ** private routes (need authen + authorization)
const privateRoutes = [
    { path: '/order', component: Order, title: 'Yến Sào Nesty - Đặt hàng' },
    { path: '*', component: NotFound, title: '404 Page not found', layout: null },
    { path: '/management', component: Admin, title: 'NESTY - MANAGEMENT', layout: null },
    { path: '/profile', component: Profile, title: 'Thông tin cá nhân' },
]

export { publicRoutes, privateRoutes }