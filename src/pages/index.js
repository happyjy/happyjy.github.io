import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { graphql, StaticQuery } from 'gatsby'
import { Row, Col } from 'reactstrap'
import Post from '../components/Post'
import SideBar from  '../components/Sidebar'

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
                        key={node.id}
                        title={node.frontmatter.title}
                        author={node.frontmatter.author}
                        slug={node.fields.slug}
                        date={node.frontmatter.date}
                        body={node.excerpt}
                        fluid={node.frontmatter.image.childImageSharp.fluid}
                        tags={node.frontmatter.tags}
                        category={node.frontmatter.category}
                      />
                  ))}
              </div>
          )
        }}/>
      </Col>
      <Col md="4">
        <SideBar></SideBar>
        {/* <div style={{ width: "100%", height: "100%", backgroundColor: 'rgba(0,0,0,0.4)'}}></div> */}

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
            frontmatter {
              author
              date(formatString: "MMM Do YYYY")
              title
              category
              tags
              image {
                childImageSharp{
                  fluid(maxWidth: 600){
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            fields{
              slug
            }
            excerpt
          }
        }
      }
    }
`

export default IndexPage
