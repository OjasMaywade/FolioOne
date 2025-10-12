CREATE DATABASE  IF NOT EXISTS `portfolio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `portfolio`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: portfolio
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `author_id` int NOT NULL,
  `status` enum('published','draft','unlisted') NOT NULL DEFAULT 'draft',
  PRIMARY KEY (`id`),
  KEY `blogger` (`author_id`),
  CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES (1,'CORS','CORS - Cross origin resourse sharing','2025-09-27 01:08:21','2025-10-02 21:05:25',12,'draft'),(4,'Authentication','Authentication is very neseccary for user verification, it help identify user and user data.','2025-10-05 21:19:32','2025-10-10 00:49:08',12,'unlisted');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_likes`
--

DROP TABLE IF EXISTS `blog_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blog_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `U_blog_likes` (`user_id`,`blog_id`),
  KEY `blog_id` (`blog_id`),
  CONSTRAINT `blog_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `blog_likes_ibfk_2` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_likes`
--

LOCK TABLES `blog_likes` WRITE;
/*!40000 ALTER TABLE `blog_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_media`
--

DROP TABLE IF EXISTS `blog_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `media_url` varchar(255) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `blog_id` int NOT NULL,
  `uploaded_by` int NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `blog_id` (`blog_id`),
  KEY `uploaded_by` (`uploaded_by`),
  CONSTRAINT `blog_media_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`),
  CONSTRAINT `blog_media_ibfk_2` FOREIGN KEY (`uploaded_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_media`
--

LOCK TABLES `blog_media` WRITE;
/*!40000 ALTER TABLE `blog_media` DISABLE KEYS */;
INSERT INTO `blog_media` VALUES (1,'https://s3.eu-north-1.amazonaws.com/bucket.portfolio-app-public/noori_blogImage-1759342461122.png',NULL,1,12,'2025-10-01 18:14:22',NULL),(2,'https://s3.eu-north-1.amazonaws.com/bucket.portfolio-app-public/noori_blogImage-1759342942968.png',NULL,1,12,'2025-10-01 18:22:24',NULL),(3,'https://s3.eu-north-1.amazonaws.com/bucket.portfolio-app-public/noori_blogImage-1759343008113.png',NULL,1,12,'2025-10-01 18:23:30',NULL),(4,'https://s3.eu-north-1.amazonaws.com/bucket.portfolio-app-public/noori_blogImage-1759343475762.png',NULL,1,12,'2025-10-01 18:31:17',NULL),(5,'https://s3.eu-north-1.amazonaws.com/bucket.portfolio-app-public/noori_blogImage-1759344172077.png',NULL,1,12,'2025-10-01 18:42:54',NULL),(6,'https://s3.eu-north-1.amazonaws.com/bucket.portfolio-app-public/noori_blogImage-1759344649648.png',NULL,1,12,'2025-10-01 18:50:55',NULL),(7,'https://s3.eu-north-1.amazonaws.com/bucket.portfolio-app-public/noori_blogImage-1759346937181.png','Diagram',1,12,'2025-10-01 19:28:58',NULL);
/*!40000 ALTER TABLE `blog_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `blog_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `U_bookmarks` (`user_id`,`blog_id`),
  KEY `blog_id` (`blog_id`),
  CONSTRAINT `bookmark_ibfk_3` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookmark_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `user_id` int NOT NULL,
  `blog_id` int NOT NULL,
  `parent_comment` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('edited','deleted') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `blog_id` (`blog_id`),
  KEY `user_id` (`user_id`),
  KEY `parent_comment` (`parent_comment`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comment_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comment_ibfk_5` FOREIGN KEY (`parent_comment`) REFERENCES `comment` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_likes`
--

DROP TABLE IF EXISTS `comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `U_comment_likes` (`user_id`,`comment_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `comment_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `comment_likes_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_likes`
--

LOCK TABLES `comment_likes` WRITE;
/*!40000 ALTER TABLE `comment_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `finance`
--

DROP TABLE IF EXISTS `finance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `finance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `transaction_method` enum('cash','card','UPI','other') NOT NULL,
  `transaction_type` enum('credited','debited') NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(255) DEFAULT NULL,
  `category` enum('Restaurants','Groceries','Education','Bills','Public Transit','Gift','Maintenance','Other') DEFAULT NULL,
  `bill_img` varchar(255) DEFAULT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `finance_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finance`
--

LOCK TABLES `finance` WRITE;
/*!40000 ALTER TABLE `finance` DISABLE KEYS */;
/*!40000 ALTER TABLE `finance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribers`
--

DROP TABLE IF EXISTS `subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscribers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subscriber_id` int NOT NULL,
  `author_id` int NOT NULL,
  `notification_enableed` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `U_subscriber` (`subscriber_id`,`author_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `subscribers_ibfk_1` FOREIGN KEY (`subscriber_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `subscribers_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribers`
--

LOCK TABLES `subscribers` WRITE;
/*!40000 ALTER TABLE `subscribers` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo`
--

DROP TABLE IF EXISTS `todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `due_date` timestamp NULL DEFAULT NULL,
  `markAsCompleted` tinyint(1) NOT NULL,
  `priorityLevel` enum('High','Low','Medium') NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int NOT NULL,
  `parentTodoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `parentTodoId` (`parentTodoId`),
  CONSTRAINT `todo_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `todo_ibfk_2` FOREIGN KEY (`parentTodoId`) REFERENCES `todo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo`
--

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;
/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `profilepic` varchar(512) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `refreshtoken` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_key` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ojas','maywade','ojasmaywade','ojasmaywade16@gmail.com',NULL,'weuary2cle','123','2025-08-19 21:50:08','2025-08-19 21:50:08',NULL),(4,'bhuru','maywade','bhuru','bhurumaywade@gmail.com',NULL,'$2b$10$RjAAUdhWozUbj43shLeQt.QKvqLwf/J0vXtwXOwgOaOVUSvBU6zWa','123','2025-08-24 20:05:07','2025-08-24 20:05:07',NULL),(6,'Kalu','maywade','Kalu','kaulmaywade11@gmail.com',NULL,'$2b$10$NDlr7Bt2YnEpQI9jJmsN4OjtJOtJpNZGtl54UsUQ8N0erWuVTJqp.','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzU2NDc3MzU1LCJleHAiOjE3NTczNDEzNTV9.-VWjMZm6jpLFWNtnSXseLeoKybK-kal__UR50Lk4sPs','2025-08-26 21:55:26','2025-08-29 14:22:35',NULL),(7,'boki','maywade','boki','bokimaywade20@gmail.com',NULL,'$2b$10$GM33dNRLLOSwv4PLSJKiV.3meFrchcaqasnJEPbRpqq7EPKJmDtJ6','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzYwMDU2NjA3LCJleHAiOjE3NjA5MjA2MDd9.5nEjg_Yr9EINPND8OtNAGLUR0iU5-ZV8gR84onXjlwU','2025-08-26 22:12:57','2025-10-10 00:36:47',NULL),(9,'chutki','maywade','chutki','chutkimaywade20@gmail.com',NULL,'$2b$10$AY.ssp8pL7dLiN44F4369uI2VqZQQWKC2zda8MXNCiuZ297D0.h/K',NULL,'2025-08-30 12:52:27','2025-08-30 12:52:27',NULL),(10,'chutki','maywade','chutki2','chutkimaywade2@gmail.com',NULL,'$2b$10$l4BKNsUErN06Zevi7Owa0.NQUR8S.ivZAUryOjF9k5IdXzs2sYjlq',NULL,'2025-08-30 13:30:39','2025-08-30 13:30:39',NULL),(11,'didi','maywade','didi','didimaywade2@gmail.com',NULL,'$2b$10$AjAQaFbEOmXQsKH155vXquyr15xFSdJlLK9ZI3bkpHVEMAsSMSijO',NULL,'2025-08-30 13:35:14','2025-08-30 13:35:14',NULL),(12,'noori','maywade','noori','noorimaywade2@gmail.com','https://s3.eu-north-1.amazonaws.com/bucket.portfolio-app-public/noori_profilepic-1758588992953.jpg','$2b$10$M31JoXfdy0A./8ebyalynudHDmd43IvukGldD76iR3QgOmEDfqpXC','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTc2MDA1NzMxNCwiZXhwIjoxNzYwOTIxMzE0fQ.-xj3rRpy4PMHezSSHHjxDwew2MLXPTBXqxL923wGLOU','2025-09-01 12:20:04','2025-10-10 00:48:34','noori_profilepic-1758588992953.jpg'),(13,'Kaali','Raut','Kuki','kuki@gmail.com',NULL,'$2b$10$svOTT7cAhkz/KsdErr6LEe0anPr8EXl3Bb9HY8hxuNHA8gAHFIvJ.',NULL,'2025-09-01 12:33:48','2025-09-01 12:33:48',NULL);
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

-- Dump completed on 2025-10-11 23:56:25
