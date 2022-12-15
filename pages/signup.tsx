import RegisterForm from "../components/RegisterForm/RegisterForm.component";
import type { ReactElement } from 'react'
import { Layout } from '../components/Layout'
import { FormLayout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'

const Signup: NextPageWithLayout = () => {
  return <RegisterForm/>
}

Signup.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <FormLayout>{page}</FormLayout>
    </Layout>
  )
}

export default Signup;