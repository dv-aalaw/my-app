import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '../styles/globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
