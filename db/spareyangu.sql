-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2024 at 05:41 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

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
  `mileage` int(11) NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `car_condition` varchar(50) NOT NULL,
  `view_location` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `seller_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `make`, `model`, `yom`, `engine_capacity`, `fuel_type`, `transmission`, `drive_system`, `mileage`, `features`, `car_condition`, `view_location`, `price`, `seller_id`) VALUES
(49, 'mclaren222', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Sunroof, Leather seats', 'Extremely Clean', 'westlands', 1300000.00, 53),
(52, 'mclaren222', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Sunroof, Leather seats', 'Extremely Clean', 'westlands', 1300000.00, 53),
(53, 'mclaren222', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Sunroof, Leather seats', 'Extremely Clean', 'westlands', 1300000.00, 53),
(54, 'mclaren222', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Sunroof, Leather seats', 'Extremely Clean', 'westlands', 1300000.00, 53),
(55, 'mclaren222', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Sunroof, Leather seats', 'Extremely Clean', 'westlands', 1300000.00, 53),
(56, 'mclaren222', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Sunroof, Leather seats', 'Extremely Clean', 'westlands', 1300000.00, 53),
(57, 'mclaren222', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Sunroof, Leather seats', 'Extremely Clean', 'westlands', 1300000.00, 53),
(58, 'mclaren222', '', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Sunroof, Leather seats', 'Extremely Clean', 'westlands', 1300000.00, 53),
(59, 'mclaren222', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Sunroof, Leather seats', 'Extremely Clean', 'westlands', 1300000.00, 53),
(60, 'mclaren222', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Sunroof, Leather seats', 'Extremely Clean', 'westlands', 1300000.00, 53),
(70, 'Toyota ', 'premio', 2016, '38787', 'petrol', 'auto', '2wd', 7576789, 'new', 'new', 'Nairobi, KEN', 2500.00, 53),
(71, 'mclaren222', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Sunroof, Leather seats', 'Extremely Clean', 'westlands', 1300000.00, 53),
(72, 'Toyota ', 'premio', 2016, '2000', 'petrol', 'auto', '2WD', 80000, 'new', 'new', 'Kiserian Ngong', 2500000.00, 53),
(73, 'Toyota ', 'premio', 2011, '2000', 'petrol', 'auto', '2WD', 80000, 'new', 'new', 'Kiserian Ngong', 870000.00, 53),
(74, 'Toyota ', 'premio', 2016, '2000', 'Diesel', 'auto', '2wd', 80000, 'new', 'new', 'Kiserian Ngong', 870000.00, 53),
(75, 'Toyota ', 'premio', 2016, '2000', 'petrol', 'auto', '2WD', 80000, 'new', 'new', 'Nairobi, KEN', 2500.00, 53),
(76, 'mclaren222', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Sunroof, Leather seats', 'Extremely Clean', 'westlands', 1300000.00, 53),
(77, 'Toyota ', 'Mark X', 2016, '2000', 'Diesel', 'auto', '2wd', 8000, 'NEW', 'new', 'Kiserian Ngong', 2500.00, 53),
(78, 'Toyota ', 'premio', 2016, '198', 'petrol', 'auto', '2wd', 80000, 'new\n', 'new', 'Nairobi, KEN', 2500.00, 53),
(79, 'Toyota ', 'Mark X', 2016, '2000', 'petrol', 'Manual', '2wd', 80000, 'new', 'new', 'Nairobi, KEN', 2500000.00, 53),
(80, 'Toyota ', 'premio', 2016, '2000', 'petrol', 'Manual', '2wd', 80000, 'new', 'new', 'Kiserian Ngong', 2500.00, 53),
(81, 'Toyota ', 'premio', 2016, '2000', 'petrol', 'auto', '2WD', 80000, 'new', 'new', 'Nairobi, KEN', 2500.00, 53),
(82, 'Toyota ', 'premio', 2016, '2000', 'Diesel', 'auto', '2WD', 80000, 'new', 'new used', 'Kiserian Ngong', 760000.00, 53),
(83, 'Toyota ', 'premio', 2016, '2000', 'petrol', 'Manual', '2WD', 80000, 'new', 'new used', 'Kiserian Ngong', 2500000.00, 53),
(84, 'Toyota ', 'premio', 2016, '2000', 'petrol', 'Manual', '2WD', 80000, 'new', 'new used', 'Kiserian Ngong', 2500.00, 53),
(85, 'Toyota ', 'corolla', 2008, '2500', 'petrol', 'auto', '2wd', 79998, 'new\n', 'new used', 'Nairobi, KEN', 2499.00, 53),
(86, 'Toyota ', 'corolla', 2011, '2000', 'petrol', 'Manual', '2WD', 80000, 'new', 'new used', 'Kiserian Ngong', 2500.00, 53),
(87, 'subaru', 'WRX', 2016, '2000', 'petrol', 'Manual', '2WD', 80000, 'new', 'new', 'Kiserian Ngong', 870000.00, 53);

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
(42, 55, 'http://localhost:3100/uploads/1729271766508-690813081.png', '2024-10-18 17:16:06'),
(43, 55, 'http://localhost:3100/uploads/1729271777125-414619873.png', '2024-10-18 17:16:17'),
(44, 55, 'http://localhost:3100/uploads/1729285278763-810429008.jpg', '2024-10-18 21:01:18'),
(45, 55, 'http://localhost:3100/uploads/1729316992491-914129890.png', '2024-10-19 05:49:52'),
(46, 55, 'http://localhost:3100/uploads/1729317331567-719458691.png', '2024-10-19 05:55:31'),
(47, 55, 'http://localhost:3100/uploads/1729317524454-51986143.png', '2024-10-19 05:58:44'),
(48, 55, 'http://localhost:3100/uploads/1729318038390-757467564.jpg', '2024-10-19 06:07:18'),
(49, 55, 'http://localhost:3100/uploads/1729318775476-392756695.png', '2024-10-19 06:19:35'),
(50, 55, 'http://localhost:3100/uploads/1729322485402-206313678.jpg', '2024-10-19 07:21:25'),
(51, 55, 'http://localhost:3100/uploads/1729323498094-339855954.png', '2024-10-19 07:38:18'),
(52, 55, 'http://localhost:3100/uploads/1729446807983-594584795.png', '2024-10-20 17:53:28'),
(53, 55, 'http://localhost:3100/uploads/1729446913446-150928563.jpg', '2024-10-20 17:55:13'),
(54, 55, 'http://localhost:3100/uploads/1729447086917-617412940.png', '2024-10-20 17:58:06'),
(55, 55, 'http://localhost:3100/uploads/1729447107102-161303111.png', '2024-10-20 17:58:27'),
(56, 55, 'http://localhost:3100/uploads/1729447126021-763622100.jpg', '2024-10-20 17:58:46'),
(57, 55, 'http://localhost:3100/uploads/1729468830320-412795170.jpg', '2024-10-21 00:00:30');

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `user_id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `account_type` varchar(50) NOT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `place` varchar(100) DEFAULT NULL,
  `has_financing` tinyint(1) DEFAULT 0,
  `accepts_trade_in` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`user_id`, `username`, `account_type`, `contact`, `place`, `has_financing`, `accepts_trade_in`) VALUES
(53, 'murithi James', 'dealer', '254 723 963959', 'westlands', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `testimage`
--

CREATE TABLE `testimage` (
  `id` int(11) NOT NULL,
  `model` varchar(200) NOT NULL,
  `make` varchar(200) NOT NULL,
  `image_url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimage`
--

INSERT INTO `testimage` (`id`, `model`, `make`, `image_url`) VALUES
(12, 'WRX', 'subaru', '0'),
(13, 'premio', 'Toyota ', '0'),
(14, 'Gallado', 'Toyota ', 'uploads\\1729519168538-377174021.png'),
(15, 'Gallado', 'Toyota ', 'uploads\\1729519168539-555067025.jpg'),
(16, 'Gallado', 'Toyota ', 'uploads\\1729519168539-759414098.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` int(5) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `role`, `password`) VALUES
(53, 'Kiogora', 'Mwongera', 'mwongeraligo@gmail.com', 0, '$2b$10$jdNrnMqsN7iZme7pkGuo6OdzIisSnL7xOXjAuLuajo2rdWD9OKtgy'),
(55, 'Kiogora', 'Mwongera', 'mwongeraligoo@gmail.com', 0, '$2b$10$jdNrnMqsN7iZme7pkGuo6OdzIisSnL7xOXjAuLuajo2rdWD9OKtgy'),
(56, 'leo', 'kiu', 'leo.kiu@gmail.com', 0, '1234'),
(57, 'leo', 'kiu', 'leo.kio@gmail.com', 0, '1234'),
(61, 'Kiogora', 'Mwongera', 'mwongeraligot@gmail.com', 0, '$2b$10$Ob6kBqB9RwoMzwmsm14Mke0DcNkLVFj0Ejyl8bHtapUa47kS2NN7y'),
(62, 'Kiogora', 'Mwongera', 'mwongeraligoe@gmail.com', 0, '$2b$10$oMkG/vBbeVYiYwPfdZ8aJezf1JS4R3NRxAjo.3ONWyO1qgKR.9zj.'),
(63, 'Kiogora', 'Mwongera', 'mwongeraligw@gmail.com', 0, '$2b$10$YNUWvPLGZ83G4cgKoo.25udbvhMpWHoFbh2uqeta/H5aFT49pQLUK'),
(64, 'Kiogora', 'Mwongera', 'mwongeralige@gmail.com', 0, '$2b$10$C4DyBV8HywStvstjB9/ZK.chuUNGZEqyCODiijFRPCGWI9wwYPU/q'),
(65, 'leo', 'kiu', 'leo.kiogora@gmail.com', 0, '1234'),
(66, 'Kiogora', 'Mwongera', 'mwongeraligou@gmail.com', 0, '$2b$10$E76hhKqI.FPEdakDhujLue7so5aCbX4pkufETyNPx6VxO2qWYgxge'),
(69, 'Kiogora', 'Mwongera', 'mwongeraligro@gmail.com', 0, '$2b$10$BCL9tHbMZ6D/FYs4eo81Oe3vvP8Y2LFEM8aOVeDFHl4wZx2n4VB86'),
(71, 'leo', 'kiu', 'leo.kiogoraa@gmail.com', 0, '1234'),
(73, 'leo', 'kiu', 'leo.kiogor@gmail.com', 0, '1234');

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
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `testimage`
--
ALTER TABLE `testimage`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `car_images`
--
ALTER TABLE `car_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `testimage`
--
ALTER TABLE `testimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

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
