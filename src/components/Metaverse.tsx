import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';

const Metaverse = () => {

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('userToken');
    
        if (!token) {
            router.push('/tokencheck');
        }
    }, [router]);


    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem("userToken");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    

    return (
        <div
            className="w-full h-screen relative flex flex-col justify-between items-center p-8 md:p-16 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://iili.io/dwLSkba.jpg')" }}
        >

            <div className="w-full">
                <div className="flex justify-between items-center z-10">
                    <Image 
                        height={50} 
                        width={200} 
                        src="https://iili.io/dwLP8zX.png" 
                        alt="Logo" 
                    />
                    <div className="flex items-center gap-8">
                        <ul className="flex gap-8 list-none">
                            <li>
                                <a href="#" className="text-white text-sm transition duration-300 hover:text-[#55F9F3]">Home</a>
                            </li>
                            <li>
                                <a href="#" className="text-white text-sm transition duration-300 hover:text-[#55F9F3]">Explore</a>
                            </li>
                            <li>
                                <a href="#" className="text-white text-sm transition duration-300 hover:text-[#55F9F3]">Support</a>
                            </li>
                            <li>
                                <a href="#" className="text-white text-sm transition duration-300 hover:text-[#55F9F3]">Contact Us</a>
                            </li>
                        </ul>
                        <button
                            className="border border-[#55F9F3] text-[#55F9F3] px-6 py-3 text-lg transition duration-300 hover:bg-[#55F9F3] hover:text-black">
                            Sign Up
                        </button>
                    </div>
                </div>

                <div className='flex justify-between items-center p-4'>
                    <div>
                        <div className="flex flex-col items-start z-10 mt-16">
                        <h1 className="text-white text-[54px] font-light">METAVERSE</h1>
                        <h2 className="text-white text-[22px] font-extralight font-rocgroteskwide-extralight">
                            Step into the World of Star Wars
                        </h2>
                        </div>
                    </div>


                    <div className='flex flex-col items-start z-10 mt-16'>
                    <h1 className="text-white text-[54px] font-light">WELCOME TO THE METAVERSE</h1>
                        <h2 className="text-white text-[22px] font-extralight font-rocgroteskwide-extralight">
                            This is the Demo of Token Gated Metaverse
                        </h2>
                    </div>
                </div>

            </div>

            <div className="flex justify-between items-end w-full z-10 mb-8">
                <div className="flex flex-col gap-4">
                    <h3 className="text-[25px] font-bold text-[#55F9F3]">Features</h3>
                    <Image 
                        height={140} 
                        width={140} 
                        src="https://iili.io/dwLL8zP.png" 
                        alt="Features Image" 
                        className="w-[140px]" 
                    />
                    <h4 className="text-white text-lg">Key Highlights</h4>
                    <p className="text-sm text-[#FDF7FE] font-rocgroteskwide-extralight">
                        Explore our platforms standout features.
                    </p>
                    <hr className="bg-[#55F9F3] h-1 border-none mt-1" />
                </div>

                <button
                    className="border border-[#55F9F3] text-[#55F9F3] px-6 py-3 text-lg transition duration-300 hover:bg-[#55F9F3] hover:text-black">
                    Explore
                </button>

                <div className="flex flex-col items-end gap-5">
                    <hr className="h-24 w-1 bg-[#55F9F3] border-none mb-2" />
                    <a href="#"><Image src="https://iili.io/dwLiupI.png" alt="Discord Icon" width={30} height={30} /></a>
                    <a href="#"><Image src="https://iili.io/dwLiSyB.png" alt="Twitter Icon" width={30} height={30} /></a>
                    <a href="#"><Image src="https://iili.io/dwLskVn.png" alt="Instagram Icon" width={30} height={30} /></a>
                </div>
            </div>
        </div>
    );
}

export default Metaverse