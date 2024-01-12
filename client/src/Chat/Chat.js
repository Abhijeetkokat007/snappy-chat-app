import React from 'react';
import { useState, useEffect } from 'react';
import {io} from "socket.io-client";

const socket = io("http://localhost:5002");

function Chat() {
    const [message, setMessage] = useState();
  return (
    <div>
     <h1> chat app </h1>
     <input 
     type='text' 
     placeholder='Enter message'
     onChange={(e) => setMessage(e.target.value)}
     value={message}
     />

<button onClick={ () => {
    socket.emit('message', message)
}}> 
Send
</button>

    </div>
  )
}

export default Chat
