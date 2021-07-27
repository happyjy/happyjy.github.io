/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"

import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import "../styles/index.scss"
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"

/**
 * children: '렌더 속성값'을 이용
 *  - Layout component에는 children(렌더속성값)사용해 아래 component에서 Wrapper Compnent로 사용해 Layout을 잡고 있다.
 *
 *   src/pages/404.js:
 *   src/pages/about.js:
 *   src/pages/index.js:
 *   src/pages/team.js:
 *   src/templates/author-post.js:
 *   src/templates/categories-page.js:
 *   src/templates/category-posts.js:
 *   src/templates/post-list.js:
 *   src/templates/single-post.js:
 *   src/templates/tag-posts.js:
 *   src/templates/tags-page.js:
 */
const Layout = ({
  authorImageFluid,
  children,
  pageTitle,
  postAuthor,
  tableOfContents,
  numberOfPost,
  useSidebar = true,
}) => {
  // console.log("### Layout: ", {
  //   authorImageFluid,
  //   children,
  //   pageTitle,
  //   postAuthor,
  //   tableOfContents,
  //   numberOfPost,
  // })
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        className="container"
        id="content"
        style={{ paddingLeft: "5px", paddingRight: "5px" }}
      >
        {/* <h1 className="textCenter">{pageTitle}</h1> */}
        <Row
          style={
            {
              // marginRight: "-85px",
              // marginLeft: "-85px",
              // marginTop: "-40px",
            }
          }
        >
          {!!useSidebar && (
            <>
              {/* <Col md="9" style={{ paddingRight: "0px", paddingLeft: "0px" }}> */}
              <Col md="9">{children}</Col>
              <Col md="3">
                <Sidebar
                  author={postAuthor}
                  authorFluid={authorImageFluid}
                  tableOfContents={tableOfContents}
                />
              </Col>
            </>
          )}
          {!useSidebar && <Col>{children}</Col>}
        </Row>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
