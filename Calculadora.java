import java.util.Locale;

public class Calculadora {

    private int espesorMuro; // 20 o 30

    public Calculadora() {
        this.espesorMuro = 30;
    }

    public void cambiarEspesor(int cm) {
        this.espesorMuro = cm;
    }

    // Arma una linea de resultado: "Texto;valor"
    private String linea(String texto, String valor) {
        return texto + ";" + valor + "\n";
    }

    // Numero con 2 decimales y punto
    private String decimales(double numero) {
        return String.format(Locale.US, "%.2f", numero);
    }

    public String calcularMuro(double largo, double alto) {
        double superficie = largo * alto;
        double cementoM2;
        double arenaM2;
        double ladrillosM2;

        if (espesorMuro == 30) {
            cementoM2 = 15.2;
            arenaM2 = 0.1147;
            ladrillosM2 = 120;
        } else {
            cementoM2 = 10.13;
            arenaM2 = 0.0765;
            ladrillosM2 = 80;
        }

        return linea("Superficie", decimales(superficie) + " m2")
             + linea("Cemento necesario", decimales(superficie * cementoM2) + " kg")
             + linea("Arena necesaria", decimales(superficie * arenaM2) + " m3")
             + linea("Ladrillos", (int) Math.ceil(superficie * ladrillosM2) + " unid.");
    }

    // Hormigon: por cada m3 -> 350 kg de cemento, 0.5 m3 de arena, 0.8 m3 de piedra
    public String calcularViga(double largo, double ancho, double alto, double cantidad) {
        double volumen = largo * (ancho / 100) * (alto / 100) * cantidad;

        return linea("Volumen de hormigon", decimales(volumen) + " m3")
             + linea("Cemento necesario", decimales(volumen * 350) + " kg")
             + linea("Arena necesaria", decimales(volumen * 0.5) + " m3")
             + linea("Piedra necesaria", decimales(volumen * 0.8) + " m3");
    }

    public String calcularColumnas(double cantidad, double alto, double lado1, double lado2) {
        double volumen = cantidad * alto * (lado1 / 100) * (lado2 / 100);

        return linea("Volumen de hormigon", decimales(volumen) + " m3")
             + linea("Cemento necesario", decimales(volumen * 350) + " kg")
             + linea("Arena necesaria", decimales(volumen * 0.5) + " m3")
             + linea("Piedra necesaria", decimales(volumen * 0.8) + " m3");
    }

    // Contrapiso: por cada m3 -> 300 kg de cemento, 0.55 m3 de arena, 0.85 m3 de piedra
    public String calcularContrapiso(double largo, double ancho, double espesor) {
        double superficie = largo * ancho;
        double volumen = superficie * (espesor / 100);

        return linea("Superficie", decimales(superficie) + " m2")
             + linea("Volumen", decimales(volumen) + " m3")
             + linea("Cemento necesario", decimales(volumen * 300) + " kg")
             + linea("Arena necesaria", decimales(volumen * 0.55) + " m3")
             + linea("Piedra necesaria", decimales(volumen * 0.85) + " m3");
    }

    // El techo inclinado es 15% mas grande que el piso (x 1.15)
    // 12 tejas por m2 y 3 metros de listones por m2
    public String calcularTecho(double largo, double ancho) {
        double superficie = largo * ancho * 1.15;

        return linea("Superficie del techo", decimales(superficie) + " m2")
             + linea("Tejas necesarias", (int) Math.ceil(superficie * 12) + " unid.")
             + linea("Listones de madera", decimales(superficie * 3) + " m");
    }

    // Se suma 10% de baldosas extra. Pegamento: 5 kg por m2
    public String calcularPisos(double largo, double ancho, double lado) {
        double superficie = largo * ancho;
        double areaBaldosa = (lado / 100) * (lado / 100);
        int baldosas = (int) Math.ceil((superficie / areaBaldosa) * 1.1);

        return linea("Superficie", decimales(superficie) + " m2")
             + linea("Baldosas (con 10% extra)", baldosas + " unid.")
             + linea("Pegamento necesario", decimales(superficie * 5) + " kg");
    }

    // Un litro rinde 12 m2 por mano. Un galon tiene 3.78 litros
    public String calcularPintura(double largo, double alto, double manos) {
        double superficie = largo * alto;
        double litros = (superficie * manos) / 12;

        return linea("Superficie a pintar", decimales(superficie) + " m2")
             + linea("Pintura necesaria", decimales(litros) + " litros")
             + linea("Galones", (int) Math.ceil(litros / 3.78) + " galon(es)");
    }
}