import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const ChevronLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="M15 6l-6 6 6 6" />
  </Icon>
);

export const Check = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
);

export const Shuffle = (p: IconProps) => (
  <Icon {...p}>
    <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
  </Icon>
);

export const Play = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 5v14l12-7z" fill="currentColor" stroke="none" />
  </Icon>
);

export const Lock = (p: IconProps) => (
  <Icon {...p}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 118 0v3" />
  </Icon>
);

export const ThumbUp = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <Icon {...p}>
    <path
      d="M7 10v11H4a1 1 0 01-1-1v-9a1 1 0 011-1h3zm0 0l4-8a3 3 0 013 3v4h5.5a2 2 0 012 2.3l-1.4 8.4a2 2 0 01-2 1.3H7"
      fill={filled ? "currentColor" : "none"}
    />
  </Icon>
);

export const ThumbDown = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <Icon {...p} style={{ transform: "rotate(180deg)", ...p.style }}>
    <path
      d="M7 10v11H4a1 1 0 01-1-1v-9a1 1 0 011-1h3zm0 0l4-8a3 3 0 013 3v4h5.5a2 2 0 012 2.3l-1.4 8.4a2 2 0 01-2 1.3H7"
      fill={filled ? "currentColor" : "none"}
    />
  </Icon>
);
