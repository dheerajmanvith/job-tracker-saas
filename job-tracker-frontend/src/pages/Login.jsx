import {
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";


import {
    useAuth
} from "../context/AuthContext";




function Login(){


    const navigate =
        useNavigate();



    const {
        login
    } = useAuth();




    const [email,setEmail] =
        useState(
            "dheeraj1816@gmail.com"
        );



    const [password,setPassword] =
        useState(
            "123456"
        );



    const [loading,setLoading] =
        useState(false);



    const [error,setError] =
        useState("");






    const handleSubmit = async(e)=>{


        e.preventDefault();


        setError("");

        setLoading(true);



        try{


            const response =
                await login(
                    email,
                    password
                );



            if(response){


                /*
                  Store logged user
                  for ADMIN route protection
                */

                if(response.user){

                    localStorage.setItem(
                        "user",
                        JSON.stringify(
                            response.user
                        )
                    );

                }



                navigate(
                    "/dashboard"
                );


            }
            else{


                setError(
                    "Invalid email or password"
                );

            }



        }
        catch(err){


            console.error(err);


            setError(
                "Login failed"
            );


        }
        finally{


            setLoading(false);


        }



    };








    return (

        <div className="min-h-screen flex items-center justify-center">


            <div className="bg-white shadow rounded-xl p-8 w-96">


                <h1 className="text-3xl font-bold mb-6">

                    Login

                </h1>




                {
                    error && (

                        <p className="text-red-500 mb-4">

                            {error}

                        </p>

                    )
                }





                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >




                    <div>

                        <label>
                            Email
                        </label>


                        <input

                            name="email"

                            type="email"

                            placeholder="Enter your email"

                            value={email}

                            onChange={
                                e =>
                                setEmail(
                                    e.target.value
                                )
                            }

                            className="border p-2 w-full rounded"

                        />


                    </div>







                    <div>


                        <label>

                            Password

                        </label>



                        <input


                            name="password"


                            type="password"


                            placeholder="Enter your password"


                            value={password}


                            onChange={
                                e =>
                                setPassword(
                                    e.target.value
                                )
                            }


                            className="border p-2 w-full rounded"


                        />


                    </div>







                    <button


                        type="submit"


                        disabled={loading}


                        className="bg-blue-600 text-white px-4 py-2 rounded w-full"


                    >



                        {
                            loading
                            ?
                            "Logging in..."
                            :
                            "Login"
                        }



                    </button>






                </form>




            </div>



        </div>

    );


}



export default Login;