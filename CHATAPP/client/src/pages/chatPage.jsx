import { IoSend } from "react-icons/io5";
import {useState, useEffect, useRef} from "react";
import {io} from "socket.io-client"
import clsx from "clsx";

export default function ChatPage()
{

    const [text,setText] = useState({
        userMsg:""
    });

    function handleChange(event)
    {
        const {name, value} = event.target;
        setText((prevData)=>{
            return {
                ...prevData,
                [name]:value
            }
        });
    }
    //  get all users with messages
    const [welcomingMsg, setWelcomingMsg] = useState("");
    const [newUserEntered, setNewUserEntered] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [newSocket, setNewSocket] = useState("");
    const socket = useRef(null);
    useEffect(()=>{
        if (!socket.current)
        {
            socket.current = io("http://localhost:5000");
            setNewSocket(socket.current);
            // console.log(`this is socket.current.id : ${socket.current.id}`);
            socket.current.on("connect", ()=>{ //eventName, callbackfunction
                console.log(`Connected successfully: `);
                console.log(`socket_id : ${socket.current.id}`)
            });

            socket.current.on("allMsgs", data=>{
                console.log(data);
                setChatMessages(data);
            })
            socket.current.on("welcomeMsg", (data)=>{
                setWelcomingMsg(data);
            })
            socket.current.on("userEntered", (data)=>{
                // USER ENTERED
                console.log(`userEntered : ${data}`)
                if (newUserEntered.includes(data))
                {
                    console.log("userExist")
                }
                else
                {
                    setNewUserEntered((prevData)=>{
                        return [...prevData, data]
                    })
                }

            })
        }
        // return ()=>{
        //     if (socket.current)
        //     {
        //         socket.current.disconnect()
        //     }
        // }
    },[])

    function handleSubmit(event)
    {
        event.preventDefault();
        console.log(text)
        newSocket.emit("receiveMsg", text)
        setText({
            userMsg: ""
        })
    
    }
    setInterval(()=>{
        console.log(newUserEntered)
    }, 5000)
    // if (welcomingMsg)
    // {
    //     if (welcomingMsg === )
    // }
    return (
        <section className="w-full h-full">

            {/* get all messages for the given user */}
            <div className="flex flex-row w-full">

                <div className="w-1/4 bg-slate-800 overflow-x-auto">
                    {/* display rooms */}
                    <div className="bg-slate-400 rounded-md m-[15px] py-[10px]">
                        <h1 className='text-center'>ChatRooms</h1>
                    </div>

                    {/* display users */}

                    <div className="bg-slate-400 rounded-md m-[15px] py-[10px]">

                        <h1 className='text-center'>Availlable Users</h1>
                        {
                            newUserEntered.length > 0 ? 
                            (
                                newUserEntered.map((dataItem, index)=>{
                                    return (<p className='text-left bg-slate-900 text-white py-[10px] pl-[5px] border-y-1 border-white my-[5px]'  key={index}>{dataItem}</p>)
                                })
                            )
                            : 
                            (
                                <p>No New User</p>
                            )
                        }
                    </div>
                </div>


                <div className="w-3/4 bg-slate-800  border-l-2 py-[25px] px-[20px]">
                    {/* WelcomMsg */}
                    {
                        welcomingMsg && (<p className='bg-sky-400 text-center rounded-md'>Welcome User: {welcomingMsg}</p>)
                    }

                    {/* map messages */}
                    {
                        chatMessages. length > 0 ?
                        (
                            chatMessages.map((dataItem, idx)=>{
                                return(
                                    <div className={clsx(dataItem.user_id === welcomingMsg ? 'flex flex-row bg-slate-500 my-[10px] py-[5px] rounded-md w-1/2 justify-center ml-[500px]' : 'flex flex-row bg-slate-500 my-[10px] py-[5px] rounded-md w-1/2 justify-start')}  key={idx}>
                                     {/* <div className='flex flex-row bg-slate-500 my-[10px] py-[5px] rounded-md w-1/2' key={idx}> */}
                                        <p>{dataItem.user_id}: {welcomingMsg}</p>
                                        <p>{dataItem.msg}</p>
                                    </div>
                                )
                            })
                        )
                        :
                        (
                            <p>Loading ChatMessages</p>
                        )
                    }
                    {/* chat with users */}
                    
                    <form onSubmit={handleSubmit} className="w-full flex flex-row gap-x-[10px]  shadow-[0px_0px_5px_#d7dbdd] rounded-md">
                        <input type="text" name="userMsg" onChange={handleChange} value={text.userMsg} className="block w-full  rounded-md focus:outline-1 focus:outline-amber-300 dark:text-sky-400 py-[5px] px-[10px]"/>
                        <button className="block rounded-[100%] p-[5px] my-[10px] mr-[10px] bg-blue-400"><IoSend/></button>
                    </form>
                </div>

           </div>

        </section>
    )
}

