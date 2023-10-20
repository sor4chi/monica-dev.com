interface IfProps {
  is: () => boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const If = ({ is, fallback, children }: IfProps) => {
  if (is()) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return null;
};
