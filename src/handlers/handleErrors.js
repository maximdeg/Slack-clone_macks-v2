import { ERRORS } from '../data/errors';


const handleErrors = (from, value) => {
    for (const key in ERRORS) {
        if (ERRORS[key].property === from) {
            if (!ERRORS[key].validate(value)) {
                return ERRORS[key];
            }
        }
    }
};
export const validateForm = (from, value) => {
    let errors;
    if (!value) {
        errors = ERRORS.EMPTY_FIELD;
    } else {
        errors = handleErrors(from, value);
    }

    return errors;
};
