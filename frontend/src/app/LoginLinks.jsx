'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <div>
            {user ? (
                <Link
                    href="/home"
                    className="ml-4 text-3xl text-gray-700 underline cursor-pointer xs:text-xl"
                >
                    Home Page
                </Link>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="text-3xl text-gray-700 underline cursor-pointer xs:text-xl"
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="ml-4 text-3xl text-gray-700 underline cursor-pointer xs:text-xl"
                    >
                        Register
                    </Link>
                </>
            )}
        </div>
    )
}

export default LoginLinks
