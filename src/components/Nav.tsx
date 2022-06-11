import Link from 'next/link'

const Nav = () => {
  return (
    <nav id="main-nav">
      <Link href="/" passHref>
        <h2 className="main-nav-link">Bryant</h2>
      </Link>
      <Link href="/about" passHref>
        <h2 className="main-nav-link">About</h2>
      </Link>
      <Link href="/blog" passHref>
        <h2 className="main-nav-link">Blog</h2>
      </Link>
    </nav>
  )
}

export default Nav
