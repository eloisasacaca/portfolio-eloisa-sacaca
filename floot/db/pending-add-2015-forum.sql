-- Pendente: executar após a liberação das ações Floot. Não aplicado em 14/10/2026.
-- Inclusão autorizada pela autora; preservar os demais registros.
INSERT INTO portfolio_media (id,kind,title,caption,year,media_url,content_type,is_featured,sort_order)
SELECT '803eb79a-1a99-473a-9c40-c615c08a2747', 'photo', 'Apresentação no III Fórum Mundial de Educação Profissional e Tecnológica', 'Apresentação no III Fórum Mundial de Educação Profissional e Tecnológica', 2015, 'https://raw.githubusercontent.com/eloisasacaca/portfolio-eloisa-sacaca/main/assets/acervo/2015-forum-mundial-educacao.png', 'image/png', false, 4
WHERE NOT EXISTS (SELECT 1 FROM portfolio_media WHERE id = '803eb79a-1a99-473a-9c40-c615c08a2747' OR media_url = 'https://raw.githubusercontent.com/eloisasacaca/portfolio-eloisa-sacaca/main/assets/acervo/2015-forum-mundial-educacao.png')
RETURNING id, title, caption, year, media_url;
