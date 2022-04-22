import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import { CSSProperties, FC, MouseEvent, ReactNode } from "react";
import { useRouter } from "next/router";
import { pushUser } from "../utils/router";

type Props = {
  href: string;
  children?: ReactNode;
};

export const TextLink: FC<Props> = ({ href, children }) => {
  const router = useRouter();

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    pushUser(router, href, "link");
  };
  return (
    <NextLink href={href} passHref>
      <ChakraLink onClick={onClick}>{children}</ChakraLink>
    </NextLink>
  );
};

type OtherProps = {
  href: string;
  children?: ReactNode;
  style?: CSSProperties;
};

export const Link: FC<OtherProps> = ({ href, children, style }) => {
  const router = useRouter();

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    pushUser(router, href, "link");
  };

  return (
    <NextLink href={href} passHref>
      <a onClick={onClick} style={style}>
        {children}
      </a>
    </NextLink>
  );
};
