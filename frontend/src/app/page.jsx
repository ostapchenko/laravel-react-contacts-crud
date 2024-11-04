import LoginLinks from './LoginLinks'

export const metadata = {
    title: 'App',
}

const Home = () => {

    return (
        <>
            <div className="relative flex items-center justify-center min-h-screen pt-0 bg-gray-100">
                <LoginLinks />
            </div>
        </>
    )
}

export default Home
