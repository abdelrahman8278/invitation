import './globals.css'
import { Playfair_Display, Montserrat, Cairo } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' })

export const metadata = {
    title: 'Abdelrahman & Esraa Wedding',
    description: 'You are cordially invited to our wedding',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${cairo.variable}`}>
            <body className="font-montserrat" suppressHydrationWarning>
                {children}
            </body>
        </html>
    )
}
