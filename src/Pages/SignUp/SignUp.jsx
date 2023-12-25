import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../Hooks/UseAuth";
import GoogleSignIn from "../../Components/GoogleSignIn/GoogleSignIn";

const imagebb_key = import.meta.env.VITE_IMAGEBB_KEY;
const imgbb_api = `https://api.imgbb.com/1/upload?key=${imagebb_key}`;

const SignUp = () => {
  const [signUpError, setSignUpError] = useState("");
  const axiosPublic = useAxiosPublic();
  const { signUpUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const { handleSubmit, control, register, formState } = useForm();

  const handleSignUp = async (formData) => {
    const { name, email, password, photo } = formData;

    try {
      if (password.length < 6) {
        setSignUpError("Password should be at least 6 characters.");
        return;
      } else if (!/[A-Z]/.test(password)) {
        setSignUpError("Required at least one uppercase character.");
        return;
      } else if (!/[a-z]/.test(password)) {
        setSignUpError("Required at least one lowercase character.");
        return;
      } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
        setSignUpError("Required at least one special character.");
        return;
      } else if (!/[0-9]/.test(password)) {
        setSignUpError("Required at least one numerical character.");
        return;
      }

      setSignUpError("");

      const result = await signUpUser(email, password);
      const user = result.user;
      console.log(user);

      const formDataWithPhoto = new FormData();
      formDataWithPhoto.append("image", photo[0]);

      const res = await axiosPublic.post(imgbb_api, formDataWithPhoto, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const photoUrl = res.data.data.url;

      await updateUser(name, photoUrl);

      const userInfo = {
        email: email,
        name: name,
        userImage: photoUrl,
      };

      const saveResult = await axiosPublic.post("/users", userInfo);
      if (saveResult.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Signed Up!",
          showConfirmButton: false,
          timer: 1500
      });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="hero min-h-screen mb-24">
      <div className="hero-content flex-col">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 rounded-none border-2 border-blue-600">
          <form onSubmit={handleSubmit(handleSignUp)} className="card-body bg-blue-50">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-blue-500">
                  Name
                </span>
              </label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="name"
                    className="input border-blue-400 rounded-none input-bordered"
                    required
                  />
                )}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-blue-500">
                  Photo
                </span>
              </label>
              <input
                type="file"
                {...register("photo")}
                className="file-input border-blue-400 rounded-none input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-blue-500">
                  Email
                </span>
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="email"
                    className="input border-blue-400 rounded-none input-bordered"
                    required
                  />
                )}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-blue-500">
                  Password
                </span>
              </label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    placeholder="password"
                    className="input border-blue-400 rounded-none input-bordered"
                    required
                  />
                )}
              />
            </div>
            {signUpError && (
              <p className="text-xs text-center text-red-600 my-4">
                {signUpError}
              </p>
            )}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-outline rounded-none bg-blue-200 hover:bg-blue-400 font-bold overflow-hidden transition-all hover:scale-105  hover:shadow-2xl "
                disabled={formState.isSubmitting}
              >
                Sign Up
              </button>
            </div>
          </form>

          <GoogleSignIn />
          <p className="text-center text-blue-500 font-semibold py-4">
            <small>Already have an account? Please </small>
            <Link to="/signin" className="hover:underline hover:font-bold">
              Sign In.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


