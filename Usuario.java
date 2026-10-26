public class Usuario {

    // Atributos privados
    private String nombre;
    private String usuario;
    private String clave;

    // Constructor
    public Usuario(String nombre, String usuario, String clave) {
        this.nombre = nombre;
        this.usuario = usuario;
        this.clave = clave;
    }

    // Metodos para leer los atributos privados
    public String obtenerNombre() {
        return nombre;
    }

    public String obtenerUsuario() {
        return usuario;
    }

    // Revisa si la contrasena es la correcta
    public boolean claveCorrecta(String claveEscrita) {
        return clave.equals(claveEscrita);
    }

    // Cambia la contrasena
    public void cambiarClave(String claveNueva) {
        this.clave = claveNueva;
    }
}