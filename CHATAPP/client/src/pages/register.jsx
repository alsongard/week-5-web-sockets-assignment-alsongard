import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_ \-]{4,23}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#=$%]).{8,32}$/;

export default function RegisterPage()
{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password:"",
        confirmPassword: ""
    })

    function handleChange(event)
    {
        const {name, value} = event.target;
        setFormData((prevValue)=>{
            return {...prevValue, 
                [name]:value
            }
        })
    }
    // username validation & password
    const [touchedField, setToucheField] = useState({});

    
    function handleBlur(event)
    {
        const {name} = event.target;
        setToucheField((prevValue)=>{
            return {
                ...prevValue,
                [name]: true
            }
        })
        console.log(touchedField);
    }

    const user_test_regex = touchedField.username ? USER_REGEX.test(formData.username) : true; // setting this to true would mean that we always check for false on the test result
    console.log(`user_test_regex : ${user_test_regex}`)
    const password_test_regex = touchedField.password ? passwordRegex.test(formData.password) : true; // when touchField has password property do test: if test:true  return true 
    const match_test_passwd = touchedField.confirmPassword ?  formData.password === formData.confirmPassword : true;

    // setting error messages based on the boolean values
    const user_err_msg = !user_test_regex  &&  touchedField.username ? "Username not valid! Ensure it starts with a letter minimum lenght of 5 to 24 and No special characters" : "";
    const password_test_err_msg = !password_test_regex  &&  touchedField.password ?  "Password should have atleast one special character, uppercase, lowercase and a number and length 8-24": "";
    const match_test_err_msg = !match_test_passwd && touchedField.confirmPassword ? "Paswords do not match! Try Again" : "";
    async function handleSubmit(event)
    {
        event.preventDefault();
        console.log(formData);
        try
        {
            const res = await axios.post("http://localhost:5000/register", {username:formData.username, password:formData.password});
            console.log(res);
            navigate("/login");
        }
        catch(err)
        {
            console.log(`Error: ${err}`)
        }
    }
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6" >
             
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                    Register
                </h2>

                {/* Username */}
                <div className="mb-4">
                <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    onBlur={handleBlur}
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* setting error msg */}
                {
                    user_err_msg && (<p className="text-red-600">{user_err_msg}</p>)
                }
                </div>

                {/* Password */}
                <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onBlur={handleBlur}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {
                    password_test_err_msg && (<p className="text-red-600">{password_test_err_msg}</p>)
                }
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Confirm Password
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onBlur={handleBlur}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {
                    match_test_err_msg && (<p className="text-red-600">{match_test_err_msg}</p>)
                }
                </div>
                    {/* Submit Button */}
                    <input
                    type="submit"
                    value="Register"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 cursor-pointer"
                    />
            </form>
        </section>
    )
}