import React from 'react';
import Layout from '../components/Layout';
import { graphql, StaticQuery } from 'gatsby';
import SEO from '../components/seo';
import Post from '../components/Post';
// import PaginationLinks from '../components/PaginationLink';

const IndexPage = () => {
	const postsPerPage = 5;
	let numberOfPages;
	const numberOfPostFunction = function(numberOfPost) {
		return numberOfPost;
	};
	let numberOfPost;
	return (
		<Layout pageTitle='developBlog' numberOfPost={numberOfPost}>
			<SEO title='Home' keywords={[ `gatsby`, `application`, `react` ]} />
			<StaticQuery
				query={indexQuery}
				render={(data) => {
					numberOfPages = Math.ceil(data.allMarkdownRemark.totalCount / postsPerPage);

					console.log('### numberOfPost < index.js ');
					numberOfPost = numberOfPostFunction(data.allMarkdownRemark.edges.length);
					return (
						<div>
							{data.allMarkdownRemark.edges.map(({ node }) => (
								<Post
									key={node.id}
									slug={node.fields.slug}
									title={node.frontmatter.title}
									author={node.frontmatter.author}
									date={node.frontmatter.date}
									body={node.excerpt}
									category={node.frontmatter.category}
									tags={node.frontmatter.tags}
									fluid={node.frontmatter.image && node.frontmatter.image.childImageSharp.fluid}
								/>
							))}
							{/* <PaginationLinks currentPage={1} numberOfPages={numberOfPages} /> */}
						</div>
					);
				}}
			/>
		</Layout>
	);
};

const indexQuery = graphql`
	query indexQuery {
		# allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 5) {
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			totalCount
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "MMM Do YYYY")
						author
						tags
						category
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
`;
export default IndexPage;
