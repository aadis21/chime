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
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicon */}
          <link rel="icon" href="/static/shared/favicon.png" sizes="192x192" />

          {/* Meta tags for SEO */}
          <meta
            name="description"
            content="ChimePay offers secure, fee-free instant money transfers. Send money to anyone, anytime, with no sign-up required."
          />
          <meta
            name="keywords"
            content="ChimePay, instant money transfer, fee-free payments, send money online, secure payments"
          />
          <meta name="author" content="ChimePay Team" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="ChimePay - Secure & Instant Money Transfers"
          />
          <meta
            property="og:description"
            content="ChimePay offers secure, fee-free instant money transfers. Send money to anyone, anytime, with no sign-up required."
          />
          <meta property="og:url" content="https://chimepay.in" />
          <meta
            property="og:image"
            content="https://chimepay.in/images/og-image.jpg"
          />

          {/* Twitter Card */}
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

          {/* Structured Data JSON-LD for Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "ChimePay",
                url: "https://chimepay.in",
                logo: "https://chimepay.in/static/shared/favicon.png",
                sameAs: [
                  "https://www.facebook.com/ChimePay",
                  "https://twitter.com/ChimePay",
                  // Add other social URLs if available
                ],
              }),
            }}
          />
        </Head>

        <body>
          <Main />

          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-17118766209"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17118766209');
            `}
          </Script>
          <NextScript />
        </body>
      </Html>
    );
  }
}
