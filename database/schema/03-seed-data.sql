-- K-Pop Card Collection Game - Seed Data
-- Created: 9-19-2025
-- Purpose: Populate database with realistic K-pop artist data for development and testing

-- ============================================================================
-- DEVELOPMENT SEED DATA - Safe for reset/reload
-- ============================================================================

-- Clear existing data for clean development reset
-- Order matters: Delete child tables first (foreign key constraints)
TRUNCATE TABLE user_cards, user_pulls, cards, artists, users RESTART IDENTITY CASCADE;

-- ============================================================================
-- SAMPLE USERS - Test accounts for development
-- ============================================================================

INSERT INTO users (username, email, password_hash) VALUES 
('Im Soobin 69', 'collector@example.com', '$2b$12$LQv3c1yqBwlVHpPRLJeYcOQsOtk.LpDVXvgE8zY5tQtCZwQeS2/Gq'),
('jimins_seatcushion', 'army@example.com', '$2b$12$LQv3c1yqBwlVHpPRLJeYcOQsOtk.LpDVXvgE8zY5tQtCZwQeS2/Gq'),
('Jar Jar Blinks', 'blink@example.com', '$2b$12$LQv3c1yqBwlVHpPRLJeYcOQsOtk.LpDVXvgE8zY5tQtCZwQeS2/Gq'),
('Nineteen', 'casual@example.com', '$2b$12$LQv3c1yqBwlVHpPRLJeYcOQsOtk.LpDVXvgE8zY5tQtCZwQeS2/Gq');

-- ============================================================================
-- SAMPLE ARTISTS - Real K-pop idols for realistic testing  
-- ============================================================================

-- BTS Members
INSERT INTO artists (name, stage_name, group_name, date_of_birth, country, hometown, debut_year, extra_info) VALUES 
('Kim Namjoon', 'RM', 'BTS', '1994-09-12', 'South Korea', 'Seoul', 2013, 
 '{"favorite_color": "black", "mbti": "ENFP", "hobby": "reading", "position": "leader", "height": "181cm"}'),

('Kim Seokjin', 'Jin', 'BTS', '1992-12-04', 'South Korea', 'Gwacheon', 2013, 
 '{"favorite_color": "pink", "mbti": "ISFP", "hobby": "cooking", "position": "visual", "height": "179cm"}'),

('Min Yoongi', 'Suga', 'BTS', '1993-03-09', 'South Korea', 'Daegu', 2013, 
 '{"favorite_color": "white", "mbti": "INFP", "hobby": "basketball", "position": "rapper", "height": "174cm"}'),

('Jung Hoseok', 'J-Hope', 'BTS', '1994-02-18', 'South Korea', 'Gwangju', 2013, 
 '{"favorite_color": "green", "mbti": "ESFJ", "hobby": "dancing", "position": "dancer", "height": "177cm"}'),

('Park Jimin', 'Jimin', 'BTS', '1995-10-13', 'South Korea', 'Busan', 2013, 
 '{"favorite_color": "blue", "mbti": "ESTP", "hobby": "dancing", "position": "main_dancer", "height": "174cm"}'),

('Kim Taehyung', 'V', 'BTS', '1995-12-30', 'South Korea', 'Daegu', 2013, 
 '{"favorite_color": "green", "mbti": "INFP", "hobby": "photography", "position": "vocalist", "height": "179cm"}'),

('Jeon Jungkook', 'Jungkook', 'BTS', '1997-09-01', 'South Korea', 'Busan', 2013, 
 '{"favorite_color": "black", "mbti": "ISFP", "hobby": "gaming", "position": "main_vocalist", "height": "178cm"}');

 -- BLACKPINK Members  
INSERT INTO artists (name, stage_name, group_name, date_of_birth, country, hometown, debut_year, extra_info) VALUES 
('Lalisa Manobal', 'Lisa', 'BLACKPINK', '1997-03-27', 'Thailand', 'Bangkok', 2016, 
 '{"favorite_color": "yellow", "mbti": "ESFP", "hobby": "photography", "position": "main_dancer", "languages": "Thai, Korean, English, Japanese"}'),

('Kim Jennie', 'Jennie', 'BLACKPINK', '1996-01-16', 'South Korea', 'Seoul', 2016, 
 '{"favorite_color": "black", "mbti": "ISFP", "hobby": "fashion", "position": "rapper", "education": "New Zealand"}'),

('Park Chaeyoung', 'Rosé', 'BLACKPINK', '1997-02-11', 'New Zealand', 'Auckland', 2016, 
 '{"favorite_color": "white", "mbti": "ISFJ", "hobby": "guitar", "position": "main_vocalist", "instruments": "guitar, piano"}'),

('Kim Jisoo', 'Jisoo', 'BLACKPINK', '1995-01-03', 'South Korea', 'Seoul', 2016, 
 '{"favorite_color": "purple", "mbti": "ISTP", "hobby": "acting", "position": "visual", "acting_works": "Snowdrop, Dr. Romantic"}');

-- TWICE Members 
INSERT INTO artists (name, stage_name, group_name, date_of_birth, country, hometown, debut_year, extra_info) VALUES 
('Im Nayeon', 'Nayeon', 'TWICE', '1995-09-22', 'South Korea', 'Seoul', 2015, 
 '{"favorite_color": "blue", "mbti": "ISFP", "hobby": "singing", "position": "lead_vocalist", "specialty": "aegyo"}'),

('Yoo Jeongyeon', 'Jeongyeon', 'TWICE', '1996-11-01', 'South Korea', 'Suwon', 2015, 
 '{"favorite_color": "beige", "mbti": "ISFJ", "hobby": "cooking", "position": "lead_vocalist", "personality": "4D"}'),

('Hirai Momo', 'Momo', 'TWICE', '1996-11-09', 'Japan', 'Kyoto', 2015, 
 '{"favorite_color": "pink", "mbti": "ISFP", "hobby": "dancing", "position": "main_dancer", "specialty": "jokbal"}'),

('Minatozaki Sana', 'Sana', 'TWICE', '1996-12-29', 'Japan', 'Osaka', 2015, 
 '{"favorite_color": "purple", "mbti": "ENFP", "hobby": "shopping", "position": "vocalist", "specialty": "aegyo"}'),

('Park Jihyo', 'Jihyo', 'TWICE', '1997-02-01', 'South Korea', 'Guri', 2015, 
 '{"favorite_color": "orange", "mbti": "ESFJ", "hobby": "watching_movies", "position": "leader", "specialty": "vocals"}'),

('Myoi Mina', 'Mina', 'TWICE', '1997-03-24', 'Japan', 'San Antonio', 2015, 
 '{"favorite_color": "mint", "mbti": "ISFP", "hobby": "ballet", "position": "main_dancer", "background": "ballet_trained"}'),

('Kim Dahyun', 'Dahyun', 'TWICE', '1998-05-28', 'South Korea', 'Seongnam', 2015, 
 '{"favorite_color": "white", "mbti": "ESFP", "hobby": "piano", "position": "lead_rapper", "specialty": "eagle_dance"}'),

('Son Chaeyoung', 'Chaeyoung', 'TWICE', '1999-04-23', 'South Korea', 'Seoul', 2015, 
 '{"favorite_color": "red", "mbti": "ISFP", "hobby": "drawing", "position": "main_rapper", "height": "159cm"}'),

('Chou Tzuyu', 'Tzuyu', 'TWICE', '1999-06-14', 'Taiwan', 'Tainan', 2015, 
 '{"favorite_color": "blue", "mbti": "ISFP", "hobby": "archery", "position": "vocalist", "specialty": "visuals"}');

-- Solo Artists - Independent performers (no group affiliation)
INSERT INTO artists (name, stage_name, group_name, date_of_birth, country, hometown, debut_year, extra_info) VALUES 
('Lee Ji-eun', 'IU', NULL, '1993-05-16', 'South Korea', 'Seoul', 2008, 
 '{"favorite_color": "purple", "mbti": "INFP", "hobby": "writing", "position": "solo_artist", "genres": "ballad, pop, R&B", "acting": true}'),

('Kwon Bo-ah', 'BoA', NULL, '1986-11-05', 'South Korea', 'Guri', 2000, 
 '{"favorite_color": "red", "mbti": "ESFJ", "hobby": "dancing", "position": "solo_artist", "international_debut": "Japan", "languages": "Korean, Japanese, English"}');

 -- ============================================================================
-- SAMPLE CARDS - 2 versions for each artist (collectible items)
-- ============================================================================

-- BTS Cards - Global superstars with high rarity
INSERT INTO cards (artist_id, version, rarity_level, image_url, image_alt_text) VALUES
-- RM (artist_id = 1)
(1, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/RM_at_the_White_House_in_May_2022.jpg/800px-RM_at_the_White_House_in_May_2022.jpg', 'RM - Leader Portrait'),
(1, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/RM_of_BTS_visit_the_UN_headquarters_in_September_2021_02.jpg/800px-RM_of_BTS_visit_the_UN_headquarters_in_September_2021_02.jpg', 'RM - UN Speech Special Edition'),

-- Jin (artist_id = 2) 
(2, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Jin_at_the_White_House_in_May_2022.jpg/800px-Jin_at_the_White_House_in_May_2022.jpg', 'Jin - Visual Portrait'),
(2, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Jin_of_BTS_at_the_78th_Golden_Globe_Awards_in_February_2021_02.jpg/800px-Jin_of_BTS_at_the_78th_Golden_Globe_Awards_in_February_2021_02.jpg', 'Jin - Golden Globe Special'),

-- Suga (artist_id = 3)
(3, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Suga_at_the_White_House_in_May_2022.jpg/800px-Suga_at_the_White_House_in_May_2022.jpg', 'Suga - Producer Portrait'),  
(3, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Min_Yoon-gi_in_2021.jpg/800px-Min_Yoon-gi_in_2021.jpg', 'Suga - Studio Edition'),

-- J-Hope (artist_id = 4)
(4, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/J-Hope_at_the_White_House_in_May_2022.jpg/800px-J-Hope_at_the_White_House_in_May_2022.jpg', 'J-Hope - Sunshine Portrait'),
(4, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Jung_Ho-seok_in_2021.jpg/800px-Jung_Ho-seok_in_2021.jpg', 'J-Hope - Dance Leader Edition'),

-- Jimin (artist_id = 5)  
(5, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Jimin_at_the_White_House_in_May_2022.jpg/800px-Jimin_at_the_White_House_in_May_2022.jpg', 'Jimin - Main Dancer Portrait'),
(5, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Park_Ji-min_in_2021.jpg/800px-Park_Ji-min_in_2021.jpg', 'Jimin - Performance Special'),

-- V (artist_id = 6)
(6, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/V_at_the_White_House_in_May_2022.jpg/800px-V_at_the_White_House_in_May_2022.jpg', 'V - Visual Portrait'),
(6, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Kim_Tae-hyung_in_2021.jpg/800px-Kim_Tae-hyung_in_2021.jpg', 'V - Artistic Edition'),

-- Jungkook (artist_id = 7) 
(7, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Jungkook_at_the_White_House_in_May_2022.jpg/800px-Jungkook_at_the_White_House_in_May_2022.jpg', 'Jungkook - Golden Maknae Portrait'),
(7, 2, 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Jeon_Jung-kook_in_2021.jpg/800px-Jeon_Jung-kook_in_2021.jpg', 'Jungkook - Main Vocalist Legendary'),

-- BLACKPINK Cards - International girl group with premium rarity
-- Lisa (artist_id = 8)
(8, 1, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Lisa_at_Bulgari_event_in_2022.jpg/800px-Lisa_at_Bulgari_event_in_2022.jpg', 'Lisa - Main Dancer Portrait'),
(8, 2, 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Lisa_performing_in_2019.jpg/800px-Lisa_performing_in_2019.jpg', 'Lisa - Performance Legendary'),

-- Jennie (artist_id = 9)
(9, 1, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Jennie_at_Chanel_event_2022.jpg/800px-Jennie_at_Chanel_event_2022.jpg', 'Jennie - Fashion Icon Portrait'),
(9, 2, 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Jennie_Kim_in_2020.jpg/800px-Jennie_Kim_in_2020.jpg', 'Jennie - Solo Artist Legendary'),

-- Rosé (artist_id = 10)
(10, 1, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rose_at_Saint_Laurent_2022.jpg/800px-Rose_at_Saint_Laurent_2022.jpg', 'Rosé - Main Vocalist Portrait'),
(10, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Rose_performing_guitar_2019.jpg/800px-Rose_performing_guitar_2019.jpg', 'Rosé - Guitar Performance'),

-- Jisoo (artist_id = 11)  
(11, 1, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Jisoo_at_Dior_event_2022.jpg/800px-Jisoo_at_Dior_event_2022.jpg', 'Jisoo - Visual Portrait'),
(11, 2, 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Kim_Ji-soo_Snowdrop_2021.jpg/800px-Kim_Ji-soo_Snowdrop_2021.jpg', 'Jisoo - Actress Legendary'),

-- TWICE Cards - Multinational group with balanced rarity distribution  
-- Nayeon (artist_id = 12)
(12, 1, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Nayeon_at_TWICE_showcase_2021.jpg/800px-Nayeon_at_TWICE_showcase_2021.jpg', 'Nayeon - Lead Vocalist Portrait'),
(12, 2, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Im_Na-yeon_solo_debut_2022.jpg/800px-Im_Na-yeon_solo_debut_2022.jpg', 'Nayeon - Solo Debut Special'),

-- Jeongyeon (artist_id = 13)
(13, 1, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jeongyeon_at_TWICE_event_2021.jpg/800px-Jeongyeon_at_TWICE_event_2021.jpg', 'Jeongyeon - Lead Vocalist Portrait'),
(13, 2, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Yoo_Jeong-yeon_short_hair_2020.jpg/800px-Yoo_Jeong-yeon_short_hair_2020.jpg', 'Jeongyeon - Signature Style'),

-- Momo (artist_id = 14)
(14, 1, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Momo_at_TWICE_showcase_2021.jpg/800px-Momo_at_TWICE_showcase_2021.jpg', 'Momo - Main Dancer Portrait'),
(14, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hirai_Momo_dance_performance_2019.jpg/800px-Hirai_Momo_dance_performance_2019.jpg', 'Momo - Dance Master Legendary'),

-- Sana (artist_id = 15)
(15, 1, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Sana_at_TWICE_event_2021.jpg/800px-Sana_at_TWICE_event_2021.jpg', 'Sana - Vocalist Portrait'),
(15, 2, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Minatozaki_Sana_aegyo_2020.jpg/800px-Minatozaki_Sana_aegyo_2020.jpg', 'Sana - Aegyo Queen Special'),

-- Jihyo (artist_id = 16)
(16, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Jihyo_leader_TWICE_2021.jpg/800px-Jihyo_leader_TWICE_2021.jpg', 'Jihyo - Leader Portrait'),
(16, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Park_Ji-hyo_main_vocalist_2020.jpg/800px-Park_Ji-hyo_main_vocalist_2020.jpg', 'Jihyo - Main Vocalist Legendary'),

-- Mina (artist_id = 17)
(17, 1, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Mina_at_TWICE_showcase_2021.jpg/800px-Mina_at_TWICE_showcase_2021.jpg', 'Mina - Main Dancer Portrait'),
(17, 2, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Myoi_Mina_ballet_background_2019.jpg/800px-Myoi_Mina_ballet_background_2019.jpg', 'Mina - Ballet Grace Special'),

-- Dahyun (artist_id = 18)
(18, 1, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Dahyun_at_TWICE_event_2021.jpg/800px-Dahyun_at_TWICE_event_2021.jpg', 'Dahyun - Lead Rapper Portrait'),
(18, 2, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Kim_Da-hyun_eagle_dance_2019.jpg/800px-Kim_Da-hyun_eagle_dance_2019.jpg', 'Dahyun - Eagle Dance Special'),

-- Chaeyoung (artist_id = 19)
(19, 1, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Chaeyoung_at_TWICE_showcase_2021.jpg/800px-Chaeyoung_at_TWICE_showcase_2021.jpg', 'Chaeyoung - Main Rapper Portrait'),
(19, 2, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Son_Chae-young_art_2020.jpg/800px-Son_Chae-young_art_2020.jpg', 'Chaeyoung - Artist Special'),

-- Tzuyu (artist_id = 20)
(20, 1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Tzuyu_at_TWICE_event_2021.jpg/800px-Tzuyu_at_TWICE_event_2021.jpg', 'Tzuyu - Visual Portrait'),
(20, 2, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Chou_Tzu-yu_archery_2020.jpg/800px-Chou_Tzu-yu_archery_2020.jpg', 'Tzuyu - Archery Master Legendary'),

-- Solo Artist Cards - Legendary independent performers with premium rarity
-- IU (artist_id = 21) - Nation's Little Sister
(21, 1, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/IU_at_LOEN_Tree_concert_2019.jpg/800px-IU_at_LOEN_Tree_concert_2019.jpg', 'IU - Singer-Songwriter Portrait'),
(21, 2, 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Lee_Ji-eun_Hotel_del_Luna_2019.jpg/800px-Lee_Ji-eun_Hotel_del_Luna_2019.jpg', 'IU - Actress Mythic'),

-- BoA (artist_id = 22) - K-pop Pioneer  
(22, 1, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/BoA_at_SMTOWN_concert_2020.jpg/800px-BoA_at_SMTOWN_concert_2020.jpg', 'BoA - K-pop Queen Portrait'),
(22, 2, 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Kwon_Bo-ah_Japanese_debut_2001.jpg/800px-Kwon_Bo-ah_Japanese_debut_2001.jpg', 'BoA - Pioneer Legend Mythic');

-- ============================================================================
-- SAMPLE USER COLLECTIONS - Demonstrate different collection stages
-- ============================================================================

-- User 1: 'Im Soobin 69' - Serious collector with diverse collection
INSERT INTO user_cards (user_id, card_id, acquired_at) VALUES
-- BTS cards (mix of versions and rarities)
(1, 1, NOW() - INTERVAL '10 days'),   -- RM Version 1
(1, 4, NOW() - INTERVAL '8 days'),    -- Jin Version 2 (Legendary)
(1, 7, NOW() - INTERVAL '5 days'),    -- Suga Version 2 
(1, 11, NOW() - INTERVAL '3 days'),   -- Jimin Version 2
(1, 14, NOW() - INTERVAL '1 day'),    -- Jungkook Version 2 (Mythic!)

-- BLACKPINK cards (premium collection) 
(1, 15, NOW() - INTERVAL '7 days'),   -- Lisa Version 1
(1, 17, NOW() - INTERVAL '4 days'),   -- Jennie Version 1
(1, 20, NOW() - INTERVAL '2 days'),   -- Rosé Version 2

-- Solo artist achievement
(1, 43, NOW() - INTERVAL '6 hours'),  -- IU Version 1 (Legendary);

-- User 2: 'jimins_seatcushion' - BTS ARMY with Jimin bias
(2, 9, NOW() - INTERVAL '12 days'),   -- Jimin Version 1 (bias!)  
(2, 10, NOW() - INTERVAL '11 days'),  -- Jimin Version 2 (complete set!)
(2, 1, NOW() - INTERVAL '9 days'),    -- RM Version 1 (leader respect)
(2, 13, NOW() - INTERVAL '6 days'),   -- V Version 1 (95-line friendship)
(2, 5, NOW() - INTERVAL '4 days'),    -- Suga Version 1 (rapper line)
(2, 23, NOW() - INTERVAL '2 days'),   -- Nayeon Version 1 (branch out)
(2, 41, NOW() - INTERVAL '1 day'),    -- IU Version 1 (Korean music legend)

-- User 3: 'Jar Jar Blinks' - BLACKPINK focused with girl group preference
(3, 15, NOW() - INTERVAL '15 days'),  -- Lisa Version 1 (bias!)
(3, 16, NOW() - INTERVAL '14 days'),  -- Lisa Version 2 (complete Lisa set!)
(3, 17, NOW() - INTERVAL '12 days'),  -- Jennie Version 1 
(3, 19, NOW() - INTERVAL '10 days'),  -- Rosé Version 1
(3, 22, NOW() - INTERVAL '8 days'),   -- Jisoo Version 2 (Legendary!)
(3, 23, NOW() - INTERVAL '5 days'),   -- Nayeon Version 1 (TWICE expansion)
(3, 31, NOW() - INTERVAL '3 days'),   -- Jihyo Version 1 (leader respect)
(3, 39, NOW() - INTERVAL '1 day'),    -- Tzuyu Version 1 (visual collection)
(3, 44, NOW() - INTERVAL '6 hours'),  -- BoA Version 2 (Mythic pull!);

-- User 4: 'Nineteen' - Casual player, recent starter with mixed luck
(4, 25, NOW() - INTERVAL '5 days'),   -- Jeongyeon Version 1 (first pull)
(4, 8, NOW() - INTERVAL '4 days'),    -- J-Hope Version 2 (lucky legendary!)
(4, 29, NOW() - INTERVAL '3 days'),   -- Sana Version 1 (TWICE bias emerging)
(4, 41, NOW() - INTERVAL '2 days'),   -- IU Version 1 (legendary pull!)
(4, 6, NOW() - INTERVAL '12 hours');  -- Suga Version 2 (recent BTS pull);

-- ============================================================================
-- USER PULL SYSTEM - Gacha mechanics and cooldown tracking
-- ============================================================================

INSERT INTO user_pulls (user_id, available_pulls, last_pull_at, max_stored_pulls) VALUES
(1, 3, NOW() - INTERVAL '6 hours', 5),    -- Active collector, 3 pulls ready
(2, 0, NOW() - INTERVAL '30 minutes', 5), -- Just used a pull (got IU card)
(3, 5, NOW() - INTERVAL '18 hours', 5),   -- Max pulls stored (inactive recently)  
(4, 1, NOW() - INTERVAL '11 hours', 5);   -- 1 pull available (almost ready for next)

-- ============================================================================
-- DATA VALIDATION - Verify seed data loaded correctly
-- ============================================================================

-- Summary statistics
SELECT 'Users created:' as info, COUNT(*) as count FROM users
UNION ALL
SELECT 'Artists created:', COUNT(*) FROM artists  
UNION ALL
SELECT 'Cards created:', COUNT(*) FROM cards
UNION ALL
SELECT 'User collections:', COUNT(*) FROM user_cards
UNION ALL
SELECT 'User pull records:', COUNT(*) FROM user_pulls;

-- Rarity distribution check
SELECT 
    rarity_level,
    COUNT(*) as card_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM cards), 1) as percentage
FROM cards 
GROUP BY rarity_level 
ORDER BY rarity_level;

-- Group representation
SELECT 
    COALESCE(group_name, 'Solo Artists') as group_type,
    COUNT(*) as member_count,
    COUNT(*) * 2 as total_cards
FROM artists 
GROUP BY group_name 
ORDER BY member_count DESC;
