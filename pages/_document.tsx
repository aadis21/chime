import { ServerStyleSheet } from "styled-components";
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/static/shared/favicon.png" sizes="192x192" />
          {/* Load Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-17086644596"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-17086644596');
            `}
          </Script>
          {/* <title>ChimePay - Secure & Instant Money Transfers</title> */}
          <meta
            name="description"
            content="ChimePay offers secure, fee-free instant money transfers. Send money to anyone, anytime, with no sign-up required."
          />
          <meta
            name="keywords"
            content="ChimePay, instant money transfer, fee-free payments, send money online, secure payments"
          />
          <meta name="author" content="ChimePay Team" />
          <meta
            property="og:title"
            content="ChimePay - Secure & Instant Money Transfers"
          />
          <meta
            property="og:description"
            content="ChimePay offers secure, fee-free instant money transfers. Send money to anyone, anytime, with no sign-up required."
          />
          <meta
            property="og:image"
            content="https://chimepay.in/images/og-image.jpg"
          />
          <meta property="og:url" content="https://chimepay.in" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="ChimePay - Secure & Instant Money Transfers"
          />
          <meta
            name="twitter:description"
            content="ChimePay offers secure, fee-free instant money transfers. Send money to anyone, anytime, with no sign-up required."
          />
          <meta
            name="twitter:image"
            content="https://chimepay.in/images/twitter-image.jpg"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
