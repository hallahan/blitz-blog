import { ReactNode } from "react"
import { Head, Link, Routes } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "blitz-blog"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <Link href={Routes.PostsPage()}>
          <a>Posts</a>
        </Link>
        |
        <Link href={Routes.CategoriesPage()}>
          <a>Categories</a>
        </Link>
        |
        <Link href={Routes.TagsPage()}>
          <a>Tags</a>
        </Link>
      </nav>
      {children}
    </>
  )
}

export default Layout
