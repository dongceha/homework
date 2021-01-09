import React, {useMemo, useEffect} from 'react';
import useInput from '../hooks/useInput';
import styles from './board.module.less';
import { useDispatch } from 'react-redux';

const Board = (props) => {
    const {show, setShow, network: targetNetwork, index} = props;
    const {__resetvalue: resetName, ...name} = useInput(targetNetwork?.name || '');
    const {__resetvalue: resetNetWork, ...network} = useInput(targetNetwork?.network || '');
    const dispatch = useDispatch();
    useEffect(() => {
        if (!show) {
            resetName();
            resetNetWork()
        }
    }, [show]);
    const handleSure = () => {
        if (!targetNetwork?.network) {
            console.log('dispatch')
            dispatch({
                type: 'addNetWork',
                payload: {
                    name: name.value,
                    network: network.value
                }
            });
        } else {
            console.log('renameNetWork')
            dispatch({
                type: 'renameNetWork',
                payload: {
                    index,
                    name: name.value,
                    network: network.value,
                }
            });
        }
        setShow(false);
        console.log('====', targetNetwork, name.value, network.value);
    }
    const handleClick = () => {
        setShow(false);
        dispatch({
            type: 'deleteNetWork',
            payload: index
        });
    }
    const disabled = useMemo(() => {
        return !!name.value.trim() && !!network.value.trim()
    }, [name.value, network.value]);
    if (!show) return null;
    return (
        <div className={styles.boardWrapper}>
            <p className={styles.title}>添加快捷方式</p>
            <div className={styles.boardList}>
                <p className={styles.boardLabel}>名称</p>
                <p className={styles.boardInput}> <input {...name}/> </p>
            </div>
            <div className={styles.boardList}>
                <p className={styles.boardLabel}>网址</p>
                <p className={styles.boardInput}> <input {...network}/> </p>
            </div>
            <div className={styles.boardButton}>
                <p>
                  <button onClick={handleClick}>删除</button>
                </p>
                <p>
                  <button onClick={() => setShow(false)} className={styles.cancel}>取消</button>
                  <button onClick={handleSure} disabled={!disabled}>完成</button>
                </p>
            </div>
        </div>
    );
}

export default Board;
