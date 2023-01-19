import { ReactElement, useEffect } from 'react'
import { BlogLayout, Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useRecoilState } from 'recoil'
import { page, user } from '../atoms/atoms'
import { ContactForm } from '../components/ContactForm/ContactForm.component'

const Admin: NextPageWithLayout = () => {
  const [isAdmin, setIsAdmin] = useRecoilState(user);
  const [thisPage, setThisPage] = useRecoilState(page);
  const sendEmail = () => {
 
  };
  useEffect(() => {
    setThisPage('contact');
  },[]);
  return (
    <>
      <ContactForm />
    </>
  )
}

Admin.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BlogLayout>{page}</BlogLayout>
    </Layout>
  )
}

export default Admin;