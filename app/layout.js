import { Bangers } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const bangers = Bangers({
  variable: "--font-bangers",
  weight: "400",
  subsets: ["latin"],
});

const oskarig2 = localFont({
  src: "../public/assets/fonts/oskari/OskariG2-SemiBold.ttf",
  variable: "--font-oskarig2",
  subsets: ["latin"],
});

const oskarig2Regular = localFont({
  src: "../public/assets/fonts/oskari/OskariG2Regular.ttf",
  variable: "--font-oskarig2Regular",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Ascendants",
  description: "Legends Aren’t Born. They Ascend.",
  openGraph: {
    title: "The Ascendants",
    description: "Legends Aren’t Born. They Ascend.",
    url: "https://theascendants.xyz",
    siteName: "The Ascendants",
    images: [
      {
        url: "https://api.rageeffect.io/assets/AscendantPreview.png?v=2",
        width: 1200,
        height: 630,
        alt: "The Ascendants Preview",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bangers.variable} ${oskarig2.variable} ${oskarig2Regular.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
