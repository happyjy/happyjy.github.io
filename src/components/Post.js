import React from "react"
import { Link } from "gatsby"
import {
  Badge,
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
} from "reactstrap"
// import Img from "gatsby-image"
import { slugify } from "../util/utilityFunctions"

const Post = ({ title, author, slug, date, body, fluid, category, tags }) => {
  return (
    <Card>
      {/* {!fluid ? (
        ""
      ) : (
        <Link to={slug}>
          <Img className="card-image-top cardImg" fluid={fluid} />
        </Link>
      )} */}
      <CardBody>
        <CardTitle>
          <Link to={slug}>
            <h2>{title}</h2>
          </Link>
        </CardTitle>
        <CardSubtitle>
          <span className="text-info">{date}</span>
          {author ? `  by` : ""} <span className="text-info">{author}</span>
        </CardSubtitle>
        <ul className="post-category">
          <li>
            <Link to={`/category/${category}`}>
              <Badge color="danger" className="text-uppercase" pill>
                {category}
              </Badge>
            </Link>
          </li>
        </ul>
        <ul className="post-tags">
          {post.tags &&
            post.tags.length > 0 &&
            tags.map(tag => (
              <li key={tag}>
                <Link to={`/tag/${slugify(tag)}`}>
                  <Badge color="primary" className="text-uppercase" pill>
                    {tag}
                  </Badge>
                </Link>
              </li>
            ))}
        </ul>
        <CardText>
          <Link to={slug}>{body}</Link>
        </CardText>
        <Link to={slug} className="btn btn-outline-primary float-right">
          Read more
        </Link>
      </CardBody>
    </Card>
  )
}

export default Post
