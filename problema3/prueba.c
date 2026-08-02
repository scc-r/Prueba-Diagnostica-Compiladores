#include <stdio.h>

int main() {
    int contador = 0;
    float nota_final = 15.5;

    // Evaluacion de notas
    if (nota_final >= 10.0) {
        while (contador < 3) {
            printf("Aprobado\n");
            contador++;
        }
        return 1;
    } else {
        return 0;
    }
}