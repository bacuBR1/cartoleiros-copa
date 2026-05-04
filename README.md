# ⚽ Cartoleiros Copa

Sistema de palpites para jogos de futebol estilo bolão, onde usuários podem prever resultados e competir em um ranking baseado em pontuação.

---

## 🚀 Funcionalidades

- Cadastro de usuários
- Cadastro de jogos e seleções
- Registro de palpites
- Cálculo automático de pontuação
- Sistema de ranking por pontos
- Ordenação automática dos melhores jogadores

---

## 🧠 Como funciona

Cada usuário faz palpites para os jogos informando:

- Gols do time A
- Gols do time B

O sistema calcula automaticamente:

- Quem venceu o jogo
- Se o usuário acertou o resultado

### 🎯 Pontuação

| Situação | Pontos |
|--------|------|
| Acertou o placar exato | +5 |
| Acertou apenas o vencedor | +3 |
| Errou | 0 |

---

## 📊 Ranking

O ranking é baseado na soma total de pontos dos usuários.

- Maior pontuação → melhor posição
- Ordenação decrescente
- Posição calculada automaticamente

---

## 🗄️ Estrutura do Banco

### Principais tabelas:

- `cadastro` → usuários
- `selecoes` → times
- `jogos` → partidas
- `palpites` → apostas dos usuários
- `resultados` → resultados reais dos jogos
- `ranking` → classificação dos usuários

---

## 🛠️ Tecnologias

- Node.js
- Express
- Sequelize
- MySQL

---

## ▶️ Como rodar o projeto

### 🔹 Clonar repositório

```bash
git clone https://github.com/bacuBR1/cartoleiros-copa.git
