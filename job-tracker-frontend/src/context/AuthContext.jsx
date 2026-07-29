import {
    createContext,
    useContext,
    useState
} from "react";


import API from "../services/api";



const AuthContext = createContext();




export function AuthProvider({ children }) {



    const [isAuthenticated, setIsAuthenticated] =
        useState(
            () =>
                Boolean(
                    localStorage.getItem(
                        "access_token"
                    )
                )
        );





    const login = async (
        email,
        password
    ) => {


        try {


            const response =
                await API.post(
                    "/auth/login",
                    {
                        email,
                        password
                    }
                );



            const {
                access_token,
                refresh_token,
                user
            } = response.data;





            // Store tokens

            localStorage.setItem(
                "access_token",
                access_token
            );


            localStorage.setItem(
                "refresh_token",
                refresh_token
            );





            // Store user details
            // needed for ADMIN protection

            if(user){

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );

            }





            setIsAuthenticated(
                true
            );





            return response.data;



        }
        catch(error){


            console.error(
                "Login failed:",
                error
            );


            return null;


        }


    };








    const logout = () => {



        localStorage.removeItem(
            "access_token"
        );



        localStorage.removeItem(
            "refresh_token"
        );



        localStorage.removeItem(
            "user"
        );



        setIsAuthenticated(
            false
        );


    };









    return (


        <AuthContext.Provider

            value={{
                isAuthenticated,
                login,
                logout
            }}

        >

            {children}


        </AuthContext.Provider>


    );


}









export function useAuth(){


    return useContext(
        AuthContext
    );


}