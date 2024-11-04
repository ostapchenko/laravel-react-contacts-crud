import { Nunito } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import '@/app/global.css'

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
            <body className="antialiased">
                {children}
                <Toaster />
            </body>
        </html>
    )
}

export const metadata = {
    title: 'App',
}

export default RootLayout
