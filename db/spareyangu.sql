-- phpMyAdmin SQL Dump
-- Version: 5.2.1
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2024 at 05:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

--
-- Database: `spareyangu`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `user_id` INT(11) NOT NULL,
  `username` VARCHAR(150) NOT NULL UNIQUE,
  `account_type` VARCHAR(50) NOT NULL,
  `contact` VARCHAR(50),
  `place` VARCHAR(100),
  `has_financing` BOOLEAN DEFAULT FALSE,
  `accepts_trade_in` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `make` VARCHAR(255) NOT NULL,
  `model` VARCHAR(255) NOT NULL,
  `yom` INT(11) NOT NULL,
  `engine_capacity` VARCHAR(20) NOT NULL,
  `fuel_type` VARCHAR(50) NOT NULL,
  `transmission` VARCHAR(50) NOT NULL,
  `drive_system` VARCHAR(64) NOT NULL,
  `mileage` INT(11) NOT NULL,
  `features` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `car_condition` VARCHAR(50) NOT NULL,
  `view_location` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `seller_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`seller_id`) REFERENCES `sellers`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `car_images`
--

CREATE TABLE `car_images` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `car_id` INT(11) NOT NULL,
  `image_url` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', 'hashed_password');

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`user_id`, `username`, `account_type`, `contact`, `place`, `has_financing`, `accepts_trade_in`) VALUES
(1, '1_John_Doe', 'individual', '123-456-7890', 'Nairobi', TRUE, TRUE);

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `make`, `model`, `yom`, `engine_capacity`, `fuel_type`, `transmission`, `drive_system`, `mileage`, `features`, `car_condition`, `view_location`, `price`, `seller_id`) VALUES
(10, 'BMW', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Steering Wheel Controls, Leather Seats, Front Heated Seats, Wooden Accents, Alloy Wheels, Xenon Headlights / Day Time Running Lights, Original Paint and Accident Free', 'Extremely Clean', 'westlands', 1300000.00, 1),
(13, 'BMW', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, '', 'Extremely Clean', 'westlands', 1300000.00, 1),
(15, 'BMW', '320i', 2009, '2000', 'petrol', 'auto', '3WD', 74000, 'Steering Wheel Controls, Leather Seats, Front Heated Seats, Wooden Accents, Alloy Wheels, Xenon Headlights / Day Time Running Lights, Original Paint and Accident Free', 'Extremely Clean', 'westlands', 1300000.00, 1),
(16, 'Toyota', 'Premio', 2016, '1999', 'petrol', 'auto', '2WD', 80000, 'new', 'new', 'Nairobi, KEN', 2500000.00, 1);

--
-- Dumping data for table `car_images`
--

INSERT INTO `car_images` (`id`, `car_id`, `image_url`, `created_at`) VALUES
(35, 10, 'http://localhost:3100/uploads/1728046161015-697430641.jpg', '2024-10-04 12:49:21'),
(36, 10, 'http://localhost:3100/uploads/1728046220756-399606163.jpg', '2024-10-04 12:50:20'),
(37, 10, 'http://localhost:3100/uploads/1728137528459-752980299', '2024-10-05 14:12:08');

--
-- Constraints for dumped tables
--

-- No additional constraints needed as they are already defined above.

COMMIT;
