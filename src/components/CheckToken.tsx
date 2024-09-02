import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import NewComponent from './TokenAirdrop';
import TokenNotFound from './TokenNotFound';

const CheckToken = () => {
    const [tokenExists, setTokenExists] = useState<boolean>(false);
    const [showAirdropModel, setShowAirdropModel] = useState<boolean>(false);
    const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);
    const [checkingToken, setCheckingToken] = useState<boolean>(false);

    const [showMetverseCheck, setShowMetaverseCheck] = useState<boolean>(false);

    const router = useRouter();

    const {publicKey} = useWallet();

    const exists = 'yes';

    const apiURL = process.env.NEXT_PUBLIC_API_URL || '';
    const tokenMint = process.env.NEXT_PUBLIC_TOKEN_MINT || '';

    const checkUserToken = async () => {
        const formData = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getTokenAccountsByOwner",
            "params": [
            publicKey,
              {
                "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
              },
              {
                "encoding": "jsonParsed"
              }
            ]
          }
    
          try {
              const savedUserResponse = await fetch(apiURL, {
                method: "POST",
                body: JSON.stringify(formData)
            });

            const response = await savedUserResponse.json();

            let tokenFound = false;

            response.result.value.forEach((item: any) => {
                if(item.account.data.parsed.info.mint === tokenMint) {
                  tokenFound = true;
                    setTokenExists(true)
                    console.log("The Token Exists")

                    setCheckingToken(false);

                    setTimeout(() => {
                      setShowMetaverseCheck(true);

                      setTimeout(() => {
                        router.push('/metaverse')
                        localStorage.setItem('userToken', exists);
                      }, 2000);
                    });
                }
            });

            if(!tokenFound) {
              setShowErrorPopup(true)
            }

            
          }
          catch(error) {
            console.log('Error: ', error)
          }
        }

  return (
      <div>
        <div>
          <section className="relative overflow-hidden sm:grid sm:grid-cols-2">
            <div className="flex items-center p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="bg-black mx-auto max-w-xl text-center sm:text-left">
                <h1 className="bg-black text-4xl font-bold text-white md:text-4xl">
                  Welcome To the Star Wars Metaverse
                </h1>

                <h3 className="bg-black hidden text-white text-2xl md:mt-4 md:block">
                  <p className="text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg shadow-lg text-base">
                    Get exclusive access to the Metaverse for Star Wars fans
                  </p>
                  <br />
                  {checkingToken ? (<p>Checking Your Token</p>) : (<p>Check Your Token Now</p>)}
                </h3>

                <div className='mt-4 md:mt-8'>

                    {
                      checkingToken ? (
                        <div className='w-full'>
                          <div className='h-1.5 w-full bg-pink-100 overflow-hidden'>
                            <div className='animate-progress w-full h-full bg-pink-500 origin-left-right'></div>
                          </div>
                        </div>
                      ) : showMetverseCheck ? (
                        <div className='text-white'>
                          <Image
                            alt=''
                            src={"https://cdn.dribbble.com/users/4358240/screenshots/14825308/media/84f51703b2bfc69f7e8bb066897e26e0.gif"}
                            height={200}
                            width={200}
                          />
                        </div>
                      ) : (
                        <button
                          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 font-bold text-xl"
                          onClick={() => {
                            setCheckingToken(true);
                            checkUserToken();
                          }}
                        >
                          Check Token Holding
                        </button>
                      )
                    }

                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                alt=""
                src="https://iili.io/dNN8Dv4.png"
                className="mx-auto"
                width={500}
                height={200}
              />
              <button
                className="bg-blue-700 px-3 py-1 absolute top-4 left-4 text-white font-bold text-xl font-[Orbitron] tracking-widest drop-shadow-md"
                onClick={() => setShowAirdropModel(true)}
              >
                Airdrop Baby Yoda Tokens
              </button>
            </div>
          </section>

          {showAirdropModel && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative bg-slate-700 p-4 rounded-lg shadow-lg max-w-md w-full">
                <button
                  className="absolute top-2 right-2 text-white text-4xl"
                  onClick={() => setShowAirdropModel(false)}
                >
                  X
                </button>
                <NewComponent />
              </div>
            </div>
          )}

          {showErrorPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative bg-slate-700 p-4 rounded-lg shadow-lg max-w-md w-full">
                <button
                  className="absolute top-2 right-2 text-white text-4xl"
                  onClick={() => setShowErrorPopup(false)}
                >
                  X
                </button>
                <TokenNotFound />
              </div>
            </div>
          )}


        </div>
      </div>
  )
}

export default CheckToken