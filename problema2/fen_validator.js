/**
 * ============================================================================
 * CASOS DE PRUEBA OFICIALES PARA LA DEFENSA (Copiar y pegar en la consola)
 * ============================================================================
 * * 1) CASO DE ÉXITO (Posición inicial estándar del ajedrez):
 * rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
 * * 2) ERROR LÉXICO (La cadena está incompleta, solo tiene 4 de las 6 partes exigidas):
 * rnbqkbnr/pppppppp/8/8 w KQkq
 * * 3) ERROR SINTÁCTICO - TABLERO (Tiene un '9' en la tercera fila, lo que excede las 8 casillas):
 * rnbqkbnr/pppppppp/9/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
 * * 4) ERROR SINTÁCTICO - TURNO (Se ingresó 'x' en lugar de 'w' o 'b'):
 * rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR x KQkq - 0 1
 * * 5) ERROR SINTÁCTICO - ENROQUE (Se usaron caracteres inválidos como 'XYZ'):
 * rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w XYZ - 0 1
 * * 6) ERROR SINTÁCTICO - AL PASO (La coordenada está fuera del rango permitido, ej: 'e9'):
 * rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq e9 0 1
 * * 7) ERROR SINTÁCTICO - RELOJ/MOVIMIENTOS (Se ingresaron letras en los contadores numéricos):
 * rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - abc xyz
 * ============================================================================
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Función que simula un Analizador Léxico y Sintáctico para cadenas FEN.
 * Retorna un objeto con el resultado final y un registro (log) de cada validación.
 */
function analizarNotacionFEN(cadenaFEN) {
    let logs = [];
    let esValido = true;

    // 1. ANÁLISIS LÉXICO: Dividir la cadena en sus 6 tokens fundamentales (separados por espacio)
    const tokens = cadenaFEN.trim().split(/\s+/);
    
    if (tokens.length !== 6) {
        return {
            esValido: false,
            logs: [`[ERROR SINTÁCTICO] Una cadena FEN debe tener exactamente 6 partes. Se encontraron ${tokens.length}.`]
        };
    }

    const [tablero, turno, enroque, alPaso, medioMov, movTotal] = tokens;

    // 2. ANÁLISIS SINTÁCTICO: Validar cada token contra sus reglas estrictas

    // Token 1: Tablero (Piezas)
    const filas = tablero.split('/');
    if (filas.length !== 8) {
        logs.push(`[FALLO] Tablero: Debe tener 8 filas separadas por '/'. Se encontraron ${filas.length}.`);
        esValido = false;
    } else {
        let tableroValido = true;
        const regexFila = /^[pnbrqkPNBRQK1-8]+$/; 
        
        for (let i = 0; i < filas.length; i++) {
            let fila = filas[i];
            if (!regexFila.test(fila)) {
                tableroValido = false; break;
            }
            
            let sumaCasillas = 0;
            for (let char of fila) {
                if (!isNaN(char)) sumaCasillas += parseInt(char); 
                else sumaCasillas += 1; 
            }
            
            if (sumaCasillas !== 8) {
                tableroValido = false; break;
            }
        }
        if (tableroValido) logs.push(`[OK] Tablero: 8 filas detectadas con 8 casillas cada una.`);
        else {
            logs.push(`[FALLO] Tablero: Estructura de piezas inválida o desbordamiento de casillas (cada fila debe sumar 8).`);
            esValido = false;
        }
    }

    // Token 2: Turno
    if (/^[wb]$/.test(turno)) {
        logs.push(`[OK] Turno: Jugador activo '${turno}' válido.`);
    } else {
        logs.push(`[FALLO] Turno: Debe ser 'w' (blancas) o 'b' (negras). Se recibió '${turno}'.`);
        esValido = false;
    }

    // Token 3: Enroque
    if (/^(?:-|[KQkq]{1,4})$/.test(enroque)) {
        logs.push(`[OK] Enroque: Disponibilidad '${enroque}' válida.`);
    } else {
        logs.push(`[FALLO] Enroque: Debe ser '-' o combinación válida de KQkq. Se recibió '${enroque}'.`);
        esValido = false;
    }

    // Token 4: Peón al paso
    if (/^(?:-|[a-h][36])$/.test(alPaso)) {
        logs.push(`[OK] Al paso: Casilla objetivo '${alPaso}' válida.`);
    } else {
        logs.push(`[FALLO] Al paso: Debe ser '-' o una coordenada válida de fila 3 o 6 (ej. e3, c6). Se recibió '${alPaso}'.`);
        esValido = false;
    }

    // Token 5: Reloj de medio movimiento
    if (/^\d+$/.test(medioMov)) {
        logs.push(`[OK] Medio mov: Contador '${medioMov}' válido.`);
    } else {
        logs.push(`[FALLO] Medio mov: Debe ser un número entero >= 0. Se recibió '${medioMov}'.`);
        esValido = false;
    }

    // Token 6: Número de movimiento total
    if (/^[1-9]\d*$/.test(movTotal)) {
        logs.push(`[OK] Mov. Total: Turno global '${movTotal}' válido.`);
    } else {
        logs.push(`[FALLO] Mov. Total: Debe ser un número entero > 0. Se recibió '${movTotal}'.`);
        esValido = false;
    }

    return { esValido, logs };
}

/**
 * Presentación visual en consola
 */
function procesarEntrada() {
    console.log(`\n======================================================`);
    console.log(`   ANALIZADOR LÉXICO: NOTACIÓN FEN (AJEDREZ)`);
    console.log(`======================================================\n`);
    
    rl.question("Ingrese la cadena FEN a evaluar (o 'salir' para cerrar):\n> ", (entrada) => {
        if (entrada.toLowerCase() === 'salir') {
            console.log("Cerrando validador...");
            rl.close();
            return;
        }

        console.log(`\n------------------------------------------------------`);
        console.log(`ANALIZANDO TOKENS...`);
        console.log(`------------------------------------------------------`);
        
        const resultado = analizarNotacionFEN(entrada);
        
        resultado.logs.forEach(log => console.log(log));
        
        console.log(`------------------------------------------------------`);
        if (resultado.esValido) {
            console.log(`RESULTADO FINAL: ✓ LA CADENA FEN ES SINTÁCTICAMENTE VÁLIDA`);
        } else {
            console.log(`RESULTADO FINAL: ✕ ERROR DE SINTAXIS EN LA CADENA FEN`);
        }
        console.log(`======================================================\n`);
        
        procesarEntrada();
    });
}

// Iniciar programa
procesarEntrada();