import type { ReactElement } from 'react'
import { Layout } from '../components/Layout'
import { BlogLayout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'

const Index: NextPageWithLayout = () => {
  return <p>hello word</p>
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BlogLayout>{page}</BlogLayout>
    </Layout>
  )
}

export default Index;
