import { Box, Stack } from '@chakra-ui/react';
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function Sidebar() {
  return (
    <Box as='aside' w='64' mr='8'>
      <Stack spacing='12' align='flex-start'>
        <NavSection title='geral'>
          <NavLink title='dasboard' icon={RiDashboardLine} />
          <NavLink title='usuários' icon={RiContactsLine} />
        </NavSection>

        <NavSection title='automação'>
          <NavLink title='formulários' icon={RiInputMethodLine} />
          <NavLink title='automação' icon={RiGitMergeLine} />
        </NavSection>
      </Stack>
    </Box>
  )
}
