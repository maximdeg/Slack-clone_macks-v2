import { getChannelById } from '../handlers/handleChannels.js';
import { getWorkspaces, saveToLocalStorage } from './handleWorkspaces.js';

/**
 * Returns the messages from a channel.
 *
 * @param {string} workspaceId - The ID of the workspace the channel is in.
 * @param {string} channelId - The ID of the channel to get messages from.
 * @return {Array} An array of messages from the channel.
 */
export const getMessagesFromChannel = (workspaceId, channelId) => {
    const [channel] = getChannelById(workspaceId, channelId);
    if (!channel) return [];
    return channel.messages;
};

/**
 * Adds a message to a channel in a workspace.
 *
 * @param {string} workspaceId - The ID of the workspace the channel is in.
 * @param {string} channelId - The ID of the channel to add the message to.
 * @param {Object} message - The message object to add.
 * @return {void} This function does not return anything.
 */
export const saveMessage = (workspaceId, channelId, message) => {
    const workspaces = getWorkspaces();
    const workspaceIndex = workspaces.findIndex((workspace) => workspace.id === workspaceId);
    const channelIndex = workspaces[workspaceIndex].channels.findIndex((channel) => channel.id === channelId);

    workspaces[workspaceIndex].channels[channelIndex].messages.push(message);

    saveToLocalStorage(workspaces);
};
