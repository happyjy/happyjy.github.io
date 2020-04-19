import React from 'react';
import { graphql, Link} from 'gatsby';
import Img from 'gatsby-image';
import { Badge, Card, CardBody, CardSubtitle } from 'reactstrap';
import { DiscussionEmbed } from 'disqus-react';
import { slugify } from '../util/utilityFunctions';
import authors from '../util/authors';
import Layout from '../components/Layout';
import SEO from '../components/seo';



const SinglePost = ({ data, pageContext }) => {
  const post = data.markdownRemark.frontmatter; 
  const author = authors.find(x => x.name === post.author);
  console.log(author);
  console.log(data.file.childImageSharp.fluid);

  const baseUrl = 'https://happyjy.github.io/';
  // const disqusShortname = 'https-gatsbytutorial-co-uk';
  const disqusShortname = 'happyjy';
  const disqusConfig = {
    identifier: data.markdownRemark.id,
    title: post.title,
    url: baseUrl + pageContext.slug
  };

  return (
    <Layout 
      pageTitle={post.title} l
      postAuthor={author} 
      authorImageFluid={data.file.childImageSharp.fluid}>
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
      {/* <h3 className="text-center">Share this post</h3>
      <div className="text-center social-share-links">
        <ul>
          <li>
            <a
              href={
                'https://www.facebook.com/sharer/sharer.php?u=' +
                baseUrl +
                pageContext.slug
              }
              className="facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f fa-2x" />
            </a>
          </li>
          <li>
            <a
              href={
                'https://plus.google.com/share?url=' +
                baseUrl +
                pageContext.slug
              }
              className="google"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-google fa-2x" />
            </a>
          </li>
        </ul>
      </div> */}
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />

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
