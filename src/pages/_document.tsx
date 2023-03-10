import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render(){
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Head>
        <body className='bg-gray-50 text-gray-500 dark:bg-darkMode-background dark:text-white'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
