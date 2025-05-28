import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import PropTypes from "prop-types";
import { useState } from "react";

export const ContactCard = ({ id, handleSingleRequest }) => {
  const { store, dispatch } = useGlobalReducer();
  const contact = store[1]?.contacts?.find(c => c.id === id);
  const [active, setActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!contact) return null;

  const agendaSlug = store[0]?.agendas?.[0]?.slug;

  const handleToggle = () => {
    setActive(!active);
    handleSingleRequest(contact.id);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${contact.id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        dispatch({
          type: "delete_contact",
          payload: contact.id
        });
      } else {
        alert("No se pudo eliminar el contacto.");
      }
    } catch (error) {
      alert("Error de conexión con la API.");
    }
    setShowModal(false);
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="row g-0 align-items-center">
          {/* Imagen */}
          <div className="col-md-3 text-center">
            <img
              src={`https://placehold.co/600x400?text=${contact.name}`}
              alt={contact.name}
              className="img-fluid rounded-start"
              style={{ maxHeight: "180px", objectFit: "cover" }}
            />
          </div>
          {/* Propiedades */}
          <div className="col-md-6">
            <div className="card-body text-start">
              <h5 className="card-title mb-3">
                <i className="fa fa-user me-2"></i>{contact.name}
              </h5>
              <p className="card-text mb-2">
                <i className="fa fa-phone me-2"></i>{contact.phone}
              </p>
              <p className="card-text mb-2">
                <i className="fa fa-envelope me-2"></i>{contact.email}
              </p>
              <p className="card-text">
                <i className="fa fa-map-marker-alt me-2"></i>{contact.address}
              </p>
            </div>
          </div>
          {/* Botones */}
          <div className="col-md-3 d-flex flex-column align-items-center gap-2 py-3">
            <Link to={`/form/${contact.id}`} className="btn btn-outline-primary mb-2" title="Editar">
              <i className="fa fa-edit"></i>
            </Link>
            <button
              className="btn btn-outline-danger mb-2"
              title="Eliminar"
              onClick={() => setShowModal(true)}
            >
              <i className="fa fa-trash"></i>
            </button>
            <button
              className={`btn mb-2 ${active ? "btn-secondary" : "btn-outline-secondary"}`}
              title="Ver uno / todos"
              onClick={handleToggle}
            >
              <i className="fa fa-eye"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Bootstrap */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar este contacto?</p>
                <p className="fw-bold">{contact.name}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ContactCard.propTypes = {
  id: PropTypes.number.isRequired,
  handleSingleRequest: PropTypes.func
};