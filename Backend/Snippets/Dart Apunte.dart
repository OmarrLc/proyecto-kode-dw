void main() {
 
    String nombre = 'Pablo' + 'Martínez';
    var frase = 'Este es mi nombre en mayúsculas: ${nombre.toUpperCase()}';
    var frase1 = 'Este es mi nombre todo en minúsculas: ${nombre.toLowerCase()}';
    
    String nombre1 = 'María' + 'Martín';
    String nombre2 = 'José Pedro' + 'García';
    print(frase);
    print(frase1);
    print('nombre.compareTo(nombre1): ${nombre.compareTo(nombre1)}');
    
    /*Este método devolverá un entero que representa la relación entre dos cadenas:
    - 0 : cuando las cadenas con iguales
    - 1 : cuando la primera cadena es mayor que la segunda
    - -1 : cuando la primera cadena es más pequeña que la segunda*/
    
    var multifrase = '''
    Esto funciona de manera
    que se pueden usar varias frases
    en distintas líneas
    
    ''';
    print(multifrase);
 
}