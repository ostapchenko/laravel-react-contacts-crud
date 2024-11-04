'use client'

export default function ContactLogsTable({ contact } = { contact: null }) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Change Logs</h1>
            </div>
        </div>
        <div className="flow-root mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                            Field Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Old Value
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            New Value
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            User Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Date and Time
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {
                        Array.isArray(contact?.logs) &&
                        contact.logs.map((log) => (
                            <tr key={log.id}>
                                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">{log.field}</td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{log.value_old}</td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{log.value_new}</td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{log.user_name}</td>
                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {(new Date(Date.parse(log.created_at))).toLocaleDateString()}
                                    &nbsp;
                                    {(new Date(Date.parse(log.created_at))).toLocaleTimeString()}
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
