import React from "react";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
     <head>

<meta name="google-site-verification" content="YyAAWKFtqBCoEis49yQH8LqWj6qSCj0tWAhWysz0unU" />

<title>Vira Weaves | Premium Bridal Sarees</title>

<meta name="description" content="Premium Bridal & Designer Sarees curated for grand occasions across India." />

<script
type="application/ld+json"
dangerouslySetInnerHTML={{
__html: JSON.stringify({
"@context": "https://schema.org",
"@type": "Organization",
"name": "Vira Weaves",
"url": "https://viraweaves.vercel.app",
"sameAs": [
"https://www.instagram.com/vira_weaves_/",
"https://www.facebook.com/profile.php?id=61570486516513"
]
})
}}
/>

</head>

      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
