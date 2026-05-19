import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>
          <Toaster position="top-center" />
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}