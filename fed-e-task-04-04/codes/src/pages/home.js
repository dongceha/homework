import React from "react"
import { Link, graphql } from 'gatsby';
import SEO from '../components/SEO';
import Counter from '../components/Counter';
import styles from '../style/index.module.less'

export default function Home({data}) {
  return (
    <>
      <SEO title="index page"></SEO>
      <div>
        <Counter />
        <Link to="/person/zhangsan">张三</Link>
        <Link to="/person/lisi">李四</Link>
        <p className={styles.red}>{data.site.siteMetadata.title}</p>
        <p>{data.site.siteMetadata.author}</p>
      </div>
    </>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        author
        title
      }
    }
  }
`