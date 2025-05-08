// Seleccionamos  Body, un input y todos los botones
const body = document.querySelector('body');
const input = document.querySelector('#display')
const botones = Array.from(document.querySelectorAll('.btn'));
let numero = ''
let op = ''


botones.forEach(btn => {
    btn.addEventListener('click', (event) => {
        calculadora(event.target.innerText)
    })
})

body.addEventListener('keydown', (event) => {
    calculadora(event.key)
})

//argumento que la función espera es el valor que vamos a colocar en el Input
const calculadora = (valor) => {
    if (!isNaN(valor) || valor == '.') {

        input.value += valor
        numero += valor

    } else if (valor == '+' || valor == '-' || valor == '*' || valor == '/' || valor == '(' || valor == ')') {

        input.value = input.value + valor

        op = numero != '' ? op + parseFloat(numero) + valor : op + valor
        numero = ''
    }
    else if (valor == 'Enter' || valor == '=') {
        let op2 = '';
        let op3 = '';
        let contParAbierto = op.split('').filter(item => item == '(').length
        let contParCerrado = op.split('').filter(item => item == ')').length
        let contador = 0;

        if (contParAbierto == contParCerrado) {
            while (contador < op.length) {
                if ((op[contador] == '(' && !isNaN(op[contador - 1]))) {
                    op2 += '*' + op[contador];
                } else if (((op[contador] == ')' && !isNaN(op[contador + 1]) && op[contador + 1] != undefined))) {
                    op2 += op[contador] + '*';
                }
                else {
                    op2 += op[contador]
                }
                contador++
            }

        } else {
            console.log('Expresión mal formada')
        }

        op2 = op2.replaceAll(')(', ')*(')

        if (op2[op2.length - 1] == ')') {
            op3 = op2 + '*' + parseFloat(numero)
        } else {
            op3 = op2 + parseFloat(numero)
        }
        console.log(op2, op3)
        input.value = numero == '' ? eval(op2) : eval(op3)
        op = ''
        op2 = ''
        numero = input.value
    } else if (valor == 'Escape' || valor == 'C') {
        input.value = ''
        op = ''
        numero = ''
    }
    input.scrollLeft = input.scrollWidth;
}