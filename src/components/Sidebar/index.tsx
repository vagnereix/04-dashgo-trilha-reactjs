import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { SidebarNav } from './SidebarNav';

export function Sidebar() {
  const { isOpen, onToggle } = useSidebarDrawer();

  const isSidebarDrawer = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isSidebarDrawer) {
    return (
      <Drawer isOpen={isOpen} placement='left' onClose={() => {}}>
        <DrawerOverlay>
          <DrawerContent bg='gray.800' p='4'>
            <DrawerCloseButton onClick={onToggle} mt='6' />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as='aside' w='64' mr='8'>
      <SidebarNav />
    </Box>
  );
}
