import React, { useState } from 'react'
import { Connection, PublicKey, VersionedTransaction, TransactionMessage, Keypair } from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import Image from 'next/image';

const NewComponent = () => {
    const {publicKey} = useWallet();
    
    const [processing, setProcessing] = useState<boolean>(false);
    const [airdropDone, setAirdropDone] = useState<boolean>(false);

    
const TOKEN_MINT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_MINT || '';
const AIRDROP_AMOUNT = 10_000_00; 
const RECIPIENT_PUBLIC_KEY = publicKey?.toBase58() || '';


const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const base58PrivateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || '';
const senderKeypair = Keypair.fromSecretKey(bs58.decode(base58PrivateKey));

async function getOrCreateAssociatedTokenAccount(mint: any, owner: any, payer: any) {
    const ata = await getAssociatedTokenAddress(mint, owner);


    const accountInfo = await connection.getAccountInfo(ata);
    if (accountInfo === null) {
        const createATAInstruction = createAssociatedTokenAccountInstruction(
            payer,
            ata,
            owner,
            mint
        );
        return { ata, createATAInstruction };
    }
    return { ata };
}

async function handleAirdrop() {
    setProcessing(true)
    try {
        const fromWallet = senderKeypair.publicKey;
        const mintPublicKey = new PublicKey(TOKEN_MINT_ADDRESS);
        const recipientPublicKey = new PublicKey(RECIPIENT_PUBLIC_KEY);

        const { ata: senderATA } = await getOrCreateAssociatedTokenAccount(mintPublicKey, fromWallet, fromWallet);

        const { ata: recipientATA, createATAInstruction } = await getOrCreateAssociatedTokenAccount(mintPublicKey, recipientPublicKey, fromWallet);

        const instructions = [];

        if (createATAInstruction) {
            instructions.push(createATAInstruction);
        }

        const transferInstruction = createTransferInstruction(
            senderATA,
            recipientATA, 
            fromWallet, 
            AIRDROP_AMOUNT, 
        );

        instructions.push(transferInstruction);

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

        const messageV0 = new TransactionMessage({
            payerKey: fromWallet,
            recentBlockhash: blockhash,
            instructions,
        }).compileToV0Message();

        const transaction = new VersionedTransaction(messageV0);


        transaction.sign([senderKeypair]);

        const signature = await connection.sendTransaction(transaction);
        console.log('Airdrop transaction sent with signature:', signature);

        const confirmationStrategy = {
            signature,
            blockhash,
            lastValidBlockHeight,
        };

        await connection.confirmTransaction(confirmationStrategy, 'confirmed');
        console.log('Airdrop successful!');
        setAirdropDone(true);
    } catch (error) {
        console.error('Airdrop failed:', error);
    }
}

  return (
    <div>
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md max-w-xl mx-auto mt-8">
                <h2 className="text-3xl font-bold mb-6 text-center border-b-2 border-blue-500 pb-2">Get Free Baby Yoda Token Airdrop</h2>
                <div className="flex justify-center">
                    {processing ? (

                        !airdropDone ? (
                            <div className='w-full'>
                                <div className='h-1.5 w-full bg-pink-100 overflow-hidden'>
                                    <div className='animate-progress w-full h-full bg-pink-500 origin-left-right'></div>
                                </div>
                            </div>) : (<div><p className='font-bold text-2xl'>Airdrop Successfull</p></div>)

                    ) : (
                    <div>
                        <Image
                            alt=''
                            src='https://coinsboutique.com/sites/default/files/styles/product-full/public/products/2021-Mandalorian-Child-silver-coin-rveverse_Fotor.jpg?itok=U9BwRate'
                            height={150}
                            width={150}
                            className='rounded-full border-4 border-gray-300 shadow-lg'
                        />
                        <br></br>

                    <button className='bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300' onClick={() => handleAirdrop()}>
                        <p className='text-white font-bold text-2xl'>Airdrop</p>
                    </button>
                    </div>)}
                </div>
            </div>
    </div>
  )
}

export default NewComponent
