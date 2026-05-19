import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

export const metadata = {
  title: {
    default: "TutorHub",
    template: "%s | TutorHub",
  },
  description: "Tutor Booking Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>
          <Toaster position="top-center" />

          <NavBar />

          <main className="pt-20">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}