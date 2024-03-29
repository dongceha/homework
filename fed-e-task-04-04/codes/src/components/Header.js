import React from 'react';
import { graphql, useStaticQuery } from 'gatsby'
const Header = () => {
    const data = useStaticQuery(graphql`
        query {
            site {
            siteMetadata {
                author
                title
            }
            }
        }
    `);
    return (
        <div>
            <p>{data.site.siteMetadata.title}</p>
            <p>{data.site.siteMetadata.author}</p>
        </div>
    );
}

export default Header;
