-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2025 at 01:13 PM
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
(130, 'Kiogora', 'Mwongera', 'mwongeraligo@gmail.com', 3, '$2b$10$HY6PCu0JOwhfCCSy.pBymuCYYXI8.sM6nSVJ4BWAUBzXubiS0rQ0a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMwLCJsYXN0bmFtZSI6Ik13b25nZXJhIiwiZW1haWwiOiJtd29uZ2VyYWxpZ29AZ21haWwuY29tIiwicm9sZXMiOjMsImlhdCI6MTczOTYxODI1NCwiZXhwIjoxNzM5NjYxNDU0fQ.c7WgjGG-5_7VLnqJT7gEw2QceLEGiAENhlxi-S2yQgI'),
(131, 'john', 'doe', 'johndoe@mail.com', 3, '$2b$10$s6632DHypnPsJx/r4DcBy.4a/bgCSfnL01gmhLmdxv1DPRAOgucAS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJsYXN0bmFtZSI6ImRvZSIsImVtYWlsIjoiam9obmRvZUBtYWlsLmNvbSIsInJvbGVzIjozLCJpYXQiOjE3MzkwMTg1NDQsImV4cCI6MTczOTA2MTc0NH0.kWjkmyu3ux5-jPm5oRxKhAhrmjyyi_3FiUdDXMggN90'),
(132, 'joe', 'Doe', 'joedoe@mail.com', 1, '$2b$10$9UsPgxuyyVvuipo2UyViUOROXa.N0YDxxrfy6qQrHiNQWzIRnwbYW', NULL),
(133, 'Kiogora', 'Mwongera', 'kiogoramwongera@gmail.com', 2, '$2b$10$KywaeM.YZrY0LdNsUV/1vetk7y.btDWsdaaoK98iAZrL8jDjKuz2C', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMzLCJsYXN0bmFtZSI6Ik13b25nZXJhIiwiZW1haWwiOiJraW9nb3JhbXdvbmdlcmFAZ21haWwuY29tIiwicm9sZXMiOjIsImlhdCI6MTczNjYxMDYzNSwiZXhwIjoxNzM2NjUzODM1fQ.f5asrqeTuzv9W_Sx7qG6ySS0wrugyGFBaCiXYFlsK0w'),
(136, 'Kiogora', 'Mwongera', 'mwongeraligo2@gmail.com', 2, '$2b$10$nvcG5Md9cy0n5.ootph12.B2GyM5uD/PSdXhPVky.Ag35nlESGbJG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM2LCJsYXN0bmFtZSI6Ik13b25nZXJhIiwiZW1haWwiOiJtd29uZ2VyYWxpZ28yQGdtYWlsLmNvbSIsInJvbGVzIjoyLCJpYXQiOjE3Mzc5ODc2MDEsImV4cCI6MTczODAzMDgwMX0.hL3EOvZPcwr7zLrsNaFPlUtDndJuI9ThkgK4cFVEFh8'),
(137, 'Dickson', 'Kiogora', 'mwongeraligo25@gmail.com', 1, '$2b$10$zfNY1W6PWQMv/wP0QRO7V.bmEE8tR9MzdwJeP8g./HVUxOBtmOOYy', NULL),
(138, 'Kiogora', 'Mwongera', 'mwongeraligo3@gmail.com', 1, '$2b$10$3D9GUnMU3GsPvwdTHoTLkOJ4dxixDp1bcCz38kBzTXHPeSOnx24a6', NULL),
(144, 'Kiogora', 'Mwongera', 'mwongeraligo5@gmail.com', 1, '$2b$10$Zx.bjiiHMMejC5xHn5Pl3u45H6S7852f.OGQzEYQT/SqRM4.Gfx3O', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ0LCJsYXN0bmFtZSI6Ik13b25nZXJhIiwiZW1haWwiOiJtd29uZ2VyYWxpZ281QGdtYWlsLmNvbSIsInJvbGVzIjoxLCJpYXQiOjE3MzgwNjM4ODUsImV4cCI6MTczODEwNzA4NX0.RpWOy_ORbH48JXefF3Wf8wlREs1EZrTmCsFFqHO24ZQ'),
(147, 'Kiogora', 'Mwongera', 'member@mail.com', 2, '$2b$10$.KA.ujHB3A.ap0/TiaYgL.SGjrKLkrEmBDR2tqyT/B0l7rcvNB./u', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJsYXN0bmFtZSI6Ik13b25nZXJhIiwiZW1haWwiOiJtZW1iZXJAbWFpbC5jb20iLCJyb2xlcyI6MiwiaWF0IjoxNzM5NjE4OTkyLCJleHAiOjE3Mzk2NjIxOTJ9.RMwPKcaPalKL_5n9BhOtdE7cQXblwtoVhilK4fOf98Y'),
(148, 'Kiogora', 'Mwongera', 'member2@mail.com', 1, '$2b$10$eITHjO3oHS/wr24lFMKs/uzWMEwLqZbzHOmZOor7PpebGkcYWloI2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ4LCJsYXN0bmFtZSI6Ik13b25nZXJhIiwiZW1haWwiOiJtZW1iZXIyQG1haWwuY29tIiwicm9sZXMiOjEsImlhdCI6MTczOTU1MDc0OCwiZXhwIjoxNzM5NTkzOTQ4fQ.LRjjGggPwFYdEyvUp2cv727nbrzMojvgpT2EbZrkNS8');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
