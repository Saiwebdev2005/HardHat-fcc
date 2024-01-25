"use client"
import { MoralisProvider } from "react-moralis";
import Navbar from "../components/Navbar";


export default function Home() {
  return (
   <main>
    <MoralisProvider initializeOnMount={false}>
    <Navbar/>
    </MoralisProvider>
   </main>
  );
}
