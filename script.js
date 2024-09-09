class Livro {
    constructor(titulo, autor, ano, disponivel = true) {
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
        this.disponivel = disponivel;
    }

    emprestar() {
        if (this.disponivel) {
            this.disponivel = false;
            return `${this.titulo} foi emprestado.`;
        } else {
            return `${this.titulo} já está emprestado.`;
        }
    }

    retornar() {
        if (!this.disponivel) {
            this.disponivel = true;
            return `${this.titulo} foi retornado à biblioteca.`;
        } else {
            return `${this.titulo} já estava na biblioteca.`;
        }
    }
}

class Biblioteca {
    constructor() {
        this.livros = [];
    }

    adicionarLivro(titulo, autor, ano) {
        const novoLivro = new Livro(titulo, autor, ano);
        this.livros.push(novoLivro);
        return `${titulo} foi adicionado à biblioteca.`;
    }

    listarLivros() {
        let lista = '';
        this.livros.forEach((livro, index) => {
            lista += `${index + 1}. ${livro.titulo} - ${livro.autor} (${livro.ano}) ${livro.disponivel ? '[Disponível]' : '[Emprestado]'}<br>`;
        });
        return lista;
    }

    emprestarLivro(indice) {
        if (this.livros[indice]) {
            return this.livros[indice].emprestar();
        } else {
            return "Livro não encontrado.";
        }
    }

    retornarLivro(indice) {
        if (this.livros[indice]) {
            return this.livros[indice].retornar();
        } else {
            return "Livro não encontrado.";
        }
    }
}

let minhaBiblioteca = new Biblioteca();

// Adicionar livro
document.getElementById("adicionar-livro").addEventListener("click", function() {
    let titulo = document.getElementById("titulo").value;
    let autor = document.getElementById("autor").value;
    let ano = Number(document.getElementById("ano").value);
    
    if (titulo && autor && ano) {
        let mensagem = minhaBiblioteca.adicionarLivro(titulo, autor, ano);
        document.getElementById("mensagem-livro").innerText = mensagem;
        document.getElementById("titulo").value = '';
        document.getElementById("autor").value = '';
        document.getElementById("ano").value = '';
        atualizarListaLivros();
    } else {
        alert("Preencha todos os campos.");
    }
});

// Atualiza a lista de livros
function atualizarListaLivros() {
    document.getElementById("lista-livros").innerHTML = minhaBiblioteca.listarLivros();
}

// Emprestar livro
document.getElementById("emprestar-livro").addEventListener("click", function() {
    let indice = Number(document.getElementById("indice-livro").value) - 1;
    if (indice >= 0) {
        let mensagem = minhaBiblioteca.emprestarLivro(indice);
        document.getElementById("mensagem-emprestimo").innerText = mensagem;
        atualizarListaLivros();
        document.getElementById("indice-livro").value = '';
    } else {
        alert("Digite um número válido.");
    }
});

// Retornar livro
document.getElementById("retornar-livro").addEventListener("click", function() {
    let indice = Number(document.getElementById("indice-livro").value) - 1;
    if (indice >= 0) {
        let mensagem = minhaBiblioteca.retornarLivro(indice);
        document.getElementById("mensagem-emprestimo").innerText = mensagem;
        atualizarListaLivros();
        document.getElementById("indice-livro").value = '';
    } else {
        alert("Digite um número válido.");
    }
});