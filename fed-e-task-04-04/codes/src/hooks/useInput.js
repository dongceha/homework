import {useState} from 'react';

export const useInput = (init) => {
    const [value, setValue] = useState(init);
    const onChange = (e) => {
        setValue(e.target.value)
    }
    const __resetvalue = () => {
        setValue('')
    }
    return {
        value,
        onChange,
        __resetvalue
    }
}
export default useInput;