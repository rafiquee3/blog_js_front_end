export default function Articles({ article }) {
  console.log(article)
  return (
    <div>{article.title}</div>
  )
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3001/article/all')
  const articles = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = articles.map((article) => ({
    params: { id: article.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`http://localhost:3001/article/${params.id}`)
  const article = await res.json()

  // Pass post data to the page via props
  return { props: { article } }
}