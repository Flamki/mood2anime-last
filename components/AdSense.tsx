import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSense = () => {
  useEffect(() => {
    try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error(err)
      }
    }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-8606722643335158"
      data-ad-slot="pub-8606722643335158"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

export default AdSense