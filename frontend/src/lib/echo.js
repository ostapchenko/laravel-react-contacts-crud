import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default function laravelEcho() {
    window.Pusher = Pusher

    return new Echo({
        broadcaster: 'pusher',
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
        wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST,
        wsPort: process.env.NEXT_PUBLIC_PUSHER_PORT,
        wssPort: process.env.NEXT_PUBLIC_PUSHER_PORT,
        cluster: 'us1',
        forceTLS: false,
        encrypted: true,
        disableStats: true,
        enabledTransports: ['ws', 'wss'],
        authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/broadcasting/auth`,
    })
}
