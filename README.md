# PokeAPI Explorer

Bem-vindo ao Pokemon search, uma ferramenta que permite explorar informações sobre Pokémon utilizando a API da PokeAPI. Este projeto é desenvolvido para fornecer dados detalhados sobre Pokémon, incluindo seus nomes, habilidades, tipos e estatísticas.

### Funcionalidades Principais

1. **Pesquisa de Pokémon**
   - Através da API da PokeAPI, é possível pesquisar informações sobre Pokémon fornecendo seus nomes ou números de identificação.

2. **Detalhes do Pokémon**
   - Uma vez encontrado o Pokémon, o sistema exibe informações detalhadas, incluindo:
     - Nome
     - Habilidades
     - Tipos
     - Estatísticas
     - Peso
     - Altura

3. **Validação de Existência do Pokémon**
   - Antes de exibir as informações, o sistema valida se o Pokémon realmente existe na base de dados da PokeAPI.

4. **Lista de Pokémon**
   - Além da pesquisa individual, é possível obter uma lista de Pokémon disponíveis, permitindo uma navegação mais ampla.

#### Recursos Principais
Design Responsivo
A interface é projetada para se adaptar a diferentes tamanhos de tela, garantindo uma experiência consistente em dispositivos desktop, tablets e smartphones.

#### Busca Dinâmica
Implementamos um campo de busca dinâmica que requisita a API da PokeAPI para uma experiência de usuário mais fluida.

### Como Usar

Compile o arquivo index.ts usando o TypeScript:

```bash
tsc .\index.ts

```

Após, basta abrir o arquivo index.html.