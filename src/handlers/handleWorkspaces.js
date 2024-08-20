import { WORKSPACES } from '../data/workspaces.json';

/**
 * @function getWorkspaces
 * @description Gets the array of workspaces stored in localStorage.
 *              If no workspaces are stored, it stores the workspaces from
 *              the data/workspaces.json file and returns them.
 * @returns {object[]} The array of workspaces.
 */
export const getWorkspaces = () => {
    const workspaces = localStorage.getItem('workspaces');
    if (!workspaces) {
        localStorage.setItem('workspaces', JSON.stringify(WORKSPACES));
        return WORKSPACES;
    } else {
        return JSON.parse(localStorage.getItem('workspaces'));
    }
};

/**
 * Saves the array of workspaces to localStorage.
 *
 * @param {object[]} workspaces - The array of workspaces to be saved.
 */
export const saveToLocalStorage = (workspaces) => {
    localStorage.setItem('workspaces', JSON.stringify(workspaces));
};

/**
 * Creates a new workspace and adds it to the array of workspaces.
 * This function automatically saves the updated array to localStorage.
 *
 * @param {object} workspace - The workspace to be created. Must contain an id and a name.
 */
export const createWorkspace = (workspace) => {
    const workspaces = getWorkspaces();
    workspaces.push(workspace);
    saveToLocalStorage(workspaces);
};

/**
 * Deletes a workspace from the array of workspaces.
 * The workspace to be deleted is identified by its id.
 * This function automatically saves the updated array to localStorage.
 *
 * @param {string} id - The id of the workspace to be deleted.
 */
export const deleteWorkspaceById = (id) => {
    const workspaces = getWorkspaces();
    const index = workspaces.findIndex((workspace) => workspace.id === id);
    workspaces.splice(index, 1);
    saveToLocalStorage(workspaces);
};



/**
 * Returns the workspace with the given id, or undefined if it is not found.
 *
 * @param {string} id - The id of the workspace to search for.
 * @return {object|undefined} The workspace with the given id, or undefined if it is not found.
 */
export const getWorkspaceById = (id) => {
    const workspaces = getWorkspaces();
    return workspaces.find((workspace) => workspace.id === id);
};
