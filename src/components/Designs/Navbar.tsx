import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-black h-[150px] border-b border-gray-700 flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <button onClick={() => router.push('/create-token')}>
          <Image
            alt="image"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXMw4BPBYmGXV2BF5Hhoxr8m3pMRLG_1iJsg&s"
            className="h-10"
            width={250}
            height={40}
          />
        </button>

        <Image
          alt=""
          className="pt-2"
          src="https://uploads.commoninja.com/searchengine/wix/xcollab-brand-collaborations.png"
          height={250}
          width={40}
        />

        <Image
          alt=""
          className="pt-2"
          src="https://iili.io/dNNCrkg.jpg"
          height={200}
          width={200}
        />

        <Image
          alt=""
          className="pt-2"
          src="https://iili.io/dNNnkwG.jpg"
          height={250}
          width={200}
        />
      </div>
    </nav>
  );
};

export default Navbar;
