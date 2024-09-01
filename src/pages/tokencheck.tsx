import CheckToken from '@/components/CheckToken'
import Footer from '@/components/Designs/Footer';
import Navbar from '@/components/Designs/Navbar';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import React, { useEffect, useState } from 'react'

const Tokencheck = () => {

    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


  return (
    <div className="h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/originals/4a/a9/9b/4aa99b6ad2d2cbc7cb04a41571885a8f.jpg')" }}>
            <Navbar />

            <div className='flex justify-between items-center p-4'>
              <p className=''></p>
                {isClient && <WalletMultiButton />}
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>


            <CheckToken />
      </div>
  )
}

export default Tokencheck