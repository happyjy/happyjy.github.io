const { slugify } = require("./src/util/utilityFunctions")
const authors = require("./src/util/authors")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const _ = require("lodash")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    // console.log("### 1.slug: ", slug)

    const slugFromTitle = slugify(node.frontmatter.title)
    // console.log("### 2.slugFormTitle: ", slugFromTitle)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  //path.resolve에 return 되는 것들은 graphql의 query 들이다.
  const templates = {
    singlePost: path.resolve("src/templates/single-post.js"),
    tagsPage: path.resolve("src/templates/tags-page.js"),
    tagPosts: path.resolve("src/templates/tag-posts.js"),
    categoriesPage: path.resolve("src/templates/categories-page.js"),
    categoryPosts: path.resolve("src/templates/category-posts.js"),
    postList: path.resolve("src/templates/post-list.js"),
    authorPosts: path.resolve("src/templates/author-post.js"),
  }

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            tableOfContents
            frontmatter {
              author
              tags
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
    // console.log("############################### authors, res");
    // console.log({authors, res});
    if (res.errors) return Promise.reject(res.errors)

    const posts = res.data.allMarkdownRemark.edges
    // console.log({posts});
    // Create single blog post pages
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          // Passing slug for template to use to get post
          slug: node.fields.slug,
          tableOfContents: node.tableOfContents,
          // Find author imageUrl from authros and pass it to the single post template
          imageUrl:
            (authors.find(x => x.name === node.frontmatter.author) &&
              authors.find(x => x.name === node.frontmatter.author).imageUrl) ||
            "",
        },
      })
    })

    //Get allTags, allCategory
    let tags = []
    let categories = []
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
      if (_.get(edge, "node.frontmatter.category")) {
        categories = categories.concat(edge.node.frontmatter.category)
      }
      // console.log("### edge: ", edge)
      // console.log("### edge.node.frontmatter: ", edge.node.frontmatter)
    })

    // console.log("===============================")

    // posts.forEach(({ node }) => {
    // 	// console.log("# categories ");
    // 	// console.log(node);
    // 	categories = categories.concat(node.frontmatter.category);
    // 	return categories;
    // });

    //# tags: [javascript, react, ...]
    //# tagPostsCounts: {javascript: 5, react: 3, ...}
    let tagPostCounts = {}
    tags.forEach(tag => {
      tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
    })
    tags = _.uniq(tags)
    // tags = [...new Set(tags)];

    let categoryPostCounts = {}
    categories.forEach(category => {
      categoryPostCounts[category] = (categoryPostCounts[category] || 0) + 1
    })
    categories = _.uniq(categories)

    // console.log("######################### tags, tagsPostcounts, category");
    // console.log({tags, tagPostCounts});
    // console.log({categories});

    // Create tags page
    createPage({
      path: "/tags",
      component: templates.tagsPage,
      context: {
        tags,
        tagPostCounts,
      },
    })

    // Create tag posts pages
    tags.forEach(tag => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: templates.tagPosts,
        context: {
          tag,
        },
      })
    })

    // Create categories page
    createPage({
      path: "/category",
      component: templates.categoriesPage,
      context: {
        categories,
        categoryPostCounts,
      },
    })

    // Create category posts pages
    // console.log("### categories: ", categories)
    categories.forEach(category => {
      createPage({
        path: `/category/${slugify(category)}`,
        component: templates.categoryPosts,
        context: {
          category,
        },
      })
    })

    // pagenation
    // 페이지네이션도 각 페이지에 현재 페이지를 넘겨 버리니 구현하기가 편함
    // skip:
    const postsPerPage = 5
    const numberOfPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numberOfPages }).forEach((_, index) => {
      const isFirstPage = index === 0
      const currentPage = index + 1

      if (isFirstPage) return

      createPage({
        path: `/page/${currentPage}`,
        component: templates.postList,
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          currentPage,
          numberOfPages,
        },
      })
    })

    //author page
    authors.forEach(author => {
      createPage({
        path: `/author/${slugify(author.name)}`,
        component: templates.authorPosts,
        context: {
          authorName: author.name,
          imageUrl: author.imageUrl,
        },
      })
    })
  })
}

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
