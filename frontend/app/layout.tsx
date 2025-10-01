import type { Metadata } from "next";
import "./globals.scss";
import { ReactQueryProvider } from "@/src/providers/react-query.provider";

export const metadata: Metadata = {
  title: "Articles",
  description: "Liste des articles du moment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <div className="container">{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
