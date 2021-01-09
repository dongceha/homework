import {useState, useEffect} from 'react';
function useLogin() {
    const [status, setStatus] = useState([false, true]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        // if (token) {
            (async function() {
                // axios.get('/user', {
                // })
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                })
                setStatus([true, false])
            })()
        // } else {
        //     setStatus([false, false]);
        // }
    }, []);
    return status;
}

export default useLogin;
