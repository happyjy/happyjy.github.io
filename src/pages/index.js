import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import { Row, Col } from 'reactstrap';
import Post from "../components/Post"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home page</h1>
    <Row>
      <Col md="8">
        <StaticQuery query={indexQeury} render={data => {
          return (
              <div>
                  {data.allMarkdownRemark.edges.map(({ node }) => (
                      <Post 
                        title={node.frontmatter.title}
                        author={node.frontmatter.author}
                        path={node.frontmatter.path}
                        date={node.frontmatter.date}
                        body={node.excerpt}
                        fluid={node.frontmatter.image.childImageSharp.fluid}/>
                  ))}
              </div>
          )
        }}/>
      </Col>
      <Col md="4">
        <div style={{ width: "100%", height: "100%", backgroundColor: 'rgba(0,0,0,0.4)'}}></div>

      </Col>
    </Row>
  </Layout>   
)

const indexQeury = graphql`
    query allMarkDownRemark {
    __typename
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
        edges {
        node {
            id
            excerpt
            frontmatter {
              author
              date(formatString: "MMM Do YYYY")
              title
              path
              image{
                childImageSharp{
                  fluid(maxWidth: 600){
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
        }
        }
    }
    }

`

export default IndexPage
