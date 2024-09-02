import CheckToken from '@/components/CheckToken'
import Footer from '@/components/Designs/Footer';
import Navbar from '@/components/Designs/Navbar';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import React, { useEffect, useState } from 'react'

const Tokencheck = () => {

    const [isClient, setIsClient] = useState<boolean>(false);
    const [showGlowingText, setShowGlowingText] = useState<boolean>(true);

    useEffect(() => {
        setIsClient(true);
    }, []);


  return (
    <div className="relative h-screen w-full overflow-hidden">
    <div className="h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/originals/4a/a9/9b/4aa99b6ad2d2cbc7cb04a41571885a8f.jpg')" }}>


  {/* <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://i.pinimg.com/originals/4a/a9/9b/4aa99b6ad2d2cbc7cb04a41571885a8f.jpg')" }}></div> */}


            <Navbar />

              <div className='flex justify-between items-center p-4'>
                <p className=''></p>

                <div className="flex items-center space-x-4">
                  {showGlowingText &&
                  <div className="flex justify-center">
                    <p className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-xl py-2 px-5 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out glow">
                      Connect to Solana Wallet Now ➡️➡️
                    </p>
                  </div> }

                  {isClient && <button onClick={() => setShowGlowingText(false)}><WalletMultiButton /></button>}
                </div>
              </div>


            <br></br>
            <br></br>
            <br></br>
            <br></br>


            <CheckToken />

            <Footer />
      </div>
      </div>
  )
}

export default Tokencheck