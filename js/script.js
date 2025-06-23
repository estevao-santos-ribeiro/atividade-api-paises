document.getElementById('buscar').addEventListener('click', () => {
  const nome = document.getElementById('nome');
  const capital = document.getElementById('capital');
  const regiao = document.getElementById('regiao');
  const populacao = document.getElementById('populacao');
  const idioma = document.getElementById('idioma');
  const bandeira = document.getElementById('bandeira');
  const loading = document.getElementById('loading');
  const inputPais = document.getElementById('input-pais');

  const pais = inputPais.value.trim();

  // Limpar campos anteriores
  nome.textContent = '';
  capital.textContent = '';
  regiao.textContent = '';
  populacao.textContent = '';
  idioma.textContent = '';
  bandeira.style.display = 'none';

  if (!pais) {
    nome.textContent = 'Digite um país válido.';
    return;
  }

  loading.style.display = 'block';

  fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(pais)}`)
    .then(res => {
      if (!res.ok) throw new Error("País não encontrado");
      return res.json();
    })
    .then(data => {
      const paisInfo = data[0];
      nome.textContent = paisInfo.name.official;
      capital.textContent = paisInfo.capital?.[0] || 'Não informado';
      regiao.textContent = `${paisInfo.region} (${paisInfo.subregion})`;
      populacao.textContent = paisInfo.population.toLocaleString('pt-BR');
      idioma.textContent = Object.values(paisInfo.languages).join(', ');
      bandeira.src = paisInfo.flags.png;
      bandeira.alt = `Bandeira de ${paisInfo.name.common}`;
      bandeira.style.display = 'block';
    })
    .catch(error => {
      nome.textContent = 'Erro ao carregar dados. País não encontrado.';
      console.error(error);
    })
    .finally(() => {
      loading.style.display = 'none';
    });
});
