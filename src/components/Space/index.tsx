type SizeKey = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMap: Record<SizeKey, number> = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 42,
  xl: 84,
};

type SpaceProps = {
  size: SizeKey;
  position?: "vertical" | "horizontal";
};

export default function Space({ size, position = "vertical" }: SpaceProps) {
  const pixelSize = sizeMap[size];
  const dimension =
    position === "horizontal" ? { width: pixelSize } : { height: pixelSize };

  return <div style={dimension} />;
}
