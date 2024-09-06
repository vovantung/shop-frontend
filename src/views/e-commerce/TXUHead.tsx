import Head from 'next/head'

const TXUHead = () => (
  <Head>
    {/* Tránh làm thay đổi cửa sổ trên mobile khi người dùng sử dụng thành phần input */}
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
  </Head>
)

export default TXUHead
