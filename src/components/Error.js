import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name: Error.
 * @description: Component to display error message.
 * @param: Message to display.
 * @return: Formatted message view.
 */
const Error = ({message}) => {
    return (
        <p className="errorMessage">
            {message}
        </p>
    );
};

Error.propTypes = {
    message: PropTypes.string.isRequired
}

export default Error;