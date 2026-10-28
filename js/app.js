// ======================================================================
// AULA 02 - SPA COM JAVASCRIPT PURO
// ======================================================================

// Array com as prioridades disponíveis
const prioridades = [
    "Baixa",
    "Média",
    "Alta"
];

// Array com dados temporários.
// Eles existem apenas enquanto a página está aberta.
const chamados = [
    {
        // Identificador único deste exemplo.
        id: 1,

        // Título curto.
        titulo: "Computador não liga",

        // Descrição detalhada.
        descricao: "O computador não apresenta sinal de energia.",

        // Prioridade do atendimento.
        prioridade: "Alta",

        // Situação atual.
        status: "Aberto"
    },
    {
        id: 2,
        titulo: "Senha bloqueada",
        descricao: "Usuário não consegue acessar o sistema.",
        prioridade: "Média",
        status: "Em atendimento"
    },
    {
        // Identificador único deste exemplo.
        id: 3,

        // Título curto.
        titulo: "notebook não liga",

        // Descrição detalhada.
        descricao: "O computador não apresenta sinal de energia.",

        // Prioridade do atendimento.
        prioridade: "Alta",

        // Situação atual.
        status: "Encerrado"
    }
];

// Procura o elemento <div id="app">.
// Guardaremos a referência para alterar a tela.
const app = document.getElementById("app");

// Função que desenha o Dashboard
function mostrarDashboard() {

    // Total de chamados
    const total = chamados.length;

    // Chamados abertos
    const abertos = chamados.filter(
        chamado => chamado.status === "Aberto"
    ).length;

    // Chamados em atendimento
    const emAtendimento = chamados.filter(
        chamado => chamado.status === "Em atendimento"
    ).length;

    // Chamados encerrados
    const encerrados = chamados.filter(
        chamado => chamado.status === "Encerrado"
    ).length;

    // Chamados com prioridade Alta
    const prioridadeAlta = chamados.filter(
        chamado => chamado.prioridade === "Alta"
    ).length;

    // Monta o Dashboard
    app.innerHTML = `
        <h1 class="mb-4">Dashboard</h1>

        <div class="row g-3">

            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h2 class="h5">Total de chamados</h2>
                        <p class="display-6">${total}</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card h-100 border-primary">
                    <div class="card-body">
                        <h2 class="h5">Chamados abertos</h2>
                        <p class="display-6 text-primary">${abertos}</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card h-100 border-warning">
                    <div class="card-body">
                        <h2 class="h5">Em atendimento</h2>
                        <p class="display-6 text-warning">
                            ${emAtendimento}
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card h-100 border-success">
                    <div class="card-body">
                        <h2 class="h5">Chamados encerrados</h2>
                        <p class="display-6 text-success">
                            ${encerrados}
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card h-100 border-danger">
                    <div class="card-body">
                        <h2 class="h5">Prioridade Alta</h2>
                        <p class="display-6 text-danger">
                            ${prioridadeAlta}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    `;
}

// Retorna a badge de acordo com a prioridade
function badgePrioridade(prioridade) {

    if (prioridade === "Alta") {
        return `
            <span class="badge bg-danger prioridade-alta">
                Alta
            </span>
        `;
    }

    if (prioridade === "Média") {
        return `
            <span class="badge bg-warning text-dark">
                Média
            </span>
        `;
    }

    if (prioridade === "Baixa") {
        return `
            <span class="badge bg-success">
                Baixa
            </span>
        `;
    }

    return prioridade;
}

// Retorna a badge de acordo com o status
function badgeStatus(status) {

    if (status === "Aberto") {
        return `
            <span class="badge bg-primary">
                Aberto
            </span>
        `;
    }

    if (status === "Em atendimento") {
        return `
            <span class="badge bg-warning text-dark">
                Em atendimento
            </span>
        `;
    }

    if (status === "Encerrado") {
        return `
            <span class="badge bg-success">
                Encerrado
            </span>
        `;
    }

    return status;
}

// Função que desenha a listagem.
function mostrarChamados() {

    app.innerHTML = `
        <h1 class="mb-4">Chamados</h1>

        <div class="table-responsive">
            <table class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Prioridade</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    ${
                        // map transforma cada objeto em uma linha HTML.
                        chamados.map(chamado => `
                            <tr>
                                <td>${chamado.id}</td>
                                <td>${chamado.titulo}</td>
                                <td>${badgePrioridade(chamado.prioridade)}</td>
                                <td>${badgeStatus(chamado.status)}</td>
                                <td>
                                    <button
                                        class="btn btn-primary btn-sm"
                                        data-acao="visualizar"
                                        data-id="${chamado.id}">
                                        Visualizar
                                    </button>

                                    ${
                                        chamado.status === "Aberto"
                                        ? `
                                            <button
                                                class="btn btn-warning btn-sm"
                                                data-acao="atender"
                                                data-id="${chamado.id}">
                                                Iniciar atendimento
                                            </button>
                                        `
                                        : ""
                                    }

                                    ${
                                        chamado.status !== "Encerrado"
                                        ? `
                                            <button
                                                class="btn btn-danger btn-sm"
                                                data-acao="encerrar"
                                                data-id="${chamado.id}">
                                                Encerrar
                                            </button>
                                        `
                                        : ""
                                    }
                                </td>
                            </tr>
                        `)
                        // join une todas as linhas sem vírgula.
                        .join("")
                    }
                </tbody>
            </table>
        </div>
    `;

    // Identifica os cliques nos botões da tabela
    app.querySelectorAll("[data-acao]").forEach(botao => {

        botao.addEventListener("click", () => {

            const acao = botao.dataset.acao;
            const id = Number(botao.dataset.id);

            if (acao === "visualizar") {
                mostrarDetalhes(id);
            }

            if (acao === "atender") {
                iniciarAtendimento(id);
            }

            if (acao === "encerrar") {
                mostrarEncerramento(id);
            }

        });

    });
}

// Altera o status do chamado para Em atendimento
function iniciarAtendimento(id) {

    // Procura o chamado pelo ID
    const chamado = chamados.find(
        chamado => chamado.id === id
    );

    // Verifica se o chamado existe
    if (!chamado) {
        alert("Chamado não encontrado.");
        return;
    }

    // Permite iniciar apenas chamados abertos
    if (chamado.status !== "Aberto") {
        alert("Este chamado não está aberto.");
        return;
    }

    // Confirma a operação
    const confirmar = confirm(
        "Deseja iniciar o atendimento do chamado #" + id + "?"
    );

    if (!confirmar) {
        return;
    }

    // Atualiza o status do objeto
    chamado.status = "Em atendimento";

    // Exibe mensagem de sucesso
    alert("Atendimento iniciado com sucesso!");

    // Atualiza a listagem
    mostrarChamados();
}

// Exibe os detalhes de um chamado
function mostrarDetalhes(id) {

    // Procura o chamado pelo ID
    const chamado = chamados.find(
        chamado => chamado.id === id
    );

    // Verifica se o chamado existe
    if (!chamado) {
        alert("Chamado não encontrado.");
        mostrarChamados();
        return;
    }

    // Monta a tela de detalhes
    app.innerHTML = `
        <h1 class="mb-4">
            Detalhes do chamado #${chamado.id}
        </h1>

        <div class="card">
            <div class="card-body">

                <p>
                    <strong>Título:</strong>
                    ${chamado.titulo}
                </p>

                <p>
                    <strong>Descrição:</strong>
                    ${chamado.descricao}
                </p>

                <p>
                    <strong>Prioridade:</strong>
                    ${badgePrioridade(chamado.prioridade)}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${badgeStatus(chamado.status)}
                </p>

                ${
                    chamado.status === "Encerrado"
                    ? `
                        <div class="alert alert-success">
                            <strong>Solução realizada:</strong>
                            <p class="mb-0">
                                ${chamado.solucao || "Solução não registrada."}
                            </p>
                        </div>
                    `
                    : ""
                }

                <button
                    class="btn btn-secondary"
                    id="btnVoltar">
                    Voltar para chamados
                </button>

            </div>
        </div>
    `;

    // Evento do botão Voltar
    document.getElementById("btnVoltar")
        .addEventListener("click", mostrarChamados);
}

// Exibe a tela de encerramento do chamado
function mostrarEncerramento(id) {

    // Procura o chamado pelo ID
    const chamado = chamados.find(
        chamado => chamado.id === id
    );

    // Verifica se o chamado existe
    if (!chamado) {
        alert("Chamado não encontrado.");
        mostrarChamados();
        return;
    }

    // Impede encerrar um chamado já encerrado
    if (chamado.status === "Encerrado") {
        alert("Este chamado já está encerrado.");
        mostrarChamados();
        return;
    }

    // Monta a tela de encerramento
    app.innerHTML = `
        <h1 class="mb-4">Encerrar chamado #${chamado.id}</h1>

        <div class="card">
            <div class="card-body">

                <p><strong>Título:</strong> ${chamado.titulo}</p>

                <p><strong>Descrição:</strong> ${chamado.descricao}</p>

                <p>
                    <strong>Prioridade:</strong>
                    ${badgePrioridade(chamado.prioridade)}
                </p>

                <p><strong>Status atual:</strong> ${badgeStatus(chamado.status)}</p>

                <form id="formEncerramento">

                    <div class="mb-3">
                        <label for="solucao" class="form-label">
                            O que foi feito?
                        </label>

                        <textarea
                            class="form-control"
                            id="solucao"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" class="btn btn-success">
                        Confirmar encerramento
                    </button>

                    <button type="button"
                            class="btn btn-secondary"
                            id="btnCancelar">
                        Cancelar
                    </button>

                </form>
            </div>
        </div>
    `;

    // Identifica o formulário
    const formulario = document.getElementById("formEncerramento");

    // Executa o encerramento ao enviar
    formulario.addEventListener("submit", evento => {
        encerrarChamado(evento, id);
    });

    // Volta para a listagem ao cancelar
    document.getElementById("btnCancelar")
        .addEventListener("click", mostrarChamados);
}

// Realiza o encerramento do chamado
function encerrarChamado(evento, id) {

    // Impede o recarregamento da página
    evento.preventDefault();

    // Procura o chamado no array
    const chamado = chamados.find(
        chamado => chamado.id === id
    );

    // Verifica se o chamado existe e pode ser encerrado
    if (!chamado || chamado.status === "Encerrado") {
        alert("Não foi possível encerrar este chamado.");
        mostrarChamados();
        return;
    }

    // Obtém a solução informada
    const solucao = document.getElementById("solucao").value.trim();

    // Valida o preenchimento
    if (solucao === "") {
        alert("Informe o procedimento realizado antes de encerrar.");
        return;
    }

    // Armazena a solução no objeto
    chamado.solucao = solucao;

    // Atualiza o status
    chamado.status = "Encerrado";

    // Confirma a operação
    alert("Chamado encerrado com sucesso!");

    // Retorna para a listagem
    mostrarChamados();
}

// Função que desenha o formulário.
function mostrarNovoChamado() {

    app.innerHTML = `
        <h1 class="mb-4">Novo chamado</h1>

        <form id="formChamado">
            <div class="mb-3">
                <label class="form-label" for="titulo">
                    Título
                </label>

                <input
                    class="form-control"
                    id="titulo"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label" for="descricao">
                    Descrição
                </label>

                <textarea
                    class="form-control"
                    id="descricao"
                    rows="4">
                </textarea>
            </div>

            <div class="mb-3">
                <label class="form-label" for="prioridade">
                    Prioridade
                </label>

                <select class="form-select" id="prioridade" required>
                    <option value="">Selecione</option>

                    ${prioridades.map(prioridade => `
                        <option value="${prioridade}">
                            ${prioridade}
                        </option>
                    `).join("")}
                </select>
            </div>

            <button class="btn btn-success" type="submit">
                Cadastrar
            </button>
        </form>
    `;

    // Procura o formulário que acabou de ser criado.
    const formulario = document.getElementById("formChamado");

    // Escuta o envio do formulário.
    formulario.addEventListener("submit", cadastrarChamado);
}

// Função executada no submit.
function cadastrarChamado(evento) {

    // Impede o navegador de recarregar a página.
    evento.preventDefault();

    // push adiciona um novo objeto no array.
    chamados.push({
        // ID simplificado para aula.
        id: chamados.length + 1,

        // Lê o valor do campo título.
        titulo: document.getElementById("titulo").value,

        // Lê o valor da descrição.
        descricao: document.getElementById("descricao").value,

        // Lê o valor selecionado.
        prioridade: document.getElementById("prioridade").value,

        // Novo chamado começa aberto.
        status: "Aberto"
    });

    // Depois do cadastro, mostra a lista.
    mostrarChamados();
}

// Seleciona todos os elementos que têm data-view.
const links = document.querySelectorAll("[data-view]");

// Percorre os links.
links.forEach(link => {

    // Escuta clique.
    link.addEventListener("click", evento => {

        // Impede navegação padrão.
        evento.preventDefault();

        // Lê data-view.
        const view = link.dataset.view;

        // Decide qual "tela" mostrar.
        if (view === "dashboard") {
            mostrarDashboard();
        }

        if (view === "chamados") {
            mostrarChamados();
        }

        if (view === "novo") {
            mostrarNovoChamado();
        }
    });
});

// Primeira tela.
mostrarDashboard();