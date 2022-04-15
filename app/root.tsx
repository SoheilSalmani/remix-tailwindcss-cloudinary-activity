import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet } from "@remix-run/react";

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
      </head>
      <body>
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}
