import React, { useEffect, useState } from 'react';
import "./Chat.css"
import { Avatar, IconButton } from '@material-ui/core';
import { MoreVert, AttachFile, SearchOutlined, InsertEmoticon, Mic } from "@material-ui/icons";

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");

    useEffect(() => {
        // return () => {
        //     cleanup
        // }
        setSeed(Math.floor(Math.random() * 5000));

    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(e)

        console.log("You typed >>> ", input);
        setInput("");

    }

    return (
        <div className='chat'>
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat_header_info">
                    <h3>Room name</h3>
                    <p>Last seen at ...</p>
                </div>

                <div className="chat_header_right">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>

                    <IconButton>
                        <AttachFile />
                    </IconButton>

                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>

            </div>

            <div className="chat_body">
                <p className={`chat_message ${true && 'chat_receiver'}`}>
                    <span className="chat_name">Kagiso Mokautu</span>
                    hey guys
                    <span className="chat_timestamp">
                        3:52pm
                    </span>
                </p>
               

            </div>

            <div className="chat_footer">
                <InsertEmoticon />
                <form action="">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}>Send a message</button>

                </form>
                <Mic />
            </div>

        </div>
    )
}

export default Chat
