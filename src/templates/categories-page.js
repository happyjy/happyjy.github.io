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
	const newCategoryPostCounts = Object.keys(categoryPostCounts).map(function(key) {
		return [ key, categoryPostCounts[key] ];
	});

	newCategoryPostCounts.sort(function(first, second) {
		return second[1] - first[1];
	});

	const newCategories = newCategoryPostCounts.map((v) => {
		return v[0];
	});

	return (
		<Layout pageTitle='Category'>
			<SEO title='All category' keywords={[ 'category', 'topics' ]} />
			<div className='categories'>
				<ul className='label'>
					{newCategoryPostCounts.map((category) => (
						// style={{ marginBottom: '10px'}}
						<li key={category[0]}>
							{/* <Button color="primary" href={`/category/${slugify(category)}`}> */}
							<Button color='primary' href={`#${category[0]}`}>
								{category[0]} <Badge color='light'>{category[1]}</Badge>
							</Button>
						</li>
					))}
				</ul>
			</div>
			<div>
				<div className='categories'>
					<ul>
						{newCategories.map((category) => (
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
