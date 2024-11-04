import useSWR from 'swr'
import useSWRSubscription from 'swr/subscription'
import axios from '@/lib/axios'
import laravelEcho from '@/lib/echo'
import csrf from '@/hooks/csrf'

export const useContacts = () => {
    const { data: contacts, error } = useSWRSubscription(
        'contacts',
        (key, { next }) => {
            const echo = laravelEcho()

            next(
                null,
                axios.get('/api/contacts').then(res => res.data.data),
            )

            echo.channel(key)
                .listen('ContactCreatedEvent', ({ contact }) => {
                    next(null, prev =>
                        prev.find(item => item.id === contact.id)
                            ? prev
                            : [...prev, contact],
                    )
                })
                .listen('ContactUpdatedEvent', ({ contact }) => {
                    next(null, prev =>
                        prev.map(item =>
                            item.id === contact.id ? contact : item,
                        ),
                    )
                })
                .listen('ContactDeletedEvent', ({ contact }) => {
                    next(null, prev =>
                        prev.filter(item => item.id !== contact.id),
                    )
                })

            return () => echo.leaveChannel('contacts')
        },
    )

    const find = (id, onLoaded) => {
        const {
            data: contact,
            isLoading,
            isValidating,
        } = useSWR(
            id ? `/api/contacts/${id}` : null,
            url => axios.get(url).then(res => res.data.data),
            {
                onSuccess: onLoaded,
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
            },
        )

        return {
            contact,
            isLoading,
            isValidating,
        }
    }

    const store = async props => {
        await csrf()

        try {
            await axios.post('/api/contacts', props, { timeout: 25000 })
        } catch (error) {
            if (error.status !== 422) throw error

            return { validationErrors: error.response.data.errors }
        }

        return {}
    }

    const update = async ({ id, ...props }) => {
        await csrf()

        try {
            await axios.put(`/api/contacts/${id}`, props)
        } catch (error) {
            if (error.status !== 422) throw error

            return { validationErrors: error.response.data.errors }
        }

        return {}
    }

    const destroy = async id => {
        await csrf()

        axios.delete(`/api/contacts/${id}`)
    }

    return {
        contacts,
        error,
        find,
        store,
        update,
        destroy,
    }
}
