import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
           <div class="d-none text-center mt-5" id="welcomeSign">
                <h1>Bem vindo ao Amigo X</h1>
                <h4 style="color: #6c757d"> O melhor gerenciador de Amigos Secretos</h4>
           </div>
        `;
    }
}