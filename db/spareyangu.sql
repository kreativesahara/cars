-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2025 at 12:20 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spareyangu`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `make` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `yom` int(11) NOT NULL,
  `engine_capacity` varchar(20) NOT NULL,
  `fuel_type` varchar(50) NOT NULL,
  `transmission` varchar(50) NOT NULL,
  `drive_system` varchar(64) NOT NULL,
  `mileage` text NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `car_condition` varchar(50) NOT NULL,
  `view_location` varchar(255) NOT NULL,
  `price` text NOT NULL,
  `seller_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `make`, `model`, `slug`, `yom`, `engine_capacity`, `fuel_type`, `transmission`, `drive_system`, `mileage`, `features`, `car_condition`, `view_location`, `price`, `seller_id`) VALUES
(173, 'Subaru', 'Forte Koup', 'subaru-forte-koup-2015-84zott', 2015, '2000', 'Petrol', 'Automatic', '2WD', '200000', 'new', 'New', 'mombasa', '1500000', 177),
(174, 'Toyota', 'Premio', 'toyota-premio-2016-1sxfq8', 2016, '20000', 'Petrol', 'Automatic', '2WD', '200000', 'new', 'Used', 'Nyandarua', '3000000', 177);

-- --------------------------------------------------------

--
-- Table structure for table `car_images`
--

CREATE TABLE `car_images` (
  `id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `image_url` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car_images`
--

INSERT INTO `car_images` (`id`, `car_id`, `image_url`, `created_at`) VALUES
(194, 173, 'http://localhost:3100/uploads/cars/173/1742923275959-459308952.jpg', '2025-03-25 17:21:16'),
(195, 173, 'http://localhost:3100/uploads/cars/173/1742923275972-817707331.jpg', '2025-03-25 17:21:16'),
(196, 173, 'http://localhost:3100/uploads/cars/173/1742923275977-521031872.jpg', '2025-03-25 17:21:16'),
(197, 173, 'http://localhost:3100/uploads/cars/173/1742923275982-721099248.jpg', '2025-03-25 17:21:16'),
(198, 173, 'http://localhost:3100/uploads/cars/173/1742923275996-888295635.jpg', '2025-03-25 17:21:16'),
(199, 174, 'http://localhost:3100/uploads/cars/174/1743003058710-624394168.jpg', '2025-03-26 15:30:58'),
(200, 174, 'http://localhost:3100/uploads/cars/174/1743003058712-349252203.jpg', '2025-03-26 15:30:58'),
(201, 174, 'http://localhost:3100/uploads/cars/174/1743003058715-143126116.jpg', '2025-03-26 15:30:58'),
(202, 174, 'http://localhost:3100/uploads/cars/174/1743003058723-546109791.jpg', '2025-03-26 15:30:58'),
(203, 174, 'http://localhost:3100/uploads/cars/174/1743003058727-615432525.jpg', '2025-03-26 15:30:58');

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` text NOT NULL,
  `account_type` varchar(50) NOT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `place` varchar(100) DEFAULT NULL,
  `has_financing` int(1) DEFAULT 1,
  `accepts_trade_in` int(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`id`, `user_id`, `username`, `account_type`, `contact`, `place`, `has_financing`, `accepts_trade_in`, `created_at`, `image_url`) VALUES
(31, 177, 'Kiogora Mwongera', 'Dealer', '2540706823590', 'Nairobi, Karen', 0, 0, '2025-03-25 11:38:08', 'http://localhost:3100/seller_profile/1742900354117-240530148.jpg'),
(37, 148, 'admin', 'Dealer', '254793620105', 'Nairobi, Karen', 0, 0, '2025-03-25 10:59:14', 'http://localhost:3100/seller_profile/1742900354117-240530148.jpg'),
(40, 183, 'kreativesahara', 'Dealer', '254716988225', 'Ngong', 0, 0, '2025-03-29 14:40:27', 'http://localhost:3100/seller_profile/1743259227823-929234720.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_id` int(15) NOT NULL,
  `roles` int(5) NOT NULL,
  `password` varchar(255) NOT NULL,
  `subscription_id` int(15) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `reset_token` varchar(500) DEFAULT NULL,
  `reset_token_expiry` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone_id`, `roles`, `password`, `subscription_id`, `refresh_token`, `reset_token`, `reset_token_expiry`, `created_at`, `expires_at`) VALUES
(130, 'Kiogora', 'Mwongera', 'member3@mail.com', 0, 3, '$2b$10$HY6PCu0JOwhfCCSy.pBymuCYYXI8.sM6nSVJ4BWAUBzXubiS0rQ0a', 0, NULL, '', '2025-03-19 13:32:16', '2025-03-06 15:06:55', '2025-03-06 15:06:55'),
(147, 'Kiogora', 'Mwongera', 'member@mail.com', 0, 1, '$2b$10$bU0MJ64Qe9SjZJnhCf9T7e7EX6BxjKud867kqv4wA7l.1k0GGsHGq', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJmaXJzdG5hbWUiOiJLaW9nb3JhIiwibGFzdG5hbWUiOiJNd29uZ2VyYSIsImVtYWlsIjoibWVtYmVyQG1haWwuY29tIiwicm9sZXMiOjEsImlhdCI6MTc0MjM5MTIyNCwiZXhwIjoxNzQyMzk0ODI0fQ.sqI6UphJHCIIQGIuohk2TJOnurd5mKX7w70Ir7aDNjw', NULL, '2025-03-19 13:33:44', '2025-03-06 15:06:55', '2025-03-06 15:06:55'),
(148, 'Kiogora', 'Mwongera', 'member2@mail.com', 0, 3, '$2b$10$eITHjO3oHS/wr24lFMKs/uzWMEwLqZbzHOmZOor7PpebGkcYWloI2', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ4LCJmaXJzdG5hbWUiOiJLaW9nb3JhIiwibGFzdG5hbWUiOiJNd29uZ2VyYSIsImVtYWlsIjoibWVtYmVyMkBtYWlsLmNvbSIsInJvbGVzIjozLCJpYXQiOjE3NDI5MDAzMjEsImV4cCI6MTc0MjkwMzkyMX0.elZ73IFKtQK2CjlaUkudsuQMeUSKZ3HsGQoCHc_qfBc', NULL, '2025-03-25 10:58:41', '2025-03-06 15:06:55', '2025-03-06 15:06:55'),
(154, 'Kiogora', 'Mwongera', 'member4@mail.com', 0, 4, '$2b$10$Ow6XhHceEFKAQueeNmr6HOeMU.rqwJo8roTzN2lI9YmW.W50lcrKG', 0, NULL, '', '2025-03-19 13:16:39', '2025-03-06 15:06:55', '2025-03-06 15:06:55'),
(177, 'Dickson', 'leo', 'mwongeralig@gmail.com', 0, 3, '$2b$10$zac9DEi1qTH9vRPiQJlNteZ47foeYN9TI8laJygfsGivjsImv3HqG', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc3LCJmaXJzdG5hbWUiOiJEaWNrc29uIiwibGFzdG5hbWUiOiJsZW8iLCJlbWFpbCI6Im13b25nZXJhbGlnQGdtYWlsLmNvbSIsInJvbGVzIjozLCJpYXQiOjE3NDMyNTc5ODMsImV4cCI6MTc0MzI1ODg4M30.-ekJ-Lb9wrrmkY8l1yrO3aEPSCLNDHj4SXrJ9yn3C_k', NULL, '2025-03-29 14:19:43', '2025-03-21 12:37:16', '2025-03-21 12:37:16'),
(178, 'DICKSON', 'MWONGERA', 'mwongeraligo@gmail.com', 0, 1, '$2b$10$fWQ2DhSwYKe1jboGuCHl3eKq5y1j4lfZPNfvf89ek/QCwn9FHhLz2', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc4LCJmaXJzdG5hbWUiOiJESUNLU09OIiwibGFzdG5hbWUiOiJNV09OR0VSQSIsImVtYWlsIjoibXdvbmdlcmFsaWdvQGdtYWlsLmNvbSIsInJvbGVzIjoxLCJpYXQiOjE3NDI4MzY1MDMsImV4cCI6MTc0Mjg0MDEwM30.HYKt2DDOdoXS0ua1qMOzD5qM8ZL1n-arm3r1Y-sKQZ', NULL, '2025-03-24 17:15:03', '2025-03-21 13:20:26', '2025-03-21 13:20:26'),
(179, 'Susan', 'Kamene', 'suzzy@gmail.com', 0, 1, '$2b$10$msyL0vyTMlrNAqBxqhSV4.tr/LiRz9DdC0So1l3.Qe.cf0xoVecVu', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc5LCJmaXJzdG5hbWUiOiJTdXNhbiIsImxhc3RuYW1lIjoiS2FtZW5lIiwiZW1haWwiOiJzdXp6eUBnbWFpbC5jb20iLCJyb2xlcyI6MSwiaWF0IjoxNzQyOTE0ODA4LCJleHAiOjE3NDI5MTg0MDh9.PhYpBZtyUSJG2-TqzaakmO3lt0IdOGfZ7RWl0nRh-S8', NULL, '2025-03-25 15:00:08', '2025-03-25 11:18:51', '2025-03-25 11:18:51'),
(180, 'Kiogora', 'Mwongera', 'kiogoramwongera@gmail.com', 0, 1, '$2b$10$h3oV6.uDk4i8v2PAgontguv5ET3abdGlLOPrbfwCdKGBbMd2l9rlO', NULL, NULL, NULL, '2025-03-26 10:02:15', '2025-03-26 10:02:15', '2025-03-26 10:02:15'),
(181, 'Kiogora', 'Murithi', 'murithiligo@gmail.com', 0, 3, '$2b$10$zeDwk2iQgldlRhM9p6.O.uu2zbdHRNeVTuKqkPtnA/mDbWE0cvoAW', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgxLCJmaXJzdG5hbWUiOiJLaW9nb3JhIiwibGFzdG5hbWUiOiJNdXJpdGhpIiwiZW1haWwiOiJtdXJpdGhpbGlnb0BnbWFpbC5jb20iLCJyb2xlcyI6MywiaWF0IjoxNzQzMjg5NjQ3LCJleHAiOjE3NDMyOTA1NDd9.5J6b2fvX13edU6tAVgf8dM6vOgbxkuMDt4sDdCb-Xdg', NULL, '2025-03-29 23:07:27', '2025-03-26 18:44:12', '2025-03-26 18:44:12'),
(183, 'g', 'ng', 'grishon@gmail.com', 0, 3, '$2b$10$3TD.B4Mk1wue.yUaQ9e16uoZx856lhkGr4QPZm6p7bbLVRZFMNmbO', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgzLCJmaXJzdG5hbWUiOiJnIiwibGFzdG5hbWUiOiJuZyIsImVtYWlsIjoiZ3Jpc2hvbkBnbWFpbC5jb20iLCJyb2xlcyI6MywiaWF0IjoxNzQzMjU5NDA0LCJleHAiOjE3NDMyNjAzMDR9.rgouiyopzpaeQz-izD2fwdSbGpws2cba3buUStiHRU0', NULL, '2025-03-29 14:43:24', '2025-03-29 11:41:54', '2025-03-29 11:41:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `car_images`
--
ALTER TABLE `car_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `contact` (`contact`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- AUTO_INCREMENT for table `car_images`
--
ALTER TABLE `car_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `car_images`
--
ALTER TABLE `car_images`
  ADD CONSTRAINT `car_images_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sellers`
--
ALTER TABLE `sellers`
  ADD CONSTRAINT `sellers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
