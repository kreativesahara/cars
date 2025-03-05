-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2025 at 12:34 PM
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

INSERT INTO `cars` (`id`, `make`, `model`, `yom`, `engine_capacity`, `fuel_type`, `transmission`, `drive_system`, `mileage`, `features`, `car_condition`, `view_location`, `price`, `seller_id`) VALUES
(154, 'Toyota', 'Corolla', 2016, '2000', 'Diesel', 'Automatic', '2WD', '1000000', 'new', 'New', 'Kiserian Ngong', '3000000', 147),
(155, 'Toyota', 'X5', 2016, '2000', 'Petrol', 'Manual', '4WD', '2000000', 'new', 'New', 'mombasa', '3000000', 130);

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
(88, 154, 'http://localhost:3100/uploads/1739463410626-649045866.jpg', '2025-02-13 16:16:50'),
(89, 154, 'http://localhost:3100/uploads/1739463410633-551431922.jpg', '2025-02-13 16:16:50'),
(90, 154, 'http://localhost:3100/uploads/1739463410639-379761015.jpg', '2025-02-13 16:16:50'),
(91, 154, 'http://localhost:3100/uploads/1739463410644-682178767.jpg', '2025-02-13 16:16:50'),
(92, 155, 'http://localhost:3100/uploads/1739469267418-840436270.jpg', '2025-02-13 17:54:27'),
(93, 155, 'http://localhost:3100/uploads/1739469267420-282186113.jpg', '2025-02-13 17:54:27'),
(94, 155, 'http://localhost:3100/uploads/1739469267422-967530418.jpg', '2025-02-13 17:54:27'),
(95, 155, 'http://localhost:3100/uploads/1739469267424-935824432.jpg', '2025-02-13 17:54:27');

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
  `accepts_trade_in` int(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`id`, `user_id`, `username`, `account_type`, `contact`, `place`, `has_financing`, `accepts_trade_in`) VALUES
(1, 130, 'kiogora Motors', 'Dealer', '254757088427', 'Karen', 0, 1),
(29, 147, 'Kikwetu Motors', 'Individual', '254706823591', 'Nairobi, Karen', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `roles` int(5) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `roles`, `password`, `refresh_token`) VALUES
(130, 'Kiogora', 'Mwongera', 'member3@mail.com', 3, '$2b$10$HY6PCu0JOwhfCCSy.pBymuCYYXI8.sM6nSVJ4BWAUBzXubiS0rQ0a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMwLCJmaXJzdG5hbWUiOiJLaW9nb3JhIiwibGFzdG5hbWUiOiJNd29uZ2VyYSIsImVtYWlsIjoibWVtYmVyM0BtYWlsLmNvbSIsInJvbGVzIjozLCJpYXQiOjE3NDA4Mjg2NTksImV4cCI6MTc0MDgzMjI1OX0.hNN-33QzE_6ThWGPYCD6mGWLNdFGcbgHWS3H6hUBZgo'),
(131, 'john', 'doe', 'johndoe@mail.com', 3, '$2b$10$s6632DHypnPsJx/r4DcBy.4a/bgCSfnL01gmhLmdxv1DPRAOgucAS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJsYXN0bmFtZSI6ImRvZSIsImVtYWlsIjoiam9obmRvZUBtYWlsLmNvbSIsInJvbGVzIjozLCJpYXQiOjE3MzkwMTg1NDQsImV4cCI6MTczOTA2MTc0NH0.kWjkmyu3ux5-jPm5oRxKhAhrmjyyi_3FiUdDXMggN90'),
(132, 'joe', 'Doe', 'joedoe@mail.com', 1, '$2b$10$9UsPgxuyyVvuipo2UyViUOROXa.N0YDxxrfy6qQrHiNQWzIRnwbYW', NULL),
(133, 'Kiogora', 'Mwongera', 'kiogoramwongera@gmail.com', 2, '$2b$10$KywaeM.YZrY0LdNsUV/1vetk7y.btDWsdaaoK98iAZrL8jDjKuz2C', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMzLCJsYXN0bmFtZSI6Ik13b25nZXJhIiwiZW1haWwiOiJraW9nb3JhbXdvbmdlcmFAZ21haWwuY29tIiwicm9sZXMiOjIsImlhdCI6MTczNjYxMDYzNSwiZXhwIjoxNzM2NjUzODM1fQ.f5asrqeTuzv9W_Sx7qG6ySS0wrugyGFBaCiXYFlsK0w'),
(136, 'Kiogora', 'Mwongera', 'mwongeraligo2@gmail.com', 2, '$2b$10$nvcG5Md9cy0n5.ootph12.B2GyM5uD/PSdXhPVky.Ag35nlESGbJG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM2LCJsYXN0bmFtZSI6Ik13b25nZXJhIiwiZW1haWwiOiJtd29uZ2VyYWxpZ28yQGdtYWlsLmNvbSIsInJvbGVzIjoyLCJpYXQiOjE3Mzc5ODc2MDEsImV4cCI6MTczODAzMDgwMX0.hL3EOvZPcwr7zLrsNaFPlUtDndJuI9ThkgK4cFVEFh8'),
(137, 'Dickson', 'Kiogora', 'mwongeraligo25@gmail.com', 1, '$2b$10$zfNY1W6PWQMv/wP0QRO7V.bmEE8tR9MzdwJeP8g./HVUxOBtmOOYy', NULL),
(138, 'Kiogora', 'Mwongera', 'mwongeraligo3@gmail.com', 1, '$2b$10$3D9GUnMU3GsPvwdTHoTLkOJ4dxixDp1bcCz38kBzTXHPeSOnx24a6', NULL),
(144, 'Kiogora', 'Mwongera', 'mwongeraligo5@gmail.com', 1, '$2b$10$Zx.bjiiHMMejC5xHn5Pl3u45H6S7852f.OGQzEYQT/SqRM4.Gfx3O', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ0LCJsYXN0bmFtZSI6Ik13b25nZXJhIiwiZW1haWwiOiJtd29uZ2VyYWxpZ281QGdtYWlsLmNvbSIsInJvbGVzIjoxLCJpYXQiOjE3MzgwNjM4ODUsImV4cCI6MTczODEwNzA4NX0.RpWOy_ORbH48JXefF3Wf8wlREs1EZrTmCsFFqHO24ZQ'),
(147, 'Kiogora', 'Mwongera', 'member@mail.com', 1, '$2b$10$.KA.ujHB3A.ap0/TiaYgL.SGjrKLkrEmBDR2tqyT/B0l7rcvNB./u', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJmaXJzdG5hbWUiOiJLaW9nb3JhIiwibGFzdG5hbWUiOiJNd29uZ2VyYSIsImVtYWlsIjoibWVtYmVyQG1haWwuY29tIiwicm9sZXMiOjEsImlhdCI6MTc0MTAxMTE0NSwiZXhwIjoxNzQxMDE0NzQ1fQ.03jB6h7OCr6ZT6ntcsyxS1ZcKv9V_MfJneG9uAwqhLA'),
(148, 'Kiogora', 'Mwongera', 'member2@mail.com', 2, '$2b$10$eITHjO3oHS/wr24lFMKs/uzWMEwLqZbzHOmZOor7PpebGkcYWloI2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ4LCJmaXJzdG5hbWUiOiJLaW9nb3JhIiwibGFzdG5hbWUiOiJNd29uZ2VyYSIsImVtYWlsIjoibWVtYmVyMkBtYWlsLmNvbSIsInJvbGVzIjoyLCJpYXQiOjE3NDExNzQyOTQsImV4cCI6MTc0MTE3Nzg5NH0.YZIR-OlU8p4SX1HC7mKfVsV3b3rG7Ed5y0aQsUu5Mhw'),
(154, 'Kiogora', 'Mwongera', 'member4@mail.com', 4, '$2b$10$Ow6XhHceEFKAQueeNmr6HOeMU.rqwJo8roTzN2lI9YmW.W50lcrKG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU0LCJmaXJzdG5hbWUiOiJLaW9nb3JhIiwibGFzdG5hbWUiOiJNd29uZ2VyYSIsImVtYWlsIjoibWVtYmVyNEBtYWlsLmNvbSIsInJvbGVzIjo0LCJpYXQiOjE3NDA4MjkxMjIsImV4cCI6MTc0MDgzMjcyMn0.AMtssZGsLDQA5kmu5Q3w6uttBWnOVCZyo-WlkH9QSlA'),
(159, 'DICKSON', 'MWONGERA', 'member23@mail.com', 1, '$2b$10$.FMY/NFqe1.SIcYNtLjULeI2CHb0OQ8N0V7KOvvwIrrbF4pa8xEgq', NULL),
(164, 'Kiogora', 'Mwongera', 'member2003@mail.com', 1, '$2b$10$Uqy1VXu4ulKdUU16x2srlOKvoiLVPnAfU2shZofnA9BRIBXCYbYdi', NULL),
(170, 'Kiogora', 'Mwongera', 'member254@mail.com', 1, '$2b$10$IfEduI.2MxPr2gNf.eqZ7.SL05JMPJGk9UwyRNVqKMNg3PVyYucmC', NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT for table `car_images`
--
ALTER TABLE `car_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

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
