import React from 'react';
import Loader from '../Components/command/Preloader/Loader';

export const WithSuspence = (Component) => {
    return (props) => {
        return <React.Suspense fallback={<Loader/>}><Component {...props}/></React.Suspense>
    } 
}