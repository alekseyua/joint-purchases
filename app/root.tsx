import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import './styles/global.scss';
import type { Route } from "./+types/root";
import { useEffect, useState } from "react";
import TelegramProvider from "./context/TelegramContext";
import { WebSocketProvider } from "./context/WebsocketContext";

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(()=>{
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("q", "");
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
    }
  },[])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://telegram.org/js/telegram-web-app.js?59"></script>
        <Meta />
        <Links />
      </head>
      <body>
        <TelegramProvider>
          <WebSocketProvider>
            {children}
          </WebSocketProvider>
        </TelegramProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
