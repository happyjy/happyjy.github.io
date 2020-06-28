import React from "react"
import { Link } from "gatsby"
import { slugify } from "../util/utilityFunctions"

const CategoryList = ({ category, edges }) => {
  // console.log(category, edges)
  return edges.map((edge, index) => {
    return category === edge.node.frontmatter.category ? (
      <Link key={index} to={`/${slugify(edge.node.fields.slug)}`}>
        <div>{edge.node.frontmatter.title}</div>
      </Link>
    ) : (
      ""
    )
  })
}

export default CategoryList
