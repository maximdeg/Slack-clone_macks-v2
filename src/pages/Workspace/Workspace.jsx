import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { IoSend, IoMicOutline } from 'react-icons/io5';
import { GoTriangleRight, GoBold, GoItalic, GoListUnordered, GoPlusCircle } from 'react-icons/go';
import { FaStrikethrough, FaCode, FaAt } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa6';
import { RiListOrdered2 } from 'react-icons/ri';
import { TbBlockquote } from 'react-icons/tb';
import { PiCodeBlockBold } from 'react-icons/pi';
import { RxLetterCaseCapitalize } from 'react-icons/rx';
import { BsEmojiSmile, BsCameraVideo } from 'react-icons/bs';
import { CgShortcut } from 'react-icons/cg';

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

    const [searchTerm, setSearchTerm] = useState('');
    const handleChangeSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const messages = currentChannel.messages;
        if (searchTerm != '') {
            const filteredMessages = messages.filter(
                (message) =>
                    message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    message.username.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setNewMessageList(filteredMessages);
            console.log(searchTerm);
        } else {
            setNewMessageList(currentChannel.messages);
        }
    }, [searchTerm]);

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
        if (message.message !== '' && message.message !== undefined && message.message !== null) {
            saveMessage(id_workspace, id_channel, message);
            setNewMessageList([...newMessageList, message]);
        }
    };

    const handleSubmitChannel = (e, channel) => {
        e.preventDefault();

        const newError = validateForm('channel_name', channel.channel_name);

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
        if (channel_id !== workspace.channels[0].id) {
            setNewChannel((prevState) => channels);
            deleteChannel(id_workspace, channel_id);
            navigate('/workspace/' + id_workspace + '/' + workspace.channels[0].id);
        } else {
            alert('No se puede eliminar el canal General');
        }
    };

    return (
        <>
            <Header workspace_name={workspace.workspace_name} handleChangeSearchTerm={handleChangeSearchTerm} />
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
        date: new Date().getTime(),
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
                <div className="top-buttons">
                    <div className="buttons-container">
                        <button className="icon-button">
                            <GoBold />
                        </button>
                        <button className="icon-button">
                            <GoItalic />
                        </button>
                        <button className="icon-button">
                            <FaStrikethrough />
                        </button>
                    </div>
                    <div className="buttons-container">
                        <button className="icon-button">
                            <FaLink />
                        </button>
                    </div>
                    <div className="buttons-container">
                        <button className="icon-button">
                            <RiListOrdered2 />
                        </button>
                        <button className="icon-button">
                            <GoListUnordered />
                        </button>
                    </div>
                    <div className="buttons-container">
                        <button className="icon-button">
                            <TbBlockquote />
                        </button>
                    </div>
                    <div className="buttons-container">
                        <button className="icon-button">
                            <FaCode />
                        </button>
                        <button className="icon-button">
                            <PiCodeBlockBold />
                        </button>
                    </div>
                </div>
                <div className="bottom-buttons">
                    <div className="buttons-container">
                        <button className="icon-button">
                            <GoPlusCircle />
                        </button>
                        <button className="icon-button">
                            <RxLetterCaseCapitalize />
                        </button>
                        <button className="icon-button">
                            <BsEmojiSmile />
                        </button>
                        <button className="icon-button">
                            <FaAt />
                        </button>
                    </div>
                    <div className="buttons-container">
                        <button className="icon-button">
                            <BsCameraVideo />
                        </button>
                        <button className="icon-button">
                            <IoMicOutline />
                        </button>
                    </div>
                    <div className="buttons-container">
                        <button className="icon-button">
                            <CgShortcut />
                        </button>
                    </div>
                </div>
                <button className="btn-submit icon-button" type="submit">
                    <IoSend />
                </button>
            </form>
        </div>
    );
}

export default Workspace;
