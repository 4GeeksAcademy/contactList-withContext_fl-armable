import { Link, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";

export const Form = props => {
  const { store, dispatch } = useGlobalReducer();
  const { theId } = useParams();
  const navigate = useNavigate();
  const singleContact = store[1]?.contacts?.find(contact => contact.id === parseInt(theId));

  // Estado local para los campos del formulario
  const [formData, setFormData] = useState({
    name: singleContact?.name || "",
    phone: singleContact?.phone || "",
    email: singleContact?.email || "",
    address: singleContact?.address || ""
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async e => {
  e.preventDefault();
  const agendaSlug = store[0]?.agendas?.[0]?.slug;
  let url = "";
  let method = "";
  let body = {};

  if (singleContact?.id === 0) {
    // Nuevo contacto (POST)
    url = `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`;
    method = "POST";
    body = { ...formData };
  } else {
    // Editar contacto (PUT)
    url = `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${singleContact.id}`;
    method = "PUT";
    body = { ...formData, id: singleContact.id };
  }

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: "update_contacts",
        payload: data
      });
      alert("Contacto actualizado correctamente");
      navigate("/ContactList");
    } else {
      alert("Error al guardar el contacto");
    }
  } catch (error) {
    alert("Error de conexión con la API" + error);
  }
};

  return (
    <div className="container text-center">
      <h2 className="mb-4">{singleContact?.id === 0 ? "Nuevo contacto" : "Editar Contacto"}</h2>
      <form className="mx-auto" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
        <div className="mb-3 text-start">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="phone" className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="address" className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Guardar</button>
      </form>
      <Link to="/" className="d-block mt-4">
        <span className="btn btn-secondary btn-lg" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};

Form.propTypes = {
  match: PropTypes.object
};
