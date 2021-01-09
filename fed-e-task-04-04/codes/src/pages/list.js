import React from 'react';
import Header from '../components/Header'
import { graphql } from 'gatsby';
const list = ({data}) => {
    return (
        <div>
            <Header></Header>
            {
                data.allMarkdownRemark.nodes.map(node => {
                    return (
                        <div key={node.id}>
                            <p>{node.frontmatter.title}</p>
                            <p>{node.frontmatter.data}</p>
                            <div dangerouslySetInnerHTML={{__html: node.html}}></div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default list;
export const query = graphql`
query {
    allMarkdownRemark {
      nodes {
        frontmatter {
          title
          data
        }
        html
        id
        fileAbsolutePath
        internal {
          type
        }
      }
    }
  }
  
`