//layout.tsx

import type { Metadata } from "next";
import { Inter, Sacramento, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const scp = Source_Code_Pro({ subsets: ["latin"] });
const sacramento = Sacramento({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "nIA chat | Nacho Dev",
  description: "Página hecha por Nacho Dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={scp.className}>{children}</body>
    </html>
  );
}