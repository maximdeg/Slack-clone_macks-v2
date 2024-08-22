import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { IoSend } from 'react-icons/io5';
import { GoTriangleRight } from 'react-icons/go';
import Header from '../../components/Header/Header';
import ChannelList from '../../components/ChannelList/ChannelList';
import MessageList from '../../components/MessageList/MessageList';
import WorkspaceNavigator from '../../components/WorkspaceNavigator/WorkspaceNavigator';

import './Workspace.css';

function Workspace() {
    const { id_workspace, id_channel } = useParams();
    const {
        getChannelsFromWorkspace,
        getWorkspaceById,
        getChannelById,
        getMessagesFromChannel,
        saveMessage,
        saveChannel,
        deleteChannel,
        validateForm,
    } = useGlobalContext();

    const workspace = getWorkspaceById(id_workspace);
    const channels = getChannelsFromWorkspace(id_workspace);
    const navigate = useNavigate();

    const [currentChannel] = getChannelById(id_workspace, id_channel);
    const initialStateMessageList = getMessagesFromChannel(id_workspace, id_channel);
    const [newMessageList, setNewMessageList] = useState(initialStateMessageList);
    const [newChannel, setNewChannel] = useState('');

    const [error, setError] = useState(null);

    const [isCreateChannelButtonActive, setIsCreateChannelButtonActive] = useState(false);
    const [isFormChannelActive, setIsFormChannelActive] = useState(false);

    const [isChannelMenuArrowActive, setIsChannelMenuArrowActive] = useState(false);
    const [isChannelMenuActive, setIsChannelMenuActive] = useState(false);

    function handleToggleForm() {
        setIsCreateChannelButtonActive(!isCreateChannelButtonActive);
    }

    function handleToggleChannelMenu() {
        setIsChannelMenuArrowActive(!isChannelMenuArrowActive);
    }

    useEffect(() => {
        if (isCreateChannelButtonActive) {
            setIsFormChannelActive(false);
        }
    }, [isCreateChannelButtonActive]);

    useEffect(() => {
        if (isChannelMenuArrowActive) {
            setIsChannelMenuActive(false);
        } else {
            setIsChannelMenuActive(true);
        }
    }, [isChannelMenuArrowActive]);

    const handleSubmitMessage = (e, message) => {
        e.preventDefault();
        setNewMessageList([...newMessageList, message]);
        saveMessage(id_workspace, id_channel, message);
    };

    const handleSubmitChannel = (e, channel) => {
        e.preventDefault();

        const newError = validateForm('channel_name', channel.channel_name);
        console.log(newError);

        if (!newError) {
            channel.id = uuid();
            setNewChannel([...newChannel, channel]);
            saveChannel(id_workspace, channel);
            handleToggleForm();
        } else {
            setError((prevState) => newError);
        }
    };

    const handleDeleteChannel = (e, channel_id) => {
        e.preventDefault();
        if (channels.length > 1) {
            setNewChannel((prevState) => channels);
            deleteChannel(id_workspace, channel_id);
            navigate('/workspace/' + id_workspace + '/' + workspace.channels[0].id);
        } else {
            alert('Por favor no elimine el ultimo canal');
        }
    };

    return (
        <>
            <Header workspace_name={workspace.workspace_name} />
            <section className="workspace-container">
                <WorkspaceNavigator selected={id_workspace} />
                <div className="main">
                    <div className="main-navigator">
                        <div className="channel-navigator">
                            <div className="workspace-name-container">
                                <h3>{workspace.workspace_name}</h3>
                            </div>
                            <div className="channel-container">
                                <h4>Canales</h4>
                                <ChannelList
                                    id_workspace={id_workspace}
                                    channels={channels}
                                    handleDeleteChannel={handleDeleteChannel}
                                />
                            </div>
                            <button className="button btn-create-channel" onClick={handleToggleForm}>
                                Crear canal
                            </button>
                            {isCreateChannelButtonActive && (
                                <AddChannelForm
                                    handleSubmitChannel={handleSubmitChannel}
                                    handleToggleForm={handleToggleForm}
                                    error={error}
                                />
                            )}
                        </div>
                    </div>
                    <div className="chat-container">
                        <div className="channel-name-container">
                            <div className="arrow-triangle-container" onClick={handleToggleChannelMenu}>
                                {isChannelMenuArrowActive ? (
                                    <GoTriangleRight className="arrow-triangle-down icon icon-rotated" />
                                ) : (
                                    <GoTriangleRight className="arrow-triangle-down icon" />
                                )}
                            </div>
                            <h2># {currentChannel.channel_name}</h2>
                            {isChannelMenuArrowActive && (
                                <div className="main-navigator responsive-main">
                                    <WorkspaceNavigator
                                        selected={id_workspace}
                                        isResponsive={isChannelMenuArrowActive}
                                    />
                                    <div className="channel-navigator">
                                        <div className="workspace-name-container">
                                            <h3>{workspace.workspace_name}</h3>
                                        </div>
                                        <div className="channel-container">
                                            <h4>Canales</h4>
                                            <ChannelList
                                                id_workspace={id_workspace}
                                                channels={channels}
                                                handleDeleteChannel={handleDeleteChannel}
                                            />
                                        </div>
                                        <button className="button btn-create-channel" onClick={handleToggleForm}>
                                            Crear canal
                                        </button>
                                        {isCreateChannelButtonActive && (
                                            <AddChannelForm
                                                handleSubmitChannel={handleSubmitChannel}
                                                handleToggleForm={handleToggleForm}
                                                error={error}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <MessageList messages={currentChannel.messages} />
                        <MessageInput handleSubmitMessage={handleSubmitMessage} />
                    </div>
                </div>
            </section>
        </>
    );
}

function AddChannelForm({ handleSubmitChannel, handleToggleForm, error }) {
    const initialStateChannel = {
        id: '',
        channel_name: '',
        messages: [],
    };

    const [channelValue, setChannelValue] = useState(initialStateChannel);

    const handleContentChange = (e) => {
        setChannelValue({
            ...channelValue,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="create-channel-container">
            <h3 className="create-channel-title">Añadir canal</h3>
            <form className="create-channel-form" onSubmit={(e) => handleSubmitChannel(e, { ...channelValue })}>
                <label className="label" htmlFor="name">
                    Nombre del canal
                </label>
                <input
                    className="input input-channel"
                    type={channelValue.name}
                    id="channel-name"
                    name="channel_name"
                    onChange={handleContentChange}
                    value={channelValue.name}
                    placeholder="Nuevo canal..."
                />
                {error && <span className="error">{error.message}</span>}
                <div className="btn-container">
                    <button className="button btn-create btn-cancel" type="cancel" onClick={handleToggleForm}>
                        Cancelar
                    </button>
                    <button className="button btn-create btn-confirm-channel" type="submit">
                        Confirmar
                    </button>
                </div>
            </form>
        </div>
    );
}

function MessageInput({ handleSubmitMessage }) {
    const initialStateMessage = {
        id: uuid(),
        date: new Date(),
        username: 'Maxim Degtiarev',
        image: '/users/user-0.jpg',
        message: '',
    };

    const [msgValue, setMsgValue] = useState(initialStateMessage);

    const handleContentChange = (e) => {
        setMsgValue({
            ...msgValue,
            [e.target.name]: e.target.value,
        });
        console.log(new Date());
    };

    const handleClearInput = () => {
        setMsgValue(initialStateMessage);
    };

    return (
        <div className="form-container">
            <form
                className="input-form"
                onSubmit={(e) => {
                    handleSubmitMessage(e, { ...msgValue });
                    handleClearInput();
                }}
            >
                <input
                    className="input input-message"
                    type={msgValue.message}
                    id="message"
                    name="message"
                    onChange={handleContentChange}
                    value={msgValue.message}
                    placeholder="Escribe aqui un mensaje..."
                ></input>
                <button className="btn-submit" type="submit">
                    <IoSend />
                </button>
            </form>
        </div>
    );
}

export default Workspace;
