import { createContext, useContext } from 'react';
import { getWorkspaces, getWorkspaceById, createWorkspace } from '../handlers/handleWorkspaces.js';
import { getChannelsFromWorkspace, getChannelById, saveChannel, deleteChannel } from '../handlers/handleChannels.js';
import { saveMessage, getMessagesFromChannel } from '../handlers/handleMessages.js';
import { validateForm } from '../handlers/handleErrors.js';

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    return (
        <GlobalContext.Provider
            value={{
                getWorkspaces,
                getChannelsFromWorkspace,
                getChannelById,
                getWorkspaceById,
                getMessagesFromChannel,
                saveMessage,
                saveChannel,
                createWorkspace,
                deleteChannel,
                validateForm,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export { useGlobalContext, GlobalContextProvider };
