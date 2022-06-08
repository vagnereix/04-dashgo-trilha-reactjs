import { Icon, Link, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface NavLinkProps extends ChakraLinkProps {
  icon: IconType;
  title: string;
}

export function NavLink({ icon, title, ...rest }: NavLinkProps) {
  return (
    <Link display='flex' align='center' {...rest}>
      <Icon as={icon} fontSize='20' />
      <Text ml='4' fontWeight='medium' textTransform='capitalize'>{title}</Text>
    </Link>
  )
}
