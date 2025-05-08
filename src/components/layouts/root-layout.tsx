import { ThemeProvider } from "../theme/theme-provider";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </ThemeProvider>
    );
}