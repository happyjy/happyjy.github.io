import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { Badge, Button } from 'reactstrap';
import { slugify } from '../util/utilityFunctions';


const tagsPage = ({ pageContext }) => {
  const { tags, tagPostCounts } = pageContext;
  return (
    <Layout pageTitle="Tags">
      <SEO title="All tags" keywords={['tags', 'topics']}/>
      <div className="tags">
        <ul className="label">
          {tags.map(tag => (
            // style={{ marginBottom: '10px'}}
            <li key={tag}>
              <Button color="primary" href={`/tag/${slugify(tag)}`}>
                {tag} <Badge color="light">{tagPostCounts[tag]}</Badge>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
};

export default tagsPage;