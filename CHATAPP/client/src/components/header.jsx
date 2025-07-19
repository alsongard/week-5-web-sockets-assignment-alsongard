import {NavLink} from "react-router-dom";
// import { FaMoon } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
export default function Header()
{
    return (
        <header className='flex flex-row dark:bg-slate-900 py-[20px] justify-between '>
            <div className="logo flex items-center space-x-2">
                <h1 className="text-2xl font-bold dark:text-white pl-[20px] text-blue-600">MessageChat</h1>
            </div>
            <div className="flex-1 flex px-[30px] justify-end">
                <ul className="flex space-x-6 items-center">
                    <NavLink to="/"><li className="text-gray-700 dark:text-white hover:text-blue-600 cursor-pointer">Home</li></NavLink>
                    <NavLink to="/register"><li className="text-gray-700 dark:text-white hover:text-blue-600 cursor-pointer">Register</li></NavLink>
                    <NavLink to="/login"><li className="text-gray-700 dark:text-white hover:text-blue-600 cursor-pointer">Login</li></NavLink>
                    <li>
                        <FaMoon/>
                    </li>
                    <li>
                        <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">Logout</button>
                    </li>
                </ul>
            </div>
        </header>
    )
}