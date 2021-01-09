import React from 'react';
import {navigate} from 'gatsby';
import useLogin from '../hooks/useLogin';
const PrivateRoute = ({component: Component, ...rest}) => {
    const [isLogin, loading] = useLogin();
    console.log(isLogin, loading)
    if (loading) return null;
    if (isLogin) return <Component {...rest}></Component>;
    navigate('/');
    return null
    // return (
    //     <div>
            
    //     </div>
    // );
}

export default PrivateRoute;
