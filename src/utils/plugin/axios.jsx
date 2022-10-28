import axios from 'axios';
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';

const Message = () => {
    return (
        <>
            <p>Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại để tiếp tục !</p>
            <div
                onClick={() => window.location = '/sign-in'}
                className='cursor-pointer bg-red-500 text-white font-medium text-center rounded mt-3'>Đăng nhập lại</div>
        </>
    )
}

const notify = () => toast.error(<Message />, {
    position: "top-center",
    pauseOnHover: false,
    autoClose: 4000,
});

//base url to make requests to the database
const instances = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})


instances.interceptors.request.use(
    config => {
        // ** Get token from localStorage
        const accessToken = localStorage.getItem('accessToken')

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
            // localStorage.setItem('EXPIRED_TOKEN', false)
            // ** eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    error => Promise.reject(error)
)

instances.interceptors.request.use(
    (config) => {
        // const navigate = useNavigate()
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            let currenDate = new Date()
            const decodedToken = jwt_decode(accessToken)

            if (decodedToken.exp * 1000 < currenDate.getTime()) {
                notify()
                localStorage.removeItem('accessToken')
                localStorage.setItem('ACCOUNT_INFO', JSON.stringify({}))
                // localStorage.setItem('EXPIRED_TOKEN', true)
                // return <Navigate replace to="/sign-in" />
            }
        }
        return config
    },
    error => Promise.reject(error)
)

// // ** Add request/response interceptor
// instances.interceptors.response.use(
//     response => response,
//     async error => {
//         try {
//             if (error.response) {
//                 // Request made and server responded
//                 const { config, response } = error
//                 const originalRequest = config
//                 if (response && response.status === 401) {
//                     if (!isAlreadyFetchingAccessToken) {
//                         isAlreadyFetchingAccessToken = true
//                         const response = await instances.post('/auth/user/refresh-token', { refreshToken: localStorage.getItem('refreshToken') })
//                         if (response && response.status === 200 && response?.data?.token) {
//                             // ** Update accessToken in localStorage
//                             localStorage.setItem('accessToken', response?.data?.token)
//                             return new Promise(resolve => {
//                                 originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
//                                 resolve(instances(originalRequest))
//                             })
//                         } else {
//                             // ** Remove user, accessToken & refreshToken from localStorage
//                             localStorage.removeItem('userData')
//                             localStorage.removeItem(config.storageTokenKeyName)
//                             localStorage.removeItem(config.storageRefreshTokenKeyName)
//                             // window.location.href = 'login'
//                         }
//                     } else {
//                         return Promise.reject(error)
//                     }
//                 } else {
//                     return Promise.reject(error)
//                 }
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 console.log(error.request)
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.log('Error', error.message)
//             }
//         } catch (e) {
//             console.log(e)
//         }
//     }
// )

export default instances;