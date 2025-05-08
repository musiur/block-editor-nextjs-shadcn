import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Container = ({children, className, ...props}: ContainerProps) => {
    return (
        <div className={cn(className, "container mx-auto px-4")} {...props}>
            {children}
        </div>
    );
}