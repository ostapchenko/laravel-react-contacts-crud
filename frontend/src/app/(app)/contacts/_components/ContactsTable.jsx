'use client'

import Link from 'next/link'
import Loader from '@/components/Loader'
import { useContacts } from '@/hooks/contacts'
import ContactDeleteLink from '@/app/(app)/contacts/_components/ContactDeleteLink'
import toast from 'react-hot-toast'

export default function ContactsTable() {
    const { contacts, destroy } = useContacts()

    const handleDelete = async (id) => {
        await destroy(id)

        toast.success('Contact successfully deleted.')
    }

    if (!Array.isArray(contacts)) {
        return <Loader />
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Contacts</h1>
            <p className="mt-2 text-sm text-gray-700">
                A list of all the contacts in the database.
            </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <Link
                    href="/contacts/create"
                    className="block px-3 py-2 text-sm font-semibold text-center text-white rounded-md shadow-sm bg-emerald-600 hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                    Add Contact
                </Link>
            </div>
        </div>
        <div className="flow-root mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        First Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Last Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Phone Number
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Edit</span>
                    </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {
                        Array.isArray(contacts) &&
                        contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">{contact.name_first}</td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{contact.name_last}</td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{contact.email}</td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{contact.phone}</td>
                                <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                                    <Link
                                        href={`/contacts/${contact.id}/edit`}
                                        className="text-emerald-600 hover:text-emerald-900"
                                    >
                                        Edit<span className="sr-only">, {contact.name}</span>
                                    </Link>
                                    <ContactDeleteLink contact={contact} onDelete={handleDelete} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    )
}
