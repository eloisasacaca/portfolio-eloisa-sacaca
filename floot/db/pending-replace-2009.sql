-- Pendente: aplicar após liberação do limite de ações Floot. Não executado em 14/10/2026.
-- Substituição autorizada; preservar ano, título, legenda e ordem.
UPDATE portfolio_media
SET media_url = 'https://raw.githubusercontent.com/eloisasacaca/portfolio-eloisa-sacaca/main/assets/acervo/2009-apresentacao-museu-sacaca.png',
    content_type = 'image/png',
    updated_at = now()
WHERE id = '21f8cc16-10ae-4749-9e6e-c696b64eb3ab'
  AND kind = 'photo'
  AND year = 2009
RETURNING id, title, caption, year, media_url;
