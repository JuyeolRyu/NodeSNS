import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Form } from 'react-bootstrap'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body style={{backgroundColor:'black'}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument