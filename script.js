// TechConnect - script principal
// Ordem do arquivo: tema/versão -> cabeçalho e rodapé -> conta -> cursos.

// ===== Tema e versão (computador / celular) =====

const dentroDoQuadro = window.self !== window.top;      // true quando a página está dentro da "moldura de celular"
const visaoSalva = localStorage.getItem("tc_visao");    // "computador", "celular" ou nada (automático)
const telaPequena = window.innerWidth <= 768;

// Qual versão está valendo agora (usado para marcar o botão no menu).
const visaoAtual = dentroDoQuadro || visaoSalva === "celular" || (telaPequena && visaoSalva !== "computador")
    ? "celular"
    : "computador";

// Em tela grande, a "versão celular" mostra o site dentro de uma moldura de celular.
const MODO_CELULAR = !dentroDoQuadro && visaoSalva === "celular" && !telaPequena;

function aplicarTema(tema) {
    document.documentElement.dataset.tema = tema;
    localStorage.setItem("tc_tema", tema);
    if (dentroDoQuadro) parent.postMessage("tc-" + tema, "*");  // avisa a página de fora
}

function mudarVisao(visao) {
    if (dentroDoQuadro) {
        if (visao === "computador") parent.postMessage("tc-computador", "*");
        return;
    }
    localStorage.setItem("tc_visao", visao);
    location.reload();
}

function montarQuadroCelular() {
    document.body.className = "palco";
    document.body.innerHTML = `
        <div class="celular"><iframe src="${location.href}" title="Versão celular do site"></iframe></div>
        <button type="button" class="btn-contorno" id="voltar-pc">Voltar para a versão computador</button>`;

    const quadro = document.querySelector(".celular iframe");

    document.getElementById("voltar-pc").addEventListener("click", () => mudarVisao("computador"));

    window.addEventListener("message", e => {
        if (e.source !== quadro.contentWindow) return;
        if (e.data === "tc-computador") mudarVisao("computador");
        if (e.data === "tc-claro" || e.data === "tc-escuro") document.documentElement.dataset.tema = e.data.slice(3);
    });
}

// Num celular de verdade, "computador" abre o site com a largura de um PC.
if (!dentroDoQuadro && telaPequena && visaoSalva === "computador") {
    document.querySelector('meta[name="viewport"]').setAttribute("content", "width=1200");
}

if (MODO_CELULAR) {
    montarQuadroCelular();
}

// ===== O resto do site (não roda na página de fora da moldura) =====

if (!MODO_CELULAR) {
    // ----- Cabeçalho e rodapé -----
    // Cabeçalho e rodapé repetidos em todas as páginas.

    const paginaAtual = location.pathname.split("/").pop() || "index.html";

    const LOGO = `
        <svg class="logo-icon" width="28" height="28" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/>
            <line x1="7" y1="12" x2="17" y2="6"/><line x1="7" y1="12" x2="17" y2="18"/>
        </svg>
        <span class="logo-text">Tech<span class="logo-highlight">Connect</span></span>`;

    function classeAtiva(arquivo) {
        const naPaginaDeCurso = arquivo === "cursos.html" && paginaAtual === "curso.html";
        return paginaAtual === arquivo || naPaginaDeCurso ? " active" : "";
    }

    function montarCabecalho() {
        document.getElementById("site-header").outerHTML = `
        <header class="header">
            <div class="header-container">
                <a href="index.html" class="logo">${LOGO}</a>

                <nav class="main-nav">
                    <ul class="nav-list">
                        <li><a href="index.html" class="nav-link${classeAtiva("index.html")}">Início</a></li>
                        <li><a href="cursos.html" class="nav-link${classeAtiva("cursos.html")}">Cursos</a></li>
                        <li><a href="index.html#por-que" class="nav-link">Como funciona</a></li>
                        <li><a href="index.html#contato" class="nav-link">Contato</a></li>
                    </ul>
                </nav>

                <div class="header-actions">
                    <form class="search-box" id="form-busca" action="cursos.html" role="search">
                        <input type="search" name="q" id="busca" class="search-input"
                               placeholder="Buscar cursos" aria-label="Buscar cursos" autocomplete="off">
                        <span class="material-symbols-outlined search-icon icon-xs" aria-hidden="true">search</span>
                    </form>
                    <div class="conta-area" id="conta-area"></div>
                </div>

                <button type="button" class="btn-hamb" id="btn-hamb" aria-label="Abrir menu" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
                ${htmlPainel()}
            </div>
        </header>`;
    }

    function montarRodape() {
        const links = TRILHAS.map(t => `<li><a href="cursos.html?trilha=${t}">${t}</a></li>`).join("");

        document.getElementById("site-footer").outerHTML = `
        <footer class="footer">
            <div class="container footer-container">
                <div class="footer-brand">
                    <a href="index.html" class="logo">${LOGO}</a>
                    <p class="footer-slogan">Programação e informática, de graça e no seu ritmo.</p>
                </div>
                <div class="footer-column">
                    <h4>Navegação</h4>
                    <ul>
                        <li><a href="index.html">Início</a></li>
                        <li><a href="cursos.html">Cursos</a></li>
                        <li><a href="index.html#contato">Contato</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Trilhas</h4>
                    <ul>${links}</ul>
                </div>
                <div class="footer-column">
                    <h4>Redes sociais</h4>
                    <div class="social-links">
                        <a href="https://github.com" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
                        <a href="https://youtube.com" target="_blank" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                        <a href="https://discord.com" target="_blank" aria-label="Discord"><i class="fa-brands fa-discord"></i></a>
                    </div>
                </div>
            </div>
            <p class="footer-copy">&copy; ${new Date().getFullYear()} TechConnect. Todos os direitos reservados.</p>
        </footer>`;
    }

    // Painel que abre nas 3 barrinhas: tema e versão do site.
    function htmlPainel() {
        return `
        <div class="painel" id="painel" hidden>
            <ul class="painel-nav">
                <li><a href="index.html">Início</a></li>
                <li><a href="cursos.html">Cursos</a></li>
                <li><a href="index.html#por-que">Como funciona</a></li>
                <li><a href="index.html#contato">Contato</a></li>
            </ul>

            <p class="painel-titulo">Tema</p>
            <div class="opcoes" data-grupo="tema">
                <button type="button" data-valor="escuro"><span class="material-symbols-outlined icon-xs">dark_mode</span>Escuro</button>
                <button type="button" data-valor="claro"><span class="material-symbols-outlined icon-xs">light_mode</span>Claro</button>
            </div>

            <p class="painel-titulo">Versão do site</p>
            <div class="opcoes" data-grupo="visao">
                <button type="button" data-valor="computador"><span class="material-symbols-outlined icon-xs">computer</span>Computador</button>
                <button type="button" data-valor="celular"><span class="material-symbols-outlined icon-xs">smartphone</span>Celular</button>
            </div>
        </div>`;
    }

    function ativarMenu() {
        const botao = document.getElementById("btn-hamb");
        const painel = document.getElementById("painel");

        function alternar(abrir) {
            painel.hidden = !abrir;
            botao.setAttribute("aria-expanded", abrir);
        }

        // Destaca a opção que está valendo agora em cada grupo.
        function marcarOpcoes() {
            painel.querySelectorAll(".opcoes").forEach(grupo => {
                const atual = grupo.dataset.grupo === "tema" ? document.documentElement.dataset.tema : visaoAtual;
                grupo.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.valor === atual));
            });
        }

        botao.addEventListener("click", () => alternar(painel.hidden));
        document.addEventListener("keydown", e => { if (e.key === "Escape") alternar(false); });
        document.addEventListener("click", e => {
            if (!e.target.closest(".header-container")) alternar(false);
        });

        painel.addEventListener("click", e => {
            const opcao = e.target.closest("button[data-valor]");
            if (!opcao) return;

            if (opcao.parentElement.dataset.grupo === "tema") {
                aplicarTema(opcao.dataset.valor);
                marcarOpcoes();
            } else {
                mudarVisao(opcao.dataset.valor);
            }
        });

        marcarOpcoes();
    }

    montarCabecalho();
    montarRodape();
    ativarMenu();


    // ----- Login e cadastro -----
    // Cadastro e login.
    // Atenção: não existe servidor neste projeto. As contas ficam no localStorage do
    // navegador (só funcionam naquele aparelho). Para um site de verdade, isso precisa
    // ser feito em um back-end.

    const Conta = (() => {
        const CHAVE_USUARIOS = "tc_usuarios";
        const CHAVE_SESSAO = "tc_sessao";

        const modal = document.createElement("dialog");
        modal.className = "modal";
        modal.innerHTML = `
            <button type="button" class="modal-fechar" aria-label="Fechar">✕</button>
            <div class="abas">
                <button type="button" class="aba" data-aba="entrar">Entrar</button>
                <button type="button" class="aba" data-aba="cadastro">Criar conta</button>
            </div>

            <form id="form-entrar" class="form-conta">
                <label>E-mail <input type="email" name="email" required autocomplete="email"></label>
                <label>Senha <input type="password" name="senha" required autocomplete="current-password"></label>
                <p class="erro" role="alert"></p>
                <button type="submit" class="btn-hero">Entrar</button>
            </form>

            <form id="form-cadastro" class="form-conta">
                <label>Nome <input type="text" name="nome" required minlength="2" autocomplete="name"></label>
                <label>E-mail <input type="email" name="email" required autocomplete="email"></label>
                <label>Senha <input type="password" name="senha" required autocomplete="new-password"></label>
                <label>Confirmar senha <input type="password" name="confirmar" required autocomplete="new-password"></label>
                <p class="erro" role="alert"></p>
                <button type="submit" class="btn-hero">Criar conta</button>
            </form>`;
        document.body.appendChild(modal);

        const formEntrar = modal.querySelector("#form-entrar");
        const formCadastro = modal.querySelector("#form-cadastro");

        // ---------- armazenamento ----------

        function lerUsuarios() {
            try {
                return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];
            } catch {
                return [];
            }
        }

        function salvarUsuarios(lista) {
            localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(lista));
        }

        function usuarioLogado() {
            const email = localStorage.getItem(CHAVE_SESSAO);
            return lerUsuarios().find(u => u.email === email) || null;
        }

        // Não guardamos a senha em texto puro, só o hash dela.
        async function gerarHash(texto) {
            if (!window.crypto || !crypto.subtle) return btoa(texto);
            const bytes = new TextEncoder().encode(texto);
            const hash = await crypto.subtle.digest("SHA-256", bytes);
            return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
        }

        // ---------- interface ----------

        function mostrarErro(form, mensagem) {
            form.querySelector(".erro").textContent = mensagem;
        }

        function abrir(aba = "entrar") {
            formEntrar.hidden = aba !== "entrar";
            formCadastro.hidden = aba !== "cadastro";
            modal.querySelectorAll(".aba").forEach(b => b.classList.toggle("on", b.dataset.aba === aba));
            modal.querySelectorAll(".erro").forEach(p => (p.textContent = ""));
            if (!modal.open) modal.showModal();
        }

        function atualizarCabecalho() {
            const area = document.getElementById("conta-area");
            const usuario = usuarioLogado();

            if (usuario) {
                const primeiroNome = usuario.nome.split(" ")[0];
                area.innerHTML = `
                    <span class="saudacao">Olá, ${primeiroNome}</span>
                    <button type="button" class="btn-contorno" data-sair>Sair</button>`;
            } else {
                area.innerHTML = `
                    <button type="button" class="btn-contorno" data-abrir="entrar">Entrar</button>
                    <button type="button" class="btn-login" data-abrir="cadastro">Criar conta</button>`;
            }
        }

        // ---------- ações ----------

        async function entrar(evento) {
            evento.preventDefault();
            const email = formEntrar.email.value.trim().toLowerCase();
            const hash = await gerarHash(formEntrar.senha.value);
            const usuario = lerUsuarios().find(u => u.email === email && u.senhaHash === hash);

            if (!usuario) return mostrarErro(formEntrar, "E-mail ou senha incorretos.");

            localStorage.setItem(CHAVE_SESSAO, usuario.email);
            concluir(formEntrar);
        }

        async function cadastrar(evento) {
            evento.preventDefault();
            const nome = formCadastro.nome.value.trim();
            const email = formCadastro.email.value.trim().toLowerCase();
            const senha = formCadastro.senha.value;
            const usuarios = lerUsuarios();

            if (senha.length < 6) return mostrarErro(formCadastro, "A senha precisa ter pelo menos 6 caracteres.");
            if (senha !== formCadastro.confirmar.value) return mostrarErro(formCadastro, "As senhas não são iguais.");
            if (usuarios.some(u => u.email === email)) return mostrarErro(formCadastro, "Este e-mail já tem cadastro. Use a aba Entrar.");

            usuarios.push({ nome, email, senhaHash: await gerarHash(senha) });
            salvarUsuarios(usuarios);
            localStorage.setItem(CHAVE_SESSAO, email);
            concluir(formCadastro);
        }

        function concluir(form) {
            form.reset();
            modal.close();
            atualizarCabecalho();
        }

        function sair() {
            localStorage.removeItem(CHAVE_SESSAO);
            atualizarCabecalho();
        }

        // ---------- eventos ----------

        formEntrar.addEventListener("submit", entrar);
        formCadastro.addEventListener("submit", cadastrar);
        modal.querySelector(".modal-fechar").addEventListener("click", () => modal.close());
        modal.querySelectorAll(".aba").forEach(b => b.addEventListener("click", () => abrir(b.dataset.aba)));
        modal.addEventListener("click", e => { if (e.target === modal) modal.close(); }); // clique no fundo

        document.addEventListener("click", e => {
            const botaoAbrir = e.target.closest("[data-abrir]");
            if (botaoAbrir) abrir(botaoAbrir.dataset.abrir);
            if (e.target.closest("[data-sair]")) sair();
        });

        atualizarCabecalho();
        return { abrir, usuarioLogado };
    })();


    // ----- Cursos -----
    // Cards, carrossel, lista com busca e página de cada curso.

    const parametros = new URLSearchParams(location.search);

    // Tira acentos e deixa em minúsculas, para a busca achar "logica" em "Lógica".
    function normalizar(texto) {
        return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function criarCard(curso) {
        return `
            <a class="course-card" href="curso.html?id=${curso.id}">
                <div class="course-icon icon-${curso.cor}">
                    <span class="material-symbols-outlined">${curso.icone}</span>
                </div>
                <h3 class="course-title">${curso.titulo}</h3>
                <p class="course-text">${curso.descricao}</p>
                <div class="course-info">
                    <span class="course-level">
                        <span class="material-symbols-outlined icon-xs">signal_cellular_alt</span>${curso.nivel}
                    </span>
                    <span class="course-lessons">
                        <span class="material-symbols-outlined icon-xs">play_circle</span>${curso.aulas} aulas
                    </span>
                </div>
            </a>`;
    }

    // ---------- carrossel da página inicial ----------

    function iniciarCarrossel() {
        const lista = document.getElementById("course-list");
        if (!lista) return;

        const btnAvancar = document.getElementById("btn-next");
        const btnVoltar = document.getElementById("btn-prev");

        lista.innerHTML = CURSOS.map(criarCard).join("");

        const tamanhoDoPasso = () => lista.querySelector(".course-card").offsetWidth + 16;

        // A seta de voltar só aparece depois que a lista andou para a direita.
        function atualizarSetaVoltar() {
            btnVoltar.classList.toggle("oculto", lista.scrollLeft < 10);
        }

        btnAvancar.addEventListener("click", () => {
            const chegouNoFim = lista.scrollLeft + lista.clientWidth >= lista.scrollWidth - 10;
            if (chegouNoFim) {
                lista.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                lista.scrollBy({ left: tamanhoDoPasso(), behavior: "smooth" });
            }
        });

        btnVoltar.addEventListener("click", () => {
            lista.scrollBy({ left: -tamanhoDoPasso(), behavior: "smooth" });
        });

        lista.addEventListener("scroll", atualizarSetaVoltar);
        atualizarSetaVoltar();
    }

    // ---------- página "Cursos" (lista, filtro e busca) ----------

    function iniciarListaDeCursos() {
        const grade = document.getElementById("grid");
        if (!grade) return;

        const campoBusca = document.getElementById("busca");
        const filtros = document.getElementById("chips");
        const contagem = document.getElementById("contagem");
        const aviso = document.getElementById("vazio");
        const trilhas = ["Todos", ...TRILHAS];

        let trilhaEscolhida = parametros.get("trilha") || "Todos";
        campoBusca.value = parametros.get("q") || "";

        function mostrar() {
            const termo = normalizar(campoBusca.value.trim());

            const resultado = CURSOS.filter(curso => {
                const daTrilha = trilhaEscolhida === "Todos" || curso.trilha === trilhaEscolhida;
                const texto = normalizar(`${curso.titulo} ${curso.descricao} ${curso.trilha}`);
                return daTrilha && texto.includes(termo);
            });

            grade.innerHTML = resultado.map(criarCard).join("");
            contagem.textContent = resultado.length === 1 ? "1 curso encontrado" : `${resultado.length} cursos encontrados`;
            aviso.hidden = resultado.length > 0;

            filtros.innerHTML = trilhas
                .map(t => `<button class="chip${t === trilhaEscolhida ? " on" : ""}" data-trilha="${t}">${t}</button>`)
                .join("");
        }

        filtros.addEventListener("click", e => {
            if (!e.target.dataset.trilha) return;
            trilhaEscolhida = e.target.dataset.trilha;
            mostrar();
        });

        campoBusca.addEventListener("input", mostrar);
        document.getElementById("form-busca").addEventListener("submit", e => {
            e.preventDefault();
            mostrar();
        });

        mostrar();
    }

    // ---------- página de um curso ----------

    function iniciarPaginaDoCurso() {
        const area = document.getElementById("curso");
        if (!area) return;

        const curso = CURSOS.find(c => c.id === parametros.get("id"));

        if (!curso) {
            area.innerHTML = `<div class="container"><p class="empty">Curso não encontrado. <a class="crumb" href="cursos.html">Ver todos os cursos</a></p></div>`;
            return;
        }

        document.title = `${curso.titulo} - TechConnect`;

        const relacionados = CURSOS
            .filter(c => c.trilha === curso.trilha && c.id !== curso.id)
            .slice(0, 3);

        const modulos = curso.topicos
            .map((topico, i) => `<div class="module"><b>${i + 1}</b><span>${topico}</span></div>`)
            .join("");

        const blocoRelacionados = relacionados.length === 0 ? "" : `
            <h2 class="section-title sub">Cursos relacionados</h2>
            <div class="grid grid-sem-margem">${relacionados.map(criarCard).join("")}</div>`;

        area.innerHTML = `
            <div class="page-head">
                <div class="container">
                    <a class="crumb" href="cursos.html">← Todos os cursos</a>
                    <div class="course-hero">
                        <div class="course-icon icon-${curso.cor}">
                            <span class="material-symbols-outlined">${curso.icone}</span>
                        </div>
                        <div>
                            <h1 class="titulo-curso">${curso.titulo}</h1>
                            <p>${curso.descricao}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container course-layout">
                <div>
                    <h2 class="section-title">O que você vai aprender</h2>
                    <div class="sub">${modulos}</div>
                    ${blocoRelacionados}
                </div>

                <aside class="side">
                    <ul>
                        <li>Nível <b>${curso.nivel}</b></li>
                        <li>Aulas <b>${curso.aulas}</b></li>
                        <li>Duração <b>${curso.duracao}</b></li>
                        <li>Trilha <b>${curso.trilha}</b></li>
                        <li>Preço <b>Gratuito</b></li>
                    </ul>
                    <a href="#" class="btn-hero" id="btn-comecar">Começar curso</a>
                </aside>
            </div>`;

        // Quem ainda não tem conta é levado para o cadastro.
        document.getElementById("btn-comecar").addEventListener("click", e => {
            e.preventDefault();
            if (!Conta.usuarioLogado()) Conta.abrir("cadastro");
        });
    }

    // ---------- seção de contato (página inicial) ----------

    function montarEquipe() {
        const lugar = document.getElementById("equipe");
        if (!lugar) return;

        lugar.innerHTML = EQUIPE.map(nome => `
            <li class="pessoa">
                <span class="avatar">${nome[0]}</span>
                <strong>${nome}</strong>
            </li>`).join("");
    }

    iniciarCarrossel();
    iniciarListaDeCursos();
    iniciarPaginaDoCurso();
    montarEquipe();

}
