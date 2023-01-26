import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render(){
    return (
      <Html lang="en">
        <Head>
          <title>NLW#05 - PodCastr</title>
        </Head>
        <body className='bg-gray-50 text-gray-500'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
