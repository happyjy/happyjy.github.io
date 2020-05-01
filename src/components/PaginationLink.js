import React from "react"
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"

const PaginationLinks = ({ currentPage, numberOfPages }) => {
  // console.log("### PaginationLinks");
  // console.log({currentPage, numberOfPages});
  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages
  const previousPage =
    currentPage - 1 === 1 ? "/" : "/page" + (currentPage - 1).toString()
  const nextPage = "/page/" + (currentPage + 1).toString()

  return (
    <Pagination arial-label="Page navigation example">
      {/* 처음으로  */}
      {isFirst ? (
        <PaginationItem disabled>
          <PaginationLink first href="/" />
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink first href="/" />
        </PaginationItem>
      )}

      {/* 이전페이지 */}
      {isFirst ? (
        <PaginationItem disabled>
          <PaginationLink previous herf="/"></PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink previous herf={previousPage}></PaginationLink>
        </PaginationItem>
      )}

      {/* 페이지 */}
      {Array.from({ length: numberOfPages }, (_, i) =>
        currentPage === i + 1 ? (
          <PaginationItem active key={`page-number${i + 1}`}>
            <PaginationLink href={`/${i === 0 ? "" : "page/" + (i + 1)}`}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem key={`page-number${i + 1}`}>
            <PaginationLink href={`/${i === 0 ? "" : "page/" + (i + 1)}`}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        )
      )}

      {/* 다음페이지 */}
      {isLast ? (
        <PaginationItem disabled>
          <PaginationLink next href={nextPage} />
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink next href={nextPage} />
        </PaginationItem>
      )}

      {/* 마지막으로 */}
      {isLast ? (
        <PaginationItem disabled>
          <PaginationLink last href="#" />
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink last herf={`page/ + ${numberOfPages}`} />
        </PaginationItem>
      )}
    </Pagination>
  )
}

export default PaginationLinks
