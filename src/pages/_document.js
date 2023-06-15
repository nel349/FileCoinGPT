import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
          <link href="https://vjs.zencdn.net/8.0.4/video-js.css" rel="stylesheet" />
          <script src="https://saturn.tech/widget.js" async />
          <script src="https://vjs.zencdn.net/8.0.4/video.min.js" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
