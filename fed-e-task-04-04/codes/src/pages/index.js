import React, {useState} from "react"
import { Link, graphql } from 'gatsby';
import SEO from '../components/SEO';
import Counter from '../components/Counter';
import styles from '../style/index.module.less'
import Board from '../components/Board'
import { useSelector } from 'react-redux';

export default function Home({data}) {
  const [show, setShow] = useState(false);
  const [netIndex, setNetIndex] = useState();
  const handleClick = (index) => {
    // console.log('click')
    if (isNaN(index)) {
      setShow(true);
      setNetIndex(null);
    } else {
      setNetIndex(index);
      setShow(true);
    }
  }
  const networks = useSelector((store) => {
    return store.networkReducer.networks
  });
  return (
    <>
      {show && <Board network={networks[netIndex]} index={netIndex} show={show} setShow={setShow}/> }
      <div className={styles.wrapper}>
        {
          networks?.map((net, index) => {
            return (<div onClick={() => handleClick(index)} key={net.key} className={styles.iconWrapper}>
              <p className={styles.icon}>+</p>
              <p className={styles.text}>{net.name}</p>
            </div>)
          })
        }
        <div onClick={handleClick} className={styles.iconWrapper}>
          <p className={styles.icon}>+</p>
          <p className={styles.text}>添加快捷方式</p>
        </div>
      </div>
    </>
  )
}
