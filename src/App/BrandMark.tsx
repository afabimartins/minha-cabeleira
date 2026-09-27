import brandMarkUrl from "../assets/minha-cabeleira-logo-mark.png";

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
      draggable={false}
    />
  );
}
