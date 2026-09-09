document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // DADOS
    // ==========================================

    let materias = {};
    let materiaEditando = null;


    // ==========================================
    // CARREGAR DADOS SALVOS
    // ==========================================

    let dadosSalvos = localStorage.getItem("minhasNotas");

    if (dadosSalvos) {

        try {
            materias = JSON.parse(dadosSalvos);
        } catch (erro) {
            materias = {};
        }

    }


    // ==========================================
    // ELEMENTOS DA PÁGINA
    // ==========================================

    const campoNome =
        document.getElementById("nome");

    const campoMateria =
        document.getElementById("materia");

    const campoNota1 =
        document.getElementById("nota1");

    const campoNota2 =
        document.getElementById("nota2");

    const campoNota3 =
        document.getElementById("nota3");

    const campoNota4 =
        document.getElementById("nota4");


    const botaoAdicionar =
        document.getElementById("adicionar");

    const botaoCalcular =
        document.getElementById("calcular");

    const botaoLimpar =
        document.getElementById("limpar");


    const listaMaterias =
        document.getElementById("lista-materias");

    const resultado =
        document.getElementById("resultado");

    const painelGeral =
        document.getElementById("painel-geral");

    const saudacao =
        document.getElementById("saudacao");


    // ==========================================
    // SALVAR DADOS
    // ==========================================

    function salvarDados() {

        localStorage.setItem(
            "minhasNotas",
            JSON.stringify(materias)
        );

    }


    // ==========================================
    // LIMPAR CAMPOS
    // ==========================================

    function limparCampos() {

        campoMateria.value = "";

        campoNota1.value = "";
        campoNota2.value = "";
        campoNota3.value = "";
        campoNota4.value = "";

        materiaEditando = null;

        botaoAdicionar.textContent =
            "+ ADICIONAR MATÉRIA";

    }


    // ==========================================
    // MOSTRAR LISTA DE MATÉRIAS
    // ==========================================

    function atualizarLista() {

        listaMaterias.innerHTML = "";


        if (Object.keys(materias).length === 0) {

            listaMaterias.textContent =
                "Nenhuma matéria cadastrada.";

            return;

        }


        for (let materia in materias) {

            let notas =
                materias[materia];


            let item =
                document.createElement("div");

            item.className =
                "materia-lista";


            // --------------------------------------
            // INFORMAÇÕES
            // --------------------------------------

            let informacoes =
                document.createElement("div");

            informacoes.className =
                "materia-lista-info";


            let nome =
                document.createElement("strong");

            nome.textContent =
                "📚 " + materia;


            let notasTexto =
                document.createElement("span");


            let texto = "";


            for (let i = 0; i < 4; i++) {

                if (notas[i] !== undefined) {

                    texto +=
                        `${i + 1}º: ${notas[i].toFixed(2)}   `;

                } else {

                    texto +=
                        `${i + 1}º: —   `;

                }

            }


            notasTexto.textContent =
                texto;


            informacoes.appendChild(nome);

            informacoes.appendChild(
                notasTexto
            );


            // --------------------------------------
            // BOTÕES
            // --------------------------------------

            let botoes =
                document.createElement("div");

            botoes.className =
                "materia-lista-botoes";


            let editar =
                document.createElement("button");

            editar.type =
                "button";

            editar.textContent =
                "✏️ Editar";

            editar.className =
                "btn-editar";


            editar.addEventListener(
                "click",
                function () {

                    editarMateria(materia);

                }
            );


            let excluir =
                document.createElement("button");

            excluir.type =
                "button";

            excluir.textContent =
                "🗑️";

            excluir.className =
                "btn-excluir";


            excluir.addEventListener(
                "click",
                function () {

                    excluirMateria(materia);

                }
            );


            botoes.appendChild(
                editar
            );

            botoes.appendChild(
                excluir
            );


            item.appendChild(
                informacoes
            );

            item.appendChild(
                botoes
            );


            listaMaterias.appendChild(
                item
            );

        }

    }


    // ==========================================
    // ADICIONAR MATÉRIA
    // ==========================================

    botaoAdicionar.addEventListener(
        "click",
        function () {

            let materia =
                campoMateria.value.trim();


            if (materia === "") {

                alert(
                    "Digite o nome da matéria."
                );

                campoMateria.focus();

                return;

            }


            // --------------------------------------
            // NOTAS
            // --------------------------------------

            let notas = [];


            if (campoNota1.value !== "") {

                notas.push(
                    Number(campoNota1.value)
                );

            }


            if (campoNota2.value !== "") {

                notas.push(
                    Number(campoNota2.value)
                );

            }


            if (campoNota3.value !== "") {

                notas.push(
                    Number(campoNota3.value)
                );

            }


            if (campoNota4.value !== "") {

                notas.push(
                    Number(campoNota4.value)
                );

            }


            if (notas.length === 0) {

                alert(
                    "Digite pelo menos uma nota."
                );

                campoNota1.focus();

                return;

            }


            // --------------------------------------
            // VALIDAR NOTAS
            // --------------------------------------

            for (let nota of notas) {

                if (
                    Number.isNaN(nota) ||
                    nota < 0
                ) {

                    alert(
                        "Digite notas válidas."
                    );

                    return;

                }

            }


            // --------------------------------------
            // CAPITALIZAR MATÉRIA
            // --------------------------------------

            materia =
                materia.charAt(0).toUpperCase() +
                materia.slice(1);


            // --------------------------------------
            // EDITANDO
            // --------------------------------------

            if (
                materiaEditando !== null
            ) {

                delete materias[
                    materiaEditando
                ];

            }


            // --------------------------------------
            // SALVAR
            // --------------------------------------

            materias[materia] =
                notas;


            salvarDados();

            atualizarLista();

            limparCampos();


            resultado.innerHTML = `

                <p style="
                    color:#4ade80;
                    margin:0;
                    font-weight:bold;
                ">

                    ✓ ${materia}
                    adicionada com sucesso!

                </p>

            `;

        }
    );


    // ==========================================
    // EDITAR MATÉRIA
    // ==========================================

    function editarMateria(materia) {

        let notas =
            materias[materia];


        campoMateria.value =
            materia;


        campoNota1.value =
            notas[0] !== undefined
                ? notas[0]
                : "";


        campoNota2.value =
            notas[1] !== undefined
                ? notas[1]
                : "";


        campoNota3.value =
            notas[2] !== undefined
                ? notas[2]
                : "";


        campoNota4.value =
            notas[3] !== undefined
                ? notas[3]
                : "";


        materiaEditando =
            materia;


        botaoAdicionar.textContent =
            "💾 SALVAR ALTERAÇÃO";


        campoMateria.focus();

    }


    // ==========================================
    // EXCLUIR MATÉRIA
    // ==========================================

    function excluirMateria(materia) {

        let confirmar =
            confirm(
                `Deseja excluir ${materia}?`
            );


        if (!confirmar) {
            return;
        }


        delete materias[materia];


        salvarDados();

        atualizarLista();


        if (
            materiaEditando === materia
        ) {

            limparCampos();

        }

    }


    // ==========================================
    // PAINEL GERAL
    // ==========================================

    function atualizarPainelGeral() {

        if (!painelGeral) {
            return;
        }


        let quantidadeMaterias =
            Object.keys(materias).length;


        if (quantidadeMaterias === 0) {

            painelGeral.innerHTML = "";

            painelGeral.style.display =
                "none";

            return;

        }


        painelGeral.style.display =
            "grid";


        let aprovadas = 0;

        let andamento = 0;

        let pontosConquistados = 0;

        let pontosPossiveis =
            quantidadeMaterias * 24;


        // --------------------------------------
        // CALCULAR DADOS
        // --------------------------------------

        for (
            let materia in materias
        ) {

            let notas =
                materias[materia];


            let soma = 0;


            for (
                let nota of notas
            ) {

                soma += nota;

            }


            pontosConquistados +=
                soma;


            if (soma >= 24) {

                aprovadas++;

            } else {

                andamento++;

            }

        }


        // --------------------------------------
        // PORCENTAGEM
        // --------------------------------------

        let porcentagemGeral = 0;


        if (pontosPossiveis > 0) {

            porcentagemGeral =
                (
                    pontosConquistados /
                    pontosPossiveis
                ) * 100;

        }


        if (porcentagemGeral > 100) {

            porcentagemGeral = 100;

        }


        // --------------------------------------
        // PAINEL
        // --------------------------------------

        painelGeral.innerHTML = `

            <div class="painel-titulo">

                <div>

                    <span class="painel-icone">
                        📊
                    </span>

                    <div>

                        <h2>
                            Seu desempenho
                        </h2>

                        <p>
                            Visão geral das suas matérias
                        </p>

                    </div>

                </div>

            </div>


            <div class="painel-cards">


                <div class="painel-card">

                    <span class="painel-card-icone">
                        📚
                    </span>

                    <div>

                        <span>
                            MATÉRIAS
                        </span>

                        <strong>
                            ${quantidadeMaterias}
                        </strong>

                    </div>

                </div>


                <div class="painel-card aprovado-card">

                    <span class="painel-card-icone">
                        ✓
                    </span>

                    <div>

                        <span>
                            APROVADAS
                        </span>

                        <strong>
                            ${aprovadas}
                        </strong>

                    </div>

                </div>


                <div class="painel-card andamento-card">

                    <span class="painel-card-icone">
                        !
                    </span>

                    <div>

                        <span>
                            EM ANDAMENTO
                        </span>

                        <strong>
                            ${andamento}
                        </strong>

                    </div>

                </div>


                <div class="painel-card pontos-card">

                    <span class="painel-card-icone">
                        🎯
                    </span>

                    <div>

                        <span>
                            PONTOS
                        </span>

                        <strong>
                            ${pontosConquistados.toFixed(2)}
                            /
                            ${pontosPossiveis}
                        </strong>

                    </div>

                </div>

            </div>


            <div class="painel-progresso">

                <div class="painel-progresso-topo">

                    <span>
                        Progresso geral
                    </span>

                    <strong>
                        ${porcentagemGeral.toFixed(1)}%
                    </strong>

                </div>


                <div class="painel-progresso-container">

                    <div
                        class="painel-progresso-barra"
                        style="
                            width:${porcentagemGeral}%;
                        "
                    ></div>

                </div>

            </div>

        `;

    }


    // ==========================================
    // CALCULAR RESULTADO
    // ==========================================

    botaoCalcular.addEventListener(
        "click",
        function () {

            let nome =
                campoNome.value.trim();


            if (nome === "") {

                alert(
                    "Digite o nome do aluno."
                );

                campoNome.focus();

                return;

            }


            if (
                Object.keys(materias).length === 0
            ) {

                alert(
                    "Adicione pelo menos uma matéria."
                );

                return;

            }


            nome =
                nome.charAt(0).toUpperCase() +
                nome.slice(1);


            // ======================================
            // ATUALIZAR SAUDAÇÃO
            // ======================================

            if (saudacao) {

                saudacao.innerHTML =
                    `Olá, <strong>${nome}</strong> 👋`;

            }


            resultado.innerHTML = "";


            atualizarPainelGeral();


            // --------------------------------------
            // TÍTULO
            // --------------------------------------

            let titulo =
                document.createElement("h2");

            titulo.textContent =
                "RESULTADO";


            resultado.appendChild(
                titulo
            );


            // --------------------------------------
            // ALUNO
            // --------------------------------------

            let aluno =
                document.createElement("p");


            aluno.innerHTML =
                `<strong>Aluno:</strong> ${nome}`;


            resultado.appendChild(
                aluno
            );


            // ======================================
            // CADA MATÉRIA
            // ======================================

            for (
                let materia in materias
            ) {

                let notas =
                    materias[materia];


                // --------------------------------------
                // SOMA
                // --------------------------------------

                let soma = 0;


                for (
                    let nota of notas
                ) {

                    soma += nota;

                }


                // --------------------------------------
                // MÉDIA
                // --------------------------------------

                let media =
                    soma / notas.length;


                // --------------------------------------
                // FALTA
                // --------------------------------------

                let falta =
                    Math.max(
                        0,
                        24 - soma
                    );


                // --------------------------------------
                // PORCENTAGEM
                // --------------------------------------

                let porcentagem =
                    (soma / 24) * 100;


                if (
                    porcentagem > 100
                ) {

                    porcentagem = 100;

                }


                // ======================================
                // CARD
                // ======================================

                let bloco =
                    document.createElement("div");


                bloco.className =
                    "materia-resultado";


                // --------------------------------------
                // CABEÇALHO
                // --------------------------------------

                let cabecalho =
                    document.createElement("div");


                cabecalho.className =
                    "materia-cabecalho";


                let nomeMateria =
                    document.createElement("h3");


                nomeMateria.textContent =
                    "📚 " + materia;


                let status =
                    document.createElement("span");


                status.className =
                    "status";


                if (soma >= 24) {

                    status.textContent =
                        "APROVADO";


                    status.classList.add(
                        "aprovado"
                    );

                } else {

                    status.textContent =
                        "EM ANDAMENTO";


                    status.classList.add(
                        "pendente"
                    );

                }


                cabecalho.appendChild(
                    nomeMateria
                );


                cabecalho.appendChild(
                    status
                );


                bloco.appendChild(
                    cabecalho
                );


                // --------------------------------------
                // BIMESTRES
                // --------------------------------------

                let notasContainer =
                    document.createElement("div");


                notasContainer.className =
                    "notas-resultado";


                for (
                    let i = 0;
                    i < 4;
                    i++
                ) {

                    let notaCard =
                        document.createElement("div");


                    notaCard.className =
                        "nota-card";


                    let numero =
                        document.createElement("span");


                    numero.textContent =
                        `${i + 1}º BIMESTRE`;


                    let valor =
                        document.createElement("strong");


                    if (
                        notas[i] !== undefined
                    ) {

                        valor.textContent =
                            notas[i].toFixed(2);

                    } else {

                        valor.textContent =
                            "—";


                        valor.classList.add(
                            "nota-vazia"
                        );

                    }


                    notaCard.appendChild(
                        numero
                    );


                    notaCard.appendChild(
                        valor
                    );


                    notasContainer.appendChild(
                        notaCard
                    );

                }


                bloco.appendChild(
                    notasContainer
                );


                // --------------------------------------
                // MÉDIA
                // --------------------------------------

                let mediaCard =
                    document.createElement("div");


                mediaCard.className =
                    "media-card";


                mediaCard.innerHTML = `

                    <span>
                        MÉDIA ATUAL
                    </span>

                    <strong>
                        ${media.toFixed(2)}
                    </strong>

                `;


                bloco.appendChild(
                    mediaCard
                );


                // --------------------------------------
                // PONTOS
                // --------------------------------------

                let pontos =
                    document.createElement("div");


                pontos.className =
                    "pontos-titulo";


                pontos.innerHTML = `

                    <span>
                        PONTOS
                    </span>

                    <strong>
                        ${soma.toFixed(2)} / 24
                    </strong>

                `;


                bloco.appendChild(
                    pontos
                );


                // --------------------------------------
                // BARRA
                // --------------------------------------

                let barraContainer =
                    document.createElement("div");


                barraContainer.className =
                    "progresso-container";


                let barra =
                    document.createElement("div");


                barra.className =
                    "progresso-barra";


                barra.style.width =
                    porcentagem + "%";


                barraContainer.appendChild(
                    barra
                );


                bloco.appendChild(
                    barraContainer
                );


                // --------------------------------------
                // PORCENTAGEM
                // --------------------------------------

                let porcentagemTexto =
                    document.createElement("div");


                porcentagemTexto.className =
                    "porcentagem";


                porcentagemTexto.textContent =
                    porcentagem.toFixed(1) +
                    "%";


                bloco.appendChild(
                    porcentagemTexto
                );


                // --------------------------------------
                // SITUAÇÃO
                // --------------------------------------

                let situacao =
                    document.createElement("div");


                situacao.className =
                    "situacao";


                if (soma >= 24) {

                    situacao.classList.add(
                        "situacao-aprovado"
                    );


                    situacao.innerHTML = `

                        <span>
                            ✓
                        </span>

                        <strong>
                            APROVADO!
                        </strong>

                        <small>
                            Você atingiu os
                            24 pontos.
                        </small>

                    `;

                } else {

                    situacao.classList.add(
                        "situacao-pendente"
                    );


                    situacao.innerHTML = `

                        <span>
                            !
                        </span>

                        <strong>
                            Faltam
                            ${falta.toFixed(2)}
                            pontos
                        </strong>

                        <small>
                            para atingir os
                            24 pontos.
                        </small>

                    `;

                }


                bloco.appendChild(
                    situacao
                );


                resultado.appendChild(
                    bloco
                );

            }

        }
    );


    // ==========================================
    // LIMPAR TUDO
    // ==========================================

    botaoLimpar.addEventListener(
        "click",
        function () {

            let confirmar =
                confirm(
                    "Deseja apagar todas as matérias e notas?"
                );


            if (!confirmar) {

                return;

            }


            materias = {};

            materiaEditando = null;


            localStorage.removeItem(
                "minhasNotas"
            );


            campoNome.value = "";


            limparCampos();


            atualizarLista();


            if (painelGeral) {

                painelGeral.innerHTML = "";

                painelGeral.style.display =
                    "none";

            }


            if (saudacao) {

                saudacao.textContent =
                    "Acompanhe seu desempenho escolar";

            }


            resultado.innerHTML = "";

        }
    );


    // ==========================================
    // INICIAR
    // ==========================================

    atualizarLista();

    atualizarPainelGeral();

});
