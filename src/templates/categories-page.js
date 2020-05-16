import React from 'react';
import Layout from '../components/Layout';
import CategoryList from '../components/CategoryList';
import SEO from '../components/seo';
import { Badge, Button } from 'reactstrap';
// import { slugify } from '../util/utilityFunctions';
import { graphql } from 'gatsby';

const categoryPage = ({ data, pageContext }) => {
	const { categories, categoryPostCounts } = pageContext;
	const edges = data.allMarkdownRemark.edges;
	// console.log({data, categories, categoryPostCounts});
	// console.log({edges});
	return (
		<Layout pageTitle='Category'>
			<SEO title='All category' keywords={[ 'category', 'topics' ]} />
			<div className='categories'>
				<ul className='label'>
					{categories.map((category) => (
						// style={{ marginBottom: '10px'}}
						<li key={category}>
							{/* <Button color="primary" href={`/category/${slugify(category)}`}> */}
							<Button color='primary' href={`#${category}`}>
								{category} <Badge color='light'>{categoryPostCounts[category]}</Badge>
							</Button>
						</li>
					))}
				</ul>
			</div>
			<div>
				<div className='categories'>
					<ul>
						{categories.map((category) => (
							// style={{ marginBottom: '10px'}}
							<li key={category}>
								<h2 id={category}>{category}</h2>
								<CategoryList category={category} edges={edges} />
							</li>
						))}
						{/* // {
            // edges.map(edge => {
            //   return <li key={edge.node.frontmatter.id}><h2>{edge.node.frontmatter.category}</h2>{edge.node.frontmatter.title} - ${edge.node.frontmatter.date}</li>
            // })
          // } */}
					</ul>
				</div>
			</div>
		</Layout>
	);
};

export const categoryPageQuery = graphql`
	query categoryPageQuery {
		allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }) {
			totalCount
			edges {
				node {
					id
					frontmatter {
						title
						author
						date(formatString: "MMM Do YYYY")
						tags
						category
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

export default categoryPage;
