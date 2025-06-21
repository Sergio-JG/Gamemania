-- ROLES
INSERT INTO role (role_id, name) VALUES ('00000000-0000-0000-0000-000000000001', 'Admin');
INSERT INTO role (role_id, name) VALUES ('00000000-0000-0000-0000-000000000002', 'User');

-- PLATFORMS
INSERT INTO platform (platform_id, name) VALUES ('00000000-0000-0000-0000-000000000010', 'PC');
INSERT INTO platform (platform_id, name) VALUES ('00000000-0000-0000-0000-000000000011', 'PlayStation');
INSERT INTO platform (platform_id, name) VALUES ('00000000-0000-0000-0000-000000000012', 'Xbox');
INSERT INTO platform (platform_id, name) VALUES ('00000000-0000-0000-0000-000000000013', 'Nintendo Switch');
INSERT INTO platform (platform_id, name) VALUES ('00000000-0000-0000-0000-000000000014', 'Móvil');

-- GENRES
INSERT INTO genre (genre_id, name) VALUES ('00000000-0000-0000-0000-000000000020', 'Acción');
INSERT INTO genre (genre_id, name) VALUES ('00000000-0000-0000-0000-000000000021', 'Aventura');
INSERT INTO genre (genre_id, name) VALUES ('00000000-0000-0000-0000-000000000022', 'Carrera');
INSERT INTO genre (genre_id, name) VALUES ('00000000-0000-0000-0000-000000000023', 'RPG');
INSERT INTO genre (genre_id, name) VALUES ('00000000-0000-0000-0000-000000000024', 'Simulación');

-- SOCIALS
INSERT INTO social (social_id, steam_url, twitch_url, youtube_url, discord_tag) VALUES ('00000000-0000-0000-0000-000000000030', 'steam/johndoe', 'twitch/johndoe', 'youtube/johndoe', 'JohnDoe#1234');
INSERT INTO social (social_id, steam_url, twitch_url, youtube_url, discord_tag) VALUES ('00000000-0000-0000-0000-000000000031', 'steam/alice', 'twitch/alice', 'youtube/alice', 'Alice#5678');
INSERT INTO social (social_id, steam_url, twitch_url, youtube_url, discord_tag) VALUES ('00000000-0000-0000-0000-000000000032', 'steam/bob', 'twitch/bob', 'youtube/bob', 'Bob#9876');
INSERT INTO social (social_id, steam_url, twitch_url, youtube_url, discord_tag) VALUES ('00000000-0000-0000-0000-000000000033', 'steam/charlie', 'twitch/charlie', 'youtube/charlie', 'Charlie#6789');
INSERT INTO social (social_id, steam_url, twitch_url, youtube_url, discord_tag) VALUES ('00000000-0000-0000-0000-000000000034', 'steam/david', 'twitch/david', 'youtube/david', 'David#5432');

-- ADDRESSES
INSERT INTO address (address_id, street_address, city, postal_code, country) VALUES ('00000000-0000-0000-0000-000000000040', 'Calle fake 1', 'Madrid', '28001', 'España');
INSERT INTO address (address_id, street_address, city, postal_code, country) VALUES ('00000000-0000-0000-0000-000000000041', 'Calle fake 2', 'Madrid', '28002', 'España');
INSERT INTO address (address_id, street_address, city, postal_code, country) VALUES ('00000000-0000-0000-0000-000000000042', 'Calle fake 3', 'Madrid', '28003', 'España');
INSERT INTO address (address_id, street_address, city, postal_code, country) VALUES ('00000000-0000-0000-0000-000000000043', 'Calle fake 4', 'Madrid', '28004', 'España');
INSERT INTO address (address_id, street_address, city, postal_code, country) VALUES ('00000000-0000-0000-0000-000000000044', 'Calle fake 5', 'Madrid', '28005', 'España');
INSERT INTO address (address_id, street_address, city, postal_code, country) VALUES ('00000000-0000-0000-0000-000000000045', 'Calle fake 6', 'Madrid', '28006', 'España');

-- GAMES
INSERT INTO game (game_id, title, price, description, image, release_date, number_of_sales, stock, total_score, discount, discounted_price) VALUES ('00000000-0000-0000-0000-000000000100', 'The Legend of Zelda: Breath of the Wild', 59.99, 'Explora Hyrule en mundo abierto.', 'TheLegendOfZeldaBreathOfTheWild.jpg', '2017-03-03', 15000000, 3000, 9.5, 0.10, 53.99);
INSERT INTO game (game_id, title, price, description, image, release_date, number_of_sales, stock, total_score, discount, discounted_price) VALUES ('00000000-0000-0000-0000-000000000101', 'The Witcher 3: Wild Hunt', 39.99, 'Sé Geralt en este épico RPG.', 'TheWitcher3WildHunt.jpg', '2015-05-19', 10000000, 3000, 9.8, 0.20, 31.99);
INSERT INTO game (game_id, title, price, description, image, release_date, number_of_sales, stock, total_score, discount, discounted_price) VALUES ('00000000-0000-0000-0000-000000000102', 'Red Dead Redemption 2', 49.99, 'Forajido en el salvaje oeste.', 'RedDeadRedemption2.jpg', '2018-10-26', 11000000, 3000, 9.7, 0.15, 42.49);
INSERT INTO game (game_id, title, price, description, image, release_date, number_of_sales, stock, total_score, discount, discounted_price) VALUES ('00000000-0000-0000-0000-000000000103', 'Grand Theft Auto V', 29.99, 'Experimenta el inframundo criminal en el estado ficticio de San Andreas.', 'GrandTheftAutoV.jpg', '2013-09-17', 140000000, 3000, 9.6, 0.05, 28.49);
INSERT INTO game (game_id, title, price, description, image, release_date, number_of_sales, stock, total_score, discount, discounted_price) VALUES ('00000000-0000-0000-0000-000000000104', 'The Elder Scrolls V: Skyrim', 19.99, 'Descubre los misterios de Skyrim en este RPG de mundo abierto.', 'TheElderScrollsVSkyrim.jpg', '2011-11-11', 30000000, 3000, 9.3, 0.25, 14.99);
INSERT INTO game (game_id, title, price, description, image, release_date, number_of_sales, stock, total_score, discount, discounted_price) VALUES ('00000000-0000-0000-0000-000000000105', 'Minecraft', 19.99, 'Construye, explora y sobrevive en un mundo abierto hecho de bloques.', 'Minecraft.jpg', '2011-11-18', 200000000, 3000, 9.0, 0.00, 19.99);
INSERT INTO game (game_id, title, price, description, image, release_date, number_of_sales, stock, total_score, discount, discounted_price) VALUES ('00000000-0000-0000-0000-000000000106', 'Fortnite', 0.00, 'Lucha contra otros jugadores en esta sensación de battle royale.', 'Fortnite.jpg', '2017-07-25', 350000000, 3000, 8.6, 0.00, 0.00);
INSERT INTO game (game_id, title, price, description, image, release_date, number_of_sales, stock, total_score, discount, discounted_price) VALUES ('00000000-0000-0000-0000-000000000107', 'Among Us', 4.99, 'Descubre quienes son los impostores en este juego multijugador de engano.', 'AmongUs.jpg', '2018-11-16', 30000000, 3000, 8.4, 0.30, 3.49);
INSERT INTO game (game_id, title, price, description, image, release_date, number_of_sales, stock, total_score, discount, discounted_price) VALUES ('00000000-0000-0000-0000-000000000108', 'Cyberpunk 2077', 39.99, 'Entra en un futuro distopico en este RPG lleno de accion.', 'Cyberpunk2077.jpg', '2020-12-10', 13000000, 3000, 7.2, 0.50, 19.99);
INSERT INTO game (game_id, title, price, description, image, release_date, number_of_sales, stock, total_score, discount, discounted_price) VALUES ('00000000-0000-0000-0000-000000000109', 'Call of Duty: Warzone', 0.00, 'Participa en batallas intensas en este battle royale gratuito para jugar.', 'CallOfDutyWarzone.jpg', '2020-03-10', 90000000, 3000, 8.0, 0.00, 0.00);

-- USERS
INSERT INTO users (user_id, email, first_name, last_name, password, phone, profile_pic, username, address_id, role_id, social_id) VALUES ('00000000-0000-0000-0000-000000000050', 'admin@admin.com', 'John', 'Doe', 'adminpass', 672345643, 'john_doe.jpg', 'john_doe', '00000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000030');
INSERT INTO users (user_id, email, first_name, last_name, password, phone, profile_pic, username, address_id, role_id, social_id) VALUES ('00000000-0000-0000-0000-000000000051', 'alice@email.com', 'Alice', 'Wonder', 'hashed_password', 679124543, 'alice.jpg', 'alice_wonder', '00000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000031');
INSERT INTO users (user_id, email, first_name, last_name, password, phone, profile_pic, username, address_id, role_id, social_id) VALUES ('00000000-0000-0000-0000-000000000052', 'bob@email.com', 'Bob', 'Aventurar', 'hashed_password', 680687233, 'bob.jpg', 'bob_Aventurar', '00000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000032');
INSERT INTO users (user_id, email, first_name, last_name, password, phone, profile_pic, username, address_id, role_id, social_id) VALUES ('00000000-0000-0000-0000-000000000053', 'charlie@email.com', 'Charlie', 'Gamer', 'hashed_password', 679237543, 'charlie.jpg', 'charlie_gamer', '00000000-0000-0000-0000-000000000043', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000033');
INSERT INTO users (user_id, email, first_name, last_name, password, phone, profile_pic, username, address_id, role_id, social_id) VALUES ('00000000-0000-0000-0000-000000000054', 'david@email.com', 'David', 'Player', 'hashed_password', 679687543, 'david.jpg', 'david_player', '00000000-0000-0000-0000-000000000044', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000034');
INSERT INTO users (user_id, email, first_name, last_name, password, phone, profile_pic, username, address_id, role_id, social_id) VALUES ('00000000-0000-0000-0000-000000000055', 'eliza@email.com', 'Eliza', 'Gamer', 'hashed_password', 739682243, 'eliza.jpg', 'eliza_gamer', '00000000-0000-0000-0000-000000000045', '00000000-0000-0000-0000-000000000002', null);

-- PROVIDERS
INSERT INTO provider (provider_id, name, address, phone, email) VALUES ('00000000-0000-0000-0000-000000000300', 'GameCo', '123 Game St', '123456789', 'contact@gameco.com');
INSERT INTO provider (provider_id, name, address, phone, email) VALUES ('00000000-0000-0000-0000-000000000301', 'Aventura Games', '456 Quest Ave', '987654321', 'info@aventura.com');

-- ACCOUNTS
INSERT INTO account (account_id, provider_id, account_holder_name, account_number, bank_name, bank_address, bank_routing_number, account_balance) VALUES ('00000000-0000-0000-0000-000000000310', '00000000-0000-0000-0000-000000000300', 'GameCo Holder', '12345678', 'Game Bank', 'Bank St 1', '00012345', 100000.00);
INSERT INTO account (account_id, provider_id, account_holder_name, account_number, bank_name, bank_address, bank_routing_number, account_balance) VALUES ('00000000-0000-0000-0000-000000000311', '00000000-0000-0000-0000-000000000301', 'Aventura Holder', '87654321', 'Aventura Bank', 'Bank St 2', '00054321', 80000.00);

-- GAME_PLATFORM
INSERT INTO game_platform (platform_id, game_id) VALUES ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000100');
INSERT INTO game_platform (platform_id, game_id) VALUES ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000101');
INSERT INTO game_platform (platform_id, game_id) VALUES ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000102');

-- GAME_GENRE
INSERT INTO game_genre (game_id, genre_id) VALUES ('00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000020');
INSERT INTO game_genre (game_id, genre_id) VALUES ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000023');
INSERT INTO game_genre (game_id, genre_id) VALUES ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000020');

-- REVIEWS
INSERT INTO review (review_id, user_id, game_id, score, comment) VALUES ('00000000-0000-0000-0000-000000000200', '00000000-0000-0000-0000-000000000050', '00000000-0000-0000-0000-000000000100', 4.5, 'Exciting Aventura!');
INSERT INTO review (review_id, user_id, game_id, score, comment) VALUES ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000051', '00000000-0000-0000-0000-000000000101', 4.2, 'Great RPG!');
INSERT INTO review (review_id, user_id, game_id, score, comment) VALUES ('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000052', '00000000-0000-0000-0000-000000000102', 4.8, 'Amazing world!');

-- PURCHASES
INSERT INTO purchase (purchase_id, provider_id, purchase_date, total_amount) VALUES ('00000000-0000-0000-0000-000000000320', '00000000-0000-0000-0000-000000000300', '2023-08-01', 59.99);
INSERT INTO purchase (purchase_id, provider_id, purchase_date, total_amount) VALUES ('00000000-0000-0000-0000-000000000321', '00000000-0000-0000-0000-000000000301', '2023-08-02', 39.99);

-- PURCHASE_DETAIL
INSERT INTO purchase_detail (purchase_detail_id, purchase_id, game_id, quantity, subtotal) VALUES ('00000000-0000-0000-0000-000000000330', '00000000-0000-0000-0000-000000000320', '00000000-0000-0000-0000-000000000100', 1, 59.99);
INSERT INTO purchase_detail (purchase_detail_id, purchase_id, game_id, quantity, subtotal) VALUES ('00000000-0000-0000-0000-000000000331', '00000000-0000-0000-0000-000000000321', '00000000-0000-0000-0000-000000000101', 1, 39.99);

-- SALES
INSERT INTO sale (sale_id, user_id, sale_date, total_amount) VALUES ('00000000-0000-0000-0000-000000000340', '00000000-0000-0000-0000-000000000050', '2023-08-03', 59.99);
INSERT INTO sale (sale_id, user_id, sale_date, total_amount) VALUES ('00000000-0000-0000-0000-000000000341', '00000000-0000-0000-0000-000000000051', '2023-08-04', 39.99);

-- SALE_DETAIL
INSERT INTO sale_detail (sale_detail_id, sale_id, game_id, quantity, subtotal) VALUES ('00000000-0000-0000-0000-000000000350', '00000000-0000-0000-0000-000000000340', '00000000-0000-0000-0000-000000000100', 1, 59.99);
INSERT INTO sale_detail (sale_detail_id, sale_id, game_id, quantity, subtotal) VALUES ('00000000-0000-0000-0000-000000000351', '00000000-0000-0000-0000-000000000341', '00000000-0000-0000-0000-000000000101', 1, 39.99);
