import { useDisclosure } from '@chakra-ui/hooks';
import { useRouter } from 'next/dist/client/router';
import { createContext, ReactNode, useContext, useEffect } from 'react';

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextData = ReturnType<typeof useDisclosure>;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
