import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const figtree = Figtree({
    variable: '--font-figtree',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Invoice Generator',
    description: 'Invoice Generator App By AarambhaIT',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${figtree.variable} antialiased bg-[#F7FBFF]`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}