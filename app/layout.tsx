import React from "react";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="YyAAWKFtqBCoEis49yQH8LqWj6qSCj0tWAhWysz0unU" />
      </head>

      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
