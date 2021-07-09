import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import db, { Prisma } from "db"

const ITEMS_PER_PAGE = 100

export const TagsList = ({ tags }) => {
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

        <TagsList tags={props.tags} />
      </div>
    </>
  )
}

TagsPage.authenticate = true
TagsPage.getLayout = (page) => <Layout>{page}</Layout>

export async function getServerSideProps(context) {
  const page = Number(context.query.page) || 0

  const tags = await db.tag.findMany()

  function isServer() {
    return !(typeof window != "undefined" && window.document)
  }
  console.log("getServerSideProps isServer", isServer())
  console.log("tags", tags)

  return {
    props: {
      tags,
    },
  }
}

export default TagsPage
