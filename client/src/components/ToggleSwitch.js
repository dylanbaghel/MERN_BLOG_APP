import React from 'react';
import Switch from 'react-switch';

class ToggleSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(checked) {
        this.props.onToggle(checked);
    }

    render() {
        return (
            <label htmlFor="normal-switch">
                <Switch 
                    onChange={this.handleToggle}
                    checked={this.props.checked}
                    id="normal-switch"
                />
            </label>
        );
    }
}

export default ToggleSwitch;