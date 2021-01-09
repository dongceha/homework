import React from 'react';
import { graphql } from 'gatsby';

const Article = ({data}) => {

    return (
        <div>
            <p>{data.markdownRemark.frontmatter.title}</p>
            <p>{data.markdownRemark.frontmatter.data}</p>
            <div dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}></div>
        </div>
    );
}

export default Article;
export const query = graphql`
    query ($slug: String) {
        markdownRemark(fields: {slug: {eq: $slug}}) {
            html
            frontmatter {
                title
                data
            }
            id
        }
    }  
`