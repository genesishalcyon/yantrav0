import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/bricolage-grotesque-v2-latin-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          data-next-font="size-adjust"
        />
        <link
          rel="preload"
          href="/fonts/bricolage-grotesque-v2-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          data-next-font="size-adjust"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
