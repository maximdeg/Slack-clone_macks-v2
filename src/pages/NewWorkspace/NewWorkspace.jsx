import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import HeaderHome from '../../components/HeaderHome/HeaderHome';

import { useGlobalContext } from '../../context/GlobalContext';

import './NewWorkspace.css';

function NewWorkspace() {
    const { createWorkspace, getWorkspaces, validateForm } = useGlobalContext();
    const [newWorkspace, setNewWorkspace] = useState(getWorkspaces());

    const navigate = useNavigate();
    const initialStateWorkspace = {
        id: uuid(),
        workspace_name: '',
        channels: [
            { channel_name: 'General', messages: [], id: '' },
            { channel_name: '', messages: [], id: '' },
        ],
    };
    const [workspace, setWorkspace] = useState(initialStateWorkspace);
    const [error, setError] = useState(null);

    const handleWorkspaceChange = (e) => {
        setWorkspace({
            ...workspace,
            [e.target.name]: e.target.value,
        });
    };

    const handleChannelChange = (e) => {
        setWorkspace({
            ...workspace,
            channels: [
                { channel_name: 'General', messages: [], id: '' },
                { channel_name: e.target.value, messages: [], id: '' },
            ],
        });
    };

    const handleSubmitWorkspace = (e) => {
        e.preventDefault();

        const newWorkspaceError = validateForm('workspace_name', workspace.workspace_name);
        const newChannelError = validateForm('channel_name', workspace.channels[1].channel_name);

        if (newWorkspaceError) {
            setError((prevState) => newWorkspaceError);
        } else if (newChannelError) {
            if (newChannelError.id === 3) {
                workspace.channels.splice(-1, 1);
                workspace.channels[0].id = uuid();
                setNewWorkspace([...newWorkspace, workspace]);
                createWorkspace(workspace);
                navigate('/');
            } else {
                setError((prevState) => newChannelError);
            }
        } else {
            workspace.channels[0].id = uuid();
            workspace.channels[1].id = uuid();
            setNewWorkspace([...newWorkspace, workspace]);
            createWorkspace(workspace);
            navigate('/');
        }
    };

    return (
        <>
            <HeaderHome />
            <main className="new-workspace_main">
                <div className="title-container">
                    <h1>Crea un entorno de trabajo</h1>
                </div>
                <div className="new-workspace-container">
                    <form onSubmit={(e) => handleSubmitWorkspace(e)} className="new-workspace-form">
                        <div className="input-workspace_container container">
                            <label className="label" htmlFor="workspace_name">
                                Nombre del entorno de trabajo*
                            </label>
                            <input
                                type={workspace.workspace_name}
                                name="workspace_name"
                                id="workspace_name"
                                onChange={handleWorkspaceChange}
                                value={workspace.workspace_name}
                                className="input input-new"
                                required
                            />
                        </div>
                        <div className="input-channel_container container">
                            <div className="container">
                                <label className="label" htmlFor="channel_name">
                                    Nombre del canal #
                                </label>
                                <input
                                    type={workspace.channels[1].channel_name}
                                    name="channel_name"
                                    id="channel_name"
                                    onChange={handleChannelChange}
                                    value={workspace.channels[1].channel_name}
                                    className="input input-new"
                                />
                            </div>
                            <div>
                                <span>*Por defecto se va a crear un canal #General aun si no completa este campo</span>
                            </div>
                        </div>
                        {error && <div className="error">{error.message}</div>}
                        <div className="container buttons-container_container">
                            <Link to={'/'}>
                                <button className="button btn-cancel-workspace">Cancelar</button>
                            </Link>
                            <button type="submit" className="button btn-create-workspace">
                                Crear
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default NewWorkspace;
