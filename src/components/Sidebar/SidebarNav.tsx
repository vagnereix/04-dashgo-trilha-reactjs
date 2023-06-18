import { Stack } from '@chakra-ui/layout';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <Stack spacing='12' align='flex-start'>
      <NavSection title='geral'>
        <NavLink href='/dashboard' title='dasboard' icon={RiDashboardLine} />
        <NavLink href='/users' title='usuários' icon={RiContactsLine} />
      </NavSection>

      <NavSection title='automação'>
        <NavLink href='/forms' title='formulários' icon={RiInputMethodLine} />
        <NavLink href='/automation' title='automação' icon={RiGitMergeLine} />
      </NavSection>
    </Stack>
  );
}
