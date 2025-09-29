-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 20, 2025 at 06:44 AM
-- Server version: 8.0.43-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `job_board`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apply_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `user_id`, `title`, `description`, `company`, `location`, `type`, `apply_url`, `created_at`, `updated_at`) VALUES
(1, 43, 'Voluptas laborum est', 'Aliquip aut necessitAliquip aut necessitAliquip aut necessitAliquip aut necessitvAiquip aut necessit', 'Simpson and Stevens LLC', 'Itaque quia facilis', 'Part-Time', 'https://www.vukiha.co', '2025-09-19 07:53:49', '2025-09-19 07:53:49'),
(2, 43, 'Debitis deserunt vol', 'Fuga Excepturi id qFuga Excepturi id qFuga Excepturi id qFuga Excepturi id q', 'Wallace Carver Plc', 'Id libero provident', 'Internship', 'https://www.moqyrysafegy.in', '2025-09-19 08:11:58', '2025-09-19 08:11:58');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_sessions_table', 2),
(4, '2025_09_16_123820_create_jobs_table', 2),
(5, '2025_09_16_124310_create_personal_access_tokens_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Lauriane Schmidt', 'gianni69@example.net', '2025-09-19 07:44:16', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', '9TUOxdKYkU', '2025-09-19 07:44:16', '2025-09-19 07:44:16'),
(2, 'Reta Jakubowski', 'nikko.hessel@example.org', '2025-09-19 07:44:16', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'Qhflzsu6sf', '2025-09-19 07:44:16', '2025-09-19 07:44:16'),
(3, 'Jordan O\'Keefe Sr.', 'denis.mcclure@example.net', '2025-09-19 07:44:16', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'S8Mi0ratho', '2025-09-19 07:44:17', '2025-09-19 07:44:17'),
(4, 'Enoch Runte', 'dicki.ari@example.com', '2025-09-19 07:44:16', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', '3prQvKHXRW', '2025-09-19 07:44:17', '2025-09-19 07:44:17'),
(5, 'Frederick Cartwright', 'emile.vandervort@example.org', '2025-09-19 07:44:16', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'Lptv8MBxZt', '2025-09-19 07:44:17', '2025-09-19 07:44:17'),
(6, 'Carissa Kertzmann', 'earline.gleichner@example.org', '2025-09-19 07:44:16', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'quqbtXRzmc', '2025-09-19 07:44:17', '2025-09-19 07:44:17'),
(7, 'Mr. Bennett Reynolds II', 'griffin75@example.com', '2025-09-19 07:44:16', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'Fq4Xht5yXH', '2025-09-19 07:44:17', '2025-09-19 07:44:17'),
(8, 'Greg Morar', 'weimann.esteban@example.org', '2025-09-19 07:44:16', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'JOXQPzF9LQ', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(9, 'Letitia Bernier', 'ciara25@example.org', '2025-09-19 07:44:16', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'NSlJQTUkQa', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(10, 'Henriette Klocko', 'wcassin@example.net', '2025-09-19 07:44:16', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'fMZOa6bynt', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(11, 'Test User', 'test@example.com', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'oBIZQOmJoP', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(12, 'Prof. Idell Ondricka PhD', 'cara49@example.net', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'ObJwtlTM9L', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(13, 'Luther Berge', 'vking@example.net', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'vT6o3ZDwl6', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(14, 'Domingo Jaskolski', 'herman25@example.com', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'bPHK63rrdF', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(15, 'Marcellus Murazik II', 'freda.hettinger@example.net', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', '8qDRLzllJF', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(16, 'Prof. Patrick McDermott V', 'davis.jazmyne@example.org', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'H3xgJ6Z4MW', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(17, 'Miss Rachel Labadie Sr.', 'carolyne.damore@example.com', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', '6anhZC5SYZ', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(18, 'Dr. Evangeline Lakin', 'wehner.aurore@example.com', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'g2cHrEzeIt', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(19, 'Prof. Sheldon Hamill DDS', 'talia80@example.org', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'Lbdgk9vXHp', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(20, 'Emmet Stiedemann', 'dave.beier@example.net', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'l2RZE3V9IP', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(21, 'Patrick Jerde', 'sarai66@example.net', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'z5WCTadV9g', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(22, 'Tracy Marvin', 'cathrine63@example.net', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'CriFhMRStR', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(23, 'Camylle Beer', 'borer.lance@example.org', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'SXE23jplxK', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(24, 'Ralph Mayer Sr.', 'else.marquardt@example.org', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', '1inC5K66Qf', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(25, 'Mohamed Greenfelder', 'hailey.mraz@example.org', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'rQkKgSflDV', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(26, 'Prof. Matilde Paucek', 'mills.arnaldo@example.org', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'HwjnZi4Dx9', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(27, 'Dr. Liam Trantow I', 'orolfson@example.com', '2025-09-19 07:44:18', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', '860tKyTJkn', '2025-09-19 07:44:18', '2025-09-19 07:44:18'),
(28, 'Avery Nitzsche', 'nabbott@example.net', '2025-09-19 07:44:19', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'aI0gg5FtE2', '2025-09-19 07:44:19', '2025-09-19 07:44:19'),
(29, 'Joy Rosenbaum', 'zlabadie@example.net', '2025-09-19 07:44:19', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'kQCMWA6lWg', '2025-09-19 07:44:19', '2025-09-19 07:44:19'),
(30, 'Mrs. Madisyn Runte', 'vjaskolski@example.org', '2025-09-19 07:44:19', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'LulBjDaCZz', '2025-09-19 07:44:19', '2025-09-19 07:44:19'),
(31, 'Mr. Domingo Bode', 'wintheiser.kenyatta@example.org', '2025-09-19 07:44:19', '$2y$12$vkBg8K0pPq.4uUrZvXQ6ou57gZ5RkgRW.6Z7CDlJUXHbGed/O7p42', 'hfiNx5FOBz', '2025-09-19 07:44:19', '2025-09-19 07:44:19'),
(32, 'Agustina O\'Kon', 'helene.fay@example.org', '2025-09-19 07:45:56', '$2y$12$pprL7fQJ7UKh0yPnc.gkA.KvUllCQtbhZCw/q1gG2/lsGAtx/NpIS', 'qd70FPWtvj', '2025-09-19 07:45:56', '2025-09-19 07:45:56'),
(33, 'Jazmyne Wolf', 'mmitchell@example.com', '2025-09-19 07:45:56', '$2y$12$pprL7fQJ7UKh0yPnc.gkA.KvUllCQtbhZCw/q1gG2/lsGAtx/NpIS', '5HFRRQEsm7', '2025-09-19 07:45:56', '2025-09-19 07:45:56'),
(34, 'Greyson Vandervort DDS', 'odessa.pollich@example.com', '2025-09-19 07:45:56', '$2y$12$pprL7fQJ7UKh0yPnc.gkA.KvUllCQtbhZCw/q1gG2/lsGAtx/NpIS', 'otEYsC32sp', '2025-09-19 07:45:56', '2025-09-19 07:45:56'),
(35, 'Jayne Bartell PhD', 'abraham.hoeger@example.org', '2025-09-19 07:45:56', '$2y$12$pprL7fQJ7UKh0yPnc.gkA.KvUllCQtbhZCw/q1gG2/lsGAtx/NpIS', 'tqvD2mj2pe', '2025-09-19 07:45:56', '2025-09-19 07:45:56'),
(36, 'Johnathan Kuhic', 'ocie04@example.org', '2025-09-19 07:45:56', '$2y$12$pprL7fQJ7UKh0yPnc.gkA.KvUllCQtbhZCw/q1gG2/lsGAtx/NpIS', 'Sm98bRb792', '2025-09-19 07:45:56', '2025-09-19 07:45:56'),
(37, 'Rosalia Kuvalis', 'allie19@example.net', '2025-09-19 07:45:56', '$2y$12$pprL7fQJ7UKh0yPnc.gkA.KvUllCQtbhZCw/q1gG2/lsGAtx/NpIS', 'ZYt4rgmns3', '2025-09-19 07:45:56', '2025-09-19 07:45:56'),
(38, 'Ena Jerde', 'stoltenberg.maya@example.com', '2025-09-19 07:45:56', '$2y$12$pprL7fQJ7UKh0yPnc.gkA.KvUllCQtbhZCw/q1gG2/lsGAtx/NpIS', 'UMCOMVlXce', '2025-09-19 07:45:56', '2025-09-19 07:45:56'),
(39, 'Dr. Kellie Murazik', 'waelchi.pierce@example.net', '2025-09-19 07:45:56', '$2y$12$pprL7fQJ7UKh0yPnc.gkA.KvUllCQtbhZCw/q1gG2/lsGAtx/NpIS', 'heQ21FMhpX', '2025-09-19 07:45:56', '2025-09-19 07:45:56'),
(40, 'Bart Rutherford', 'lorenz96@example.org', '2025-09-19 07:45:56', '$2y$12$pprL7fQJ7UKh0yPnc.gkA.KvUllCQtbhZCw/q1gG2/lsGAtx/NpIS', '9jP3FPd1dO', '2025-09-19 07:45:56', '2025-09-19 07:45:56'),
(41, 'Mr. Dave Roob DDS', 'carlie.muller@example.org', '2025-09-19 07:45:56', '$2y$12$pprL7fQJ7UKh0yPnc.gkA.KvUllCQtbhZCw/q1gG2/lsGAtx/NpIS', 'V9GvxNbC8U', '2025-09-19 07:45:56', '2025-09-19 07:45:56'),
(43, 'Kush', 'kushtolia6767@gmail.com', NULL, '$2y$12$fmfUxwtd24sC5yq75OB1a.z1YM71oxhcsOEtqjNk/MFMD8SSZTPoi', NULL, '2025-09-19 07:53:09', '2025-09-19 07:53:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
