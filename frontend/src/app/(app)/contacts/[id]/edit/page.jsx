'use client'

import { useState } from 'react'

import { useContacts } from '@/hooks/contacts'

import ContactForm from '@/app/(app)/contacts/_components/ContactForm'
import ContactLogsTable from '@/app/(app)/contacts/_components/ContactLogsTable'

import Loader from '@/components/Loader'

const ContactEdit = ({ params }) => {

    const { id } = params

    const { find } = useContacts()

    const [contact, setContact] = useState(null)

    let { isLoading, isValidating } = find(id, contact =>
        setContact(contact)
    )

    if (isLoading || isValidating) {
        return <Loader />
    }

    return (
        <div className="container px-4 mx-auto my-8 sm:my-6 sm:px-6 lg:px-8">
            <div className="px-2 py-4 bg-white shadow sm:rounded-lg">
                <ContactForm contact={contact} />
            </div>
            <div className="px-2 py-4 mt-4 bg-white shadow sm:rounded-lg">
                <ContactLogsTable contact={contact} />
            </div>
        </div>
    )
}

export default ContactEdit
