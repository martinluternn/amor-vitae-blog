import Image from "next/image";

export default function PageBackground() {
  return (
    <Image
      src="/background.svg"
      alt="Background"
      fill
      className="z-0 absolute bottom-0 left-0 right-0 w-full"
    />
  );
}
