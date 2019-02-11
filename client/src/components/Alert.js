import React from 'react';
import { connect } from 'react-redux';

const Alert = ({
    flash
}) => {
    let alertClass = 'alert';
    if (flash.type) {
        if (flash.type === 'error') {
            alertClass += ' alert-danger';
        } else if (flash.type === 'success') {
            alertClass += 'alert-success'
        }
        return (
            <div className="container">
                <div className={alertClass}>{flash.message}</div>
            </div>
        )
    } else {
        return <React.Fragment></React.Fragment>
    }
};

const mapStateToProps = (state) => {
    return {
        flash: state.flash
    }
};

export default connect(mapStateToProps)(Alert);