const express = require("express");
const { Op } = require("sequelize");
const cors = require("cors");
const server = express();
const Cadastro = require("./models/cadastro");
const Adm = require("./models/Adm");
const Selecao = require("./models/Selecao");
const Jogo = require("./models/Jogo");
const Palpites = require("./models/Palpites");
const Resultado = require("./models/Resultado");
const Ranking = require("./models/Ranking");

Ranking.belongsTo(Cadastro, { foreignKey: "usuario_id" });
Palpites.belongsTo(Selecao, {
   foreignKey: "selecao_vencedora_id",
   as: "vencedor"
});
Palpites.belongsTo(Cadastro, { foreignKey: "usuario_id" });
Jogo.belongsTo(Selecao, { as: "selecao_a", foreignKey: "selecao_a_id" });
Jogo.belongsTo(Selecao, { as: "selecao_b", foreignKey: "selecao_b_id" });
Palpites.belongsTo(Jogo, { foreignKey: "jogo_id" });
Resultado.belongsTo(Jogo, { foreignKey: "jogo_id" });
Resultado.belongsTo(Selecao, { foreignKey: "selecao_vencedora_id", as: "vencedor" });


server.use(express.json());
server.use(cors());

/* -------------------------------função para gerar id------------------------------- */
async function gerarId() {
    while (true) {
        var id = Math.floor(Math.random() * 900) + 100;

        const existeCadastro = await Cadastro.findOne({ where: { id: id } }); //ta sendo uma luta existir um id que não existe, mas eu vou conseguir,
        if (!existeCadastro) {
            return id;
        }
    }
};

/* -------------------------------rota login adm------------------------------- */
server.post("/login-adm", async (req, res) => {
    const { nome, senha } = req.body;

    await Adm.findOne({ where: { nome: nome, senha: senha } }) //não sei oq estou fazendo da minha vida Jesus me ajuda
        .then((adm) => {                                       // me leva logo desse mundo pfv
            if (!adm) {
                res.status(401).json({ error: "Credenciais inválidas" });
            } else {
                res.json({
                    success: true,
                    adm: {
                        nome: adm.nome
                    } // redireciona para a página inicial
                });
            }
        })
        .catch((error) => {
            console.error("Erro ao realizar login:", error);
            res.status(500).json({ error: "Erro ao realizar login" });
        });
});

server.get("/pagina-inicial", (req, res) => {
    res.json({ message: "Bem-vindo à página inicial!" });
});

/* -------------------------------rota cadastro usuario------------------------------- */
server.post("/cadastro", async (req, res) => {

    await Cadastro.create({
        id: await gerarId(),
        nome: req.body.nome,
        N_telefone: req.body.N_telefone
    })

        .then((cadastro) => {
            res.json(cadastro);
            console.log("Cadastro criado com sucesso:", cadastro);
        }).catch((error) => {
            console.error("Erro ao criar cadastro:", error);
            res.status(500).json({ error: "Erro ao criar cadastro" });
        });
});

server.get("/inicio-adm", async (req, res) => {
    res.json({ message: "Bem-vindo, ADM!" });
});

//-------------------------------rota para visualizar cadastros-------------------------------
server.get("/view-cadastro", async (req, res) => {
    await Cadastro.findAll()
        .then((cadastros) => {
            res.json(cadastros);
        })
        .catch((error) => {
            console.error("Erro ao buscar cadastros:", error);
            res.status(500).json({ error: "Erro ao buscar cadastros" });
        });
});


//-------------------------------rota para deletar cadastro-------------------------------
server.delete("/delete-cadastro", async (req, res) => {
    const { id, nome } = req.body;

    await Cadastro.destroy({ where:
                            {[Op.or]:[
                                { id: id},
                                {nome: nome }
                                ]
                            } 
                        }).then((result) => {
                            if (result === 0) {
                                res.status(404).json({ error: "Cadastro não encontrado" });
                            } else {
                                res.json({ message: `Cadastro com id ${id} ou nome ${nome} deletado com sucesso` });
                        }}).catch((error) => {
                            console.error("Erro ao deletar cadastro:", error);
                            res.status(500).json({ error: "Erro ao deletar cadastro" });
                        });
});

//-------------------------------rota para mostrar palpites-------------------------------
server.get("/mostrar-palpites", async (req, res) => {
    await Palpites.findAll({
        include: [
            {
                model: Jogo,
                include: [
                    { model: Selecao, as: "selecao_a" },
                    { model: Selecao, as: "selecao_b" }
                ]
            },
            {
                model:Selecao,
                as:"vencedor"
            },
            { model: Cadastro }
        ]
    }).then((palpites) => {
        res.json(palpites);
    }).catch((error) => {
        console.error("Erro ao buscar palpites:", error);
        res.status(500).json({ error: "Erro ao buscar palpites" });
    });
});

/* -------------------------------rota para adcionar resultado------------------------------- */
                                
server.post("/adcionar-resultado", async (req, res) => {

if (!req.body.jogo_id || req.body.gols_a === undefined || req.body.gols_b === undefined) {
    return res.status(400).json({ error: "Dados incompletos" });
}

const vencedor = await validarVencedor(req.body.jogo_id, req.body.gols_a, req.body.gols_b);
    await Resultado.create({
        jogo_id: req.body.jogo_id,
        selecao_vencedora_id: vencedor,
        gols_a: req.body.gols_a,
        gols_b: req.body.gols_b
    }).then((resultado) => {
        res.json(resultado);
        console.log("Resultado adicionado com sucesso:", resultado);
    }).catch((error) => {
        console.error("Erro ao adcionar resultado:", error);
        res.status(500).json({ error: "Erro ao adcionar resultado" });
    }); 
});




/* -------------------------------função para validar vencedor------------------------------- */

async function validarVencedor(jogoId, golsA, golsB) {
    const jogo = await Jogo.findByPk(jogoId);

    if (!jogo) {
        throw new Error("Jogo não encontrado");
    }

    if (golsA > golsB) {
        return jogo.selecao_a_id;
    } else if (golsB > golsA) {
        return jogo.selecao_b_id;
    } else {
        return null;
    }
}

/* -------------------------------rota criar palpite------------------------------- */
server.post("/palpites", async (req, res) => {
    const vencedor = await validarVencedor(req.body.jogo_id,    //3 horas pra criar essa merda, quero que todo mundo vá pra casa do krai 
        req.body.gols_palpite_a,
        req.body.gols_palpite_b);

    await Palpites.create({
        usuario_id: req.body.usuario_id,
        jogo_id: req.body.jogo_id,
        gols_palpite_a: req.body.gols_palpite_a,                //parece que eu nn tenho amor à minha vida mesmo
        gols_palpite_b: req.body.gols_palpite_b,
        selecao_vencedora_id: vencedor
    })
        .then((palpite) => {
            res.json(palpite);
            console.log("Palpite criado com sucesso:", palpite);
        }).catch((error) => {
            console.error("Erro ao criar palpite:", error);
            res.status(500).json({ error: "Erro ao criar palpite" });
        });
});

server.get("/mostrar-resultados", async (req, res) => {
    await Resultado.findAll({
        include: [
            { model: Jogo,
                include: [
                    { model: Selecao, as: "selecao_a" },
                    { model: Selecao, as: "selecao_b" }
                ]
            },
            { model: Selecao, as: "vencedor" }
        ]
    }).then((resultados) => {
        res.json(resultados);
    }).catch((error) => {
        console.error("Erro ao buscar resultados:", error);
        res.status(500).json({ error: "Erro ao buscar resultados" });
    });
});


/* -------------------------------função para calcular resultados------------------------------- */
async function calcularResultados(resultadoId, palpiteId) {
    const resultado = await Resultado.findByPk(resultadoId);
    const palpite = await Palpites.findByPk(palpiteId);

    if (!resultado) {
        throw new Error("Resultado não encontrado");
    }

    if (!palpite) {
        throw new Error("Palpite não encontrado");
    }

    if (palpite.gols_palpite_a === resultado.gols_a && palpite.gols_palpite_b === resultado.gols_b) {
        return 5;
    } else if (palpite.selecao_vencedora_id === resultado.selecao_vencedora_id) {
        return 3;
    } else {
        return 0;
    }
};

/*----------------------------------------rota para calcular----------------------------*/
server.post("/calcular-resultados", async (req, res) => {
    try {
        const { resultadoId, palpiteId } = req.body;

        const pontuacao = await calcularResultados(resultadoId, palpiteId);

        const resultado = await Resultado.findByPk(resultadoId);
        const palpite = await Palpites.findByPk(palpiteId);

        if (!resultado) {
            return res.status(404).json({ error: "Resultado não encontrado" });
        }

        if (!palpite) {
            return res.status(404).json({ error: "Palpite não encontrado" });
        }

        const qndtCerta = pontuacao > 0 ? 1 : 0;

        await Ranking.upsert({
            usuario_id: palpite.usuario_id,
            total_pontos: pontuacao,
            palpites_feitos: 1,
            palpites_certos: qndtCerta
        });

        const ranking = await Ranking.findAll({
            include: [Cadastro],
            order: [["total_pontos", "DESC"]]
        });

        res.json(ranking);

    } catch (error) {
        console.error("Erro ao calcular pontuação:", error);
        res.status(500).json({ error: error.message });
    }
});

server.get("/mostrar-ranking", async (req, res) => {
    await Ranking.findAll({
        include: [Cadastro],
        order: [["total_pontos", "DESC"]]
    })
        .then((ranking) => {
            res.json(ranking);
        })
        .catch((error) => {
            console.error("Erro ao mostrar ranking:", error);
            res.status(500).json({ error: "Erro ao mostrar ranking" });
        });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`SERVER FUNCIONANDO NA PORTA ${PORT}`);
});

