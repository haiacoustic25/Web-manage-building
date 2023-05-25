-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: manage_building
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('4d027fa4-ac50-482a-8270-61ea0b416cc8','4d672251c294b2c95eab8ec7aaecd5b3af5b196b16109443efb5288ee5d74853','2023-05-17 02:44:55.997','20230517024455_init',NULL,NULL,'2023-05-17 02:44:55.647',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `roomId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Booking_roomId_fkey` (`roomId`),
  CONSTRAINT `Booking_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES ('3c5af155-50a1-4787-999d-7b8d82729a21',3000000,1,'97d08474-670d-4180-b1e9-6fed30e4d654','Hồ Minh Hải','2023-05-18 08:49:37.137'),('83565a47-6386-4a16-9407-864dbaa40c89',2700000,1,'b13482de-a825-42d8-a1d3-f722722dbe3d','Nguyễn Tiến Hòa','2023-05-18 08:49:05.101'),('d5d2b4c2-aa43-4eec-831f-15afb6c0cd4a',2500000,2,'5d91b98e-2293-4319-90cc-dcd6eab0fd73','Lại Đức Hiển','2023-05-18 08:49:19.911');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `building`
--

DROP TABLE IF EXISTS `building`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `building` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ward` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amountRooms` int NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `numberOfFloors` int NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Building_userId_fkey` (`userId`),
  CONSTRAINT `Building_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `building`
--

LOCK TABLES `building` WRITE;
/*!40000 ALTER TABLE `building` DISABLE KEYS */;
INSERT INTO `building` VALUES ('4e273d7c-8a5b-42bb-b8ed-c2fec8f96e5e','01','021','00613','Đại học công nghiệp - Hà Nội','e4da1c5c-76ea-4f9c-8439-5723816d1fd4',8,1,5,'2023-05-17 02:46:23.255');
/*!40000 ALTER TABLE `building` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` int NOT NULL,
  `district` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ward` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `citizenIdentificationNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateOfEntry` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `status` int NOT NULL DEFAULT '1',
  `roomId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Customer_roomId_fkey` (`roomId`),
  CONSTRAINT `Customer_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('2508baff-c615-4ba1-be89-3eb5f4630a73','Đàm Văn Hiếu','th (1).jpg','012345678','31',2,'313','11641','040200006862','damhieu@gmail.com','2021-05-10 00:00:00.000',1,'d602561c-874a-4511-bf33-5697082bfb2b'),('77fd16d3-d5dd-43c2-9b60-c3c450d98123','Trần Thị Cúc','th.jpg','0968348660','01',1,'273','09796','040200006862','haiacoustic28@gmail.com','2021-05-03 00:00:00.000',1,'5d91b98e-2293-4319-90cc-dcd6eab0fd73'),('7aafbf5c-3da1-4095-9273-d61c78fd10fd','Trần Đức Nam','th (1).jpg','123123123','01',2,'273','09826','123123123123','12312312312@gmail.com','2023-05-15 00:00:00.000',2,'89a7b80c-456d-4d6b-a20e-be45c7ee385e'),('b0e390a5-ba7f-4682-8d30-d9969fd757a6','Nguyễn Hải Nam','th (1).jpg','012122','31',2,'317','11938','1212212121','hainam@gmail.com','2023-05-14 00:00:00.000',1,'e69ad900-8189-49c5-8bb0-166b40e85b9e'),('bc74c4d0-ea6f-4887-80be-124fc49db4d1','Nguyễn Thị Huyền','th.jpg','0123456789','48',1,'492','20251','040200006862','damhieu@gmail.com','2021-05-03 00:00:00.000',2,'5d91b98e-2293-4319-90cc-dcd6eab0fd73'),('c9c439eb-f877-4cb1-828c-134cf9d32785','Nguyễn Thị Thịnh','th (1).jpg','123123123','89',1,'889','30490','123123123','12312312@gmail.com','2023-05-14 00:00:00.000',2,'e69ad900-8189-49c5-8bb0-166b40e85b9e'),('cf56666b-cdd0-4d41-9493-2f0d7c281e16','Hồ Minh Hải','f392c340-4d0a-11ec-9d84-6defbc1b7d9c.png','0328641477','40',2,'423','17266','040200006862','hmhdev25@gmail.com','2019-04-08 00:00:00.000',1,'b13482de-a825-42d8-a1d3-f722722dbe3d'),('e785134d-0e7b-4684-a2d1-6b8845b33f2e','Hài Minh Hổ','IMG_0288.JPG','123123123','01',2,'273','09799','12312312312','12312312312@gmail.com','2023-05-07 00:00:00.000',2,'97d08474-670d-4180-b1e9-6fed30e4d654'),('fad45565-9ee5-4f6f-b022-62e3ef350da0','Nguyễn Tiến Hòa','th (1).jpg','0968348660','40',2,'423','17266','040200006862','haiacoustic28@gmail.com','2019-04-08 00:00:00.000',1,'b13482de-a825-42d8-a1d3-f722722dbe3d');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debt`
--

DROP TABLE IF EXISTS `debt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debt` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `money` double DEFAULT NULL,
  `status` int DEFAULT '1',
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Debt_roomId_fkey` (`roomId`),
  CONSTRAINT `Debt_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debt`
--

LOCK TABLES `debt` WRITE;
/*!40000 ALTER TABLE `debt` DISABLE KEYS */;
INSERT INTO `debt` VALUES ('00e187ad-78bd-4a3c-9072-2ecf4e1764a3','5d91b98e-2293-4319-90cc-dcd6eab0fd73','Tiền trọ tháng 2022-12',3328000,2,'2022-12-10 00:00:00.000'),('0e543dc3-4179-4a8b-a83c-2fd35528f5fc','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3171999,2,'2023-05-18 08:25:14.782'),('0f5390da-7208-4cb0-bec1-f6d2b7a9b2ad','e69ad900-8189-49c5-8bb0-166b40e85b9e','Tiền trọ tháng 2023-05',3392000,2,'2023-05-18 08:32:38.153'),('16898343-683d-4586-8b4d-4b720eef4792','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3287999,2,'2023-05-18 08:20:14.633'),('3407789b-8e88-4bf2-b751-91ab6d0bd25d','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3307999,2,'2023-05-18 08:20:01.417'),('37da3aca-ef20-428a-a4d4-2ff4e3a3cd98','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3367999,1,'2023-05-20 02:17:40.633'),('3b7ca088-fced-40df-b5c5-e76d2d71d4d0','89a7b80c-456d-4d6b-a20e-be45c7ee385e','Tiền trọ tháng 2023-05',3448000,2,'2023-05-18 08:14:13.568'),('3cf3bb28-36f0-4b50-82fc-b251115ee913','5d91b98e-2293-4319-90cc-dcd6eab0fd73','Tiền ăn',500000,1,'2023-05-18 09:06:18.239'),('407246b8-b8c4-4140-b012-e3d2681f40a5','5d91b98e-2293-4319-90cc-dcd6eab0fd73','Tiền trọ tháng 2023-05',3268000,2,'2023-05-18 08:29:23.566'),('429666fe-096b-4038-91b6-ef14c72d3e3a','2aafc09b-2f87-4de3-a876-5a0ac69c0eeb','Tiền trọ tháng 2023-05',4168000,2,'2023-05-18 08:34:41.458'),('4c894638-6538-47c8-bf4f-b470558f5a35','2aafc09b-2f87-4de3-a876-5a0ac69c0eeb','Tiền trọ tháng 2023-05',3788000,2,'2023-05-18 08:14:46.161'),('553b95cd-b8e4-479e-add4-ac81641f9463','89a7b80c-456d-4d6b-a20e-be45c7ee385e','Tiền trọ tháng 2023-05',3416000,2,'2023-05-18 08:34:27.918'),('57e37472-2675-47c9-8486-d0ca920be82a','97d08474-670d-4180-b1e9-6fed30e4d654','Tiền trọ tháng 2023-05',3888000,2,'2023-05-18 08:31:24.447'),('6d7fe8db-1f3c-4e6d-b645-c0f44c602d84','2aafc09b-2f87-4de3-a876-5a0ac69c0eeb','Tiền trọ tháng 2023-05',3848000,2,'2023-05-18 08:32:54.954'),('79eda91e-550d-4114-8a19-7285e79ec5a5','d3ad62c1-822c-42a8-95a0-bd9f76d4ce23','Tiền trọ tháng 2023-05',3732000,2,'2023-05-18 08:34:33.194'),('81037478-c1f5-4b50-a5d3-e3615cea7bdf','e69ad900-8189-49c5-8bb0-166b40e85b9e','Tiền trọ tháng 2023-05',3532000,2,'2023-05-18 08:14:02.832'),('8667d9ef-0026-4535-a2a6-6cdac974b734','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3267999,2,'2023-05-18 08:19:36.120'),('9308ee8f-c7f0-4ea5-b2a1-b45087f36071','d3ad62c1-822c-42a8-95a0-bd9f76d4ce23','Tiền trọ tháng 2023-05',3792000,2,'2023-05-18 08:15:06.496'),('93216d92-e7a2-4328-83c5-d01f28675aa3','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3191999,2,'2023-05-18 08:19:27.144'),('96701ab4-b5f9-46e6-837d-8efb10b54b17','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3235999,2,'2023-05-18 08:26:32.246'),('96fcb133-fff5-46b1-9905-618f7af6f3e3','89a7b80c-456d-4d6b-a20e-be45c7ee385e','Tiền trọ tháng 2023-05',3928000,2,'2023-05-18 08:32:46.901'),('982f3bb6-1864-4112-b37e-b4e3f5bd98dd','e69ad900-8189-49c5-8bb0-166b40e85b9e','Tiền trọ tháng 2023-05',3412000,2,'2023-05-18 08:31:07.697'),('9d92822e-42e0-4569-9546-bebafefa64f9','5d91b98e-2293-4319-90cc-dcd6eab0fd73','Tiền trọ tháng 2023-05',3292000,2,'2023-05-18 08:30:41.547'),('a2213c33-4aa1-4336-a8ad-f1d7c36e60df','d602561c-874a-4511-bf33-5697082bfb2b','Tiền trọ tháng 2023-05',3852000,2,'2023-05-18 08:14:58.001'),('a5a46de7-b88c-4120-94f9-3c32658e2d1e','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3171999,2,'2023-05-18 08:24:46.154'),('a60a38de-be1d-4107-b720-06b8b815b088','5d91b98e-2293-4319-90cc-dcd6eab0fd73','Tiền trọ tháng 2023-05',3356000,2,'2023-05-18 08:29:14.266'),('a74a338a-8e78-417d-868e-aa25a8e1e025','97d08474-670d-4180-b1e9-6fed30e4d654','Tiền trọ tháng 2023-05',3756000,2,'2023-05-18 08:14:29.009'),('ab9e012d-0347-4d6d-877e-4f76e48157ba','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3327999,2,'2023-05-18 08:27:43.122'),('afcb6462-1052-48a1-b202-cff4be0e49d4','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3287999,2,'2023-05-18 08:19:49.506'),('bdd3d5f2-dece-4aff-9356-c50a00f14ecc','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3171999,2,'2023-05-18 08:25:02.114'),('c150115e-5032-42bd-b571-26332be48b58','5d91b98e-2293-4319-90cc-dcd6eab0fd73','Tiền trọ tháng 2023-05',3268000,2,'2023-05-18 08:13:54.005'),('c207acaa-73ca-4815-bfee-6d5e90a10b97','2aafc09b-2f87-4de3-a876-5a0ac69c0eeb','Tiền trọ tháng 2023-05',3888000,2,'2023-05-18 08:31:31.372'),('c208a1bd-6b09-47f9-92b3-2736544bbcba','89a7b80c-456d-4d6b-a20e-be45c7ee385e','Tiền trọ tháng 2023-05',3588000,2,'2023-05-18 08:31:14.471'),('d218fd08-38dc-49d0-827d-aeddb581b531','5d91b98e-2293-4319-90cc-dcd6eab0fd73','Tiền trọ tháng 2023-05',3340000,2,'2023-05-18 08:29:33.717'),('db86c56e-8b3b-40dd-9015-d4a09257d87d','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3171999,2,'2023-05-18 08:13:40.490'),('e1ed006b-1eb4-40f2-bcfd-aa2276ee07e6','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3335999,2,'2023-05-18 08:26:19.279'),('ecd88b24-a336-4a11-8b93-52903a856d3a','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3267999,2,'2023-05-18 08:27:53.945'),('f496d112-4c39-4f1c-b73a-3e7801332e30','b13482de-a825-42d8-a1d3-f722722dbe3d','Tiền trọ tháng 2023-05',3231999,1,'2023-05-18 08:48:32.333');
/*!40000 ALTER TABLE `debt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `furniture`
--

DROP TABLE IF EXISTS `furniture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `furniture` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `roomId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Furniture_roomId_fkey` (`roomId`),
  CONSTRAINT `Furniture_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `furniture`
--

LOCK TABLES `furniture` WRITE;
/*!40000 ALTER TABLE `furniture` DISABLE KEYS */;
INSERT INTO `furniture` VALUES ('05e8624f-4753-4148-a374-471a1e564ebc','TuDo.jpg','Tủ đồ',4230000,'b13482de-a825-42d8-a1d3-f722722dbe3d',1,'2023-05-17 03:36:40.296'),('147091e0-7050-425d-9da5-3478c4b2831a','BonCau.jpg','Bồn cầu',800000,'b13482de-a825-42d8-a1d3-f722722dbe3d',1,'2023-05-17 03:12:19.050'),('1872d19b-8af5-4d39-9ae5-fe96e4e7945c','DieuHoa.jpg','Điều hòa',5200000,'5d91b98e-2293-4319-90cc-dcd6eab0fd73',1,'2023-05-17 13:20:26.493'),('2bd554c1-3612-4aac-b26a-6c82ae5bcbd2','DieuHoa.jpg','Điều hòa',5200000,'b13482de-a825-42d8-a1d3-f722722dbe3d',1,'2023-05-17 03:15:17.049'),('3a4bb3ab-5660-463e-84b2-afa92dd23ae5','Giuong.jpg','Giường',3200000,'5d91b98e-2293-4319-90cc-dcd6eab0fd73',1,'2023-05-17 13:20:43.439'),('3d11813f-81d8-4f19-90f7-6001e113f35f','BonCau.jpg','Bồn cầu',800000,'5d91b98e-2293-4319-90cc-dcd6eab0fd73',1,'2023-05-17 03:57:30.572'),('50971a54-bdda-4bef-8df4-16c95fd981cb','NongLanh.jpg','Nóng lạnh',1200000,'b13482de-a825-42d8-a1d3-f722722dbe3d',1,'2023-05-17 03:36:07.535'),('59091f2c-1292-4a93-92cc-9169b4ee235d','BonRuaMat.jpg','Bồn rửa mặt',1200000,'5d91b98e-2293-4319-90cc-dcd6eab0fd73',1,'2023-05-17 13:20:09.190'),('62dde9d6-1814-430c-8e8f-77ef5468111b','TuDo.jpg','Tủ đồ',4200000,'5d91b98e-2293-4319-90cc-dcd6eab0fd73',1,'2023-05-17 13:21:29.012'),('974cb091-0435-42cb-aa2c-ff0defd29121','BonRuaMat.jpg','Bồn rửa mặt',1200000,'b13482de-a825-42d8-a1d3-f722722dbe3d',1,'2023-05-17 03:15:00.249'),('9fa30455-664f-49b8-a4b7-d191f8ed7457','NongLanh.jpg','Bình nóng lạnh',1200000,'5d91b98e-2293-4319-90cc-dcd6eab0fd73',1,'2023-05-17 13:21:03.391'),('bd550853-9ea1-4769-84c9-a9b6e31f2cc6','Giuong.jpg','Giường',3200000,'b13482de-a825-42d8-a1d3-f722722dbe3d',1,'2023-05-17 03:36:21.849');
/*!40000 ALTER TABLE `furniture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historyemail`
--

DROP TABLE IF EXISTS `historyemail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historyemail` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `HistoryEmail_customerId_fkey` (`customerId`),
  CONSTRAINT `HistoryEmail_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historyemail`
--

LOCK TABLES `historyemail` WRITE;
/*!40000 ALTER TABLE `historyemail` DISABLE KEYS */;
INSERT INTO `historyemail` VALUES ('3298f243-f3ad-47d9-a493-19f513acfa2b','Tiền phòng tháng 4','\n                    Tổng tiền: 3.171.999 VND,\n                    Số nước: 4 khối nước,\n                    Số điện: 123 kwh\n                  ','fad45565-9ee5-4f6f-b022-62e3ef350da0','2023-05-18 14:18:50.808'),('56d38c05-b523-4845-a2b5-a8cc5e053671','Tiền phòng tháng 4','\n                    Tổng tiền: 3.171.999 VND,\n                    Số nước: 4 khối nước,\n                    Số điện: 123 kwh\n                  ','cf56666b-cdd0-4d41-9493-2f0d7c281e16','2023-05-18 14:18:51.365'),('7098bd08-440e-475f-9956-4ca538028523','Tiền phòng tháng 5','\n                    Tổng tiền: 3.231.999 VND,\n                    Số nước: 7 khối nước,\n                    Số điện: 123 kwh\n                  ','fad45565-9ee5-4f6f-b022-62e3ef350da0','2023-05-18 14:17:52.904'),('c01d866d-8e67-4ba1-b28c-be0dbc7ba8d9','Tiền phòng tháng 5','\n                    Tổng tiền: 3.231.999 VND,\n                    Số nước: 7 khối nước,\n                    Số điện: 123 kwh\n                  ','cf56666b-cdd0-4d41-9493-2f0d7c281e16','2023-05-18 14:17:53.121');
/*!40000 ALTER TABLE `historyemail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalPayment` double NOT NULL,
  `payment` double NOT NULL,
  `environmentFee` double NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `internetFee` double DEFAULT NULL,
  `electricFee` double NOT NULL,
  `domesticWaterFee` double NOT NULL,
  `domesticWaterNumber` double NOT NULL,
  `electricNumber` double DEFAULT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Report_roomId_fkey` (`roomId`),
  CONSTRAINT `Report_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES ('05695706-b698-4478-921a-5959fac20c1b','b13482de-a825-42d8-a1d3-f722722dbe3d',3171999,2500000,19999,2,80000,4000,20000,4,123,'2022-09-09 17:00:00.000'),('10daace4-bf3b-4d61-bce0-c34c41727d68','89a7b80c-456d-4d6b-a20e-be45c7ee385e',3448000,2700000,20000,2,100000,4000,20000,7,122,'2023-04-10 00:00:00.000'),('2a262366-0cc0-464c-a4aa-90761407b221','89a7b80c-456d-4d6b-a20e-be45c7ee385e',3416000,2700000,20000,2,100000,4000,20000,5,124,'2023-01-10 00:00:00.000'),('2faff8bd-6fbb-4ce6-886e-443b3d6e5c53','2aafc09b-2f87-4de3-a876-5a0ac69c0eeb',3848000,3000000,20000,2,100000,4000,20000,8,142,'2022-12-10 00:00:00.000'),('3209fafd-97c1-4da0-864b-4c2de6707ce6','89a7b80c-456d-4d6b-a20e-be45c7ee385e',3928000,2700000,20000,2,100000,4000,20000,9,232,'2022-12-10 00:00:00.000'),('3c2ad21a-af74-4348-a2dd-d81e2d58dac0','5d91b98e-2293-4319-90cc-dcd6eab0fd73',3268000,2500000,20000,2,80000,4000,20000,5,142,'2023-02-10 00:00:00.000'),('3c8952cb-581f-4a70-bc2e-63c8e8f5c425','e69ad900-8189-49c5-8bb0-166b40e85b9e',3532000,2700000,20000,2,100000,4000,20000,5,153,'2023-04-10 00:00:00.000'),('400f4070-3aa2-40b7-842e-fc982d6805d4','5d91b98e-2293-4319-90cc-dcd6eab0fd73',3340000,2500000,20000,2,80000,4000,20000,8,145,'2023-01-10 00:00:00.000'),('452ae29f-3ff6-4aa3-ac19-a2b1229a72ff','d3ad62c1-822c-42a8-95a0-bd9f76d4ce23',3732000,3000000,20000,2,100000,4000,20000,6,123,'2023-01-10 00:00:00.000'),('51d0de98-ea3f-4f99-b516-6eae9e07a6c2','b13482de-a825-42d8-a1d3-f722722dbe3d',3267999,2500000,19999,2,80000,4000,20000,5,142,'2023-02-10 00:00:00.000'),('5cd6343c-b34a-4f14-9f67-8e015c208b7d','e69ad900-8189-49c5-8bb0-166b40e85b9e',3392000,2700000,20000,2,100000,4000,20000,4,123,'2022-12-10 00:00:00.000'),('5cfe683e-baa1-40f2-868e-46c288bfd3f7','b13482de-a825-42d8-a1d3-f722722dbe3d',3327999,2500000,19999,2,80000,4000,20000,6,152,'2023-01-10 00:00:00.000'),('63117c19-3865-48fa-8fbe-4d6ef1c1d35a','b13482de-a825-42d8-a1d3-f722722dbe3d',3335999,2500000,19999,2,80000,4000,20000,6,154,'2022-11-10 00:00:00.000'),('6e714127-ba57-4b3c-9ffb-f386bf527f07','2aafc09b-2f87-4de3-a876-5a0ac69c0eeb',3788000,3000000,20000,2,100000,4000,20000,7,132,'2023-04-10 00:00:00.000'),('6fb7ad68-4583-4cf9-91bb-8463e8e12c93','5d91b98e-2293-4319-90cc-dcd6eab0fd73',3268000,2500000,20000,2,80000,4000,20000,5,142,'2023-04-10 00:00:00.000'),('76656528-77df-4065-99da-a5737f63f2a6','e69ad900-8189-49c5-8bb0-166b40e85b9e',3412000,2700000,20000,2,100000,4000,20000,5,123,'2022-11-10 00:00:00.000'),('792f1d94-3a4c-4adf-b6a6-ffd214e6b08b','2aafc09b-2f87-4de3-a876-5a0ac69c0eeb',3888000,3000000,20000,2,100000,4000,20000,8,152,'2022-11-10 00:00:00.000'),('80681ac7-7605-4bbc-b86f-bc9feab5e545','5d91b98e-2293-4319-90cc-dcd6eab0fd73',3292000,2500000,20000,2,80000,4000,20000,10,123,'2022-11-10 00:00:00.000'),('8f3b681f-32e4-4df2-9597-3f7e7771ea0e','89a7b80c-456d-4d6b-a20e-be45c7ee385e',3588000,2700000,20000,2,100000,4000,20000,8,152,'2022-11-10 00:00:00.000'),('9689516c-15a8-4d57-99dd-5dee22d88c90','97d08474-670d-4180-b1e9-6fed30e4d654',3756000,3000000,20000,2,80000,4000,20000,8,124,'2023-04-10 00:00:00.000'),('9c1f9a80-8293-4ec9-a43d-2c2b35e5bb96','d602561c-874a-4511-bf33-5697082bfb2b',3852000,3000000,20000,2,100000,4000,20000,8,143,'2023-04-10 00:00:00.000'),('af4af6f8-8b4e-4906-9165-791cf3f3e53b','b13482de-a825-42d8-a1d3-f722722dbe3d',3231999,2500000,19999,1,80000,4000,20000,7,123,'2023-05-18 08:48:32.325'),('be795ac3-e4fa-440c-9364-2f8e5ecbfc59','b13482de-a825-42d8-a1d3-f722722dbe3d',3267999,2500000,19999,2,80000,4000,20000,5,142,'2023-03-10 00:00:00.000'),('c2f66c41-e78d-4f97-b6f0-7f8c216ebba7','b13482de-a825-42d8-a1d3-f722722dbe3d',3367999,2500000,19999,1,80000,4000,20000,9,147,'2023-05-20 02:17:40.535'),('c7759c69-068b-48cb-aa81-a91fe9e73543','b13482de-a825-42d8-a1d3-f722722dbe3d',3171999,2500000,19999,2,80000,4000,20000,4,123,'2022-11-10 00:00:00.000'),('d6bae0ee-f238-4fd7-8494-7773c268a91a','b13482de-a825-42d8-a1d3-f722722dbe3d',3171999,2500000,19999,2,80000,4000,20000,4,123,'2023-04-10 00:00:00.000'),('e3ab6209-46be-4fdb-b12f-92c06a9406b0','d3ad62c1-822c-42a8-95a0-bd9f76d4ce23',3792000,3000000,20000,2,100000,4000,20000,5,143,'2023-04-10 00:00:00.000'),('e5789a25-8166-4f1c-a3a6-4381b9fc8ab4','97d08474-670d-4180-b1e9-6fed30e4d654',3888000,3000000,20000,2,80000,4000,20000,9,152,'2022-11-10 00:00:00.000'),('e75f7a1f-8875-4de9-9492-b833e36824c3','b13482de-a825-42d8-a1d3-f722722dbe3d',3171999,2500000,19999,2,80000,4000,20000,4,123,'2022-10-10 00:00:00.000'),('eb691d38-37cb-49e7-8dfe-6972e0a85af6','b13482de-a825-42d8-a1d3-f722722dbe3d',3235999,2500000,19999,2,80000,4000,20000,7,124,'2022-12-10 00:00:00.000'),('f2f33d0d-fccf-4228-add8-78216179b0ed','2aafc09b-2f87-4de3-a876-5a0ac69c0eeb',4168000,3000000,20000,2,100000,4000,20000,6,232,'2023-01-10 00:00:00.000'),('f60be34c-a027-4892-b89e-5d669cc3294d','5d91b98e-2293-4319-90cc-dcd6eab0fd73',3328000,2500000,20000,2,80000,4000,20000,8,142,'2022-12-10 00:00:00.000'),('f8bb89a3-b8cf-42eb-b0bc-2d61a726bd48','5d91b98e-2293-4319-90cc-dcd6eab0fd73',3356000,2500000,20000,2,80000,4000,20000,7,154,'2023-03-10 00:00:00.000');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `amountOfPeople` int DEFAULT NULL,
  `payment` double NOT NULL,
  `area` double DEFAULT NULL,
  `floor` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `electricFee` double DEFAULT NULL,
  `domesticWaterFee` double DEFAULT NULL,
  `internetFee` double DEFAULT NULL,
  `limitPeople` double DEFAULT NULL,
  `environmentFee` double DEFAULT NULL,
  `buildingId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `motorbikeAmount` int DEFAULT NULL,
  `dateStart` datetime(3) DEFAULT NULL,
  `dateEnd` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Room_buildingId_fkey` (`buildingId`),
  CONSTRAINT `Room_buildingId_fkey` FOREIGN KEY (`buildingId`) REFERENCES `building` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES ('2aafc09b-2f87-4de3-a876-5a0ac69c0eeb','Phòng 006',1,0,3000000,30,'Tầng 3',4000,20000,100000,4,20000,'4e273d7c-8a5b-42bb-b8ed-c2fec8f96e5e',0,NULL,NULL),('5d91b98e-2293-4319-90cc-dcd6eab0fd73','Phòng 002',2,1,2500000,28,'Tầng 1',4000,20000,80000,4,20000,'4e273d7c-8a5b-42bb-b8ed-c2fec8f96e5e',0,'2021-05-03 00:00:00.000','2024-05-16 00:00:00.000'),('89a7b80c-456d-4d6b-a20e-be45c7ee385e','Phòng 004',1,0,2700000,30,'Tầng 2',4000,20000,100000,4,20000,'4e273d7c-8a5b-42bb-b8ed-c2fec8f96e5e',0,NULL,NULL),('97d08474-670d-4180-b1e9-6fed30e4d654','Phòng 005',1,0,3000000,28,'Tầng 3',4000,20000,80000,4,20000,'4e273d7c-8a5b-42bb-b8ed-c2fec8f96e5e',0,NULL,NULL),('b13482de-a825-42d8-a1d3-f722722dbe3d','Phòng 001',2,2,2500000,28,'Tầng 1',4000,20000,80000,4,19999,'4e273d7c-8a5b-42bb-b8ed-c2fec8f96e5e',0,'2019-04-08 00:00:00.000','2023-06-07 00:00:00.000'),('d3ad62c1-822c-42a8-95a0-bd9f76d4ce23','Phòng 008',1,0,3000000,35,'Tầng 4',4000,20000,100000,5,20000,'4e273d7c-8a5b-42bb-b8ed-c2fec8f96e5e',0,NULL,NULL),('d602561c-874a-4511-bf33-5697082bfb2b','Phòng 007',2,1,3000000,30,'Tầng 4',4000,20000,100000,5,20000,'4e273d7c-8a5b-42bb-b8ed-c2fec8f96e5e',0,'2021-05-10 00:00:00.000','2023-05-25 00:00:00.000'),('e69ad900-8189-49c5-8bb0-166b40e85b9e','Phòng 003',2,1,2700000,30,'Tầng 2',4000,20000,100000,4,20000,'4e273d7c-8a5b-42bb-b8ed-c2fec8f96e5e',0,'2023-05-14 00:00:00.000','2024-05-16 00:00:00.000');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ward` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateOfBirth` datetime(3) DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `citizenIdentificationNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateRange` datetime(3) DEFAULT NULL,
  `issuedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permanentAddress` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`),
  UNIQUE KEY `User_password_key` (`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('e4da1c5c-76ea-4f9c-8439-5723816d1fd4','f392c340-4d0a-11ec-9d84-6defbc1b7d9c.png','Hồ Minh Hải','haiacoustic25@gmail.com','vwodnnbsswdjyjtp','40','423','17266',NULL,NULL,NULL,NULL,NULL,NULL,'0328641477','hominhhai','$argon2id$v=19$m=65536,t=3,p=4$V7efq2ePgiP2iZ+JiPR0iA$o+eLJmyLgsEeRCLm85RB15rDr/HPbmCPWc9WM9Wj4Uc','2023-05-17 02:46:03.705');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-25 14:03:55
