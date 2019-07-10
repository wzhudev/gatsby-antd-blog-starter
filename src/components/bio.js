import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

function Bio(props) {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { social, title } = data.site.siteMetadata
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
            />
            <p style={{ marginTop: -6 }}>
              You are reading blogs published on ${title}.
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
        title
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
