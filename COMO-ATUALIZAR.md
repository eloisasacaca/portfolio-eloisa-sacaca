# Atualizar o portfólio pelo chat

Envie a foto, o vídeo, o áudio ou o link aqui no chat, junto com:
- Tipo: foto, vídeo ou composição
- Ano: o ano do registro
- Título: especialmente para composições
- Legenda: o texto que deve aparecer
- Destaque: sim ou não (opcional)

Exemplo:
Tipo: composição
Ano: 2026
Título: nome da composição
Legenda: apresentação na festividade de São José.
Destaque: sim

O assistente cadastra o material e atualiza as versões do portfólio. O envio no chat sozinho não é uma publicação automática. Para vários arquivos, numere cada um e sua legenda.

A ordem é sempre crescente por ano, dentro de fotos, vídeos e composições. O destaque acrescenta uma marca visual, sem mudar a ordem cronológica. Registros antigos sem ano informado ficam ao final da respectiva seção. Os anos de "Marabaixo das Crianças" e "Roda Gira" ainda não foram informados.

## Referências do projeto
- Repositório exclusivo: https://github.com/eloisasacaca/portfolio-eloisa-sacaca
- GitHub Pages esperado após ativar: https://eloisasacaca.github.io/portfolio-eloisa-sacaca/
- Versão Floot: https://eloisa-sacaca.floot.app/
- Projeto Floot: 7dd6a0e7-a33a-4dfb-acad-c31434317359

## Procedimento para o assistente
1. Identificar arquivo/link, tipo, ano e legenda. Não inventar ano, autoria ou local. Se faltar ano ou legenda de um novo envio, perguntar somente o que falta antes de publicar.
2. Preservar os originais; não trocar a capa nem alterar as logos. A capa é o retrato original do perfil GitHub; os nomes são Marabaixo do Arthur Sacaca e Marabaixo dos Devotos de São José.
3. Confirmar que o arquivo está realmente acessível. Arquivo local: ler os bytes e usar floot_upload_asset (file ou base64 conforme limites). Se o anexo não estiver acessível, usar a solicitação nativa de upload, sem prometer que já foi recebido. Vídeos grandes podem ser enviados como link público; não transcodificar nem reduzir qualidade sem necessidade.
4. Guardar no Floot e no GitHub. No GitHub, adicionar arquivos em assets/acervo/ por blobs binários, atualizar acervo.json e commitar no repositório exclusivo. Links externos entram como URLs HTTPS. O GitHub Pages usa só arquivos estáticos deste repositório.
5. No Floot, consultar portfolio_media e evitar duplicatas. Inserir/atualizar com execute_sql usando literais devidamente escapados. Campos: id UUID, kind ('photo','video','composition'), title, caption, year (inteiro), media_url (URL do asset Floot ou HTTPS), poster_url, external_url, content_type, is_featured, sort_order, timestamps. Atualizar updated_at ao editar. Não usar a URL relativa do GitHub como media_url no Floot.
6. acervo.json: { "items": [...] }, campos camelCase equivalentes, incluindo id estável, sortOrder. Para fotos locais do GitHub, mediaUrl é assets/acervo/arquivo.ext. Este catálogo e o banco contêm os mesmos registros, com URLs próprias de cada hospedagem.
7. Consultar novamente o banco e ler acervo.json para verificar ano, legenda, duplicatas e URLs. Ordenação: year ASC NULLS LAST, sort_order ASC, created_at ASC, id ASC. O frontend também ordena o catálogo estático.
8. A inclusão no banco aparece na versão Floot ao carregar/reabrir a página, sem republicar código. O commit atualiza o GitHub Pages quando a publicação automática da branch main estiver ativa. Confirmar o resultado e mandar os dois links. Mudanças de interface precisam de publicação Floot e commit GitHub.
9. A API pública /_api/portfolio-media é somente leitura. Não criar endpoint público de upload/edição. Não publicar dados pessoais novos além do material que a usuária enviou para o portfólio.

## Ativar GitHub Pages uma vez
Em Settings → Pages do repositório, escolher:
- Source: Deploy from a branch
- Branch: main
- Pasta: / (root)
- Save

O index.html e .nojekyll estão na raiz. Depois da primeira publicação, novos commits na main atualizam o site. O backend Floot é separado: os arquivos em floot/ são o espelho do código, e não são executados pelo GitHub Pages.
