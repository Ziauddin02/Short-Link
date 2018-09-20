import React from 'react';
import { Link} from 'react-router';

export default () => {
    return (
        <div>
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Page not found</h1>
                    <p>We're unable to find that page.</p>
                    <Link to="/" className="button button--link">HEAD HOME</Link>
                </div>
                
            </div>
        </div>
    );
};