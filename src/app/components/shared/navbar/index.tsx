import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <header className="w-full h-[87px] flex items-center justify-center bg-[#054a91]">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Melhor Celular logo"
          width={70}
          height={70}
        />
      </Link>
    </header>
  );
};

export { Navbar };
