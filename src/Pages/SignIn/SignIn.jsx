import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/UseAuth';
import GoogleSignIn from '../../Components/GoogleSignIn/GoogleSignIn';

const SignIn = () => {
    const { signInUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState,  } = useForm();
    const [error, setErrorState] = useState(null);
    const from = location.state?.from?.pathname || '/dashboard';

    const onSubmit = async (data) => {
        try {
            const { email, password } = data;
            const result = await signInUser(email, password);
            const user = result.user;
            console.log(user);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "User Signed In!",
                showConfirmButton: false,
                timer: 1500
            });

            navigate(from, { replace: true });
        } catch (error) {
            console.error('Sign in error:', error);
            setErrorState('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="hero min-h-screen mb-24">
            <div className="hero-content flex-col">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 rounded-none border-2 border-blue-600">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body bg-blue-50">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-blue-500">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                {...register('email', { required: true })}
                                className={`input border-blue-400 rounded-none input-bordered ${formState.errors.email ? 'border-red-500' : ''}`}
                            />
                            {formState.errors.email && <span className="text-xs text-red-500">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-blue-500">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                {...register('password', { required: true })}
                                className={`input border-blue-400 rounded-none input-bordered ${formState.errors.password ? 'border-red-500' : ''}`}
                            />
                            {formState.errors.password && <span className="text-xs text-red-500">Password is required</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt text-blue-600 hover:underline hover:font-semibold hover:text-blue-400">Forgot password?</a>
                            </label>
                            {error && <p className="mb-4 text-center text-red-500">{error}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn btn-outline rounded-none bg-blue-200 hover:bg-blue-400 font-bold overflow-hidden transition-all hover:scale-105  hover:shadow-2xl "
                                disabled={formState.isSubmitting}
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                    <GoogleSignIn />
                    <p className='text-center text-blue-500 font-semibold py-4'><small>New Here? Please </small><Link to='/signup' className='hover:underline hover:font-bold'>Sign Up.</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
