import React from 'react';
import Aux from '../../hoc/Aux';
import './MainPannel.css';

class MainPannel extends React.Component {
    render() {
        return (
            <Aux>
                <div className="main-panel">
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default MainPannel;