/** @jsx jsx */
import { jsx } from "theme-ui"

import { Link, useStaticQuery, graphql } from "gatsby"
import ColorToggle from './color-mode-toggle'
import PropTypes from "prop-types"

/*
 * TODO: add categories
 */
const Header = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        simplifiedDate: buildTime(formatString:"MMM DD, YYYY")
        fullDate: buildTime(formatString:"dddd, MMMM DD, YYYY")
      }

      categories: allWpCategory(filter: {name: {in: ["World", "U.S.", "Travel", "Tech", "Entertainment", "Opinion", "Politics", "Science", "Sports", "World", "Food"]}}, sort: {fields: name, order: ASC}) {
        nodes {
          name
          uri
        }
  }
    }
  `)
  return (
    <header>
      <nav sx={{
        padding: 2
      }}>
        <div sx={{
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `flex-end`
        }}>
          <h2 sx={{ margin: 0, fontWeight: `normal`, fontSize: [10, 12] }}>
            <span sx={{ display: [`inline-block`, `none`]}}>
              {data.site.simplifiedDate}
            </span>
            <span sx={{ display: [`none`, `none`, `inline-block`]}}>
              {data.site.fullDate}
            </span>
          </h2>
          <h1 sx={{ margin: 0, fontFamily: `UnifrakturMaguntia`, fontSize: [3, 4, 6] }}>
            <Link
              to="/"
              sx={{
                color: `text`,
                textDecoration: `none`
              }}
            >
              The Gatsby Times
            </Link>
          </h1>
          <h2 sx={{ display: `flex`, flexDirection: `column`, alignItems: `center`, margin: 0, fontSize: [10, 12], fontWeight: `normal` }}>
            <ColorToggle />
            <Link to="/today/" sx={{ display: `block`, color: 'accent', textDecoration: `none` }}>
              Today<span sx={{ display: [`none`, `none`, `inline-block`]}}>{`'s Paper`}</span>
            </Link>
          </h2>
        </div>
        <div sx={{
          mt: 1,
          mb: 1,
          padding: [1, 2],
          borderTop: theme => `1px solid ${theme.colors.text}`,
          borderBottom: theme => `1px solid ${theme.colors.text}`,
          overflowX: `scroll`
        }}>
          <ul sx={{
            margin: `0 auto`,
            padding: 0,
            display: `flex`,
            justifyContent: `space-between`,
            width: ['100%', '75%', '50%']
          }}>
            {
              data.categories.nodes
                .map(({ name, uri }) => (
                  <li key={uri} sx={{
                    listStyleType: `none`,
                    fontSize: 1,
                    padding: 1
                  }}><Link to={uri} activeClassName="active" sx={{
                    color: `text`,
                    textDecoration: `none`,
                    padding: 1,
                    transition: `transitions.ease`,
                    ':hover, &.active': {
                      backgroundColor: `text`,
                      color: `background`
                    }
                  }}>{name}</Link></li>
                ))
            }
          </ul>
        </div>
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
