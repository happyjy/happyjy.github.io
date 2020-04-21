import React from 'react';
import Layout from '../components/Layout';
import { graphql, StaticQuery } from 'gatsby';
import SEO from '../components/seo';
import Post from '../components/Post';
import PaginationLinks from '../components/PaginationLink';


const IndexPage = () => {
  const postsPerPage = 5;
  let numberOfPages;
  return (
    <Layout pageTitle="developBlog">
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <StaticQuery
        query={indexQuery}
        render={data => {
          numberOfPages = Math.ceil(data.allMarkdownRemark.totalCount / postsPerPage);
          return (
            <div>
              {data.allMarkdownRemark.edges.map(({ node }) => (
                <Post
                  key={node.id}
                  title={node.frontmatter.title}
                  slug={node.fields.slug}
                  author={node.frontmatter.author}
                  body={node.excerpt}
                  date={node.frontmatter.date}
                  fluid={node.frontmatter.image && node.frontmatter.image.childImageSharp.fluid}
                  tags={node.frontmatter.tags}
                />
              ))}
              <PaginationLinks 
                currentPage={1} 
                numberOfPages={numberOfPages}
              />
            </div>
          );
        }}
      />
    </Layout>
  );
}

const indexQuery = graphql`
  query indexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
export default IndexPage;