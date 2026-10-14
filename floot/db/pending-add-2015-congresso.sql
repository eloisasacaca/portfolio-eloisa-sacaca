-- Pendente: executar após a liberação das ações Floot. Não aplicado em 14/10/2026.
-- Inclusão autorizada pela autora; preservar os demais registros.
INSERT INTO portfolio_media (id,kind,title,caption,year,media_url,content_type,is_featured,sort_order)
SELECT '9e51a8d3-a7fa-4195-aa06-6aaa7cc46371', 'photo', 'Apresentação no Congresso Norte Nordeste de Pesquisa e Inovação', 'Apresentação no Congresso Norte Nordeste de Pesquisa e Inovação', 2015, 'https://raw.githubusercontent.com/eloisasacaca/portfolio-eloisa-sacaca/main/assets/acervo/2015-congresso-norte-nordeste-pesquisa-inovacao.png', 'image/png', false, 5
WHERE NOT EXISTS (SELECT 1 FROM portfolio_media WHERE id = '9e51a8d3-a7fa-4195-aa06-6aaa7cc46371' OR media_url = 'https://raw.githubusercontent.com/eloisasacaca/portfolio-eloisa-sacaca/main/assets/acervo/2015-congresso-norte-nordeste-pesquisa-inovacao.png')
RETURNING id, title, caption, year, media_url;
