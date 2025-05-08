import React, { useState } from 'react';

const CreateTicket = () => {
    const [ticketName, setTicketName] = useState('');
    const [ticketDescription, setTicketDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTicket = { name: ticketName, description: ticketDescription };

        try {
            const response = await fetch('http://localhost:3000/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTicket),
            });

            if (response.ok) {
                alert('Ticket created successfully!');
                setTicketName('');
                setTicketDescription('');
            } else {
                alert('Failed to create ticket.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the ticket.');
        }
    };

    return (
        <div className='flex flex-col gap-2 p-3 bg-white rounded-lg shadow-md'>
            <form className='flex flex-col gap-2 p-5' onSubmit={handleSubmit}>
                <h2 className='text-black'>Ticket Name</h2>
                <input type='text' value={ticketName} onChange={(e) => setTicketName(e.target.value)} placeholder='Enter ticket name' className='text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                <h2 className='text-black'>Ticket Description</h2>
                <textarea value={ticketDescription} onChange={(e) => setTicketDescription(e.target.value)} placeholder='Enter ticket description' className='text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>Create Ticket</button>
            </form>
        </div>
    );
};

export default CreateTicket;