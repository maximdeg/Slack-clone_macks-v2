import { getWorkspaceById, getWorkspaces, saveToLocalStorage } from './handleWorkspaces';

/**
 * Returns the channel with the given idChannel from the workspace with the given idWorkspace.
 * @param {string} idWorkspace - The id of the workspace to search in.
 * @param {string} idChannel - The id of the channel to search for.
 * @returns {Array} The channel with the given idChannel from the workspace with the given idWorkspace, or an empty array if it is not found.
 */
export const getChannelById = (idWorkspace, idChannel) => {
    const workspaceToFind = getWorkspaceById(idWorkspace);
    return workspaceToFind.channels.filter((channel) => channel.id === idChannel);
};

/**
 * Returns an array of all channels from the workspace with the given idWorkspace.
 * @param {string} idWorkspace - The id of the workspace to search in.
 * @returns {Array} An array of all channels from the workspace with the given idWorkspace.
 */
export const getChannelsFromWorkspace = (idWorkspace) => {
    const workspace = getWorkspaceById(idWorkspace);
    return workspace.channels;
};

/**
 * Saves a channel to the workspace with the given idWorkspace.
 * @param {string} idWorkspace - The id of the workspace to save the channel to.
 * @param {Object} channel - The channel to save. Must contain an id and a name.
 */
export const saveChannel = (idWorkspace, channel) => {
    const workspaces = getWorkspaces();
    const workspaceIndex = workspaces.findIndex((workspace) => workspace.id === idWorkspace);
    workspaces[workspaceIndex].channels.push(channel);
    saveToLocalStorage(workspaces);
};

