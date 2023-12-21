import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import SignIn from "../Pages/SignIn/SignIn";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
           
        ]
    },
    {
        path:"/signin",
        element:<SignIn></SignIn>
    },
   
   
]);