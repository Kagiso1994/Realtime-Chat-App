import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';

const App = () => {
    return (
        <div className="app">
            <div className="app_body">
            {/*Sid bar*/}
            <Sidebar />
            {/*Chat*/}
            <Chat />

            </div>
        </div>
    )
}

export default App;