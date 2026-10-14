-- Aplicar somente em banco vazio. Os registros iniciais são os materiais fornecidos pela autora.
CREATE TYPE portfolio_media_kind AS ENUM ('photo','video','composition');
CREATE TABLE portfolio_media (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
kind portfolio_media_kind NOT NULL, title text NOT NULL, caption text NOT NULL,
year integer CHECK (year IS NULL OR year BETWEEN 1900 AND 2100),
media_url text NOT NULL, poster_url text, external_url text, content_type text,
is_featured boolean NOT NULL DEFAULT false, sort_order integer NOT NULL DEFAULT 0,
created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX portfolio_media_chronology_idx ON portfolio_media(year ASC NULLS LAST,sort_order,created_at);

INSERT INTO portfolio_media (kind,title,caption,year,media_url,poster_url,external_url,content_type,is_featured,sort_order) VALUES
('photo','Apresentação na União dos Negros do Amapá','Apresentação na União dos Negros do Amapá',2006,'/_cdn/static/canva-MAGWMxqnyYA.jpg',NULL,NULL,'image/jpeg',false,0),
('photo','Apresentação no Museu Sacaca','Apresentação no Museu Sacaca',2009,'/_cdn/static/canva-MAGWRlY7YYU.jpg',NULL,NULL,'image/jpeg',false,1),
('photo','Fundadores do Marabaixo dos Devotos de São José','Fundadores do Marabaixo dos Devotos de São José',2014,'/_cdn/static/canva-MAGWRxvXKZE.jpg',NULL,NULL,'image/jpeg',false,2),
('photo','Oficina com o Projeto Mulheres do Aluá, Roraima','Oficina com o Projeto Mulheres do Aluá, Roraima',2015,'/_cdn/static/canva-MAGWUrnhG6w.jpg',NULL,NULL,'image/jpeg',false,3),
('photo','Gravação para o Festival Manas com Patrícia Bastos','Gravação para o Festival Manas com Patrícia Bastos',2021,'/_cdn/static/canva-MAGWR1hoe0Y.jpg',NULL,NULL,'image/jpeg',false,4),
('photo','Gravação para o Festival Manas com Luedji Luna','Gravação para o Festival Manas com Luedji Luna',2021,'/_cdn/static/canva-MAGWR8UGt98.jpg',NULL,NULL,'image/jpeg',false,5),
('photo','Aniversário do Marabaixo dos Devotos de São José','Aniversário do Marabaixo dos Devotos de São José',2022,'/_cdn/static/canva-MAGWSMmYrg4.jpg',NULL,NULL,'image/jpeg',false,6),
('photo','Samba New no Telão Praça do Coco','Samba New no Telão Praça do Coco',2022,'/_cdn/static/canva-MAGWSDifWrI.jpg',NULL,NULL,'image/jpeg',false,7),
('photo','Samba New no Gandaia','Samba New no Gandaia',2023,'/_cdn/static/canva-MAGWSOzRw1Y.jpg',NULL,NULL,'image/png',false,8),
('photo','Encontro com músicos do Fundo de Quintal','Encontro com músicos do Fundo de Quintal',2023,'/_cdn/static/canva-MAGWSGA7HhY.jpg',NULL,NULL,'image/png',false,9),
('video','Marabaixo — O Show','Apresentação · abril de 2019',2019,'https://www.youtube.com/watch?v=OK8yVSv6-V0','https://i.ytimg.com/vi/OK8yVSv6-V0/hqdefault.jpg','https://www.youtube.com/watch?v=OK8yVSv6-V0',NULL,false,0),
('video','Patrícia Bastos e Luedji Luna','Festival MANA · 2021',2021,'https://www.youtube.com/watch?v=-5ZAE1wROUs','https://i.ytimg.com/vi/-5ZAE1wROUs/hqdefault.jpg','https://www.youtube.com/watch?v=-5ZAE1wROUs',NULL,false,1),
('video','Dançando com Oxum — Timbres e Temperos','Clipe · 2022',2022,'https://www.youtube.com/watch?v=fzbbwkVlQ9s','https://i.ytimg.com/vi/fzbbwkVlQ9s/hqdefault.jpg','https://www.youtube.com/watch?v=fzbbwkVlQ9s',NULL,false,2),
('composition','Marabaixo das Crianças','Registro de composição do meu acervo cultural.',NULL,'https://drive.google.com/file/d/1y0k59hd60nc0q0ySjvpH8xf2zRJ9yYl1/view?usp=sharing',NULL,'https://drive.google.com/file/d/1y0k59hd60nc0q0ySjvpH8xf2zRJ9yYl1/view?usp=sharing',NULL,true,0),
('composition','Roda Gira','Registro de composição do meu acervo cultural.',NULL,'https://drive.google.com/file/d/14Yp-eBpGZckddlt3ZGEgYV1FUzQbTaah/view?usp=sharing',NULL,'https://drive.google.com/file/d/14Yp-eBpGZckddlt3ZGEgYV1FUzQbTaah/view?usp=sharing',NULL,true,1) RETURNING id,kind,title,year;
