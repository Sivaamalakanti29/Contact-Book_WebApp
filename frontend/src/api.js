//  Use environment variable
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/contacts";

export const getContacts = async (page = 1, limit = 5) => {
  const res = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`);
  return res.json();
};

export const addContact = async (contactData) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData),
  });
  return res.json();
};

export const deleteContact = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
