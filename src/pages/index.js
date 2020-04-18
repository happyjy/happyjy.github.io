import React from 'react'
import Layout from '../components/Layout'
import { graphql, StaticQuery } from 'gatsby'
import SEO from '../components/seo'
import Post from '../components/Post'

const IndexPage = () => (
  <Layout pageTitle="CodeBlog">
    <SEO title="Home" />
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
  </Layout>   
)

const indexQeury = graphql`
    query allMarkDownRemark {
      __typename
      allMarkdownRemark(
        sort: {fields: [frontmatter___date], order: DESC}
        limit: 2
      ) {
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
