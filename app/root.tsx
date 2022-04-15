import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";

import { Navbar } from "~/components/navbar";

import tailwindStylesheetUrl from "./styles/tailwind.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Library",
  viewport: "width=device-width, initial-scale=1",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <Scripts />
      </head>
      <body>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <LiveReload />
      </body>
    </html>
  );
}
