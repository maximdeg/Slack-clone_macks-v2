import React, { useRef, useEffect } from 'react';
import MessageCard from '../MessageCard/MessageCard';

import './MessageList.css';

function MessageList({ messages }) {
    const messagesEndRef = useRef(messages);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="message-list-container" ref={messagesEndRef}>
            {messages.map((message, index) => (
                <div key={index}>
                    <MessageCard message={message} index={index} />
                </div>
            ))}
            <div ref={messagesEndRef}></div>
        </div>
    );
}

export default MessageList;
