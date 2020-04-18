const { slugify } = require('./src/util/utilityFunctions');
const authors = require('./src/util/authors');
const path = require('path');
const _ = require('lodash');

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slugFromTitle = slugify(node.frontmatter.title);
    createNodeField({
      node,
      name: 'slug',
      value: slugFromTitle,
    });
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const templates = {
    singlePost: path.resolve('src/templates/single-post.js'),
    tagsPage: path.resolve('src/templates/tags-page.js'),
  };

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author,
              tags, 
              category
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    console.log("###############################");
    console.log({authors, res});
    if (res.errors) return Promise.reject(res.errors);
    
    const posts = res.data.allMarkdownRemark.edges;
    console.log({posts});
    // Create single blog post pages
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          // Passing slug for template to use to get post
          slug: node.fields.slug,
          // Find author imageUrl from authros and pass it to the single post template
          imageUrl: authors.find(x => x.name === node.frontmatter.author).imageUrl,
        },
      });
    });

    //Get allTags
    let tags = [];
    let category = [];
    _.each(posts, edge => {
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    posts.forEach(({ node }) => {
      console.log("# category ");
      console.log(node);
      category = category.concat(node.frontmatter.category);
      return category;
    })

    //[javascript, react, ...]
    //{javascript: 5, react: 3, ...}
    let tagPostCounts = {};
    tags.forEach(tag => {
      tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1;
    });

    tags = _.uniq(tags);
    // tags = [...new Set(tags)];

    console.log("#########################")
    console.log({tags, tagPostCounts});
    console.log({category});


    // Create tags page 
    createPage({
      path: '/tags',
      component: templates.tagsPage,
      context: {
        tags,
        tagPostCounts
      }
    });

  });
}

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
