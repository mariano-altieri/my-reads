import React from 'react';

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

export default Feedback;
