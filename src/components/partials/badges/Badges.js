import React from 'react';
import './Badges.css';

const Badges = props => {
    return(
        <span className="badges">{props.message}</span>
    )
}

export default Badges;