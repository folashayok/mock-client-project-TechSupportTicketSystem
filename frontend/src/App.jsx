import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [allTickets, setAllTickets] = useState([]);

  // Function to add a new ticket
  const addNewTicket = (ticket) => {
    const newTicket = { ...ticket, id: Date.now(), status: 'Open' };
    setAllTickets([...allTickets, newTicket]);
    setCurrentView('home'); 
  };

  const changeTicketStatus = (ticketId, newStatus) => {
    setAllTickets(
      allTickets.map((ticket) =>
        ticket.id == ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  return (
    <div className="container">
      {currentView == 'home' && (
        <>
          <h1>FixItNow Helpdesk</h1>
          <button onClick={() => setCurrentView('submit')}>Submit Ticket</button>
          <button onClick={() => setCurrentView('admin')}>Admin View</button>
        </>
      )}
      {currentView == 'submit' && <TicketForm onSubmit={addNewTicket} goHome={() => setCurrentView('home')} />}
      {currentView == 'admin' && (
        <AdminView tickets={allTickets} onUpdateStatus={changeTicketStatus} goHome={() => setCurrentView('home')} />
      )}
    </div>
  );
};

const TicketForm = ({ onSubmit, goHome }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !title || !description) {
    }
    onSubmit({ name, title, description, urgency });
  };

  return (
    <div>
      <h2>Submit a Support Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div><input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /></div>
        <div><input placeholder="Issue" value={title} onChange={e => setTitle(e.target.value)} /></div>
        <div>
          <textarea
            placeholder="Issue Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Urgency: </label>
          <select value={urgency} onChange={e => setUrgency(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">Submit Ticket</button>
        <button type="button" onClick={goHome}>Cancel</button>
      </form>
    </div>
  );
};

const AdminView = ({ tickets, onUpdateStatus, goHome }) => (
  <div>
    <h2>Admin View: All Tickets</h2>
    {tickets.length == 0 ? (
      <p>No tickets submitted yet.</p>
    ) : (
      tickets.map(ticket => (
        <div key={ticket.id} style={{ border: '1px solid gray', padding: '10px', margin: '10px 0' }}>
          <p><strong>{ticket.title}</strong> - <em>Submitted by {ticket.name}</em></p>
          <p>{ticket.description}</p>
          <p><strong>Urgency:</strong> {ticket.urgency}</p>
          <label>Status: </label>
          <select
            value={ticket.status}
            onChange={(e) => onUpdateStatus(ticket.id, e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      ))
    )}
    <button onClick={goHome}>Back to Home</button>
  </div>
);


export default App;
