import React from 'react';
import Layout from '../components/Layout';
import Post from '../components/Post';
import PaginationLinks from '../components/PaginationLink';
import { graphql } from 'gatsby'

const postList = props => {
  //# 해당 컴포넌트에서의 props는 아래 두가지가 있다. 
  // 1."gatsby-node"에서 설정한 createPage의 context 파라미터가 props.pageContext로 
  // 2. graphql의 return value가 props.data로 넘어 온다. 
  const posts = props.data.allMarkdownRemark.edges;
  const { currentPage, numberOfPages } = props.pageContext;
  console.log("### postList");
  console.log(props.pageContext);

  return (
    <Layout pageTitle={`Page: ${currentPage}`}>
      {posts.map(({ node }) => (
        <Post
          key={node.id}
          slug={node.fields.slug}
          title={node.frontmatter.title}
          author={node.frontmatter.author}
          date={node.frontmatter.date}
          body={node.excerpt}
          tags={node.frontmatter.tags}
          fluid={node.frontmatter.image && node.frontmatter.image.childImageSharp.fluid}
        />
      ))}
      <PaginationLinks
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Layout>
  )
}

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM Do YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 650, maxHeight: 371) {
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

export default postList;