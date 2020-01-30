import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import './Block.css';

const Block = props => {
    return (
        <div className="block-loading">
            <span>Please Wait..</span>
            <div className="icon-loading">
                <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon>
            </div>
        </div>
    )
}

export default Block;