"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useState, useEffect } from "react";
import siteMetadata from "@/data/siteMetadata";

interface Props {
  children: ReactNode | string | React.JSX.Element | React.JSX.Element[];
  size?: string;
}

export default function Container({ children, size = "xl" }: Props) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme={siteMetadata.theme}
    >
      {children}
    </ThemeProvider>
  );
}
