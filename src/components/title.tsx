import Image from 'next/image';

export default function Title() {
  return (
    <div className="absolute top-6 left-6 md:top-12 md:left-12 flex items-center text-lg font-medium">
      <Image src="/logo.png" width={50} height={50} alt="Logo" />
      Waloot
    </div>
  );
}
