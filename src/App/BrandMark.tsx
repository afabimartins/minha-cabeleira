import brandMarkUrl from "../assets/minha-cabeleira-logo-mark-ui.png";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({
  className,
}: BrandMarkProps) {
  return (
    <img
      className={className}
      src={brandMarkUrl}
      alt=""
      aria-hidden="true"
      width={256}
      height={256}
      decoding="async"
      draggable={false}
    />
  );
}
