import { Container } from "./container"
import { Section } from "./section"

export const Footer = () => {
    return (
        <footer>
            <Container>
                <Section className="text-center">
                    All rights reserved &copy; {new Date().getFullYear()}
                </Section>
            </Container>
        </footer>
    )
}