/* Quando criar:
parámetros iniciais:
[1] objeto do carrosel, pai de todos os slides
[2] opcional: autoplay, mudar com o tempo, padrão: false
[3] opcional: indicadores, objeto dos indicadores, pai de todos os indicadores
*/

class Carrossel {
     // segundos
    constructor(mainObj, autoplay = false, indicadores = 0) {
        //Ele pega o objeto do carrossell principal, dele vai pegar todas as divs principais (sem entrar em nada, os primeiros primeiros), então
        //vai fazendo esse ciclo
        // Variáveis de funcionamento
        this.root = mainObj;
        this.ciclo = 0;
        this.slides = mainObj.children;
        this.indicadores;
        

        if (autoplay) {
            this.startAutoplay();
        }

        if (indicadores) {
            this.indicadores = indicadores.children;
            this.gerarIndicadores();
            this.atualizarIndicadores();
        }
        
        // Variáveis para o código
        this.quantidadeSlides = this.slides.length-1;
        this.autoplayInterval = null;
    };

    atualizarSlide() {
        // Função de atualização para o slide, para mudar VISUALMENTE o slide
        for(let i = 0; i <=this.quantidadeSlides; i++) {
            this.slides[i].classList.remove('active');
        }
        this.slides[this.ciclo].classList.add('active');

        this.atualizarIndicadores()
    };

    operacaoSlide(operacao) {
        this.ciclo += operacao;
        
        if (this.ciclo > this.quantidadeSlides) {
            this.ciclo -= this.quantidadeSlides + 1;
        }

        if (this.ciclo < 0) {
            this.ciclo = this.quantidadeSlides - this.ciclo - 1;
        }

        this.atualizarSlide();
    }

    definirSlide(slide) {
        this.ciclo = slide;

        this.atualizarSlide();
    }

    proximoSlide() {
        this.operacaoSlide(1);
    }
    slideAnterior() {
        this.operacaoSlide(-1);
    }

    gerarIndicadores() {
        for(let i = 0; i < this.indicadores.length; i++) {
            this.indicadores[i].onclick = () => {this.definirSlide(i)};
        }
    }

    atualizarIndicadores() {
        if (!this.indicadores) return;
        
        for(let i = 0; i <=this.quantidadeSlides; i++) {
            this.indicadores[i].classList.remove('active');
        }
        this.indicadores[this.ciclo].classList.add('active');
    }

 // ===== Autoplay =====

    
    startAutoplay() {
        // garante delay válido (em segundos)
        
        this.AUTOPLAY_DELAY = 6;
        
        if (this.autoplayInterval) return;

        this.autoplayInterval = setInterval(() => {
            this.proximoSlide();
        }, this.AUTOPLAY_DELAY * 1000);
    }

}


const indicadores1 = document.getElementById('indicadores-1')
const carrossel1 = document.getElementById('carrossel-1');
const primeiro = new Carrossel(carrossel1, true, indicadores1);

const carrossel2 = document.getElementById('carrossel-2');
const segundo = new Carrossel(carrossel2, false);