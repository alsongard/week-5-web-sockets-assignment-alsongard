import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SetAuthHeader from "../utils/setAuthHeader";
export default function LoginPage()
{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username:"",
        password:""
    });
    function handleChange(event)
    {
        const {name, value} = event.target;
        setFormData((prevData)=>{
            return {
                ...prevData,
                [name]:value
            }
        })
    }

    async function handleSubmit(event)
    {
        event.preventDefault();
        try
        {
            const res = await axios.post("http://localhost:5000/login", formData);
            console.log(res); //working:successfully
            const {success} = res.data;
            // console.log(success); //working:successfully
            // console.log(res.data.tokenGen); //working:successfully
            // console.log(res.data.id)
            if (success)
            {
                const {tokenGen} = res.data;
                const {id} = res.data;
                localStorage.setItem("token",tokenGen);
                localStorage.setItem("user_id",id);
                SetAuthHeader(tokenGen);
                navigate("/chat");
            }
            
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
        }
    }


    return (
        <section className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 px-6" >
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg space-y-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">Login</h2>
                <div>
                    <label htmlFor="username" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                    Username
                    </label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                    required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                    Password
                    </label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                    required
                    />
                </div>

                <input
                    type="submit"
                    value="Login"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                />
            </form>
            
        </section>
    )
}