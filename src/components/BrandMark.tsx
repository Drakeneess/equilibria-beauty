import Image from "next/image";

type BrandMarkProps = {
  placement?: "navbar" | "footer";
  onActivate?: () => void;
};

/**
 * Brand mark approved for Equilibria Beauty.
 * Uses the refined, externally-editable SVG asset verbatim instead of re-tracing
 * the symbol or reconstructing its custom typography with font glyphs.
 */
export function BrandMark({ placement = "navbar", onActivate }: BrandMarkProps) {
  return (
    <a
      className={`brand-link brand-link--${placement}`}
      href="#inicio"
      aria-label="Equilibria Beauty — volver al inicio"
      onClick={onActivate}
    >
      <Image
        className="brand-link__image"
        src="/brand/equilibria-beauty.svg"
        width={1921}
        height={570}
        alt=""
        aria-hidden="true"
        priority={placement === "navbar"}
        unoptimized
      />
      <span className="brand-link__accent" aria-hidden="true" />
    </a>
  );
}
