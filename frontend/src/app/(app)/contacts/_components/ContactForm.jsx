'use client'

import Link from 'next/link'
import InputError from '@/components/InputError'
import { useState } from 'react'

import Loader from '@/components/Loader'
import { useContacts } from '@/hooks/contacts'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ContactForm({ contact } = { contact: null }) {
    const router = useRouter()

    const nameOnEdit = contact ? `${contact.name_first} ${contact.name_last}` : ''

    const [nameFirst, setNameFirst] = useState(contact?.name_first ?? '')
    const [nameLast, setNameLast] = useState(contact?.name_last ?? '')
    const [email, setEmail] = useState(contact?.email ?? '')
    const [phone, setPhone] = useState(contact?.phone ?? '')

    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const { store, update } = useContacts()

    const submitForm = async event => {
        event.preventDefault()

        setLoading(true)

        const params = {
            ...(contact ? { id: contact.id } : {}),
            name_first: nameFirst,
            name_last: nameLast,
            email,
            phone,
        }

        try {
            const { validationErrors } = contact
                ? await update(params)
                : await store(params)

            if (validationErrors) {
                setErrors(validationErrors)

                return
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')

            throw error
        } finally {
            setLoading(false)
        }

        toast.success(
            contact
                ? 'Contact successfully updated.'
                : 'Contact successfully created.'
        )

        router.push('/contacts')
    }

    if (loading) {
        return <Loader />
    }

    return (
        <form className="p-5" onSubmit={submitForm}>
            <div className="space-y-12">
                <div className="pb-12 border-b border-gray-900/10">
                    <h2 className="font-semibold text-gray-900 text-base/7">
                        {contact ? `Edit "${nameOnEdit}" Contact` : 'Create Contact'}
                    </h2>
                    <p className="mt-1 text-gray-600 text-sm/6">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/* First Name */}
                        <div className="sm:col-span-3">
                            <label htmlFor="name-first" className="block font-medium text-gray-900 text-sm/6">
                                First Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name-first"
                                    name="name-first"
                                    type="text"
                                    autoComplete="given-name"
                                    required="required"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm/6"
                                    value={nameFirst}
                                    onChange={event => setNameFirst(event.target.value)}
                                />
                            </div>

                            <InputError messages={errors.name_first} className="mt-2" />
                        </div>

                        {/* Last Name */}
                        <div className="sm:col-span-3">
                            <label htmlFor="name-last" className="block font-medium text-gray-900 text-sm/6">
                                Last Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name-last"
                                    name="name-last"
                                    type="text"
                                    autoComplete="family-name"
                                    required="required"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm/6"
                                    value={nameLast}
                                    onChange={event => setNameLast(event.target.value)}
                                />
                            </div>

                            <InputError messages={errors.name_last} className="mt-2" />
                        </div>

                        {/* Email Address */}
                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block font-medium text-gray-900 text-sm/6">
                                Email Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required="required"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm/6"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </div>

                            <InputError messages={errors.email} className="mt-2" />
                        </div>

                        {/* Phone Number */}
                        <div className="sm:col-span-3">
                            <label htmlFor="phone" className="block font-medium text-gray-900 text-sm/6">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="phone"
                                    required="required"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm/6"
                                    value={phone}
                                    onChange={event => setPhone(event.target.value)}
                                />
                            </div>

                            <InputError messages={errors.phone} className="mt-2" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end mt-6 gap-x-6">
                <Link href="/contacts" className="font-semibold text-gray-900 text-sm/6">
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-emerald-600 hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                    {contact ? 'Save' : 'Create'}
                </button>
            </div>
        </form>
    )
}
