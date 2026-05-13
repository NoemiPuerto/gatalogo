import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";


export const metadata = {
  title: "Gatalogo - Cat adoption matching",
  description: "Swipe, match and adopt rescue cats from trusted shelters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <StoreProvider><Toaster position="top-center" />{children}</StoreProvider>
      </body>
    </html>
  );
}
