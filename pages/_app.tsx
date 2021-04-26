import '../styles/globals.css';
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { AppProvider } from '../reactcontext/App';


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppProvider>
            <Component {...pageProps} />
        </AppProvider>
    )


}

export default MyApp