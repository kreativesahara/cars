-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2025 at 07:57 AM
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
(121, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '2WD', '100000', 'new car', 'New', 'Nairobi, KEN', '2000000', 130),
(122, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '2WD', '100000', 'new car', 'New', 'Nairobi, KEN', '2000000', 130),
(123, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '2WD', '100000', 'new car', 'New', 'Nairobi, KEN', '2000000', 130),
(124, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '2WD', '100000', 'new car', 'New', 'Nairobi, KEN', '2000000', 130),
(125, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '2WD', '100000', 'new car', 'New', 'Nairobi, KEN', '2000000', 130),
(126, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '2WD', '100000', 'new car', 'New', 'Nairobi, KEN', '2000000', 130),
(127, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '2WD', '100000', 'new car', 'New', 'Nairobi, KEN', '2000000', 130),
(128, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '4WD', '100000', 'new', 'New', 'mombasa', '100000', 130),
(129, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '4WD', '100000', 'new', 'New', 'mombasa', '100000', 130),
(130, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '4WD', '100000', 'new', 'New', 'mombasa', '100000', 130),
(131, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '4WD', '100000', 'new', 'New', 'mombasa', '100000', 130),
(132, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '4WD', '100000', 'new', 'New', 'mombasa', '100000', 130),
(133, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '4WD', '100000', 'new', 'New', 'mombasa', '100000', 130),
(134, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '4WD', '100000', 'new', 'New', 'mombasa', '100000', 130),
(135, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Manual', '4WD', '100000', 'new', 'New', 'Kiserian Ngong', '2000000', 130),
(136, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '2WD', '100000', 'new', 'New', 'Nairobi, KEN', '2000000', 130),
(137, 'Toyota', 'Corolla', 2016, '2000', 'Petrol', 'Automatic', '2WD', '100000', 'new', 'New', 'Nairobi, KEN', '2000000', 130),
(138, 'Toyota', 'Corolla', 2016, '1999', 'Petrol', 'Automatic', '4WD', '100000', 'old', 'New', 'Kiserian Ngong', '2000000', 130);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
