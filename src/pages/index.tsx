import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'

type PostProps = {
  posts: { frontMatter: Omit<Post, 'slug'>; slug: string }[]
}

const Home = ({ posts }: PostProps) => {
  return (
    <div className="main-container">
      <h1 className="main-header">Introduction to Module Federation</h1>
      <div className="page-container">
        {posts.map((post, index) => (
          <Link href={`/${post.slug}`} passHref key={index}>
            <div className="menu-link">{post.frontMatter.title}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('src', 'posts'))

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('src', 'posts', filename),
      'utf-8'
    )
    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      frontMatter,
      slug: filename.split('.')[0],
    }
  })

  return {
    props: {
      posts,
    },
  }
}

export default Home
