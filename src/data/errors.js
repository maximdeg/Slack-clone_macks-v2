const validateWorkspaceLength = (value) => {
    return value.length > 5;
};

const validateChannelLength = (value) => {
    return value.length > 3;
};

const validateEmptyFields = (value) => {
    return value !== '' && value !== null && value !== undefined;
};

export const ERRORS = {
    WORKSPACE_LENGTH: {
        message: '*Tu workspace debe tener mas de 5 caracteres',
        id: 1,
        property: 'workspace_name',
        validate: validateWorkspaceLength,
    },
    CHANNEL_LENGTH: {
        message: '*El nombre del canal debe tener mas de 3 caracteres',
        id: 2,
        property: 'channel_name',
        validate: validateChannelLength,
    },
    EMPTY_FIELD: {
        message: '*Por favor rellena este campo',
        id: 3,
        validate: validateEmptyFields,
    },
    CHANNEL_ALREADY_EXISTS: {
        message: '*Ya existe un canal con este nombre',
        id: 4,
        property: 'channel_name',
        validate: validateEmptyFields,
    },
    WORKSPACE_ALREADY_EXISTS: {
        message: '*Ya existe un workspace con este nombre',
        id: 5,
        property: 'workspace_name',
        validate: validateEmptyFields,
    },
};
