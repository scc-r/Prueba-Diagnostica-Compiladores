const fs = require('fs');
const path = require('path');

const diccionarioC = {
    "int": "entero",
    "float": "flotante",
    "double": "doble",
    "char": "caracter",
    "void": "vacio",
    "if": "si",
    "else": "sino",
    "while": "mientras",
    "for": "para",
    "do": "hacer",
    "return": "retornar",
    "break": "romper",
    "continue": "continuar",
    "switch": "evaluar",
    "case": "caso",
    "default": "defecto",
    "struct": "estructura"
};

function traducirCodigoC(codigoOriginal) {
    let codigoTraducido = codigoOriginal;
    let palabrasDetectadas = {};
    let totalReemplazos = 0;

    for (let [palabraIngles, palabraEspanol] of Object.entries(diccionarioC)) {
        let regex = new RegExp(`\\b${palabraIngles}\\b`, 'g');
        
        if (regex.test(codigoTraducido)) {
            let coincidencias = codigoOriginal.match(regex).length;
            palabrasDetectadas[palabraIngles] = { 
                traduccion: palabraEspanol, 
                cantidad: coincidencias 
            };
            totalReemplazos += coincidencias;
            codigoTraducido = codigoTraducido.replace(regex, palabraEspanol);
        }
    }

    return { codigoTraducido, palabrasDetectadas, totalReemplazos };
}

function procesarArchivoConBuffer() {
    console.log(`\n======================================================`);
    console.log(`   ANALIZADOR LÉXICO: TRADUCTOR DE C A ESPAÑOL`);
    console.log(`======================================================\n`);
    
    const rutaArchivo = path.join(__dirname, 'prueba.c');

    if (!fs.existsSync(rutaArchivo)) {
        console.log(`[ERROR] No se encontró el archivo 'prueba.c' en la carpeta.`);
        return;
    }

    // 1. Obtener el tamaño exacto del archivo en bytes
    const estadisticasArchivo = fs.statSync(rutaArchivo);
    const tamanoEnBytes = estadisticasArchivo.size;

    console.log(`[INFO] Archivo detectado. Tamaño: ${tamanoEnBytes} bytes.`);
    console.log(`[INFO] Reservando bloque de memoria dinámica (Buffer)...`);

    // 2. ASIGNACIÓN EXPLÍCITA DE MEMORIA DINÁMICA
    // Esto es el equivalente directo a malloc() en C.
    // Reservamos en el Heap exactamente la cantidad de bytes que necesitamos.
    let bufferDinamico = Buffer.alloc(tamanoEnBytes);

    // 3. Abrir el archivo y volcar los datos en nuestro búfer dinámico
    const descriptorArchivo = fs.openSync(rutaArchivo, 'r');
    fs.readSync(descriptorArchivo, bufferDinamico, 0, tamanoEnBytes, 0);
    fs.closeSync(descriptorArchivo); // Cerramos el archivo responsablemente

    console.log(`[INFO] Archivo cargado exitosamente en el Búfer Dinámico.\n`);

    // Decodificamos los bytes del búfer a texto para que el analizador léxico pueda leerlo
    const codigoOriginal = bufferDinamico.toString('utf-8');

    console.log(`------------------------------------------------------`);
    console.log(`ESCANEANDO Y TRADUCIENDO...`);
    console.log(`------------------------------------------------------`);
    
    const { codigoTraducido, palabrasDetectadas, totalReemplazos } = traducirCodigoC(codigoOriginal);
    
    if (totalReemplazos > 0) {
        console.log(`[ÉXITO] Se encontraron y tradujeron ${totalReemplazos} palabras reservadas:\n`);
        for (let [ingles, datos] of Object.entries(palabrasDetectadas)) {
            console.log(`  -> '${ingles}' traducido a '${datos.traduccion}' (${datos.cantidad} vez/veces)`);
        }
    } else {
        console.log(`[INFO] No se detectaron palabras reservadas de C en el archivo.`);
    }

    console.log(`\n------------------------------------------------------`);
    console.log(`CÓDIGO RESULTANTE EN ESPAÑOL:`);
    console.log(`------------------------------------------------------`);
    console.log(codigoTraducido);
    
    const rutaSalida = path.join(__dirname, 'prueba_traducida.txt');
    fs.writeFileSync(rutaSalida, codigoTraducido, 'utf-8');
    
    console.log(`\n[INFO] El código traducido fue exportado a 'prueba_traducida.txt'`);
    console.log(`======================================================\n`);
}

// Iniciar programa
procesarArchivoConBuffer();