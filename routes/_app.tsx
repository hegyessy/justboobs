import { type PageProps } from "$fresh/server.ts";
import DonationHeader from "../components/donation-header.tsx";
import Footer from "../components/footer.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>80085</title>
        <link rel="stylesheet" href="/styles.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href={Deno.env.get("FONTS_URL")}
        />
      </head>
      <body class="bg-pink-50">
        <DonationHeader />
        <div class="p-4 mx-auto">
          <header class="text-center">
            <h1 class="text-3xl font-bold">
              <a href="/">80085</a>
            </h1>
            <p class="text-sm">
              A silly website sketching boobs to raise money for breast cancer
              research.
            </p>
          </header>
          <Component />
        </div>
        <Footer />
      </body>
    </html>
  );
}
