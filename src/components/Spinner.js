import React from 'react';
import './Spinner.css';

/**
 * @name: Spinner.
 * @description: Spinner loading component.
 * @param: none.
 * @return: Spinner view.
 */
const Spinner = () => {
    return ( 
        <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
    );
};

export default Spinner;