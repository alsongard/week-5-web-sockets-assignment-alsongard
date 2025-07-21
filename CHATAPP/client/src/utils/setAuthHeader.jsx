import axios from "axios";

export default function SetAuthHeader(token)
{
    if (token)
    {
        axios.defaults.headers.common["Authorization"] = token;
    }
}