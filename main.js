async function buscaEndereco(cep) {
  let mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";
  try {
    const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro) {
      throw Error("CEP não existente!");
    }
    let estado = document.getElementById("estado");
    let cidade = document.getElementById("cidade");
    let bairro = document.getElementById("bairro");
    let logradouro = document.getElementById("endereco");
    let numero = document.getElementById("numero");
    let complemento = document.getElementById("complemento");

    estado.value = consultaCEPConvertida.uf;
    cidade.value = consultaCEPConvertida.localidade;
    bairro.value = consultaCEPConvertida.bairro;
    logradouro.value = consultaCEPConvertida.logradouro;
    numero.value = "";
    complemento.value = "";

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p id="erro-msg">CEP inválido. Tente novamente informando no formato 00000000.</p>`;
  }
}

const cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
