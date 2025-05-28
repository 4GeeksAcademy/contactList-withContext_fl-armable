export const initialStore = () => {
  return [
    { agendas: [{ slug: "", id: null }] },
    { contacts: [{ name: "", phone: "", email: "", address: "", id: 0 }] }
  ];
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "updated_slug":
      return [
        {
          agendas: [
            {
              slug: action.payload.slug,
              id: action.payload.id
            }
          ]
        },
        store[1] // mantiene los contactos igual
      ];
    case "update_contacts":
      // action.payload es un objeto contacto { name, phone, email, address, id }
      const updatedContact = action.payload;
      const contacts = store[1]?.contacts || [];
      const contactIndex = contacts.findIndex(c => c.id === updatedContact.id);

      let newContacts;
      if (contactIndex !== -1) {
        // Si existe, reemplaza el contacto
        newContacts = contacts.map(c =>
          c.id === updatedContact.id ? updatedContact : c
        );
      } else {
        // Si no existe, agrega el nuevo contacto
        newContacts = [...contacts, updatedContact];
      }

      return [
        store[0],
        { contacts: newContacts }
      ];
    case "delete_contact":
      // action.payload es el id del contacto a eliminar
      const filteredContacts = (store[1]?.contacts || []).filter(
        c => c.id !== action.payload
      );
      return [
        store[0],
        { contacts: filteredContacts }
      ];
    default:
      throw Error('Unknown action.');
  }
}
