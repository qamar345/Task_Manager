"use client";

import "./globals.css";
import { WorkspaceProvider } from "@/context/WorkspaceContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          type="image/png"
          href="assets/images/logos/favicon.png"
        />
        <link rel="stylesheet" href="assets/css/styles.min.css" />
      </head>
      <body>
        <WorkspaceProvider>{children}</WorkspaceProvider>

        <script src="assets/libs/jquery/dist/jquery.min.js"></script>
        <script src="assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        {/* <!-- solar icons --> */}
        <script src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js"></script>
      </body>
    </html>
  );
}
