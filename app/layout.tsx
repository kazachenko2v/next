import "./globals.css";
import Header from "@/components/Header";
import Provider from "@/components/Provider";

export const metadata = {
  title: "Next",
  description: "Creacte posts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="px-10">
        <Provider>
          <Header />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
