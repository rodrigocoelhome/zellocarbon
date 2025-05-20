interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return <div className="p-4 shadow-lg rounded bg-white">{children}</div>;
}

interface CardContentProps {
  children: React.ReactNode;
}

export function CardContent({ children }: CardContentProps) {
  return <div className="mt-2">{children}</div>;
}
