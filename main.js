var valor_u = 0
var valor_c= 1000
document.getElementById("caixa").innerHTML = "R$" + valor_c
document.getElementById("usuario").innerHTML = "R$" + valor_u


class Caixa {

    constructor(disponivel_usuario,valor_caixa){
        this.disponivel_usuario = disponivel_usuario;
        this.valor_usuario = 0;
        this.valor_caixa = valor_caixa;

    }

    darNota(valor_saque,valor_nota){
            if(valor_saque/valor_nota>=1){
                var n_notas = Math.floor(valor_saque/valor_nota)
                valor_saque = valor_saque - (n_notas * valor_nota)
                this.valor_usuario = valor_saque
                document.getElementById("notas").innerHTML += 
                "<h3>" + n_notas + " x R$" + valor_nota + "</h3>";

                console.assert(n_notas >= 1,'Erro no processamento das notas de ' + valor_nota + ', numero de notas menor que 1' )
                console.assert(document.getElementById("notas").innerHTML.length > 0,'Nenhuma nota de ' + valor_nota + ' foi impressa')
                console.assert((this.valor_usuario/valor_nota)<1, 'Erro no output de darNota, valor ainda é divisivel por'+ valor_nota)
            }
        
        
    }

    sacarDinheiro(valor) {
        if (this.valor_caixa >= valor){
            document.getElementById("notas").innerHTML = ""
            this.valor_usuario = valor
            this.darNota(this.valor_usuario,100)
            this.darNota(this.valor_usuario,50)
            this.darNota(this.valor_usuario,20)
            this.darNota(this.valor_usuario,10)

            console.assert(this.valor_usuario < 10, 'Erro ao distribuir notas, sobraram '+this.valor_usuario+' reais' )

            if(this.valor_usuario > 0){
                document.getElementById("notas").innerHTML += 
                "<p> Não existe valor de nota possivel para sacar o restante de <strong style='font-size: 20px;'> R$ " + this.valor_usuario + "</strong></p>";
            }
            this.valor_caixa = this.valor_caixa - valor + this.valor_usuario
            this.disponivel_usuario = this.disponivel_usuario + parseInt(valor) - this.valor_usuario
            document.getElementById("caixa").innerHTML = "R$" + this.valor_caixa
            document.getElementById("usuario").innerHTML = "R$" + this.disponivel_usuario
    
        }
        else{
            document.getElementById("notas").innerHTML = 
            "<h4> Valor de saque muito alto !!</h4>";
        }
    }

    

}
const caixa = new Caixa(valor_u, valor_c);


function onClick(e) {
    var valor_saque = document.getElementById('saque').value;
    console.assert(typeof(valor_saque) != "number", 'Valor não compativel: ' + typeof(valor_saque))
    if(valor_saque<10){
        document.getElementById("notas").innerHTML = 
            "<h4> Não permitido valores menores que 10 reais </h4>";
    }
    else{
      caixa.sacarDinheiro(valor_saque);
    }
}

