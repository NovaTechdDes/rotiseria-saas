'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

const Home = () => {
  const router = useRouter();

  useEffect(()  => {
    const host = window.location.host;
    const rotiseria = host.split('.')[0];
    console.log(rotiseria);
    if(rotiseria === 'localhost:3000'){
      console.log("a");
      router.replace('/rotiseria1')
    }else{
      router.replace(`/${rotiseria}`)
    }
  }, [router]);

  return null
}

export default Home