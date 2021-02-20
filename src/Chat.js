import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Chat.css"
import { Avatar, IconButton } from '@material-ui/core';
import { MoreVert, AttachFile, SearchOutlined, InsertEmoticon, Mic } from "@material-ui/icons";
import firebase from './firebase';
import fb from 'firebase';
import { useStateValue } from './StateProvider';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        //console.log(roomId)
        if (roomId) {
            firebase.db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
                //console.log(snapshot)
            ));

            firebase.db.collection('rooms')
                .doc(roomId).collection('messages')
                .orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                ))
        }

    }, [roomId]);


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

        firebase.db
            .collection("rooms").doc(roomId)
            .collection("messages").add({
                name: user.displayName,
                timestamp: fb.firestore.FieldValue.serverTimestamp(),
                message: input
            })


        setInput("");

    }

    return (
        <div className='chat'>
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat_header_info">
                    <h3>{roomName}</h3>
                    <p>{

                        new Date(messages[messages.length - 1] &&
                            messages[messages.length - 1].timestamp &&
                            messages[messages.length - 1].timestamp.toDate()).toUTCString()

                        /*messages[messages.length - 1] ? (
                            //console.log(messages[messages.length - 1].timestamp)
                            messages[messages.length - 1].timestamp ? (
                                new Date(messages[messages.length - 1].timestamp.toDate()).toUTCString()

                            ) : ""
                        ) : ("")*/
                    }</p>
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
                {messages.map((message, key) => (
                    <p key={key} className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestamp">
                            {new Date(message.timestamp &&
                                message.timestamp.toDate()).toUTCString()
                            }
                        </span>
                    </p>
                ))}



            </div>

            <div className="chat_footer">
                <InsertEmoticon />
                <form action="">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" />
                    <button type="submit" onClick={sendMessage}>Send a message</button>

                </form>
                <Mic />
            </div>

        </div>
    )
}

export default Chat
