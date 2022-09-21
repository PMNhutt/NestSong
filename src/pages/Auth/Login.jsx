import { useEffect, useState } from 'react'
import { Button } from '../../share/components'

// ** images
import { authImage1, authImage2, about2 } from '../../assets/images'
import { nestLogo } from '../../assets'

// ** Third party components
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

const Login = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title])

    //** States */
    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const inputStyle = { WebkitBoxShadow: "0 0 0 1000px white inset", WebkitTextFillColor: '#000000' };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // ** handle submit form
    const handleSubmit = (event) => {

    }
    

    return (
        <div className='font-maven '>
            <div className='h-[100vh] overflow-hidden relative'>
                <div className='absolute bottom-[20%] left-[43%] w-80 h-80 rounded-full bg-blue-300 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-[0.7] z-[-1]' />
                <div className='absolute bottom-[8%] left-[35%] top-15 w-80 h-80 rounded-full bg-red-200 mix-blend-multiply filter blur-xl animate-blob opacity-[0.7] z-[-1]' />
                <div className='absolute left-[35%] top-[15%] w-[22rem] h-[22rem] rounded-full bg-purple-300 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-[0.7] z-[-1]' />

                <div className='animate-bouncing absolute right-[10%] top-5 md:block hidden'>
                    <div className=' rotate-6 w-[300px] h-[300px] bg-contain bg-no-repeat ' style={{ backgroundImage: `url(${authImage1})` }} />
                </div>
                <div className='animate-bouncing animation-delay-2000 absolute left-[1%] top-[25%] md:block hidden'>
                    <div className=' -rotate-6 w-[400px] h-[400px] bg-contain bg-no-repeat ' style={{ backgroundImage: `url(${about2})` }} />
                </div>
                <div className='animate-bouncing animation-delay-4000 absolute bottom-[2%] right-[5%] md:block hidden'>
                    <div className=' rotate-[-6deg] w-[340px] h-[340px] bg-contain bg-no-repeat ' style={{ backgroundImage: `url(${authImage2})` }} />
                </div>

                <div className={`auth_form_login ss:w-fit w-full bg-white shadow-lg rounded-[5px] 
                 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-[10] py-5 px-8`}>
                    <div className='text-center mb-4'>
                        <Link to='/'>
                            <div className='w-[50px] h-[50px] bg-contain bg-no-repeat m-auto' style={{ backgroundImage: `url(${nestLogo})` }} />
                            <p className='text-[20px] tracking-[5px] uppercase select-none text-black'>Nesty</p>
                        </Link>
                    </div>
                    <h1 className='font-bold text-[28px] text-black my-8'>Đăng nhập vào Nesty</h1>
                    <div className='flex flex-col'>

                        <FormControl variant="outlined">
                            <TextField
                                helperText=" "
                                id="email"
                                label="Email"
                                inputProps={{ style: inputStyle }}
                                type="email"
                                size="small"
                                className='ss:w-[40ch]'
                                style={{color: 'black'}}
                            />
                        </FormControl>
                        <FormControl sx={{}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" size='small'>Mật khẩu</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                size="small"
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Button onClick={handleSubmit} styles="rounded-[5px] bg-primary w-full mt-8 mb-5">Đăng nhập</Button>
                        <p className='text-black text-center mt-6'>Bạn chưa có tài khoản?
                            <Link to='/register'>
                                <span className='text-primary cursor-pointer ml-2'>Đăng ký</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login