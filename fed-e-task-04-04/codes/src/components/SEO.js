import React from 'react';
import {graphql, useStaticQuery} from 'gatsby'
import {Helmet} from 'react-helmet'
const SEO = ({title, description, meta, lang}) => {
    const {site } = useStaticQuery(graphql`
      query {
          site {
              siteMetadata {
                  title
                  description
              }
          }
      }
    `);
    const metaDescription = description | site.siteMetadata.description
    return (
        <Helmet
          htmlAttributes={{lang}}
          title={title}
          titleTemplate={`%s | ${site.siteMetadata.title}`}
          meta={
              [
                {
                    name: 'description',
                    content: metaDescription,
                }
              ].concat(meta)
          }
          />
    );
}

export default SEO;
SEO.defaultProps = {
    description: 'test description',
    meta: [],
    lang: 'en',
}