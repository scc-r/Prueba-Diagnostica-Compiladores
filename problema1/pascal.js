const fs = require('fs');
const { performance } = require('perf_hooks');
const readline = require('readline');

// Configuración para leer datos desde la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Parte A: Genera los coeficientes usando el Triángulo de Pascal.
 * Utiliza arreglos dinámicos y el recolector de basura nativo.
 */
function generarPascal(n) {
    // Inicializamos dinámicamente la primera fila
    let filaAnterior = [1n];

    for (let i = 1; i <= n; i++) {
        // Reservamos un nuevo arreglo dinámico para la fila actual
        let filaActual = new Array(i + 1);
        filaActual[0] = 1n; // Extremo izquierdo
        filaActual[i] = 1n; // Extremo derecho

        // Calculamos los valores intermedios sumando la fila anterior
        for (let j = 1; j < i; j++) {
            filaActual[j] = filaAnterior[j - 1] + filaAnterior[j];
        }

        // Asignamos la nueva fila. 
        // El recolector de basura libera automáticamente la memoria de la fila anterior.
        filaAnterior = filaActual;
    }

    return filaAnterior;
}

/**
 * Muestra el polinomio formateado estéticamente (Parte A)
 */
function mostrarPolinomio(coeficientes, n) {
    let terminos = [];
    
    for (let i = 0; i < coeficientes.length; i++) {
        let potencia = n - i;
        let coef = coeficientes[i];

        if (potencia === 0) {
            terminos.push(coef.toString());
        } else if (potencia === 1) {
            terminos.push(`${coef === 1n ? "" : coef}x`);
        } else {
            terminos.push(`${coef === 1n ? "" : coef}x^${potencia}`);
        }
    }
    
    console.log(`\n======================================================`);
    console.log(`   a) POLINOMIO GENERADO PARA (x + 1)^${n}`);
    console.log(`======================================================`);
    console.log(`f(x) = ${terminos.join(" + ")}`);
    console.log(`------------------------------------------------------`);
}

/**
 * Evalúa f(x) mostrando la resolución natural paso a paso (Parte B)
 */
function evaluarPasoAPaso(coeficientes, n, xValor) {
    console.log(`\n======================================================`);
    console.log(`   b) EVALUACIÓN PASO A PASO PARA x = ${xValor}`);
    console.log(`======================================================`);
    
    let x = BigInt(xValor);
    
    let paso1Sustitucion = [];
    let paso2Potencias = [];
    let paso3Multiplicar = [];
    let sumaTotal = 0n;

    for (let i = 0; i < coeficientes.length; i++) {
        let potencia = BigInt(n - i);
        let coef = coeficientes[i];
        
        // 1. Valores para Paso 1: Sustitución explícita
        if (potencia === 0n) {
            paso1Sustitucion.push(`${coef}`);
        } else if (potencia === 1n) {
            paso1Sustitucion.push(`${coef}(${xValor})`);
        } else {
            paso1Sustitucion.push(`${coef}(${xValor})^${potencia}`);
        }

        // 2. Valores para Paso 2: Resolver las potencias
        let valorPotencia = x ** potencia;
        if (potencia === 0n) {
            paso2Potencias.push(`${coef}`);
        } else {
            paso2Potencias.push(`${coef}(${valorPotencia})`);
        }

        // 3. Valores para Paso 3 y 4: Multiplicaciones y Suma
        let resultadoTermino = coef * valorPotencia;
        paso3Multiplicar.push(`${resultadoTermino}`);
        sumaTotal += resultadoTermino;
    }

    // Imprimir el flujo completo en bloques ordenados
    console.log(`Paso 1 (Sustitución) : f(${xValor}) = ${paso1Sustitucion.join(" + ")}`);
    console.log(`Paso 2 (Potencias)   : f(${xValor}) = ${paso2Potencias.join(" + ")}`);
    console.log(`Paso 3 (Multiplicar) : f(${xValor}) = ${paso3Multiplicar.join(" + ")}`);
    console.log(`------------------------------------------------------`);
    console.log(`Paso 4 (Resultado)   : f(${xValor}) = ${sumaTotal}`);
    console.log(`======================================================\n`);
}

/**
 * Función requerida para medir el tiempo de n=100 y escribirlo en el txt
 */
function medirTiempoN100() {
    const inicio = performance.now();
    generarPascal(100);
    const fin = performance.now();
    
    // Tiempo en milisegundos convertido a segundos
    const segundos = (fin - inicio) / 1000;
    const textoResultado = `JavaScript (Node.js) - Tiempo de ejecucion para generar Pascal (n=100): ${segundos.toFixed(6)} segundos\n`;

    try {
        fs.appendFileSync('tiempos_ejecucion.txt', textoResultado);
        console.log(`[INFO] Prueba de estrés completada. Resultado guardado en tiempos_ejecucion.txt: ${segundos.toFixed(6)} seg.`);
    } catch (error) {
        console.error("Error al escribir el archivo txt:", error);
    }
}

// Flujo principal del programa
function main() {
    rl.question("Ingrese el exponente n (entero no negativo): ", (respuestaN) => {
        let n = parseInt(respuestaN);
        
        if (isNaN(n) || n < 0) {
            console.log("Error: Debe ingresar un número entero mayor o igual a cero.");
            rl.close();
            return;
        }

        rl.question("Ingrese el valor entero de x para evaluar el polinomio: ", (respuestaX) => {
            let x = parseInt(respuestaX);

            if (isNaN(x)) {
                console.log("Error: Valor de x inválido.");
                rl.close();
                return;
            }

            // Ejecutamos Parte A midiendo el tiempo exacto
            const inicio = performance.now();
            let coeficientes = generarPascal(n);
            const fin = performance.now();
            const segundos = (fin - inicio) / 1000;

            mostrarPolinomio(coeficientes, n);

            // Ejecutamos Parte B
            evaluarPasoAPaso(coeficientes, n, x);

            // Escribimos el tiempo real en el archivo txt
            const textoResultado = `JavaScript (Node.js) - Tiempo para generar Pascal (n=${n}): ${segundos.toFixed(6)} segundos\n`;
            try {
                fs.appendFileSync('tiempos_ejecucion.txt', textoResultado);
                console.log(`[INFO] Tiempo de cálculo guardado en tiempos_ejecucion.txt: ${segundos.toFixed(6)} seg.`);
            } catch (error) {
                console.error("Error al escribir el archivo txt:", error);
            }

            rl.close();
        });
    });
}

// Iniciar programa
main();