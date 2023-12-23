import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignIn/SignUp/SignUp";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
           {
            path:"/",
            element:<Home></Home>
           }
        ]
    },
    {
        path:"/signin",
        element:<SignIn></SignIn>
    },
    {
        path:"/signup",
        element:<SignUp></SignUp>
    },
   
   
]);