-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2024 at 01:37 PM
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
(87, 'subaru', 'WRX', 2016, '2000', 'petrol', 'Manual', '2WD', 80000, 'new', 'new', 'Kiserian Ngong', 870000.00, 53),
(88, 'Toyota ', 'premio', 2016, '3000', 'petrol', 'auto', '2wd', 80000, 'newly imported', 'new used', 'Nairobi, KEN', 870000.00, 53),
(89, 'Toyota ', 'premio', 2016, '4535353', 'petrol', 'auto', '2wd', 80000, 'new', 'new', 'Nairobi, KEN', 2500000.00, 53);

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
(57, 55, 'http://localhost:3100/uploads/1729468830320-412795170.jpg', '2024-10-21 00:00:30'),
(58, 55, 'http://localhost:3100/uploads/1731423554588-314488387.jpg', '2024-11-12 14:59:14');

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
(16, 'Gallado', 'Toyota ', 'uploads\\1729519168539-759414098.jpg'),
(17, 'Mark X', 'Toyota ', 'http://localhost:3100/uploads/1731173870831-911200269.png'),
(18, 'gt', 'Toyota ', 'http://localhost:3100/uploads/1731661076595-92525841.jpg');

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
(53, 'Kiogora', 'Mwongera', 'mwongeraligo@gmail.com', 0, '$2b$10$jdNrnMqsN7iZme7pkGuo6OdzIisSnL7xOXjAuLuajo2rdWD9OKtgy', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im13b25nZXJhbGlnb0BnbWFpbC5jb20iLCJpYXQiOjE3MzE2NzEzNzQsImV4cCI6MTczMTc1Nzc3NH0._GQWimdsIaQehQHU186oKLQfrqYIiKtOe9SZEE9bw4s'),
(55, 'Kiogora', 'Mwongera', 'mwongeraligoo@gmail.com', 0, '$2b$10$jdNrnMqsN7iZme7pkGuo6OdzIisSnL7xOXjAuLuajo2rdWD9OKtgy', NULL),
(56, 'leo', 'kiu', 'leo.kiu@gmail.com', 0, '1234', NULL),
(57, 'leo', 'kiu', 'leo.kio@gmail.com', 0, '1234', NULL),
(61, 'Kiogora', 'Mwongera', 'mwongeraligot@gmail.com', 0, '$2b$10$Ob6kBqB9RwoMzwmsm14Mke0DcNkLVFj0Ejyl8bHtapUa47kS2NN7y', NULL),
(62, 'Kiogora', 'Mwongera', 'mwongeraligoe@gmail.com', 0, '$2b$10$oMkG/vBbeVYiYwPfdZ8aJezf1JS4R3NRxAjo.3ONWyO1qgKR.9zj.', NULL),
(63, 'Kiogora', 'Mwongera', 'mwongeraligw@gmail.com', 0, '$2b$10$YNUWvPLGZ83G4cgKoo.25udbvhMpWHoFbh2uqeta/H5aFT49pQLUK', NULL),
(64, 'Kiogora', 'Mwongera', 'mwongeralige@gmail.com', 0, '$2b$10$C4DyBV8HywStvstjB9/ZK.chuUNGZEqyCODiijFRPCGWI9wwYPU/q', NULL),
(65, 'leo', 'kiu', 'leo.kiogora@gmail.com', 0, '1234', NULL),
(66, 'Kiogora', 'Mwongera', 'mwongeraligou@gmail.com', 0, '$2b$10$E76hhKqI.FPEdakDhujLue7so5aCbX4pkufETyNPx6VxO2qWYgxge', NULL),
(69, 'Kiogora', 'Mwongera', 'mwongeraligro@gmail.com', 0, '$2b$10$BCL9tHbMZ6D/FYs4eo81Oe3vvP8Y2LFEM8aOVeDFHl4wZx2n4VB86', NULL),
(71, 'leo', 'kiu', 'leo.kiogoraa@gmail.com', 0, '1234', NULL),
(73, 'leo', 'kiu', 'leo.kiogor@gmail.com', 0, '1234', NULL),
(75, 'Kiogora', 'Mwongera', 'mwongeraligo2@gmail.com', 0, '$2b$10$lp1jeTgLmk98pe0AlCS15.Qw1ZIIivegwDQHcNkTZslheJNb7xPtW', NULL),
(77, 'DICKSON', 'MWONGERA', 'mwongeraligoz@gmail.com', 0, '$2b$10$hDLuBJn9vzklpB9KRgLmmeH5Hvf6MeKOTsUile.yHHNOr.hab0Cyy', NULL),
(80, 'Kiogora', 'Mwongera', 'mwongera@gmail.com', 0, '$2b$10$tsRc49O9/7Y7xpWD7ieNFuageI773NcP1BHNcp6QBqOLdikoPyhOG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im13b25nZXJhQGdtYWlsLmNvbSIsImlhdCI6MTczMTA5MzM0OCwiZXhwIjoxNzMxMTc5NzQ4fQ.k7WQ_PIb8i0_s90gYkyzPCzLSQgFDTUUm3ueIoPS00c'),
(82, 'Kiogora', 'Mwongera', 'mwongeralig20o@gmail.com', 0, '$2b$10$hjFqzw.PLPx/zNWyAel0x.ax6VZZeGl3xrfHn.GRiFptj4JDqNtAW', NULL),
(83, 'Kiogora', 'Mwongera', 'mwongeralig30o@gmail.com', 0, '$2b$10$emW0weXAkvWHwov9/0POv.qQItP1fnFmEQorWOhs5TUpI.nD6DKT2', NULL),
(84, 'DICKSON', 'MWONGERA', 'mwongeraligo786@gmail.com', 0, '$2b$10$VKD6dtPdUsO9eHMKYyFphOJ3LuqCFKiyNMAKr1EFPFK8ElsSxSaQK', NULL),
(87, 'Kiogora', 'Mwongera', 'mwongeraligo200@gmail.com', 0, '$2b$10$q6pYLIi0LIrX4wK4yzkXkuou0PCKDPMNGykeqxULRr7lJ.6k3M5Jq', NULL),
(88, 'Kiogora', 'Mwongera', 'mwongeraligo201@gmail.com', 0, '$2b$10$UXmcDSma8oAGHiRuYlLUa.Q1KE03r9hoLsRLqsqQlnIbiqZAF/HEa', NULL),
(89, 'Kiogora', 'Mwongera', 'mwongeraligo2000@gmail.com', 0, '$2b$10$1OznyQF9imvIuopj7KyGW.0NLb4bB6ipp1it0tJ2cWa3mDhy.YAPO', NULL),
(90, 'Kiogora', 'Mwongera', 'mwongeraligo5000@gmail.com', 0, '$2b$10$FSZW29qX5dZIJBUDnhXxde3tkZtAQ4VvFnlJaRvXFs.EB9Sb.okva', NULL),
(91, 'Kiogora', 'Mwongera', 'mwongeraligo700@gmail.com', 0, '$2b$10$vWwvWQS7gygxB5Y//4RPiOaW1ynic.uOgDpxO7uu7qt7A/vYEyp22', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im13b25nZXJhbGlnbzcwMEBnbWFpbC5jb20iLCJpYXQiOjE3MzEwOTUwMDEsImV4cCI6MTczMTE4MTQwMX0.DhBaTxrCQ8-90Pp_RwuGviI3TG54WE3wEiLNBntQCvI'),
(92, 'Kiogora', 'Mwongera', 'mwongeraligo4000@gmail.com', 0, '$2b$10$kO.DTeawvAF2qHhXlCRqZuSm2cUJLFQGNXjVgG/W./MF3mIOrFf5q', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im13b25nZXJhbGlnbzQwMDBAZ21haWwuY29tIiwiaWF0IjoxNzMxMTYzNDg4LCJleHAiOjE3MzEyNDk4ODh9.fELEMHMBY0MxdgF_2TRsJpDWpHEeiy_Bd5jm-u_Gl2U'),
(93, 'Kiogora', 'Mwongera', 'mwongeraligo45@gmail.com', 0, '$2b$10$NM1TjWcxomSPW67yONysu.po2uNiEyfIZFV5i4Ann.ix48UHKOPIm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im13b25nZXJhbGlnbzQ1QGdtYWlsLmNvbSIsImlhdCI6MTczMTE2NzkzNSwiZXhwIjoxNzMxMjU0MzM1fQ.1Ha2NgtCqaPmSZv0sZjyru8qAw2SZhnkFB3oNZL9LRE'),
(94, 'Kiogora', 'Mwongera', 'mwongeraligo34@gmail.com', 0, '$2b$10$KKUWKnuZPAeqFi8ydadH4.uyjN7yLHnsvtWXR.ovz32j9XXdmOiua', NULL),
(95, 'Kiogora', 'Mwongera', 'mwongeraligo4546@gmail.com', 0, '$2b$10$FxdE9UqqDyR.GbVYHMIM5.U6RppK9V78MwROd4PR8JgAp/FKywF12', NULL),
(97, 'Kiogora', 'Mwongera', 'mwongeraligo14546@gmail.com', 0, '$2b$10$PznxzR4KHQoiOk2iveJR9eKoBm9a7HCIsHpL9Hcv7zeqT13ypPSc2', NULL),
(98, 'Kiogora', 'Mwongera', 'mwongeraligo2312@gmail.com', 0, '$2b$10$dPA5oCloC2sldsROjlGDkeaTjBKFMuWPvj1i04mJ6Gq0rrlOBHEMG', NULL),
(99, 'DICKSON', 'MWONGERA', 'mwongeraligo3212@gmail.com', 0, '$2b$10$Gp3/4KSBzg2ILcG6LL1J6uBihkkooqK.thO5lXH1VOtuXR/2TbCO.', NULL),
(102, 'DICKSON', 'MWONGERA', 'mwongeraligo322@gmail.com', 0, '$2b$10$nEns/xAYPc3c5UxrT5aBgOGYosiV9HiniWMh3Z7.gg2OV0mn6MfBi', NULL),
(103, 'Kiogora', 'Mwongera', 'mwongeraligo0988@gmail.com', 0, '$2b$10$aKGttsUKVlx2at4hcVclX.MerAeUaUFyFIe4a5K3qm7JMbjIPGlQG', NULL),
(104, 'Kiogora', 'Mwongera', 'mwongeraligo09878@gmail.com', 0, '$2b$10$OJVGv..I56QoqubkC1Zkaetzy4bseWizZFNGAQRi.FhN79fdPJUq6', NULL),
(105, 'Kiogora', 'Mwongera', 'mwongeraligo089878@gmail.com', 0, '$2b$10$tTlg1lU7yNO8ypaSrvkxk.wR/Pb.Q/UCJtueyAw/YPPBObHb0Gsm.', NULL),
(106, 'Kiogora', 'Mwongera', 'mwongeraligo89878@gmail.com', 0, '$2b$10$/DCPsspWOpwHsrFZAIDxwOsO70sm71n2.VQS5oKLRZWsLb2trm2mO', NULL),
(107, 'Kiogora', 'Mwongera', 'mwongeraligo8978@gmail.com', 0, '$2b$10$Rwp6n8O/7cRFX05oB2Gfo.59HVG35iX.EHxUTMWIYW0M.3.oPJklq', NULL),
(109, 'Kiogora', 'Mwongera', 'mwongeraligo897@gmail.com', 0, '$2b$10$5.JmywwgrGCY1lrZzOdn4ukuSq3U5m5bSjqkUoV9vhNx04ZidMLa6', NULL),
(111, 'Kiogora', 'Mwongera', 'mwongeraligo87@gmail.com', 0, '$2b$10$rSfeD3fUd2dLqac8wquItuA3gfUjCQkRA.J7sMRlwSMd3HkHRM.9i', NULL),
(113, 'Kiogora', 'Mwongera', 'mwongeraligo817@gmail.com', 0, '$2b$10$860nmEHOlZ.InyjXGYBjV.daMOPho.GeTRWZGIi0l1WydGXdN0jnW', NULL),
(114, 'Kiogora', 'Mwongera', 'mwongeraligo675@gmail.com', 0, '$2b$10$j32ETxF0FaVuUuK7cVX1qea/vT1Fjbjs2uqwL.yyYGqngvlCrdkDK', NULL),
(115, 'Kiogora', 'Mwongera', 'mwongeraligo89709@gmail.com', 0, '$2b$10$Svub8Yo9jCX5N8lRlTxJjORpDRmIyX7JsFlSliXyTO8vw/Vn1Cisq', NULL),
(116, 'Kiogora', 'Mwongera', 'mwongeraligo89709j@gmail.com', 0, '$2b$10$6SHKum5jdPE681IYZApoJurYl2Z/f05DNteQa80wQEtTExz8dqt9O', NULL),
(117, 'Kiogora', 'Mwongera', 'mwongeraligo5676@gmail.com', 0, '$2b$10$4sV.gQWVIhiziwDoDBULBeD1sbTTwySZ4bThMJCXghSzfVrOZ8XJi', NULL),
(118, 'Kiogora', 'Mwongera', 'mwongeraligo6534@gmail.com', 0, '$2b$10$8LTGBuqBkHHpvmFDKJY/SOqj86ZMDQqT4SLzTUCVmWhHgLlTRbaGu', NULL),
(119, 'Kiogora', 'Mwongera', 'mwongeraligo55657@gmail.com', 0, '$2b$10$wve6kq8fsgK7NYWIXZSw8uvbZWH7Vwl5yz8RbPqtGtpY7WaXtJTo.', NULL),
(120, 'DICKSON', 'MWONGERA', 'mwongeraligo8768@gmail.com', 0, '$2b$10$9JsAM1OpROx2LxCOA1tEjOPIi3k0lfevXaftauHaZ2lKru4VRoGCm', NULL),
(121, 'Kiogora', 'murithi', 'murithiligo@gmail.com', 0, '$2b$10$gUrTHSFGkqCxzYHwGm.AnOzA/T503fQewtP2p.2e/9DesWmqVtOXC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11cml0aGlsaWdvQGdtYWlsLmNvbSIsImlhdCI6MTczMTE3MzcyMCwiZXhwIjoxNzMxMjYwMTIwfQ.N_fzFG2VuZIFf4OLgwJtPOPoTsQDtS_gAknm-q7hFV4'),
(122, 'Kiogora', 'Mwongera', 'mwongeraligo20012@gmail.com', 0, '$2b$10$2QAX1yXKHeXg94EciaB6aelx9mEVjyP6wvYfsQdj73zDrO1GFwY9a', NULL),
(123, 'Kiogora', 'Mwongera', 'mwongeraligo652@gmail.com', 0, '$2b$10$KFBEE25iSoXhEfq61L39V.CLr.mk6Dz1UpJJiIUinzdZaoQH9mv0u', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im13b25nZXJhbGlnbzY1MkBnbWFpbC5jb20iLCJpYXQiOjE3MzE0OTgwMTYsImV4cCI6MTczMTU4NDQxNn0.L1jxrSDc245C9mIhRhGWAkd-nsD4F_z7hNIejulup-4'),
(124, 'Kiogora', 'Mwongera', 'mwongeraligo9999@gmail.com', 0, '$2b$10$CgZjhE56KgH4dv6nyTFf..qR5Mi9L/eiaczc3pLQTiI5P6XuO8rbW', NULL),
(125, 'Kiogora', 'Mwongera', 'mwongeraligo999@gmail.com', 0, '$2b$10$MlN8r9Y8Iib9/ikIZJWBQ.J3edvCCdOE3t3tkl2LBk//b2jw9V2VK', NULL),
(126, 'john', 'Njoroge', 'me2@joro.com', 0, '$2b$10$/MTe9bENgZqELD8t4S2vYOHTnzAaOry5e2cq6Pl/hZjnlLYK27hfq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lMkBqb3JvLmNvbSIsInJvbGVzIjowLCJpYXQiOjE3MzE2NzMzMjUsImV4cCI6MTczMTc1OTcyNX0.64Oduzp8HtbklfUmYTTlR8hyiMg0CPdXZRoXPTw6Gz0'),
(127, 'john', 'Njoroge', 'me@joro.com', 0, '$2b$10$S4j2FzvBeY66g2IZxFb4B.2L51xgWXK8n6re2QyEpGpkt8AKUDJdK', NULL),
(128, 'john', 'Njoroge', 'me3@joro.com', 0, '$2b$10$fGWtgVm4T8dRcu7bG2qnkOt5u04S80EriUCWdcf/xy2iOcXAjUL7W', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lM0Bqb3JvLmNvbSIsInJvbGVzIjowLCJpYXQiOjE3MzE2NzQxMDAsImV4cCI6MTczMTc2MDUwMH0.0fat-OmJE_7qTyf-IznxGmJMMibIPKb0i-wT-sWg_XY');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `car_images`
--
ALTER TABLE `car_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `testimage`
--
ALTER TABLE `testimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

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
