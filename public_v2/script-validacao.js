// ========== Funções de validação ==========
function validarNome(nome) {
  const regex = /^[A-Za-zÀ-ÿ]{2,}(?:\s+[A-Za-zÀ-ÿ]{2,})+$/;
  return regex.test(nome);
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += cpf[i] * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += cpf[i] * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
}

// ========== Seletores ==========
const msgErro = document.getElementById('mensagemErro');
const nome = document.getElementById('campoNomeCompleto');
const email = document.getElementById('campoEmail');
const senha = document.getElementById('campoSenha');
const cpf = document.getElementById('campoCPF');
const telefone = document.getElementById('campoTelefone');
const dataNasc = document.getElementById('campoDataNascimento');

const passo1 = document.getElementById('passo1');
const passo2 = document.getElementById('passo2');
const passo3 = document.getElementById('passo3');
const passo4 = document.getElementById('passo4');

const btnEtapa1 = document.getElementById('btnEtapa1');
const btnEtapa2 = document.getElementById('btnEtapa2');
const btnEtapa3 = document.getElementById('btnEtapa3');
const form = document.getElementById('formCadastroCompleto');

// ========== Etapa 1 ==========
btnEtapa1.addEventListener('click', (e) => {
  if (!validarNome(nome.value.trim())) {
    e.preventDefault();
    mostrarErro('Informe seu nome completo antes de prosseguir.');
  } else {
    limparErro();
    passo2.checked = true;
  }
});

// ========== Etapa 2 ==========
btnEtapa2.addEventListener('click', (e) => {
  if (!validarEmail(email.value.trim())) {
    e.preventDefault();
    mostrarErro('O e-mail informado é inválido.');
  } else if (senha.value.trim().length < 6) {
    e.preventDefault();
    mostrarErro('A senha deve ter no mínimo 6 caracteres.');
  } else {
    limparErro();
    passo3.checked = true;
  }
});

// ========== Etapa 3 ==========
btnEtapa3.addEventListener('click', (e) => {
  if (!validarCPF(cpf.value.trim())) {
    e.preventDefault();
    mostrarErro('CPF inválido. Digite um CPF válido no formato 000.000.000-00.');
  } else if (!telefone.value.trim()) {
    e.preventDefault();
    mostrarErro('Informe um telefone válido antes de continuar.');
  } else {
    limparErro();
    passo4.checked = true;
  }
});

// ========== Envio final ==========
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!nome.value.trim() || !email.value.trim() || !senha.value.trim() || !telefone.value.trim() || !dataNasc.value.trim()) {
    mostrarErro('Falha ao cadastrar: campos obrigatórios em branco (nome, e-mail, senha, telefone ou data de nascimento).');
    return;
  }

  if (!validarNome(nome.value.trim())) {
    mostrarErro('Informe seu nome completo.');
    return;
  }
  if (!validarEmail(email.value.trim())) {
    mostrarErro('O e-mail informado é inválido.');
    return;
  }
  if (!validarCPF(cpf.value.trim())) {
    mostrarErro('CPF inválido.');
    return;
  }

  limparErro();
  alert('Cadastro concluído com sucesso!');
  form.reset();
  passo1.checked = true;
});

// ========== Funções auxiliares ==========
function mostrarErro(msg) {
  msgErro.textContent = msg;
  msgErro.style.display = 'block';
}

function limparErro() {
  msgErro.textContent = '';
  msgErro.style.display = 'none';
}
