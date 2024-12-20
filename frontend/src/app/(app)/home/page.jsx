import Header from '@/app/(app)/Header'

export const metadata = {
    title: 'App - Home',
}

const Home = () => {
    return (
        <>
            <Header title="Home" />

            <div className="container px-4 mx-auto my-8 sm:my-6 sm:px-6 lg:px-8">
                <div className="p-4 text-center bg-white shadow sm:rounded-lg">
                    Use the main navigation to access the contacts page.
                </div>
            </div>
        </>
    )
}

export default Home
