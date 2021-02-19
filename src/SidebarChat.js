import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import firebase from './firebase';

function SidebarChat({id, name,addNewChat}) {

    const [seed, setSeed] = useState("");

    useEffect(() => {
        // return () => {
        //     cleanup
        // }
        setSeed(Math.floor(Math.random() * 5000));

    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat room");

        if(roomName) {
            // do some stuff...
            firebase.db.collection('rooms').add({
                name: roomName,
            });
        }
    };


    return !addNewChat ? (
        <div className="sidebar_chat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebar_chat_info">
                <h2>{name}</h2>
                <p>Last message...</p>
            </div>
        </div>
    ): (
        <div onClick={createChat} className="sidebar_chat">
        <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
