import React from 'react';

import './MessageCard.css';

function MessageCard({ message }) {
    const date = new Date(Number(message.date));
    const time =
        `${date.getHours()}`.padStart(2, 0) +
        ':' +
        `${date.getMinutes()}`.padStart(2, 0) +
        '        ' +
        `${date.getDate()}`.padStart(2, 0) +
        '/' +
        `${date.getMonth() + 1}`.padStart(2, 0) +
        '/' +
        `${date.getFullYear()}`;

    return (
        <div className="message-card">
            <div className="image-container">
                <img src={message.image}></img>
            </div>
            <div className="message-content">
                <div className="message-info">
                    <span className="username">{message.username}</span>
                    <span className="time">{time}</span>
                </div>
                <div className="message-text">
                    <span>{message.message}</span>
                </div>
            </div>
        </div>
    );
}

export default MessageCard;
