export const Instrucciones = () => {
    return (
        <div className="container my-4">
            <h2 className="mb-3 text-primary">
                <i className="fa fa-sticky-note me-2"></i>Instrucciones:
            </h2>
            <ul className="list-group mb-4">
                <li className="list-group-item">
                    Debes agregar el código necesario para que su aplicación maneje los contactos, a través del típico CRUD (Crear, Leer, Actualizar, Borrar) específicamente:
                    <ul className="list-group mt-2 d-flex flex-row justify-content-center">
                        <li className="list-group-item">Crear</li>
                        <li className="list-group-item">Leer contactos</li>
                        <li className="list-group-item">Actualizar</li>
                        <li className="list-group-item">Eliminar</li>
                    </ul>
                </li>
                <li className="list-group-item">
                    (Opcional) Solicite al usuario una confirmación antes de eliminar un contacto, usa un componente Modal para eso.
                </li>
            </ul>
            <p className="text-secondary">
                <strong>Todas las funcionalidades deben implementarse bajo el concepto del Context.API.</strong>
            </p>
            <p>
                <code>fetch</code> la data desde la API:&nbsp;
                <a
                    href="https://playground.4geeks.com/contact/docs?_gl=1*1f3mgtd*_gcl_au*MTU4NDkwNTY0Ny4xNzQ3MzY1MzA4Ljc1MjkxNDY5Ny4xNzQ4MjIwMTkzLjE3NDgyMjAxOTM."
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    https://playground.4geeks.com/contact/docs
                </a>
            </p>
            <h4 className="mt-4 mb-3 text-primary">El proyecto debería tener 2 vistas diferentes:</h4>
            <ol className="list-group list-group-numbered mb-4">
                <li className="list-group-item">
                    <strong>Contact List:</strong> Esta vista debe contener la lista de contactos: <strong className="text-danger">Cree un usuario y agrege contactos o ingrese un usuario existente para consultar su lista de contactos.</strong>
                </li>
                <li className="list-group-item">
                    <strong>Form:</strong> Deberá tener el formulario utilizado para crear o actualizar contactos: <strong className="text-danger">Modifica un contacto según el ID de la API o 0 para nuevo contacto.</strong>
                </li>
            </ol>
            <h4 className="mb-3 text-primary">
                <i className="fa fa-puzzle-piece me-2"></i>Un componente:
            </h4>
            <ol className="list-group list-group-numbered">
                <li className="list-group-item">
                    <strong>ContactCard:</strong> Muestra un solo contacto: <strong className="text-danger">Recorre la lista de contactos o solo un contacto. Presione nuevamente 👁️ para cambiar de 1 a todos.</strong>
                </li>
            </ol>
        </div>
    );
};