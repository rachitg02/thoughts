import Layout from '../components/Layout'
import '../styles/globals.css'
import {ToastContainer, Flip} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Head>
        <title>Thoughts</title>
        <link rel='icon' href='/thoughts.svg'/>
      </Head>
        <ToastContainer
        limit={2} 
        position="bottom-center"
        autoClose={2000}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        transition={Flip}
        draggablePercent={60}
        theme="light"/>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
