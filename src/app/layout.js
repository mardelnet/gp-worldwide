import "./globals.css";

export const metadata = {
  title: "Greepeace Worldwide News",
  description: "Greepeace Worldwide News",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
