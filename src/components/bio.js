/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

function Bio(props) {
  const { isMember } = props

  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
            }}
          >
            <Image
              fixed={data.file.childImageSharp.fixed}
              style={{
                marginRight: 16,
                marginBottom: 0,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            ></Image>
            <p style={{ marginTop: -6 }}>
              {author
                ? isMember
                  ? `Written by NG-ZORRO team member ${author}.`
                  : `Written by ${author}.`
                : 'You are reading blogs published on NG-ZORRO Blog.'}{' '}
              <br />
              <a
                href={`https://twitter.com/${social.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow me on Twitter
              </a>
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }

    file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default Bio
