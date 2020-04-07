import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import Post from "../components/Post"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home page</h1>
    <StaticQuery query={indexQeury} render={data => {
        return (
            <div>
                {data.allMarkdownRemark.edges.map(({ node }) => (
                    <Post 
                      title={node.frontmatter.title}
                      author={node.frontmatter.author}
                      path={node.frontmatter.path}
                      date={node.frontmatter.date}
                      body={node.frontmatter.body}/>
                ))}
            </div>
        )
    }}/>
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
            }
        }
        }
    }
    }

`

export default IndexPage
