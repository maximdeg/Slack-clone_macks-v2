import React from 'react';

import './MessageCard.css';

function MessageCard({ message }) {
    const miliseconds = message.date * 1;
    const date = new Date(miliseconds);
    const hoursString = `${date.getHours()}`;
    const hours = hoursString.padStart(2, 0);
    const minutesString = `${date.getMinutes()}`;
    const minutes = minutesString.padStart(2, 0);
    const time = hours + ':' + minutes;

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
