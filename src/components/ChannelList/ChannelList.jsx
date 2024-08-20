import React from 'react';
import { Link, useParams } from 'react-router-dom';

import './ChannelList.css';

function ChannelList({ id_workspace, channels }) {
    const { id_channel } = useParams();

    return (
        <div className="channel-list-container">
            {channels.map((channel) => (
                <Link to={'/workspace/' + id_workspace + '/' + channel.id} key={channel.id} className="link">
                    <div
                        key={channel.id}
                        name="channel"
                        id={channel.id}
                        className={channel.id === id_channel ? 'channel selected' : 'channel'}
                    >
                        {`# ${channel.channel_name}`}
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ChannelList;
