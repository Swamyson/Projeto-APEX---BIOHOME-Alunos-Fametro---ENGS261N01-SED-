import * as React from "react";

const m_BREAKPOINT = 768;

export function useIsm() {
  const [ism, setIsm] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${m_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsm(window.innerWidth < m_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsm(window.innerWidth < m_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!ism;
}
