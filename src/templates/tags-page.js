import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { Badge, Button } from "reactstrap"
import { slugify } from "../util/utilityFunctions"

const tagsPage = ({ pageContext }) => {
  const { tags, tagPostCounts } = pageContext
  const newTagInfoArr = []
  for (const tag in tagPostCounts) {
    newTagInfoArr.push({ tag: tag, count: tagPostCounts[tag] })
  }
  newTagInfoArr.sort((a, b) => b.count - a.count)

  return (
    <Layout pageTitle="Tags">
      <SEO title="All tags" keywords={["tags", "topics"]} />
      <div className="tags">
        <ul className="label">
          {newTagInfoArr.map((tagInfo, index) => (
            // style={{ marginBottom: '10px'}}
            <li key={index}>
              <Button
                outline
                color="primary"
                size="sm"
                href={`/tag/${slugify(tagInfo.tag)}`}
              >
                {tagInfo.tag} <Badge color="info">{tagInfo.count}</Badge>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default tagsPage
