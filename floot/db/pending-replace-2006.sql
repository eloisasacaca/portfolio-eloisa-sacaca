-- Pendente: executar quando as ações Floot forem liberadas. Não aplicado ao banco em 14/10/2026.
-- Troca autorizada pela autora. Mantém ano, título, legenda e ordem.
UPDATE portfolio_media
SET media_url = 'https://raw.githubusercontent.com/eloisasacaca/portfolio-eloisa-sacaca/main/assets/acervo/2006-apresentacao-una.png',
    content_type = 'image/png',
    updated_at = now()
WHERE id = '343b25ed-d5bc-4df2-9b79-937580dd1342'
  AND kind = 'photo'
  AND year = 2006
RETURNING id, title, caption, year, media_url;
