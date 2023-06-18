import {
  Icon,
  Link as ChakraLink,
  Text,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';
import { ActiveLink } from '../ActiveLink/ActiveLink';

interface NavLinkProps extends ChakraLinkProps {
  icon: IconType;
  title: string;
  href: string;
}

export function NavLink({ icon, title, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink passHref href={href}>
      <ChakraLink display='flex' align='center' {...rest}>
        <Icon as={icon} fontSize='20' />
        <Text ml='4' fontWeight='medium' textTransform='capitalize'>
          {title}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
