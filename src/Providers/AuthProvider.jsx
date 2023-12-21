import { createContext } from "react";
import { app } from "../Configs/firebase.config";
import { getAuth,} from "firebase/auth"
export const AuthContext = createContext(null);
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    return (
        <div>
            
        </div>
    );
};

export default AuthProvider;