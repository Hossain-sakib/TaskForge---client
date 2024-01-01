import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import SignIn from "../Pages/SignIn/SignIn";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRoutes from "./PrivateRoute";

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
    {
        path: "dashboard",
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
    },
   
   
]);