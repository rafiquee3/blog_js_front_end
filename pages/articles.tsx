type Props = {
  id: number;       
  createdAt: any;
  updatedAt: any;
  title:     string;
  content:   string;
};

export default function Articles({ articles }: Props) {
  return (
    <div>{articles.map((article: Props) => (<p>{article.title}</p>))}</div>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3001/article/all')
  const articles: Props = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      articles,
    },
  }
}