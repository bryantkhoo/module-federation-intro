import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import SyntaxHighlighter from 'react-syntax-highlighter'
import Link from 'next/link'
import Image from 'next/image'

type PostPageProps = {
  frontMatter: Omit<Post, 'slug'>
  mdxSource: MDXRemoteSerializeResult
}

const components = { SyntaxHighlighter, Link, Image }

const PostPage = ({ frontMatter, mdxSource }: PostPageProps) => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>{frontMatter.title}</h1>
        <MDXRemote {...mdxSource} components={components}></MDXRemote>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('src', 'posts'))

  const paths = files.map((filename) => {
    return {
      params: {
        slug: filename.replace('.mdx', ''),
      },
    }
  })

  return { paths, fallback: false }
}

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('src', 'posts', slug + '.mdx')
  )

  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  }
}

export default PostPage
