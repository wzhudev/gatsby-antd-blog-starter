import React, { Fragment } from 'react'
import { Col, Row } from 'antd'
import { StaticQuery } from 'gatsby'

import Header from './header/header'
import Navigation from './navigation/navigation'

import './layout.css'

class Layout extends React.Component {
  render() {
    const { children, title, langKey } = this.props

    return (
      <StaticQuery
        query={layoutQuery}
        render={data => (
          <Fragment>
            <div className="wrapper">
              <Header title={title} langKey={langKey} />
              <Row gutter={48}>
                <Col
                  xs={0}
                  sm={0}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                  className="side-bar"
                >
                  <Navigation />
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                  <main>{children}</main>
                </Col>
              </Row>
              <footer>
                © {new Date().getFullYear()}, {data.site.siteMetadata.author}{' '}
                with ❤️
                <br />
                <a
                  href={`https://github.com/${data.site.siteMetadata.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                {' • '}
                <a
                  href={`https://twitter.com/${data.site.siteMetadata.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                {' • '}
                {/* TODO: change this to your URL. */}
                <a
                  href="https://example.com/rss.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RSS
                </a>
              </footer>
            </div>
          </Fragment>
        )}
      />
    )
  }
}

const layoutQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        author
        title
        social {
          twitter
          github
        }
      }
    }
  }
`

export default Layout
