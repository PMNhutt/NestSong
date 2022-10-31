import React, { useEffect, useState } from 'react'
import Button from '../../../share/components/Button'
import { deleteProductDetail } from '../../../redux/actionSlice/productSlice'
import instances from '../../../utils/plugin/axios'

// ** images
import { authImage1, authImage2, about2 } from '../../../assets/images'
import { nestLogo } from '../../../assets'

// ** Third party components
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

const Register = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title])

    //** States */
    const [values, setValues] = useState({
        password: '',
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

    const onSubmit = (data) => {
        console.log(data);
        toast.promise(
            instances.post('/createnewuser', data),
            {
                pending: 'Đang tạo tài khoản',
                success: 'Đã đăng ký thành công! 👌',
                error: 'Đăng ký thất bại'
            }
        )
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
                    <h1 className='font-bold text-[28px] text-black my-8'>Đăng ký </h1>
                    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex gap-2'>

                            <FormControl variant="outlined">
                                <TextField
                                    id="firstName"
                                    label="Họ"
                                    inputProps={{ style: inputStyle }}
                                    type="text"
                                    size="small"
                                    className='ss:w-[20ch]'
                                    {...register('firstName', {
                                        required: "Bạn cần họ và tên để đăng ký"
                                    })}
                                    error={!!errors?.firstName}
                                    // helperText=" "
                                    helperText={errors?.firstName ? errors.firstName.message : " "}
                                />
                            </FormControl>

                            <FormControl variant="outlined">
                                <TextField
                                    id="lastName"
                                    label="Tên"
                                    inputProps={{ style: inputStyle }}
                                    type="text"
                                    size="small"
                                    className='ss:w-[20ch]'
                                    {...register('lastName', {
                                        required: "Bạn cần họ và tên để đăng ký"
                                    })}
                                    error={!!errors?.lastName}
                                    // helperText=" "
                                    helperText={errors?.lastName ? errors.lastName.message : " "}
                                />
                            </FormControl>

                        </div>
                        <div className='flex gap-2'>

                            <FormControl variant="outlined">
                                <TextField
                                    id="phoneNumber"
                                    label="Số điện thoại"
                                    inputProps={{ style: inputStyle }}
                                    type="number"
                                    size="small"
                                    className='ss:w-[20ch]'
                                    {...register('phoneNumber', {
                                        required: "Bạn cần sdt để đăng ký"
                                    })}
                                    error={!!errors?.phoneNumber}
                                    helperText={errors?.phoneNumber ? errors.phoneNumber.message : " "}
                                />
                            </FormControl>
                            <FormControl variant="outlined">
                                <TextField
                                    id="email"
                                    label="Email"
                                    inputProps={{ style: inputStyle }}
                                    type="email"
                                    size="small"
                                    className='ss:w-[20ch]'
                                    autoComplete='email'
                                    {...register('email', {
                                        required: "Bạn cần email để đăng ký", pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Địa chỉ email không hợp lệ"
                                        }
                                    })}
                                    error={!!errors?.email}
                                    // helperText=" "
                                    helperText={errors?.email ? errors.email.message : " "}
                                />
                            </FormControl>

                        </div>
                        <FormControl variant="outlined">
                            <TextField
                                id="address"
                                label="Địa chỉ"
                                inputProps={{ style: inputStyle }}
                                type="text"
                                size="small"
                                className='ss:w-[100%]'
                                autoComplete='address'
                                {...register('address', {
                                    required: "Bạn cần địa chỉ để đăng ký"
                                })}
                                error={!!errors?.address}
                                // helperText=" "
                                helperText={errors?.address ? errors.address.message : " "}
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            {/* <InputLabel htmlFor="password" size='small'>Mật khẩu</InputLabel> */}
                            <TextField
                                id="password"
                                type={values.showPassword ? 'text' : 'password'}
                                // value={values.password}
                                size="small"
                                onChange={handleChange('password')}
                                InputProps={{
                                    endAdornment:
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

                                }}
                                label="Mật khẩu"
                                {...register('password', {
                                    required: "Bạn cần mật khẩu để đăng ký", pattern: {
                                        // value: /^(?! *$)[a-zA-Z0-9.+ '-]+$/,
                                        value: /^[A-Za-z0-9]*$/,
                                        message: "Mật khẩu không hợp lệ"
                                    }
                                })}
                                error={!!errors?.password}
                                helperText={errors?.password ? errors.password.message : " "}
                            />
                        </FormControl>
                        <Button type="submit" styles="rounded-[5px] bg-primary w-full mt-8 mb-5">Đăng ký</Button>
                        <p className='text-black text-center mt-6'>Bạn đã có tài khoản?
                            <Link to='/sign-in'>
                                <span className='text-primary cursor-pointer ml-2'>Đăng nhập</span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register