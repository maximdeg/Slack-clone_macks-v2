import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { Link, useParams } from 'react-router-dom';
import { ImBin2 } from 'react-icons/im';

import './ChannelList.css';

function ChannelList({ id_workspace, channels, handleDeleteChannel }) {
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
                        <button className="btn-delete-channel" onClick={(e) => handleDeleteChannel(e, channel.id)}>
                            <ImBin2 />
                        </button>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ChannelList;
