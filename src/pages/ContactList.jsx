import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { ContactCard } from "../components/ContactCard";

export const ContactList = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const agendaId = store[0]?.agendas?.[0]?.id;
  // Estado para controlar si se debe mostrar solo un contacto
  const [singleWasRequested, setSingleWasRequested] = useState(false);
  const [idRequested, setIdRequested] = useState(null);
  const [contacts, setContacts] = useState(
    store[1]?.contacts?.filter(contact => contact.id !== 0) || []
  );

  const handleSingleRequest = (id) => {
    setSingleWasRequested(!singleWasRequested);
    setIdRequested(id);
  }

  useEffect(() => {
    if (singleWasRequested && idRequested !== null) {
      setContacts(store[1]?.contacts?.filter(contact => contact.id === idRequested));
    } else {
      setContacts(store[1]?.contacts?.filter(contact => contact.id !== 0));
    }
  }, [singleWasRequested, idRequested, store]);

  // Si no hay contactos en el store, consulta la API
  useEffect(() => {
    if (agendaId != null && store[1].contacts.length < 2) {
      const agendaSlug = store[0]?.agendas?.[0]?.slug;
      fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
          if (Array.isArray(data.contacts)) {
            data.contacts.forEach(contact => {
              dispatch({ type: "update_contacts", payload: contact });
            });
            navigate("/ContactList");
          }
        })
        .catch(err => {
          console.error("Error al cargar contactos:", err);
        });
    } else return;
  }, [agendaId, store, dispatch, navigate]);

  // Si no hay agenda activa, solo renderiza un botón para volver a la página principal
  if (agendaId === null) return (
    <div className="container">
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );

  return (
    <div className="container">
      <div className="d-flex justify-content-end mt-4">
        <Link to={`/form/0`} className="btn btn-success" title="Agregar contacto">
          <i className="fa fa-user-plus"></i>
        </Link>
      </div>
      <br />
      {contacts.map(contact => (
        <ContactCard key={contact.id} id={contact.id} handleSingleRequest={handleSingleRequest} />
      ))}
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
