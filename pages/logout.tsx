import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil'
import { user } from '../atoms/atoms'
import { BlogLayout, Layout } from '../components/Layout';
import { Status } from '../components/Status/Status.component';
import { NextPageWithLayout } from './_app';

const Logout: NextPageWithLayout = (): JSX.Element  => {
  const [currentUser, setCurrentUser] = useRecoilState(user);
  const [err, setErr] = useState(false);
  
  useEffect(() => {
    const logoutApi = async () => {
      const JwtToken = localStorage.getItem('JWT');
      const config = {
        headers: {
          'Authorization': `Bearer ${JwtToken}`,
        }
      };
      const url: string = 'http://localhost:3001/auth/logout';
      await axios.get(url, config)
      .then((res) => {
        localStorage.clear();
      })
      .catch((err) => {
        setErr(true);
      });  
    }
    if(currentUser) {
      setCurrentUser('');
      logoutApi();
    }
  }, [currentUser, setCurrentUser])
  return (
    <>
      {err ? 
      <Status info="Error" error /> 
      :
      <Status info="Logged out" error={false} /> 
      }
    </>
  )
}

Logout.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BlogLayout>{page}</BlogLayout>
    </Layout>
  )
}

export default Logout;