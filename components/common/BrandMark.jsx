const HEIGHT = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
};

export default function BrandMark({ size = "md" }) {
  return (
    <img
      src="/images/logo.jpg"
      alt="Agmoo"
      className={`${HEIGHT[size] || HEIGHT.md} w-auto max-w-[160px] object-contain object-left`}
    />
  );
}
