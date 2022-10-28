import { createSlice } from "@reduxjs/toolkit";
import instances from "../../utils/plugin/axios";

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        accountInfo: {},
        showModal: false,
    },
    reducers: {
        setAccountInfo: (state, action) => {
            state.accountInfo = action.payload
            localStorage.setItem('ACCOUNT_INFO', JSON.stringify({
                address: action.payload.address,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                agencyId: action.payload.agencyId,
                email: action.payload.email,
                accountId: action.payload.accountId,
            }))
        },
        getAccountInfo: (state, action) => {
            state.accountInfo = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))
            let currentAccInfo = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))

            if (!currentAccInfo) {
                state.accountInfo = currentAccInfo
            }
        },
        setShowModal: (state, action) => {
            state.showModal = action.payload
        }
    }
})

// export const login = (data) => async () => {
//     const dispatch = useDispatch()
//     try {
//         const res = await instances.post('/login', data)
//         // console.log(res?.data);
//         if (res?.data.status === 401) {
//             notifyError()
//         } else {
//             dispatch(setAccountInfo(res?.data))
//         }
//     } catch (err) {
//         throw new Error(err)
//     }
// }

// export const addTodoAsync = (data) => async (dispatch) => {
//     try {
//         // console.log(data);
//         const response = await axios.post(API_URL, data);
//         // console.log(response);
//         dispatch(addTodo(response.data));
//     } catch (err) {
//         throw new Error(err);
//     }
// };

export const { setAccountInfo, getAccountInfo, setShowModal } = accountSlice.actions;
export default accountSlice.reducer;