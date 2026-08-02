import time

def generar_pascal(n):
    """
    Parte A: Genera los coeficientes usando el Triángulo de Pascal.
    En Python, las listas (arrays) manejan la memoria dinámica automáticamente.
    """
    # Inicializamos dinámicamente la primera fila
    fila_anterior = [1]

    for i in range(1, n + 1):
        # Reservamos dinámicamente espacio para la nueva fila
        fila_actual = [1] * (i + 1)
        
        # Calculamos los valores intermedios sumando la fila anterior
        for j in range(1, i):
            fila_actual[j] = fila_anterior[j - 1] + fila_anterior[j]
        
        # Asignamos la nueva fila.
        # El recolector de basura de Python libera la memoria de la fila vieja.
        fila_anterior = fila_actual

    return fila_anterior

def mostrar_polinomio(coeficientes, n):
    """
    Muestra el polinomio formateado estéticamente.
    """
    terminos = []
    
    for i, coef in enumerate(coeficientes):
        potencia = n - i
        
        if potencia == 0:
            terminos.append(str(coef))
        elif potencia == 1:
            terminos.append(f"{'' if coef == 1 else coef}x")
        else:
            terminos.append(f"{'' if coef == 1 else coef}x^{potencia}")
            
    print("\n======================================================")
    print(f"   a) POLINOMIO GENERADO PARA (x + 1)^{n}")
    print("======================================================")
    print(f"f(x) = {' + '.join(terminos)}")
    print("------------------------------------------------------")

def evaluar_paso_a_paso(coeficientes, n, x_valor):
    """
    Evalúa f(x) mostrando la resolución natural paso a paso (Parte B).
    """
    print("\n======================================================")
    print(f"   b) EVALUACIÓN PASO A PASO PARA x = {x_valor}")
    print("======================================================")
    
    paso1_sustitucion = []
    paso2_potencias = []
    paso3_multiplicar = []
    suma_total = 0

    for i, coef in enumerate(coeficientes):
        potencia = n - i
        
        # 1. Valores para Paso 1: Sustitución explícita
        if potencia == 0:
            paso1_sustitucion.append(f"{coef}")
        elif potencia == 1:
            paso1_sustitucion.append(f"{coef}({x_valor})")
        else:
            paso1_sustitucion.append(f"{coef}({x_valor})^{potencia}")

        # 2. Valores para Paso 2: Resolver las potencias
        valor_potencia = x_valor ** potencia
        if potencia == 0:
            paso2_potencias.append(f"{coef}")
        else:
            paso2_potencias.append(f"{coef}({valor_potencia})")

        # 3. Valores para Paso 3 y 4: Multiplicaciones y Suma
        resultado_termino = coef * valor_potencia
        paso3_multiplicar.append(str(resultado_termino))
        suma_total += resultado_termino

    # Imprimir el flujo completo en bloques ordenados
    print(f"Paso 1 (Sustitución) : f({x_valor}) = {' + '.join(paso1_sustitucion)}")
    print(f"Paso 2 (Potencias)   : f({x_valor}) = {' + '.join(paso2_potencias)}")
    print(f"Paso 3 (Multiplicar) : f({x_valor}) = {' + '.join(paso3_multiplicar)}")
    print("------------------------------------------------------")
    print(f"Paso 4 (Resultado)   : f({x_valor}) = {suma_total}")
    print("======================================================\n")

def medir_tiempo_n100():
    """
    Función requerida para medir el tiempo de n=100 y escribirlo en el txt.
    """
    inicio = time.perf_counter()
    generar_pascal(100)
    fin = time.perf_counter()
    
    segundos = fin - inicio
    texto_resultado = f"Python - Tiempo de ejecucion para generar Pascal (n=100): {segundos:.6f} segundos\n"

    try:
        with open("tiempos_ejecucion.txt", "a") as archivo:
            archivo.write(texto_resultado)
        print(f"[INFO] Prueba de estrés completada. Resultado guardado en tiempos_ejecucion.txt: {segundos:.6f} seg.")
    except Exception as e:
        print("Error al escribir el archivo txt:", e)

def main():
    try:
        n = int(input("Ingrese el exponente n (entero no negativo): "))
        if n < 0:
            print("Error: Debe ingresar un número entero mayor o igual a cero.")
            return

        x = int(input("Ingrese el valor entero de x para evaluar el polinomio: "))
        
        # Ejecutamos Parte A midiendo el tiempo exacto
        inicio = time.perf_counter()
        coeficientes = generar_pascal(n)
        fin = time.perf_counter()
        segundos = fin - inicio
        
        mostrar_polinomio(coeficientes, n)

        # Ejecutamos Parte B
        evaluar_paso_a_paso(coeficientes, n, x)

        # Escribimos el tiempo real en el archivo txt
        texto_resultado = f"Python - Tiempo para generar Pascal (n={n}): {segundos:.6f} segundos\n"
        try:
            with open("tiempos_ejecucion.txt", "a") as archivo:
                archivo.write(texto_resultado)
            print(f"[INFO] Tiempo de cálculo guardado en tiempos_ejecucion.txt: {segundos:.6f} seg.")
        except Exception as e:
            print("Error al escribir el archivo txt:", e)
        
    except ValueError:
        print("Error: Entrada inválida. Por favor ingrese números enteros.")

if __name__ == "__main__":
    main()