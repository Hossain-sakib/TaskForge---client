import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const imagebb_key = import.meta.env.VITE_IMAGEBB_KEY;
const imgbb_api = `https://api.imgbb.com/1/upload?key=${imagebb_key}`;

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [signUpError, setSignUpError] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { signUpUser, updateUser } = useAuth();
    const navigate = useNavigate();

    const handleSignUp = async (data) => {
        setLoading(true);

        try {
            const { name, email, password, photo } = data;
            if (password.length < 6) {
                setSignUpError('Password should be at least 6 characters.');
                setLoading(false);
                return;
            } else if (!/[A-Z]/.test(password)) {
                setSignUpError('Required at least one uppercase character.');
                setLoading(false);
                return;
            } else if (!/[a-z]/.test(password)) {
                setSignUpError('Required at least one lowercase character.');
                setLoading(false);
                return;
            } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
                setSignUpError('Required at least one special character.');
                setLoading(false);
                return;
            } else if (!/[0-9]/.test(password)) {
                setSignUpError('Required at least one numerical character.');
                setLoading(false);
                return;
            }

            setSignUpError('');

            const formData = new FormData();
            formData.append('image', photo[0]);

            const imgRes = await axiosPublic.post(imgbb_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const result = await signUpUser(email, password);
            const user = result.user;
            const userImage = imgRes.data.data.display_url;

            await updateUser(name, userImage);

        
            const userInfo = {
                email: email,
                name: name,
                userImage: userImage,
            };

            const saveResult = await axiosPublic.post('/users', userInfo);

            if (saveResult.data.insertedId) {
                Swal.fire({
                    title: 'Successfully signed up',
                    showClass: {
                        popup: 'animate__animated animate__fadeInUp animate__faster',
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutDown animate__faster',
                    },
                });
                reset(); 
                navigate('/');
            }
        } catch (error) {
            console.error('Sign up error:', error);
            setSignUpError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero min-h-screen mb-24">
            <div className="hero-content flex-col">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 rounded-lg border-2 border-blue-600">
                    <form onSubmit={handleSubmit(handleSignUp)} className="card-body bg-blue-50">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-blue-500">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="name"
                                {...register('name', { required: 'Name is required' })}
                                className={`input border-blue-400 input-bordered ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-blue-500">Photo</span>
                            </label>
                            <input
                                type="file"
                                {...register('photo', { required: 'Photo is required' })}
                                className={`file-input border-blue-400 input-bordered ${errors.photo ? 'border-red-500' : ''}`}
                            />
                            {errors.photo && <p className="text-xs text-red-500 mt-1">{errors.photo.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-blue-500">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                                className={`input border-blue-400 input-bordered ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-blue-500">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                {...register('password', { required: 'Password is required' })}
                                className={`input border-blue-400 input-bordered ${errors.password ? 'border-red-500' : ''}`}
                            />
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className={`btn bg-blue-300 hover:bg-blue-400 font-bold overflow-hidden transition-all hover:scale-105  hover:shadow-2xl ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                    {signUpError && <p className="text-xs text-center text-red-600 p-4">{signUpError}</p>}
                    {/* <SocialSignIn /> */}
                    <p className='text-center text-blue-500 font-semibold py-4'><small>Already have an account? Please </small><Link to='/signin' className='hover:underline hover:font-bold'>Sign In.</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
