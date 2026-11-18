// Lista de cursos do site. Para adicionar um curso novo, copie um bloco e mude os dados.
const CURSOS = [
    {
        id: "logica",
        titulo: "Lógica de Programação",
        descricao: "Aprenda os fundamentos da lógica para desenvolver qualquer programa.",
        nivel: "Iniciante", aulas: 12, duracao: "6h",
        icone: "code", cor: "blue", trilha: "Programação",
        topicos: ["O que é um algoritmo", "Variáveis e tipos de dados", "Operadores e expressões", "Condicionais (se / senão)", "Laços de repetição", "Vetores e funções"]
    },
    {
        id: "python",
        titulo: "Python do Zero",
        descricao: "A linguagem mais amigável para dar os primeiros passos em programação.",
        nivel: "Iniciante", aulas: 14, duracao: "8h",
        icone: "terminal", cor: "green", trilha: "Programação",
        topicos: ["Instalando o Python", "Entrada e saída de dados", "Listas e dicionários", "Funções e módulos", "Trabalhando com arquivos", "Mini projeto: lista de tarefas"]
    },
    {
        id: "html-css",
        titulo: "HTML e CSS",
        descricao: "Construa e estilize suas primeiras páginas da web.",
        nivel: "Iniciante", aulas: 15, duracao: "9h",
        icone: "web", cor: "orange", trilha: "Web",
        topicos: ["Estrutura de uma página", "Textos, links e imagens", "Seletores e cores", "Flexbox e Grid", "Layout responsivo", "Projeto: página pessoal"]
    },
    {
        id: "javascript",
        titulo: "JavaScript",
        descricao: "Dê vida às páginas com interatividade e lógica no navegador.",
        nivel: "Intermediário", aulas: 18, duracao: "11h",
        icone: "javascript", cor: "yellow", trilha: "Web",
        topicos: ["Variáveis e funções", "Manipulando o DOM", "Eventos", "Arrays e objetos", "Consumindo APIs com fetch", "Projeto: carrossel e menu"]
    },
    {
        id: "git",
        titulo: "Git e GitHub",
        descricao: "Controle versões do seu código e trabalhe em equipe.",
        nivel: "Iniciante", aulas: 8, duracao: "4h",
        icone: "merge", cor: "red", trilha: "Programação",
        topicos: ["O que é controle de versão", "add, commit e status", "Branches e merge", "Repositórios remotos", "Pull requests"]
    },
    {
        id: "banco-de-dados",
        titulo: "Banco de Dados",
        descricao: "Entenda como guardar e consultar informações usando SQL.",
        nivel: "Iniciante", aulas: 11, duracao: "6h",
        icone: "database", cor: "purple", trilha: "Dados",
        topicos: ["Tabelas e chaves", "SELECT e filtros", "INSERT, UPDATE e DELETE", "JOINs", "Modelagem de dados"]
    },
    {
        id: "java",
        titulo: "Java",
        descricao: "Programação orientada a objetos com uma das linguagens mais usadas no mercado.",
        nivel: "Intermediário", aulas: 20, duracao: "14h",
        icone: "coffee", cor: "red", trilha: "Programação",
        topicos: ["Sintaxe básica", "Classes e objetos", "Herança e polimorfismo", "Coleções", "Tratamento de erros", "Projeto: sistema de cadastro"]
    },
    {
        id: "nodejs",
        titulo: "APIs com Node.js",
        descricao: "Crie servidores e APIs para conectar seu site a um banco de dados.",
        nivel: "Avançado", aulas: 16, duracao: "10h",
        icone: "dns", cor: "green", trilha: "Web",
        topicos: ["Node e npm", "Criando um servidor", "Rotas com Express", "Conectando ao banco", "Autenticação básica"]
    },
    {
        id: "redes",
        titulo: "Redes de Computadores",
        descricao: "Descubra como os computadores se conectam e conversam entre si.",
        nivel: "Iniciante", aulas: 9, duracao: "5h",
        icone: "lan", cor: "cyan", trilha: "Infraestrutura",
        topicos: ["O que é uma rede", "IP, DNS e portas", "Modelo OSI e TCP/IP", "Roteadores e switches", "Montando uma rede doméstica"]
    },
    {
        id: "seguranca",
        titulo: "Segurança da Informação",
        descricao: "Proteja seus dados, senhas e sistemas contra ameaças comuns.",
        nivel: "Intermediário", aulas: 10, duracao: "6h",
        icone: "shield", cor: "purple", trilha: "Infraestrutura",
        topicos: ["Senhas fortes e verificação em duas etapas", "Phishing e golpes", "Criptografia básica", "Boas práticas no código"]
    }
];

const TRILHAS = ["Programação", "Web", "Dados", "Infraestrutura"];

// Equipe que criou o site (aparece na seção de contato).
const EQUIPE = ["Osmar", "Lehvy", "Arthur Pacheco", "Elias", "Bruno Barbosa"];
