import React from 'react'
import { Switch, Icon, Popover, List } from 'antd'
import { Link, graphql, StaticQuery } from 'gatsby'
import Image from 'gatsby-image'
import { defaultLangKey } from '../../../../i18n'

import './header.css'
import Navigation from '../navigation/navigation'

const windowGlobal = typeof window !== 'undefined' && window

/**
 * The header component.
 */
export default class Header extends React.Component {
  constructor(props) {
    super(props)

    const dark = this.loadDarkModeAsIs()

    this.state = { dark }
    this.toggleDark(dark)
  }

  onToggleDarkMode = () => {
    const { dark } = this.state

    this.setState({ dark: !dark })
    this.storeDarkMode(!dark)
    this.toggleDark(!dark)
  }

  toggleDark = dark => {
    if (windowGlobal) {
      windowGlobal.document.body.classList.add(dark ? 'dark' : 'light')
      windowGlobal.document.body.classList.remove(dark ? 'light' : 'dark')
    }
  }

  loadDarkModeAsIs = () => {
    if (windowGlobal) {
      return (
        windowGlobal.localStorage.getItem('ng-zorro-blog.darkMode') === 'true'
      )
    }

    return false
  }

  storeDarkMode = dark => {
    if (windowGlobal) {
      return windowGlobal.localStorage.setItem('ng-zorro-blog.darkMode', dark)
    }
  }

  renderSwitch = () => {
    const { dark } = this.state

    return (
      <Switch
        id="dark-switch"
        checked={dark}
        checkedChildren={<Icon type="poweroff" />}
        unCheckedChildren={<Icon type="bulb" />}
        onChange={() => this.onToggleDarkMode()}
        defaultChecked={dark}
      />
    )
  }

  renderDropdownMenu = () => (
    <Navigation>
      <List.Item>
        <List.Item.Meta title={<Icon type="bulb" />} />
        {this.renderSwitch()}
      </List.Item>
    </Navigation>
  )

  render() {
    const { title, langKey } = this.props

    return (
      <header id="header" className="clearfix">
        <span id="logo">
          <StaticQuery
            query={headerQuery}
            render={data => {
              return (
                <Image
                  fixed={data.file.childImageSharp.fixed}
                  imgStyle={{ borderRadius: '50%' }}
                ></Image>
              )
            }}
          ></StaticQuery>
          <Link
            to={
              langKey ? (langKey !== defaultLangKey ? `/${langKey}` : `/`) : '/'
            }
            id="name"
          >
            {title || 'NG-ZORRO BLOG'}
          </Link>
        </span>
        {this.renderSwitch()}
        <Popover
          arrowPointAtCenter
          content={this.renderDropdownMenu()}
          placement="bottomRight"
          trigger="click"
        >
          <Icon id="mobile-menu" type="menu" />
        </Popover>
      </header>
    )
  }
}

const headerQuery = graphql`
  query HeaderQuery {
    file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
