# Portfólio de Eloisa Sacaca

Site pessoal sobre tecnologia, cultura amapaense e Marabaixo. Projeto próprio, separado do PROJETO-SORTEADOR.

- **GitHub Pages (endereço após ativar):** https://eloisasacaca.github.io/portfolio-eloisa-sacaca/
- **Site no Floot:** https://eloisa-sacaca.floot.app/
- **Enviar novas mídias pelo chat:** [COMO-ATUALIZAR.md](COMO-ATUALIZAR.md)

## Publicar no GitHub Pages
1. Abrir [Settings → Pages](https://github.com/eloisasacaca/portfolio-eloisa-sacaca/settings/pages).
2. Em **Source**, escolher **Deploy from a branch**.
3. Escolher **main** e **/ (root)** e clicar **Save**.
4. Aguardar a primeira publicação. Os commits seguintes na main atualizam o site.

Não há build nem instalação de dependências para o site estático. `index.html`, `acervo.js`, `acervo.json`, `.nojekyll` e `assets/` estão na raiz do repositório. Os arquivos dentro de `floot/` não fazem parte da execução do GitHub Pages.

## Acervo por ano
Fotos, vídeos e composições têm título, legenda, ano e opção de destaque. Cada seção mostra os registros do ano mais antigo ao mais recente. Registros sem ano conhecido ficam ao final. Destaques recebem uma marca visual e não alteram essa ordem.

As composições têm uma seção própria. YouTube abre o player ao clicar; arquivos de vídeo e áudio enviados depois podem usar os controles nativos do navegador. Links do Google Drive abrem o registro original.

O catálogo estático `acervo.json` tem os registros do GitHub Pages e usa as fotos armazenadas neste repositório. Não depende do backend Floot para funcionar. Na versão Floot, os mesmos registros ficam no banco `portfolio_media`; a API `/_api/portfolio-media` é somente leitura.

Para atualizar pelo chat, o assistente adiciona os arquivos e os metadados nas duas versões conforme [o procedimento](COMO-ATUALIZAR.md). O envio no chat exige esse cadastro; não existe um upload público no site.

## Estrutura
- `index.html`: interface completa estática, capa original, logos, projetos, contatos e links culturais.
- `acervo.js`: consulta e renderiza o catálogo com validação de URLs e ordem crescente.
- `acervo.json`: catálogo de fotos, vídeos e composições.
- `assets/acervo/`: fotos do portfólio cultural fornecido pela autora.
- `assets/*.svg`: logos originais preservadas como imagens incorporadas.
- `floot/`: espelho dos arquivos da interface e do acervo modificados no projeto hospedado Floot; não é um projeto Node autônomo.
- `floot/db/`: esquema e registros iniciais do catálogo, para referência/restauração em um banco vazio. Não executar novamente em banco existente.

## Executar a edição estática localmente
Na pasta do repositório, executar `python -m http.server 8000` e abrir http://localhost:8000/. Servir por HTTP permite carregar o catálogo JSON.

## Verificação
Código Floot sem erros de tipos. Consulta do acervo validada com 15 registros reais. Edição estática verificada para ordenação, 10 fotos, 3 vídeos, 2 composições em destaque, acionamento do player, suporte a áudio/vídeo local, legendas escapadas, rejeição de URLs inseguras e estado de falha no carregamento.

A publicação GitHub Pages depende da ativação única em Settings → Pages. Alterar arquivos aqui não publica o código da versão Floot: a interface Floot precisa da própria publicação; inclusões no banco são lidas ao carregar a página.
