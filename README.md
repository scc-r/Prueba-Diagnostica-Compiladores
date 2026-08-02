# UNEG - Universidad Nacional Experimental de Guayana
**Vicerrectorado Académico** **Coordinación de Ingeniería en Informática** **Asignatura:** Lenguajes y Compiladores  
**Periodo Lectivo:** 2025-II  

---

## 📑 Resolución de la Prueba Diagnóstica

**Estudiante:** Shirley Cedeño  
**Profesor:** Msc. Félix Márquez  

Este repositorio contiene las soluciones formalizadas para la evaluación diagnóstica de la asignatura, estructuradas de forma modular en tres componentes principales, aplicando conceptos fundamentales de tokenización, análisis sintáctico y gestión dinámica de memoria.

---

## 📂 Estructura del Repositorio

El proyecto se encuentra estrictamente dividido en las siguientes carpetas exigidas por la rúbrica institucional:

* `problema1/`: Contiene la implementación del generador y evaluador de polinomios de expansión binomial (x+1)^n a través del Triángulo de Pascal, codificado en **JavaScript (Node.js)** y **Python**, junto con el archivo `tiempos_ejecucion.txt` con las pruebas de estrés computacional para n=100.
* `problema2/`: Alberga el analizador léxico y sintáctico desarrollado en **JavaScript** enfocado en validar si una cadena se encuentra bajo la Notación FEN (Forsyth-Edwards Notation) para estados de ajedrez.
* `problema3/`: Contiene el escáner y traductor léxico implementado en **JavaScript** enfocado en la detección de palabras reservadas del lenguaje C en memoria dinámica para su posterior traducción conceptual al español.

---

## 🛠️ Requisitos del Entorno e Instalación

Para la ejecución nativa de todas las soluciones desarrolladas en este repositorio, se requiere la presencia de los siguientes componentes en el sistema:

### 1. Entorno de Ejecución para JavaScript (Node.js)
La mayoría de los módulos analizados utilizan el motor V8 a través de Node.js.
* **Instalación:** Descargue e instale la versión LTS estable desde el portal oficial nodejs.org.
* **Verificación:** Asegúrese de tenerlo correctamente configurado ejecutando en su terminal:

    node --version

### 2. Entorno de Ejecución para Python
Requerido para el contraste analítico del Problema 1.
* **Instalación:** Descargue e instale Python 3.x desde el portal oficial python.org. Durante la instalación, recuerde marcar la casilla "Add Python to PATH".
* **Verificación:** Compruebe la disponibilidad en la terminal con:

    python --version

---

## 🚀 Instrucciones de Ejecución de los Módulos

### 📐 Problema 1: Expansión Binomial (Pascal)
Navegue al directorio e invoque cualquiera de los dos motores disponibles para contrastar la precisión y rendimiento:

    cd problema1
    node pascal.js
    python pascal.py

### ♟️ Problema 2: Validador de Notación FEN
Acceda a la carpeta correspondiente y ejecute el script del analizador. El programa incluye una suite de pruebas documentada en los comentarios del archivo para copiar y pegar directamente en consola:

    cd problema2
    node fen_validator.js

### 🔄 Problema 3: Traductor Léxico de C
Acceda a la carpeta del traductor e inserte las sentencias de código C deseadas en la terminal para mapear los lexemas al idioma español:

    cd problema3
    node traductor.js

---

## 🎥 Registro Audiovisual de la Defensa

De acuerdo con las normativas técnicas e institucionales dispuestas en los lineamientos de evaluación, la defensa argumentada de estas soluciones y la demostración práctica de las competencias alcanzadas puede ser auditada en el siguiente enlace:

🔴 **Enlace a la Defensa en YouTube:** [Inserta aquí el enlace de tu video de YouTube cuando lo subas]

*Nota: El material cuenta con una orientación horizontal y respeta la restricción estricta de una duración máxima de 20 minutos.*