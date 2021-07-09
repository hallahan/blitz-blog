import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTags from "app/tags/queries/getTags"

const ITEMS_PER_PAGE = 100

export const TagsList = ({ tags, hasMore }) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link href={Routes.ShowTagPage({ tagId: tag.id })}>
              <a>{tag.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TagsPage: BlitzPage = (props) => {
  return (
    <>
      <Head>
        <title>Tags</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTagPage()}>
            <a>Create Tag</a>
          </Link>
        </p>

        <TagsList tags={props.tags} hasMore={props.hasMore} />
      </div>
    </>
  )
}

TagsPage.authenticate = true
TagsPage.getLayout = (page) => <Layout>{page}</Layout>

export async function getServerSideProps(context) {
  const page = Number(context.query.page) || 0
  const [{ tags, hasMore }] = usePaginatedQuery(getTags, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  function isServer() {
    return !(typeof window != "undefined" && window.document)
  }
  console.log("getServerSideProps isServer", isServer())
  console.log("tags", tags)

  return {
    props: {
      tags,
      hasMore,
    },
  }
}

export default TagsPage
