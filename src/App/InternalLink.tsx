import type {
  AnchorHTMLAttributes,
  MouseEvent,
} from "react";

import {
  navigateTo,
} from "./navigation";

type InternalLinkProps =
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string;
  };

export function InternalLink({
  to,
  onClick,
  ...props
}: InternalLinkProps) {
  function handleClick(
    event: MouseEvent<HTMLAnchorElement>,
  ) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      props.target === "_blank" ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigateTo(to);
  }

  return (
    <a
      {...props}
      href={to}
      onClick={handleClick}
    />
  );
}
