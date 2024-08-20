import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';

import { useGlobalContext } from '../../context/GlobalContext';
import './WorkspaceNavigator.css';

function WorkspaceNavigator({ selected, isResponsive }) {
    const { getWorkspaces } = useGlobalContext();
    const workspaces = getWorkspaces();

    const WorkspacesNav = workspaces.map((workspace) => {
        return (
            <Link
                key={workspace.id}
                to={'/workspace/' + workspace.id + '/' + workspace.channels[0].id}
                className="link"
            >
                <div className={workspace.id === selected ? 'workspace-squares selected' : 'workspace-squares'}>
                    <span className="initials-span">
                        {workspace.workspace_name[0].toUpperCase()}
                        {workspace.workspace_name.split(' ')[1] &&
                            workspace.workspace_name.split(' ')[1][0].toUpperCase()}
                    </span>
                </div>
            </Link>
        );
    });

    return (
        <div className={isResponsive === true ? 'workspaces-navigator inside-responsive' : 'workspaces-navigator'}>
            <div className="workspace-squares-container">{WorkspacesNav}</div>
            <div className="user-container">
                <Link to={'/workspace/new'} className="link">
                    <div className="plus-icon-container">
                        <BsFillPlusCircleFill />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default WorkspaceNavigator;
