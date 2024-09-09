import React from 'react';

import './MessageCard.css';

function MessageCard({ message }) {
    const monthString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayString = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(message.date * 1);
    const time = `${date.getHours()}`.padStart(2, 0) + ':' + `${date.getMinutes()}`.padStart(2, 0);
    const day = `${dayString[date.getDay()]} ${date.getDate()} ${monthString[date.getMonth()]}, ${date.getFullYear()}`;

    return (
        <>
            <div className="message-card">
                <div className="image-container">
                    <img src={message.image}></img>
                </div>
                <div className="message-content">
                    <div className="message-info">
                        <span className="username">{message.username}</span>
                        <span className="time">{`${day} ${time}`}</span>
                    </div>
                    <div className="message-text">
                        <span>{message.message}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MessageCard;
