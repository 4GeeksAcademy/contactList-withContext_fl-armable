import { Link, useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useState } from "react";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const [slug, setSlug] = useState("");
    const location = useLocation();

    // Extrae el id de la agenda actual
    const agendaId = store[0]?.agendas?.[0]?.id;
    const agendaSlug = store[0]?.agendas?.[0]?.slug;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
                method: "POST"
            });
            const data = await response.json();
            if (response.ok) {
                dispatch({
                    type: "updated_slug",
                    payload: {
                        slug: data.slug,
                        id: data.id
                    }
                });
                setSlug("");
            } else if (data.detail && data.detail.includes(`Agenda "${slug}" already exists.`)) {
                // Actualiza el store aunque la agenda ya exista
                dispatch({
                    type: "updated_slug",
                    payload: {
                        slug: slug,
                        id: 0
                    }
                });
                alert(`La agenda "${slug}" ya existe, usando la existente.`);
                setSlug("");
            } else {
                alert("Error al crear la agenda.");
            }
        } catch (error) {
            alert("Error de conexión con la API.");
        }
    };

    const handleConfirm = () => {
        dispatch({
            type: "updated_slug",
            payload: {
                slug: "",
                id: null
            }
        });
        setSlug("");
    };

    const handleUnsubscribe = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}`, {
                method: "DELETE"
            });
            if (response.ok) {
                dispatch({
                    type: "updated_slug",
                    payload: {
                        slug: "",
                        id: null
                    }
                });
                setSlug("");
                alert("Agenda eliminada correctamente.");
            } else {
                alert("No se pudo eliminar la agenda.");
            }
        } catch (error) {
            alert("Error de conexión con la API.");
        }
    };
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                {location.pathname === "/ContactList" ? (
                <span className="navbar-brand mb-0 h1">Contact List</span>
                ) : (
                    <Link to="/ContactList">
                        <span className="navbar-brand mb-0 h1">Go to Contact List</span>
                    </Link>
                )}
                <div className="ml-auto">
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                        >
                            {agendaId !== null ? (
                                <>
                                    <span className="badge bg-primary text-light">{agendaSlug}</span>
                                    <span className="me-2"> Exit</span>
                                </>
                            ) : "Login"}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            {agendaId !== null ? (
                                <>
                                    <li>
                                        <button className="dropdown-item" onClick={handleConfirm}>Confirm</button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={handleUnsubscribe}>Unsubscribe</button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <form className="px-4 py-3" onSubmit={handleLogin}>
                                        <div className="mb-3">
                                            <label htmlFor="slugInput" className="form-label">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="slugInput"
                                                value={slug}
                                                onChange={e => setSlug(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">Login</button>
                                    </form>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};