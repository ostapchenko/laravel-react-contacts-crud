import ContactForm from '@/app/(app)/contacts/_components/ContactForm'

export const metadata = {
    title: 'App - Contacts',
}

const Home = () => {
    return (
        <>
            <div className="container px-4 mx-auto my-8 sm:my-6 sm:px-6 lg:px-8">
                <div className="px-2 py-4 bg-white shadow sm:rounded-lg">
                    <ContactForm />
                </div>
            </div>
        </>
    )
}

export default Home
