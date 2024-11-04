import Header from '@/app/(app)/Header'
import ContactsTable from '@/app/(app)/contacts/_components/ContactsTable'

export const metadata = {
    title: 'App - Contacts',
}

const Home = () => {
    return (
        <>
            <div className="container px-4 mx-auto my-8 sm:my-6 sm:px-6 lg:px-8">
                <div className="px-2 py-4 bg-white shadow sm:rounded-lg">
                    <ContactsTable />
                </div>
            </div>
        </>
    )
}

export default Home
