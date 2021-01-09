import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

const Product = ({data}) => {
    return data.allProductsJson.nodes.map(node => (
        <div key={node.id}>
            <p>{node.title}</p>
            <p>{node.address}</p>
            <p>{node.price}</p>
            <div style={{width: 400}}>
                <Img fixed={node.url.childImageSharp.fixed}/>
            </div>
        </div>
    ));
}

export default Product;
export const query = graphql`
    query {
        allProductsJson {
            nodes {
                address
                id
                title
                url {
                    childImageSharp {
                        fixed(width: 200, height: 200) {
                            aspectRatio
                            src
                            srcSet
                            height
                            width
                        }
                    }
                }
                price
            }
        }
    }
  
`