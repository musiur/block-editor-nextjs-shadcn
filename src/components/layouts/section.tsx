import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Section = ({children, className, ...props}: SectionProps) => {
    return (
        <section className={cn(className, "py-8")} {...props}>
            {children}
        </section>
    );
}