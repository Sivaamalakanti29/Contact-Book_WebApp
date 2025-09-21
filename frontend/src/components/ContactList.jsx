import React, { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../api";

function ContactList({refresh}) {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    const data = await getContacts(page, 5);
    setContacts(data.contacts || []); 
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, [page, refresh]);

  const handleDelete = async (id) => {
    await deleteContact(id);
    fetchContacts();
  };

  if (loading) return <p>Loading contacts...</p>;

  return (
    <div>
      <ul className="list-group">
        {contacts.length === 0 && <li className="list-group-item">No contacts found.</li>}
        {contacts.map((contact) => (
          <li key={contact._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{contact.name}</strong> <br />
              {contact.email} <br />
              {contact.phone}
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="mt-3 d-flex justify-content-between">
        <button disabled={page === 1} className="btn btn-secondary" onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page}</span>
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default ContactList;
