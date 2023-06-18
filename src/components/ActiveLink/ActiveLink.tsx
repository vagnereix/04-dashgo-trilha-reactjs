import { useRouter } from 'next/dist/client/router';
import Link, { LinkProps } from 'next/link';
import { cloneElement, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
}

export function ActiveLink({ children, href, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();
  const isActive = href === asPath || asPath.includes(String(href));

  return (
    <Link href={href} {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50',
      })}
    </Link>
  );
}
