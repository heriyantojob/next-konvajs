// pages/index.js


import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('./_components/layout/Layout'), {
  ssr: false,
});
export default function Home() {
  return (
    <div>

      <Layout></Layout>
    </div>
   
  )
}