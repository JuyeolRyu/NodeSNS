import Error from 'next/error';
import React from 'react';
import PropTypes from 'prop-types';

const MyError = ({statusCode}) => {
    return (
        <div>
            <h1>{statusCode} Error</h1>
            <Error statusCode={statusCode} />
        </div>
    );
};

MyError.propTypes = {
    statusCode: PropTypes.number,
}
MyError.defaultProps = {
    statusCode: 400,
}

MyError.getInitialProps = async (context) => {
    const statusCode = context.res ? context.res.stautsCode : context.err ? context.err.stautsCode: null;
    return {statusCode}
};

export default MyError;