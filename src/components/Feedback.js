import React from 'react';
import PropTypes from 'prop-types';

const Feedback = (props) => (
    <div className={'feedback-wrapper' + (props.loading || props.updating ? '' : ' hidden')}>
        <div className="feedback">
            { props.loading ? (
                <p>Loading books...</p>
            ) : props.updating ? (
                <p>Updating, please wait.</p>
            ) : ''}
        </div>
    </div>
);

Feedback.propTypes = {
    loading: PropTypes.bool.isRequired,
    updating: PropTypes.bool.isRequired
};

export default Feedback;
