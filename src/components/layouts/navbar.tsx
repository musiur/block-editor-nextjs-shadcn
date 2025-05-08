import { Rocket } from "lucide-react"
import { Theme } from "../theme"
import { Container } from "./container"

export const Navbar = () => {
    return (
        <header className="sticky top-2 z-50">
            <Container>
                <nav className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                    <Rocket className="h-6 w-6" />
                    <Theme.Toggle />
                </nav>
            </Container>
        </header>
    )
}