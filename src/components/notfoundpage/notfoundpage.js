import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="container">
            <h1 className="text-center" style={{marginTop: 100}}>404 Page Not Found:</h1>
            <h3 style={{marginTop: 100}}>(>'o')> Oh no! It seems the resource you are looking for does not exist.</h3>
            <div className="list-group">
                <Link to="/" className="list-group-item list-group-item-dark">Return Home</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;