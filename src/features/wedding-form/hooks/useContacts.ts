import { useState } from "react";

export type Contact = {
  id: string;
  name: string;
  phone: string;
};

export function useContacts(initialContacts: Contact[] = [{ id: "1", name: "", phone: "" }]) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  const addContact = () => {
    setContacts([
      ...contacts,
      { id: Date.now().toString(), name: "", phone: "" },
    ]);
  };

  const removeContact = (id: string) => {
    if (contacts.length > 1) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  const updateContact = (id: string, field: string, value: string) => {
    setContacts(
      contacts.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  return {
    contacts,
    addContact,
    removeContact,
    updateContact,
  };
}
