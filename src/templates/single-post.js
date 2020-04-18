import React from 'react';
import Layout from '../components/Layout';
import { graphql, Link} from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import { Badge, Card, CardBody, CardSubtitle } from 'reactstrap';
import { slugify } from '../util/utilityFunctions';
import authors from '../util/authors';


const SinglePost = ({ data }) => {
  const post = data.markdownRemark.frontmatter; 
  const author = authors.find(x => x.name === post.author);
  console.log(author);
  console.log(data.file.childImageSharp.fluid);
  return (
    <Layout 
      pageTitle={post.title} 
      postAuthor={author} 
      authorImgFluid={data.file.childImageSharp.fluid}>
      <SEO title={post.title}/>
      <Card>
        <Img className="card-image-top" fluid={post.image.childImageSharp.fluid}/>
        <CardBody>
          <CardSubtitle>
            <span className="text-info">{post.date}</span> by{'  '}
            <span className="text-info">{post.author}</span>
          </CardSubtitle>
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div>
          <ul className="post-tags">
            {post.tags.map(tag => (
              <li key={tag}>
                <Link to={`tag/${slugify(tag)}`}>
                  <Badge color="primary">{tag}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
  </Layout>
  )
}

//$slug, $imageUrl은  gatsby-node.js graphql의 then에서 createpage함수 인자값중 context key 값에 설정되어 있는 값이다. 
export const postQuery = graphql`
  query blogPostBySlug($slug: String!, $imageUrl: String!){
    markdownRemark(fields: { slug: { eq: $slug}}){
      id 
      html
      frontmatter{
        title
        author
        date(formatString: "MMM Do YYYY")
        tags
        image{
          childImageSharp{
            fluid(maxWidth: 700){
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    file(relativePath: {eq: $imageUrl}){
      childImageSharp{
        fluid(maxWidth: 300){
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default SinglePost;
