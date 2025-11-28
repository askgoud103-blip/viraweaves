import "./globals.css";

export const metadata = {
  title: "ViraWeaves – Designer Sarees & Ethnic Wear",
  description: "Premium handloom sarees and designer ethnic wear collection."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}

