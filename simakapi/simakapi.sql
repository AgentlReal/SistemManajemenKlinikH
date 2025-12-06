-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: simakapi
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `antrian`
--

DROP TABLE IF EXISTS `antrian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `antrian` (
  `id_antrian` int NOT NULL AUTO_INCREMENT,
  `id_resepsionis` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_dokter` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_pasien` int DEFAULT NULL,
  `tanggal` datetime DEFAULT CURRENT_TIMESTAMP,
  `keluhan` text COLLATE utf8mb4_unicode_ci,
  `nomor_antrian` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keterangan` enum('Menunggu','Berlangsung','Selesai','Batal') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Menunggu',
  PRIMARY KEY (`id_antrian`),
  KEY `id_resepsionis` (`id_resepsionis`),
  KEY `id_dokter` (`id_dokter`),
  KEY `id_pasien` (`id_pasien`),
  CONSTRAINT `antrian_ibfk_1` FOREIGN KEY (`id_resepsionis`) REFERENCES `resepsionis` (`id_resepsionis`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `antrian_ibfk_2` FOREIGN KEY (`id_dokter`) REFERENCES `dokter` (`id_dokter`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `antrian_ibfk_3` FOREIGN KEY (`id_pasien`) REFERENCES `pasien` (`id_pasien`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `antrian`
--

LOCK TABLES `antrian` WRITE;
/*!40000 ALTER TABLE `antrian` DISABLE KEYS */;
INSERT INTO `antrian` VALUES (1,'R001','D001',1,'2025-11-03 08:00:00','Demam dan batuk sudah 3 hari','A001','Selesai'),(2,'R001','D002',2,'2025-11-03 08:15:00','Sakit gigi geraham belakang','A002','Selesai'),(4,'R001','D001',4,'2025-11-03 08:45:00','Pusing dan mual','A004','Selesai'),(5,'R001','D004',5,'2025-11-03 09:00:00','Gatal-gatal di kulit','A005','Selesai'),(6,'R001','D005',6,'2025-11-03 09:15:00','Mata merah dan berair','A006','Selesai'),(7,'R001','D002',7,'2025-11-03 09:30:00','Gigi berlubang','A007','Selesai'),(8,'R001','D003',8,'2025-11-03 09:45:00','Kontrol rutin anak','A008','Selesai'),(9,'R001','D003',8,'2025-11-07 16:23:46','Sakit punggung','A001','Selesai'),(10,'R001','D004',13,'2025-11-14 09:10:36','Pegal pegal di punggung selama 1 minggu terakhir','A001','Selesai'),(11,'R001','D002',4,'2025-11-14 09:17:38','Pegal pegal di punggung selama 2 minggu','A002','Selesai'),(12,'R001','D003',12,'2025-11-28 06:57:18','Pegal pegal di punggung selama 4 minggu terakhir','A001','Selesai'),(13,'R001','D003',9,'2025-11-28 08:39:31','Kontrol rutin','A002','Selesai'),(14,'R001','D005',14,'2025-11-28 11:07:09','Pegal pegal di punggung selama 3 minggu','A003','Selesai'),(15,'R001','D001',15,'2025-11-28 12:16:40','Pegal pegal di punggung selama 4 minggu terakhir','A004','Selesai'),(16,'R001','D004',6,'2025-12-04 00:00:00','Gatal-gatal di seluruh kulit','A001','Selesai'),(17,'R001','D006',1,'2025-12-04 18:41:15','Demam selama 3 hari','A002','Selesai'),(18,'R001','D004',16,'2025-12-06 10:49:54','Gatal-gatal di seluruh kulit','A001','Selesai'),(19,'R001','D001',1,'2025-12-06 12:56:20','Pusing kepala','A002','Menunggu'),(20,'R001','D001',5,'2025-12-06 13:09:38','Kurang enak badan','A003','Menunggu');
/*!40000 ALTER TABLE `antrian` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `auto_create_transaksi_insert` AFTER INSERT ON `antrian` FOR EACH ROW BEGIN
    DECLARE kasir_terpilih CHAR(4);
    
    -- Pilih kasir secara acak
    SELECT id_kasir INTO kasir_terpilih 
    FROM kasir 
    ORDER BY RAND() 
    LIMIT 1;
    
    -- Langsung buat transaksi pembayaran
    INSERT INTO transaksi_pembayaran (
        id_antrian, 
        id_kasir, 
        status_pembayaran, 
        metode_pembayaran,
        tanggal_transaksi
    ) VALUES (
        NEW.id_antrian,
        kasir_terpilih,
        'Belum Lunas',
        NULL,
        NOW()
    );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dokter`
--

DROP TABLE IF EXISTS `dokter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dokter` (
  `id_dokter` char(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_poli` int DEFAULT NULL,
  `nama` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `gaji` int DEFAULT NULL,
  `nomor_telepon` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spesialis` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nomor_lisensi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_dokter`),
  UNIQUE KEY `nomor_lisensi` (`nomor_lisensi`),
  UNIQUE KEY `nomor_telepon` (`nomor_telepon`),
  KEY `id_poli` (`id_poli`),
  CONSTRAINT `dokter_ibfk_1` FOREIGN KEY (`id_poli`) REFERENCES `poli` (`id_poli`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dokter`
--

LOCK TABLES `dokter` WRITE;
/*!40000 ALTER TABLE `dokter` DISABLE KEYS */;
INSERT INTO `dokter` VALUES ('D001',1,'Dr. Ahmad Wijaya','1980-05-15',15000000,'081234567890','Penyakit Dalam','IDI-12345','Laki-laki','Jl. Merdeka No. 45, Jakarta'),('D002',2,'Dr. Sari Dewi','1985-08-22',14500000,'081234567891','Kedokteran Gigi','IDI-12346','Perempuan','Jl. Melati No. 12, Jakarta'),('D003',3,'Dr. Budi Santoso','1978-12-10',16000000,'081234567892','Anak','IDI-12347','Laki-laki','Jl. Kenanga No. 8, Jakarta'),('D004',4,'Dr. Maya Sari','1982-03-25',15500000,'081234567893','Kulit dan Kelamin','IDI-12348','Perempuan','Jl. Anggrek No. 15, Jakarta'),('D005',5,'Dr. Rudi Hermawan','1975-11-30',16500000,'081234567894','Mata','IDI-12349','Laki-laki','Jl. Mawar No. 20, Jakarta'),('D006',1,'Dr. Hendra Kurniawan','1979-03-18',17500000,'081298765432','Kardiologi','IDI-12370','Laki-laki','Jl. Jantung Sehat No. 15, Jakarta');
/*!40000 ALTER TABLE `dokter` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `auto_increment_id_dokter` BEFORE INSERT ON `dokter` FOR EACH ROW BEGIN
    DECLARE next_id INT;
    DECLARE new_id CHAR(4);
    
    -- Cari id terakhir
    SELECT COALESCE(MAX(CAST(SUBSTRING(id_dokter, 2) AS UNSIGNED)), 0) + 1 
    INTO next_id 
    FROM dokter 
    WHERE id_dokter LIKE 'D%';
    
    -- Format id baru: D + angka 3 digit
    SET new_id = CONCAT('D', LPAD(next_id, 3, '0'));
    
    -- Set id baru jika tidak disediakan
    IF NEW.id_dokter IS NULL OR NEW.id_dokter = '' THEN
        SET NEW.id_dokter = new_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `sync_users_on_dokter_update` AFTER UPDATE ON `dokter` FOR EACH ROW BEGIN
    -- Jika nama berubah, update tabel users
    IF OLD.nama != NEW.nama THEN
        UPDATE users 
        SET name = NEW.nama
        WHERE id_dokter = NEW.id_dokter;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hasil_lab`
--

DROP TABLE IF EXISTS `hasil_lab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hasil_lab` (
  `id_hasil_lab` int NOT NULL AUTO_INCREMENT,
  `id_staf_lab` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_rekam_medis` int DEFAULT NULL,
  `jenis_pemeriksaan` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_pemeriksaan` datetime DEFAULT CURRENT_TIMESTAMP,
  `keterangan` text COLLATE utf8mb4_unicode_ci,
  `hasil_pemeriksaan` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_hasil_lab`),
  KEY `id_staf_lab` (`id_staf_lab`),
  KEY `id_rekam_medis` (`id_rekam_medis`),
  CONSTRAINT `hasil_lab_ibfk_1` FOREIGN KEY (`id_staf_lab`) REFERENCES `staf_lab` (`id_staf_lab`),
  CONSTRAINT `hasil_lab_ibfk_2` FOREIGN KEY (`id_rekam_medis`) REFERENCES `rekam_medis` (`id_rekam_medis`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hasil_lab`
--

LOCK TABLES `hasil_lab` WRITE;
/*!40000 ALTER TABLE `hasil_lab` DISABLE KEYS */;
INSERT INTO `hasil_lab` VALUES (1,'L001',1,'Pemeriksaan Gula Darah','2025-11-03 09:00:00','Pemeriksaan rutin untuk pasien demam','Normal'),(2,'L002',1,'Pemeriksaan Kolesterol','2025-11-03 09:05:00','Pemeriksaan gula darah puasa','110 mg/dL (Normal)'),(3,'L003',2,'Pemeriksaan Urin','2025-11-03 09:10:00','Pemeriksaan urin rutin','Normal');
/*!40000 ALTER TABLE `hasil_lab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jadwal_karyawan`
--

DROP TABLE IF EXISTS `jadwal_karyawan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jadwal_karyawan` (
  `id_jadwal` int NOT NULL AUTO_INCREMENT,
  `id_resepsionis` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_dokter` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_staf_lab` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_kasir` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jam_mulai` time DEFAULT NULL,
  `jam_selesai` time DEFAULT NULL,
  `senin` tinyint(1) DEFAULT '0',
  `selasa` tinyint(1) DEFAULT '0',
  `rabu` tinyint(1) DEFAULT '0',
  `kamis` tinyint(1) DEFAULT '0',
  `jumat` tinyint(1) DEFAULT '0',
  `sabtu` tinyint(1) DEFAULT '0',
  `minggu` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_jadwal`),
  KEY `id_resepsionis` (`id_resepsionis`),
  KEY `id_dokter` (`id_dokter`),
  KEY `id_staf_lab` (`id_staf_lab`),
  KEY `id_kasir` (`id_kasir`),
  CONSTRAINT `jadwal_karyawan_ibfk_1` FOREIGN KEY (`id_resepsionis`) REFERENCES `resepsionis` (`id_resepsionis`),
  CONSTRAINT `jadwal_karyawan_ibfk_2` FOREIGN KEY (`id_dokter`) REFERENCES `dokter` (`id_dokter`),
  CONSTRAINT `jadwal_karyawan_ibfk_3` FOREIGN KEY (`id_staf_lab`) REFERENCES `staf_lab` (`id_staf_lab`),
  CONSTRAINT `jadwal_karyawan_ibfk_4` FOREIGN KEY (`id_kasir`) REFERENCES `kasir` (`id_kasir`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jadwal_karyawan`
--

LOCK TABLES `jadwal_karyawan` WRITE;
/*!40000 ALTER TABLE `jadwal_karyawan` DISABLE KEYS */;
INSERT INTO `jadwal_karyawan` VALUES (1,'R001',NULL,NULL,NULL,'07:00:00','15:00:00',1,1,1,1,1,1,1),(2,'R002',NULL,NULL,NULL,'08:00:00','16:00:00',1,1,1,1,1,1,1),(3,'R003',NULL,NULL,NULL,'13:00:00','21:00:00',1,1,1,1,1,1,1),(4,NULL,'D001',NULL,NULL,'08:00:00','23:59:00',1,1,1,1,1,1,1),(5,NULL,'D002',NULL,NULL,'09:00:00','13:00:00',1,1,1,1,1,1,1),(6,NULL,'D003',NULL,NULL,'10:00:00','14:00:00',1,1,1,1,1,1,1),(7,NULL,'D004',NULL,NULL,'07:00:00','23:59:00',1,1,1,1,1,1,1),(8,NULL,'D005',NULL,NULL,'14:00:00','18:00:00',1,1,1,1,1,1,1),(9,NULL,NULL,'L001',NULL,'07:30:00','15:30:00',1,1,1,1,1,1,1),(10,NULL,NULL,'L002',NULL,'08:00:00','16:00:00',1,1,1,1,1,1,1),(11,NULL,NULL,'L003',NULL,'13:00:00','21:00:00',1,1,1,1,1,1,1),(12,NULL,NULL,NULL,'K001','07:00:00','15:00:00',1,1,1,1,1,1,1),(13,NULL,NULL,NULL,'K002','08:00:00','16:00:00',1,1,1,1,1,1,1),(14,NULL,NULL,NULL,'K003','13:00:00','21:00:00',1,1,1,1,1,1,1),(15,NULL,'D006',NULL,NULL,'08:00:00','17:00:00',1,1,1,1,1,1,1);
/*!40000 ALTER TABLE `jadwal_karyawan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kasir`
--

DROP TABLE IF EXISTS `kasir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kasir` (
  `id_kasir` char(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `nomor_telepon` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  `gaji` int DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_kasir`),
  UNIQUE KEY `nomor_telepon` (`nomor_telepon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kasir`
--

LOCK TABLES `kasir` WRITE;
/*!40000 ALTER TABLE `kasir` DISABLE KEYS */;
INSERT INTO `kasir` VALUES ('K001','Fajar Setiawan','1993-02-20','081567890123','Jl. Sakura No. 21, Jakarta',5500000,'Laki-laki'),('K002','Gita Permata','1994-08-15','081567890124','Jl. Lavender No. 23, Jakarta',5400000,'Perempuan'),('K003','Hendra Gunawan','1992-12-08','081567890125','Jl. Dahlia No. 25, Jakarta',5600000,'Laki-laki');
/*!40000 ALTER TABLE `kasir` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `auto_increment_id_kasir` BEFORE INSERT ON `kasir` FOR EACH ROW BEGIN
    DECLARE next_id INT;
    DECLARE new_id CHAR(4);
    
    -- Cari id terakhir
    SELECT COALESCE(MAX(CAST(SUBSTRING(id_kasir, 2) AS UNSIGNED)), 0) + 1 
    INTO next_id 
    FROM kasir 
    WHERE id_kasir LIKE 'K%';
    
    -- Format id baru: K + angka 3 digit
    SET new_id = CONCAT('K', LPAD(next_id, 3, '0'));
    
    -- Set id baru jika tidak disediakan
    IF NEW.id_kasir IS NULL OR NEW.id_kasir = '' THEN
        SET NEW.id_kasir = new_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `sync_users_on_kasir_update` AFTER UPDATE ON `kasir` FOR EACH ROW BEGIN
    -- Jika nama berubah, update tabel users
    IF OLD.nama != NEW.nama THEN
        UPDATE users 
        SET name = NEW.nama
        WHERE id_kasir = NEW.id_kasir;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `klinik`
--

DROP TABLE IF EXISTS `klinik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `klinik` (
  `id_klinik` int NOT NULL AUTO_INCREMENT,
  `nama_klinik` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `izin_operasional` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  `nomor_telepon` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jam_operasional` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_klinik`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `klinik`
--

LOCK TABLES `klinik` WRITE;
/*!40000 ALTER TABLE `klinik` DISABLE KEYS */;
INSERT INTO `klinik` VALUES (1,'Klinik Haikhah','503/1256/DINKES/2024','Jl. Kesehatan No. 123, Jakarta Pusat','0815567890','klinikhaikhah@gmail.com','24 Jam');
/*!40000 ALTER TABLE `klinik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (9,'0001_01_01_000000_create_users_table',1),(10,'0001_01_01_000001_create_cache_table',1),(11,'0001_01_01_000002_create_jobs_table',1),(12,'2025_10_20_002259_create_personal_access_tokens_table',1),(13,'2025_10_19_103117_create_students_table',2),(14,'2025_11_06_023222_create_antrian_table',0),(15,'2025_11_06_023222_create_cache_table',0),(16,'2025_11_06_023222_create_cache_locks_table',0),(17,'2025_11_06_023222_create_dokter_table',0),(18,'2025_11_06_023222_create_failed_jobs_table',0),(19,'2025_11_06_023222_create_hasil_lab_table',0),(20,'2025_11_06_023222_create_jadwal_karyawan_table',0),(21,'2025_11_06_023222_create_job_batches_table',0),(22,'2025_11_06_023222_create_jobs_table',0),(23,'2025_11_06_023222_create_kasir_table',0),(24,'2025_11_06_023222_create_klinik_table',0),(25,'2025_11_06_023222_create_pasien_table',0),(26,'2025_11_06_023222_create_password_reset_tokens_table',0),(27,'2025_11_06_023222_create_penggunaan_layanan_table',0),(28,'2025_11_06_023222_create_personal_access_tokens_table',0),(29,'2025_11_06_023222_create_poli_table',0),(30,'2025_11_06_023222_create_rekam_medis_table',0),(31,'2025_11_06_023222_create_resep_dokter_table',0),(32,'2025_11_06_023222_create_resepsionis_table',0),(33,'2025_11_06_023222_create_sessions_table',0),(34,'2025_11_06_023222_create_soap_table',0),(35,'2025_11_06_023222_create_staf_lab_table',0),(36,'2025_11_06_023222_create_students_table',0),(37,'2025_11_06_023222_create_tarif_layanan_table',0),(38,'2025_11_06_023222_create_transaksi_pembayaran_table',0),(39,'2025_11_06_023222_create_users_table',0),(40,'2025_11_06_023223_create_view_jadwal_karyawan_lengkap_view',0),(41,'2025_11_06_023223_create_view_karyawan_tanpa_jadwal_view',0),(42,'2025_11_06_023225_add_foreign_keys_to_antrian_table',0),(43,'2025_11_06_023225_add_foreign_keys_to_dokter_table',0),(44,'2025_11_06_023225_add_foreign_keys_to_hasil_lab_table',0),(45,'2025_11_06_023225_add_foreign_keys_to_jadwal_karyawan_table',0),(46,'2025_11_06_023225_add_foreign_keys_to_penggunaan_layanan_table',0),(47,'2025_11_06_023225_add_foreign_keys_to_rekam_medis_table',0),(48,'2025_11_06_023225_add_foreign_keys_to_resep_dokter_table',0),(49,'2025_11_06_023225_add_foreign_keys_to_soap_table',0),(50,'2025_11_06_023225_add_foreign_keys_to_transaksi_pembayaran_table',0),(51,'2025_11_06_054043_create_pasien_table',0),(52,'2025_11_06_075335_create_users_table',0),(53,'2025_11_07_035047_create_antrian_table',0),(54,'2025_11_07_035047_create_cache_table',0),(55,'2025_11_07_035047_create_cache_locks_table',0),(56,'2025_11_07_035047_create_dokter_table',0),(57,'2025_11_07_035047_create_failed_jobs_table',0),(58,'2025_11_07_035047_create_hasil_lab_table',0),(59,'2025_11_07_035047_create_jadwal_karyawan_table',0),(60,'2025_11_07_035047_create_job_batches_table',0),(61,'2025_11_07_035047_create_jobs_table',0),(62,'2025_11_07_035047_create_kasir_table',0),(63,'2025_11_07_035047_create_klinik_table',0),(64,'2025_11_07_035047_create_pasien_table',0),(65,'2025_11_07_035047_create_password_reset_tokens_table',0),(66,'2025_11_07_035047_create_penggunaan_layanan_table',0),(67,'2025_11_07_035047_create_personal_access_tokens_table',0),(68,'2025_11_07_035047_create_poli_table',0),(69,'2025_11_07_035047_create_rekam_medis_table',0),(70,'2025_11_07_035047_create_resep_dokter_table',0),(71,'2025_11_07_035047_create_resepsionis_table',0),(72,'2025_11_07_035047_create_sessions_table',0),(73,'2025_11_07_035047_create_soap_table',0),(74,'2025_11_07_035047_create_staf_lab_table',0),(75,'2025_11_07_035047_create_students_table',0),(76,'2025_11_07_035047_create_tarif_layanan_table',0),(77,'2025_11_07_035047_create_transaksi_pembayaran_table',0),(78,'2025_11_07_035047_create_users_table',0),(79,'2025_11_07_035048_create_view_jadwal_karyawan_lengkap_view',0),(80,'2025_11_07_035048_create_view_karyawan_tanpa_jadwal_view',0),(81,'2025_11_07_035050_add_foreign_keys_to_antrian_table',0),(82,'2025_11_07_035050_add_foreign_keys_to_dokter_table',0),(83,'2025_11_07_035050_add_foreign_keys_to_hasil_lab_table',0),(84,'2025_11_07_035050_add_foreign_keys_to_jadwal_karyawan_table',0),(85,'2025_11_07_035050_add_foreign_keys_to_penggunaan_layanan_table',0),(86,'2025_11_07_035050_add_foreign_keys_to_rekam_medis_table',0),(87,'2025_11_07_035050_add_foreign_keys_to_resep_dokter_table',0),(88,'2025_11_07_035050_add_foreign_keys_to_soap_table',0),(89,'2025_11_07_035050_add_foreign_keys_to_transaksi_pembayaran_table',0),(90,'2025_11_07_070903_create_antrian_table',0),(91,'2025_11_07_070903_create_cache_table',0),(92,'2025_11_07_070903_create_cache_locks_table',0),(93,'2025_11_07_070903_create_dokter_table',0),(94,'2025_11_07_070903_create_failed_jobs_table',0),(95,'2025_11_07_070903_create_hasil_lab_table',0),(96,'2025_11_07_070903_create_jadwal_karyawan_table',0),(97,'2025_11_07_070903_create_job_batches_table',0),(98,'2025_11_07_070903_create_jobs_table',0),(99,'2025_11_07_070903_create_kasir_table',0),(100,'2025_11_07_070903_create_klinik_table',0),(101,'2025_11_07_070903_create_pasien_table',0),(102,'2025_11_07_070903_create_password_reset_tokens_table',0),(103,'2025_11_07_070903_create_penggunaan_layanan_table',0),(104,'2025_11_07_070903_create_personal_access_tokens_table',0),(105,'2025_11_07_070903_create_poli_table',0),(106,'2025_11_07_070903_create_rekam_medis_table',0),(107,'2025_11_07_070903_create_resep_dokter_table',0),(108,'2025_11_07_070903_create_resepsionis_table',0),(109,'2025_11_07_070903_create_sessions_table',0),(110,'2025_11_07_070903_create_soap_table',0),(111,'2025_11_07_070903_create_staf_lab_table',0),(112,'2025_11_07_070903_create_tarif_layanan_table',0),(113,'2025_11_07_070903_create_transaksi_pembayaran_table',0),(114,'2025_11_07_070903_create_users_table',0),(115,'2025_11_07_070904_create_view_jadwal_karyawan_lengkap_view',0),(116,'2025_11_07_070904_create_view_karyawan_tanpa_jadwal_view',0),(117,'2025_11_07_070904_create_view_transaksi_pembayaran_lengkap_view',0),(118,'2025_11_07_070906_add_foreign_keys_to_antrian_table',0),(119,'2025_11_07_070906_add_foreign_keys_to_dokter_table',0),(120,'2025_11_07_070906_add_foreign_keys_to_hasil_lab_table',0),(121,'2025_11_07_070906_add_foreign_keys_to_jadwal_karyawan_table',0),(122,'2025_11_07_070906_add_foreign_keys_to_penggunaan_layanan_table',0),(123,'2025_11_07_070906_add_foreign_keys_to_rekam_medis_table',0),(124,'2025_11_07_070906_add_foreign_keys_to_resep_dokter_table',0),(125,'2025_11_07_070906_add_foreign_keys_to_soap_table',0),(126,'2025_11_07_070906_add_foreign_keys_to_transaksi_pembayaran_table',0),(127,'2025_11_07_072249_create_antrian_table',0),(128,'2025_11_07_072249_create_cache_table',0),(129,'2025_11_07_072249_create_cache_locks_table',0),(130,'2025_11_07_072249_create_dokter_table',0),(131,'2025_11_07_072249_create_failed_jobs_table',0),(132,'2025_11_07_072249_create_hasil_lab_table',0),(133,'2025_11_07_072249_create_jadwal_karyawan_table',0),(134,'2025_11_07_072249_create_job_batches_table',0),(135,'2025_11_07_072249_create_jobs_table',0),(136,'2025_11_07_072249_create_kasir_table',0),(137,'2025_11_07_072249_create_klinik_table',0),(138,'2025_11_07_072249_create_pasien_table',0),(139,'2025_11_07_072249_create_password_reset_tokens_table',0),(140,'2025_11_07_072249_create_penggunaan_layanan_table',0),(141,'2025_11_07_072249_create_personal_access_tokens_table',0),(142,'2025_11_07_072249_create_poli_table',0),(143,'2025_11_07_072249_create_rekam_medis_table',0),(144,'2025_11_07_072249_create_resep_dokter_table',0),(145,'2025_11_07_072249_create_resepsionis_table',0),(146,'2025_11_07_072249_create_sessions_table',0),(147,'2025_11_07_072249_create_soap_table',0),(148,'2025_11_07_072249_create_staf_lab_table',0),(149,'2025_11_07_072249_create_tarif_layanan_table',0),(150,'2025_11_07_072249_create_transaksi_pembayaran_table',0),(151,'2025_11_07_072249_create_users_table',0),(152,'2025_11_07_072250_create_view_antrian_lengkap_view',0),(153,'2025_11_07_072250_create_view_jadwal_karyawan_lengkap_view',0),(154,'2025_11_07_072250_create_view_karyawan_tanpa_jadwal_view',0),(155,'2025_11_07_072250_create_view_transaksi_pembayaran_lengkap_view',0),(156,'2025_11_07_072252_add_foreign_keys_to_antrian_table',0),(157,'2025_11_07_072252_add_foreign_keys_to_dokter_table',0),(158,'2025_11_07_072252_add_foreign_keys_to_hasil_lab_table',0),(159,'2025_11_07_072252_add_foreign_keys_to_jadwal_karyawan_table',0),(160,'2025_11_07_072252_add_foreign_keys_to_penggunaan_layanan_table',0),(161,'2025_11_07_072252_add_foreign_keys_to_rekam_medis_table',0),(162,'2025_11_07_072252_add_foreign_keys_to_resep_dokter_table',0),(163,'2025_11_07_072252_add_foreign_keys_to_soap_table',0),(164,'2025_11_07_072252_add_foreign_keys_to_transaksi_pembayaran_table',0),(165,'2025_11_13_143912_create_antrian_table',0),(166,'2025_11_13_143912_create_cache_table',0),(167,'2025_11_13_143912_create_cache_locks_table',0),(168,'2025_11_13_143912_create_dokter_table',0),(169,'2025_11_13_143912_create_failed_jobs_table',0),(170,'2025_11_13_143912_create_hasil_lab_table',0),(171,'2025_11_13_143912_create_jadwal_karyawan_table',0),(172,'2025_11_13_143912_create_job_batches_table',0),(173,'2025_11_13_143912_create_jobs_table',0),(174,'2025_11_13_143912_create_kasir_table',0),(175,'2025_11_13_143912_create_klinik_table',0),(176,'2025_11_13_143912_create_pasien_table',0),(177,'2025_11_13_143912_create_password_reset_tokens_table',0),(178,'2025_11_13_143912_create_penggunaan_layanan_table',0),(179,'2025_11_13_143912_create_personal_access_tokens_table',0),(180,'2025_11_13_143912_create_poli_table',0),(181,'2025_11_13_143912_create_rekam_medis_table',0),(182,'2025_11_13_143912_create_resep_dokter_table',0),(183,'2025_11_13_143912_create_resepsionis_table',0),(184,'2025_11_13_143912_create_sessions_table',0),(185,'2025_11_13_143912_create_soap_table',0),(186,'2025_11_13_143912_create_staf_lab_table',0),(187,'2025_11_13_143912_create_tarif_layanan_table',0),(188,'2025_11_13_143912_create_transaksi_pembayaran_table',0),(189,'2025_11_13_143912_create_users_table',0),(190,'2025_11_13_143913_create_view_antrian_lengkap_view',0),(191,'2025_11_13_143913_create_view_dokter_lengkap_view',0),(192,'2025_11_13_143913_create_view_hasil_lab_lengkap_view',0),(193,'2025_11_13_143913_create_view_jadwal_karyawan_lengkap_view',0),(194,'2025_11_13_143913_create_view_karyawan_tanpa_jadwal_view',0),(195,'2025_11_13_143913_create_view_soap_lengkap_view',0),(196,'2025_11_13_143913_create_view_transaksi_pembayaran_lengkap_view',0),(197,'2025_11_13_143914_create_GetHasilLabByNIK_proc',0),(198,'2025_11_13_143914_create_GetPenggunaanLayananByIdPembayaran_proc',0),(199,'2025_11_13_143914_create_GetResepDokterByNIK_proc',0),(200,'2025_11_13_143914_create_GetSOAPByNIK_proc',0),(201,'2025_11_13_143915_add_foreign_keys_to_antrian_table',0),(202,'2025_11_13_143915_add_foreign_keys_to_dokter_table',0),(203,'2025_11_13_143915_add_foreign_keys_to_hasil_lab_table',0),(204,'2025_11_13_143915_add_foreign_keys_to_jadwal_karyawan_table',0),(205,'2025_11_13_143915_add_foreign_keys_to_penggunaan_layanan_table',0),(206,'2025_11_13_143915_add_foreign_keys_to_rekam_medis_table',0),(207,'2025_11_13_143915_add_foreign_keys_to_resep_dokter_table',0),(208,'2025_11_13_143915_add_foreign_keys_to_soap_table',0),(209,'2025_11_13_143915_add_foreign_keys_to_transaksi_pembayaran_table',0);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pasien`
--

DROP TABLE IF EXISTS `pasien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pasien` (
  `id_pasien` int NOT NULL AUTO_INCREMENT,
  `NIK` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nomor_telepon` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_pasien`),
  UNIQUE KEY `NIK` (`NIK`),
  UNIQUE KEY `nomor_telepon` (`nomor_telepon`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pasien`
--

LOCK TABLES `pasien` WRITE;
/*!40000 ALTER TABLE `pasien` DISABLE KEYS */;
INSERT INTO `pasien` VALUES (1,'3273011501990001','Andi Susanto','081678901234','Laki-laki','1990-01-15','Jl. Mangga No. 10, Jakarta'),(2,'3273012207850002','Siti Rahayu Kusnowo','081678901235','Perempuan','1985-07-22','Jl. Jeruk No. 12, Jakarta'),(3,'3273013003920003','Budi Prasetyo Suparman','081678901236','Laki-laki','1992-03-30','Jl. Apel No. 14, Jakarta'),(4,'3273011811880004','Maya Kusnowo','081678901237','Perempuan','1988-11-05','Jl. Durian No. 16, Jakarta'),(5,'3273010509950005','Rina Wati','081678901238','Perempuan','1995-09-18','Jl. Rambutan No. 18, Jakarta'),(6,'3273012512800006','Joko Widodo','081678901239','Laki-laki','1980-12-25','Jl. Salak No. 20, Jakarta'),(7,'3273011406930007','Dewi Anggraini','081678901240','Perempuan','1993-06-14','Jl. Semangka No. 22, Jakarta'),(8,'3273010804870008','Eko Pratama','081678901241','Laki-laki','1987-04-08','Jl. Melon No. 24, Jakarta'),(9,'3273012410020009','Bintang Sukidi','08123434332','Laki-laki','2002-10-24','Jalan Surabaya'),(11,'3273011505900010','Budi Santoso','081234567890','Laki-laki','1990-05-15','Jl. Contoh No. 123'),(12,'3201012345670323','Juan Pratama','081234567430','Laki-laki','2001-11-06','456 Oak Ave, Bandung'),(13,'3273011501990067','Naufal Pratama Wijaya','081678907563','Laki-laki','2005-11-09','Jl. Harapan 2, Sidoarjo'),(14,'3273012410020032','Firman Praka Suparman','081678901298','Laki-laki','2002-08-28','Jalan Surabaya No. 12'),(15,'3273011501990054','Hotasi Abednego','081678901265','Laki-laki','2005-03-08','Jalan Semarang No.5'),(16,'3273011501990087','Oki Prasetyo','081678901267','Perempuan','2010-12-13','126 Main St, Jakarta'),(17,'3273012410020056','ijat jarjit','081234567807','Laki-laki','2008-12-08','789 Pine Rd, Gresik');
/*!40000 ALTER TABLE `pasien` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_pasien_insert` AFTER INSERT ON `pasien` FOR EACH ROW BEGIN
    -- Insert record baru ke tabel rekam_medis untuk pasien yang baru dibuat
    INSERT INTO rekam_medis (id_pasien, tanggal_pencatatan)
    VALUES (NEW.id_pasien, NOW());
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penggunaan_layanan`
--

DROP TABLE IF EXISTS `penggunaan_layanan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `penggunaan_layanan` (
  `id_penggunaan_layanan` int NOT NULL AUTO_INCREMENT,
  `id_pembayaran` int DEFAULT NULL,
  `id_tarif_layanan` int DEFAULT NULL,
  `kuantitas` int DEFAULT NULL,
  `harga_saat_itu` int DEFAULT NULL,
  PRIMARY KEY (`id_penggunaan_layanan`),
  KEY `id_pembayaran` (`id_pembayaran`),
  KEY `id_tarif_layanan` (`id_tarif_layanan`),
  CONSTRAINT `penggunaan_layanan_ibfk_1` FOREIGN KEY (`id_pembayaran`) REFERENCES `transaksi_pembayaran` (`id_pembayaran`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `penggunaan_layanan_ibfk_2` FOREIGN KEY (`id_tarif_layanan`) REFERENCES `tarif_layanan` (`id_tarif_layanan`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penggunaan_layanan`
--

LOCK TABLES `penggunaan_layanan` WRITE;
/*!40000 ALTER TABLE `penggunaan_layanan` DISABLE KEYS */;
INSERT INTO `penggunaan_layanan` VALUES (1,1,1,1,150000),(2,1,3,1,75000),(3,1,6,1,100000),(4,2,2,1,200000),(5,2,7,1,300000),(9,4,1,1,150000),(10,4,4,1,50000),(11,4,8,1,500000),(12,6,1,1,150000),(13,6,7,1,300000),(14,9,1,1,150000),(15,10,1,1,150000),(16,8,1,1,150000),(17,11,1,1,150000),(18,12,1,1,150000),(19,13,1,1,150000),(20,14,1,1,150000),(21,14,7,1,300000),(22,15,1,1,150000),(23,15,7,1,300000),(24,17,1,1,150000),(25,18,7,1,300000),(26,16,9,1,5000),(27,18,9,1,5000),(28,19,9,1,5000),(29,20,9,1,5000);
/*!40000 ALTER TABLE `penggunaan_layanan` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `snapshot_harga_on_insert` BEFORE INSERT ON `penggunaan_layanan` FOR EACH ROW BEGIN
    -- Auto-snapshot harga saat insert
    SELECT Harga INTO @harga_sekarang 
    FROM tarif_layanan 
    WHERE id_tarif_layanan = NEW.id_tarif_layanan;
    
    SET NEW.harga_saat_itu = @harga_sekarang;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (2,'App\\Models\\User',3,'auth-token','89d799525fc412c081627b40f894fc560c2882e78c97b366c608c5f5c0f5fb36','[\"*\"]','2025-10-19 18:26:10',NULL,'2025-10-19 18:12:16','2025-10-19 18:26:10'),(3,'App\\Models\\User',3,'auth-token','a614a25c5b5122c0f00c25a1af282235c3ad21d5f4c11364bd54692a8a9748b1','[\"*\"]',NULL,NULL,'2025-10-19 18:14:46','2025-10-19 18:14:46'),(4,'App\\Models\\User',3,'auth-token','a5a65fd0ac4e03d21f2f3ff179d9ea4539ffd97376916c13e9e7ba0e634cf149','[\"*\"]','2025-11-06 00:45:41',NULL,'2025-11-05 19:18:02','2025-11-06 00:45:41'),(5,'App\\Models\\User',4,'auth-token','6257caae8f74181398f8e249399368467a59688e3567aaa17ac64c9eaab0a9b6','[\"*\"]',NULL,NULL,'2025-11-05 21:58:22','2025-11-05 21:58:22'),(6,'App\\Models\\User',4,'auth-token','0b875e59263dad1ae7c1b78f5295a03c00e29adb543dbbb63e212415c7efabd1','[\"*\"]','2025-11-06 00:50:35',NULL,'2025-11-06 00:46:56','2025-11-06 00:50:35'),(7,'App\\Models\\User',3,'auth-token','e1e7ff74f169d26470d8437603f2fa1be9a544521b1c11a915c4d9cfb0ddb593','[\"*\"]','2025-11-27 16:28:38',NULL,'2025-11-06 01:05:25','2025-11-27 16:28:38'),(8,'App\\Models\\User',5,'auth-token','e75c7cc99cbbc096bb07009d799403d7712ad545f3c56527cc1d75f1cb365a3a','[\"*\"]',NULL,NULL,'2025-11-06 01:10:20','2025-11-06 01:10:20'),(10,'App\\Models\\User',3,'auth-token','126901529aca41b3d2bfc96499af859d446a169ee00890e4d04981037bdb2a08','[\"*\"]','2025-11-06 01:53:34',NULL,'2025-11-06 01:49:54','2025-11-06 01:53:34'),(21,'App\\Models\\User',6,'auth-token','d066d0d5218315f0cf9288af20792ffafdf59ab59d93830d4d5fd83e39ecf840','[\"*\"]',NULL,NULL,'2025-11-19 17:39:05','2025-11-19 17:39:05'),(22,'App\\Models\\User',7,'auth-token','898aad114c8d47e30afaefb8135c93d17a5711cf81359b32c403b195b7e4458e','[\"*\"]',NULL,NULL,'2025-11-19 17:40:13','2025-11-19 17:40:13'),(23,'App\\Models\\User',8,'auth-token','8dfa5dd05880ab8779327fb407f0f5ed9936b60d2e27b8b33ad9835c2b462e1b','[\"*\"]',NULL,NULL,'2025-11-19 17:40:45','2025-11-19 17:40:45'),(34,'App\\Models\\User',7,'auth-token','d55617c7a086c928037e1631b3835c4492282399c17af3112fe822e60653c934','[\"*\"]','2025-11-20 17:49:06',NULL,'2025-11-20 17:34:11','2025-11-20 17:49:06'),(64,'App\\Models\\User',4,'auth-token','3446c7777b43e341152e93f155b03514815d0e4d4bd4da5a1aa4dde912698f1f','[\"*\"]','2025-12-04 03:49:00',NULL,'2025-12-04 00:45:23','2025-12-04 03:49:00'),(65,'App\\Models\\User',9,'auth-token','c9ab4fe6acfd90a362cf83773ab27cf22b56295e0f71bf87871fae239c3ff84f','[\"*\"]',NULL,NULL,'2025-12-04 01:09:09','2025-12-04 01:09:09'),(66,'App\\Models\\User',10,'auth-token','125d54d5b21eba4a8e633bc55dea33c906ae0eb0848ca2f3bfa8329699a2fb86','[\"*\"]',NULL,NULL,'2025-12-04 01:10:39','2025-12-04 01:10:39'),(67,'App\\Models\\User',12,'auth-token','372a46ed01484a9c49389cd1607fe965f926fdb7383fb80dc704a261e7044223','[\"*\"]',NULL,NULL,'2025-12-04 01:15:49','2025-12-04 01:15:49'),(68,'App\\Models\\User',13,'auth-token','2a4f1531f1ed6992b98f155868e13c3f0c43c54ad3682f8974b8a7b16b5e724b','[\"*\"]',NULL,NULL,'2025-12-04 01:41:08','2025-12-04 01:41:08'),(69,'App\\Models\\User',14,'auth-token','700d92445d4a15cb18d85a9c185c3c2214885604e5d6ea6444c6367330c2323b','[\"*\"]',NULL,NULL,'2025-12-04 01:43:57','2025-12-04 01:43:57'),(72,'App\\Models\\User',8,'auth-token','a54006eaf3f68e02d565c0225f51281a27ec9ad90f0a9a045f1ebc06897a284c','[\"*\"]','2025-12-04 05:25:27',NULL,'2025-12-04 04:43:11','2025-12-04 05:25:27'),(90,'App\\Models\\User',15,'auth-token','b9c80143c8fbd1a727636c0a2a070354c5847bb4c7b1137f38cceb7b4b6dfad9','[\"*\"]',NULL,NULL,'2025-12-05 20:39:43','2025-12-05 20:39:43'),(97,'App\\Models\\User',16,'auth-token','556c64d551647fb61c7885add85a2409cb1fd76250f38ef5e5def9be3647a2cb','[\"*\"]',NULL,NULL,'2025-12-05 20:55:49','2025-12-05 20:55:49'),(119,'App\\Models\\User',5,'auth-token','c9abc21e4f0e73744cdc1249b87976a043ca0be02002e791b052ea0a1a40d348','[\"*\"]','2025-12-06 03:44:25',NULL,'2025-12-06 03:08:51','2025-12-06 03:44:25');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poli`
--

DROP TABLE IF EXISTS `poli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poli` (
  `id_poli` int NOT NULL AUTO_INCREMENT,
  `nama_poli` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_poli`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poli`
--

LOCK TABLES `poli` WRITE;
/*!40000 ALTER TABLE `poli` DISABLE KEYS */;
INSERT INTO `poli` VALUES (1,'Umum'),(2,'Gigi'),(3,'Anak'),(4,'Kulit'),(5,'Mata');
/*!40000 ALTER TABLE `poli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rekam_medis`
--

DROP TABLE IF EXISTS `rekam_medis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rekam_medis` (
  `id_rekam_medis` int NOT NULL AUTO_INCREMENT,
  `id_pasien` int DEFAULT NULL,
  `tanggal_pencatatan` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_rekam_medis`),
  KEY `id_pasien` (`id_pasien`),
  CONSTRAINT `rekam_medis_ibfk_1` FOREIGN KEY (`id_pasien`) REFERENCES `pasien` (`id_pasien`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rekam_medis`
--

LOCK TABLES `rekam_medis` WRITE;
/*!40000 ALTER TABLE `rekam_medis` DISABLE KEYS */;
INSERT INTO `rekam_medis` VALUES (1,1,'2025-11-03 08:30:00'),(2,2,'2025-11-03 08:45:00'),(3,3,'2025-11-03 09:00:00'),(4,4,'2025-11-03 09:15:00'),(5,5,'2025-11-03 09:30:00'),(6,6,'2025-11-03 09:45:00'),(7,7,'2025-11-03 10:00:00'),(8,8,'2025-11-03 10:15:00'),(9,9,'2025-11-06 14:30:55'),(11,11,'2025-11-06 14:32:21'),(12,12,'2025-11-07 08:21:14'),(13,13,'2025-11-14 09:03:56'),(14,14,'2025-11-28 11:06:45'),(15,15,'2025-11-28 12:16:07'),(16,16,'2025-12-06 10:16:59'),(17,17,'2025-12-06 11:24:24');
/*!40000 ALTER TABLE `rekam_medis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resep_dokter`
--

DROP TABLE IF EXISTS `resep_dokter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resep_dokter` (
  `id_resep_dokter` int NOT NULL AUTO_INCREMENT,
  `id_dokter` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_rekam_medis` int DEFAULT NULL,
  `id_pembayaran` int DEFAULT NULL,
  `nama_obat` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keterangan_resep` text COLLATE utf8mb4_unicode_ci,
  `tanggal_resep` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_resep_dokter`),
  KEY `id_dokter` (`id_dokter`),
  KEY `id_rekam_medis` (`id_rekam_medis`),
  KEY `resep_dokter_ibfk_3` (`id_pembayaran`),
  CONSTRAINT `resep_dokter_ibfk_1` FOREIGN KEY (`id_dokter`) REFERENCES `dokter` (`id_dokter`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `resep_dokter_ibfk_2` FOREIGN KEY (`id_rekam_medis`) REFERENCES `rekam_medis` (`id_rekam_medis`),
  CONSTRAINT `resep_dokter_ibfk_3` FOREIGN KEY (`id_pembayaran`) REFERENCES `transaksi_pembayaran` (`id_pembayaran`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resep_dokter`
--

LOCK TABLES `resep_dokter` WRITE;
/*!40000 ALTER TABLE `resep_dokter` DISABLE KEYS */;
INSERT INTO `resep_dokter` VALUES (1,'D001',1,1,'Paracetamol 500mg','1 tablet 3 kali sehari setelah makan','2025-11-03 08:45:00'),(2,'D001',1,1,'Amoxicillin 500mg','1 kapsul 3 kali sehari selama 5 hari','2025-11-03 08:45:00'),(3,'D002',2,2,'Amoxicillin 500mg','1 kapsul 3 kali sehari selama 7 hari','2025-11-03 09:00:00'),(4,'D002',2,2,'Ibuprofen 400mg','1 tablet jika sakit, maksimal 3 kali sehari','2025-11-03 09:00:00'),(5,'D003',3,4,'Paracetamol syrup 120mg/5ml','5 ml 3 kali sehari jika demam','2025-11-03 09:15:00'),(6,'D003',3,NULL,'Amoxicillin syrup 125mg/5ml','5 ml 3 kali sehari selama 7 hari','2025-11-03 09:15:00'),(7,'D001',1,17,'Paracetamol 500mg','1 tablet 3 kali sehari setelah makan','2025-12-06 04:43:17'),(8,'D001',1,17,'Amoxicillin 500mg','1 kapsul 3 kali sehari selama 5 hari','2025-12-06 04:44:56');
/*!40000 ALTER TABLE `resep_dokter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resepsionis`
--

DROP TABLE IF EXISTS `resepsionis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resepsionis` (
  `id_resepsionis` char(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `gaji` int DEFAULT NULL,
  `nomor_telepon` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_resepsionis`),
  UNIQUE KEY `nomor_telepon` (`nomor_telepon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resepsionis`
--

LOCK TABLES `resepsionis` WRITE;
/*!40000 ALTER TABLE `resepsionis` DISABLE KEYS */;
INSERT INTO `resepsionis` VALUES ('R001','Dewi Lestari Septi','1990-06-12',6000000,'081345678901','Perempuan','Jl. Flamboyan No. 5, Jakarta'),('R002','Rina Andriani','1992-09-18',5800000,'081345678902','Perempuan','Jl. Cendana No. 7, Jakarta'),('R003','Ari Pratama','1991-03-25',5900000,'081345678903','Laki-laki','Jl. Teratai No. 9, Jakarta'),('R004','Bintang Al Asror','1993-11-19',6000000,'081345678943','Laki-laki','Jl. Flamboyan No. 5, Surabaya');
/*!40000 ALTER TABLE `resepsionis` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `auto_increment_id_resepsionis` BEFORE INSERT ON `resepsionis` FOR EACH ROW BEGIN
    DECLARE next_id INT;
    DECLARE new_id CHAR(4);
    
    -- Cari id terakhir
    SELECT COALESCE(MAX(CAST(SUBSTRING(id_resepsionis, 2) AS UNSIGNED)), 0) + 1 
    INTO next_id 
    FROM resepsionis 
    WHERE id_resepsionis LIKE 'R%';
    
    -- Format id baru: R + angka 3 digit
    SET new_id = CONCAT('R', LPAD(next_id, 3, '0'));
    
    -- Set id baru jika tidak disediakan
    IF NEW.id_resepsionis IS NULL OR NEW.id_resepsionis = '' THEN
        SET NEW.id_resepsionis = new_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `sync_users_on_resepsionis_update` AFTER UPDATE ON `resepsionis` FOR EACH ROW BEGIN
    -- Jika nama berubah, update tabel users
    IF OLD.nama != NEW.nama THEN
        UPDATE users 
        SET name = NEW.nama
        WHERE id_resepsionis = NEW.id_resepsionis;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('g0ligrT8BbvKstPRM5d2kBx8IewruDw6J0HRyPdo',NULL,'127.0.0.1','PostmanRuntime/7.49.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiaXFRd2RkUzh3bFVHTU5MRTNuNlVWZ24zZXo1N1B1M0JLV1BYbXQ5ZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1760921353),('Xj5J7ffUoeDUiDrFwGrywgTICrozUEU44Ut9wdnr',NULL,'127.0.0.1','PostmanRuntime/7.49.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiSWJXNDNyeHZycWxYNFdmMG9XbGI2ZXhmcEVvUmxZcWlCZXhwVklkdSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1762416397);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `soap`
--

DROP TABLE IF EXISTS `soap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `soap` (
  `id_soap` int NOT NULL AUTO_INCREMENT,
  `id_rekam_medis` int DEFAULT NULL,
  `id_dokter` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subjective` text COLLATE utf8mb4_unicode_ci,
  `objective` text COLLATE utf8mb4_unicode_ci,
  `assessment` text COLLATE utf8mb4_unicode_ci,
  `plan` text COLLATE utf8mb4_unicode_ci,
  `tanggal_pencatatan` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_soap`),
  KEY `id_rekam_medis` (`id_rekam_medis`),
  KEY `id_dokter` (`id_dokter`),
  CONSTRAINT `soap_ibfk_1` FOREIGN KEY (`id_rekam_medis`) REFERENCES `rekam_medis` (`id_rekam_medis`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `soap_ibfk_2` FOREIGN KEY (`id_dokter`) REFERENCES `dokter` (`id_dokter`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soap`
--

LOCK TABLES `soap` WRITE;
/*!40000 ALTER TABLE `soap` DISABLE KEYS */;
INSERT INTO `soap` VALUES (1,1,'D001','Pasien mengeluh demam dan batuk selama 3 hari, badan terasa lemas','Suhu 38.5°C, tenggorokan merah, suara napas normal','ISPA (Infeksi Saluran Pernapasan Akut)','Istirahat yang cukup, minum air putih, obat penurun demam dan antibiotik','2025-11-03 08:45:00'),(2,2,'D002','Pasien mengeluh sakit pada gigi geraham belakang kanan, terutama saat makan','Gigi geraham kanan bawah berlubang besar, gusi sedikit bengkak','Karies dentis dengan pulpitis','Penambalan sementara, antibiotik, dan perawatan saluran akar','2025-11-03 09:00:00'),(3,3,'D003','Anak usia 5 tahun demam tinggi sejak semalam, rewel, nafsu makan menurun','Suhu 39.2°C, tonsil membesar dan merah, tidak ada ruam kulit','Tonsilitis akut','Antibiotik, antipiretik, dan terapi suportif','2025-11-03 09:15:00'),(4,1,'D001','Sakit kepala','Tekanan darah normal','Migrain','Istirahat','2025-11-06 10:15:00'),(5,13,'D001','Pasien datang dengan keluhan batuk kering sejak tiga hari yang lalu, disertai pilek dan sedikit sakit kepala. Pasien mengatakan tidak ada demam tinggi, hanya merasa lemas dan tenggorokan agak gatal.','Suhu tubuh 37,5°C, tekanan darah 118/78 mmHg, frekuensi napas 20 kali/menit. Pada pemeriksaan tenggorokan tampak hiperemis ringan, tidak ada pembesaran tonsil. Bunyi napas vesikuler normal tanpa wheezing.','Suspect common cold (infeksi saluran napas atas) akibat virus; kondisi ringan tanpa tanda bahaya.','Edukasi istirahat cukup, perbanyak cairan, berikan obat simptomatik berupa antihistamin dan dekongestan oral. Anjurkan kembali bila gejala menetap lebih dari 5 hari atau muncul demam tinggi.','2025-11-17 15:56:24'),(6,14,'D001','Pasien mengeluhkan batuk kering dan sakit kepala ringan. Nafsu makan berkurang, tetapi pasien masih dapat beraktivitas ringan. Pasien tidak memiliki riwayat penyakit kronis, tidak ada riwayat alergi obat sebelumnya.','Tekanan darah 120/80 mmHg, nadi 88x/menit, respirasi 20x/menit, suhu tubuh 38,5°C. Pemeriksaan fisik menunjukkan faring hiperemis tanpa eksudat, dan suara napas vesikular normal pada auskultasi paru. Tidak ditemukan limfadenopati servikal.','Infeksi saluran napas atas (ISPA) non-bakterial.','Memberikan parasetamol 500 mg per oral setiap 8 jam jika demam, dan guaifenesin sirup 3x10 ml. Anjurkan istirahat cukup, minum air minimal 2 liter per hari, dan hindari minuman dingin. Edukasi pasien untuk kembali jika demam lebih dari 5 hari atau timbul sesak napas.','2025-11-28 11:09:31'),(7,15,'D001','Pasien mengeluhkan batuk kering dan sakit kepala ringan. Nafsu makan berkurang, tetapi pasien masih dapat beraktivitas ringan. Pasien tidak memiliki riwayat penyakit kronis, tidak ada riwayat alergi obat sebelumnya.','Tekanan darah 120/80 mmHg, nadi 88x/menit, respirasi 20x/menit, suhu tubuh 38,5°C. Pemeriksaan fisik menunjukkan faring hiperemis tanpa eksudat, dan suara napas vesikular normal pada auskultasi paru. Tidak ditemukan limfadenopati servikal.','Diagnosis kerja: Infeksi saluran napas atas (ISPA) non-bakterial. Diagnosis banding: Faringitis akut, influenza.','Memberikan parasetamol 500 mg per oral setiap 8 jam jika demam, dan guaifenesin sirup 3x10 ml. Anjurkan istirahat cukup, minum air minimal 2 liter per hari, dan hindari minuman dingin. Edukasi pasien untuk kembali jika demam lebih dari 5 hari atau timbul sesak napas.','2025-11-28 12:17:58'),(8,16,'D004','Pasien datang dengan keluhan gatal pada kulit di kaki yang dirasakan sejak beberapa hari/minggu terakhir. Gatal dirasakan terutama pada area telapak kaki dan bersifat hilang-timbul atau menetap, serta kadang memburuk pada malam hari. Pasien menyatakan muncul kemerahan atau bintik-bintik dan kadang terjadi lecet akibat digaruk. Tidak ada riwayat penggunaan produk baru kecuali jika disebutkan, dan pasien tidak memiliki riwayat alergi/dermatitis sebelumnya (sesuaikan jika ada). Pasien tidak sedang menggunakan obat tertentu selain krim/salep yang sempat dicoba tetapi belum memberi perbaikan bermakna.','Keadaan umum pasien tampak baik dengan tanda vital dalam batas normal. Pada pemeriksaan lokal kaki tampak lesi berupa papul. Distribusi lesi dapat simetris atau asimetris, tanpa tanda infeksi berat seperti pus atau pembengkakan signifikan. Bila diperlukan, pemeriksaan penunjang seperti KOH untuk mendeteksi infeksi jamur atau pemeriksaan gula darah dapat dipertimbangkan.','Diagnosis kerja mengarah pada eksim. Diagnosis banding meliputi urtikaria, pruritus akibat kulit kering, skabies, atau psoriasis tergantung gambaran klinis.','Terapi diberikan sesuai kemungkinan diagnosis, misalnya krim antijamur bila dicurigai infeksi jamur atau kortikosteroid topikal potensi ringan bila tampak peradangan akibat dermatitis. Antihistamin oral dapat diberikan untuk mengurangi rasa gatal. Edukasi diberikan kepada pasien agar menghindari menggaruk, menjaga kebersihan dan kekeringan area kaki, menggunakan sabun yang lembut, serta menghindari bahan pemicu. Pasien disarankan kontrol ulang dalam 3–7 hari untuk evaluasi respons terapi atau lebih cepat bila muncul tanda infeksi atau keluhan semakin berat.','2025-12-06 10:54:46');
/*!40000 ALTER TABLE `soap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staf_lab`
--

DROP TABLE IF EXISTS `staf_lab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staf_lab` (
  `id_staf_lab` char(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `nomor_telepon` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gaji` int DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  `nomor_lisensi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_staf_lab`),
  UNIQUE KEY `nomor_lisensi` (`nomor_lisensi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staf_lab`
--

LOCK TABLES `staf_lab` WRITE;
/*!40000 ALTER TABLE `staf_lab` DISABLE KEYS */;
INSERT INTO `staf_lab` VALUES ('L001','Bambang Sutrisno','1988-07-14','081456789012',7500000,'Jl. Kamboja No. 11, Jakarta','PAM-56789','Laki-laki'),('L002','Citra Ayu','1990-11-28','081456789013',7300000,'Jl. Seroja No. 13, Jakarta','PAM-56790','Perempuan'),('L003','Dedi Kurniawan','1987-04-05','081456789014',7400000,'Jl. Tulip No. 17, Jakarta','PAM-56791','Laki-laki');
/*!40000 ALTER TABLE `staf_lab` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `auto_increment_id_staf_lab` BEFORE INSERT ON `staf_lab` FOR EACH ROW BEGIN
    DECLARE next_id INT;
    DECLARE new_id CHAR(4);
    
    -- Cari id terakhir
    SELECT COALESCE(MAX(CAST(SUBSTRING(id_staf_lab, 2) AS UNSIGNED)), 0) + 1 
    INTO next_id 
    FROM staf_lab 
    WHERE id_staf_lab LIKE 'L%';
    
    -- Format id baru: L + angka 3 digit
    SET new_id = CONCAT('L', LPAD(next_id, 3, '0'));
    
    -- Set id baru jika tidak disediakan
    IF NEW.id_staf_lab IS NULL OR NEW.id_staf_lab = '' THEN
        SET NEW.id_staf_lab = new_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `sync_users_on_staf_lab_update` AFTER UPDATE ON `staf_lab` FOR EACH ROW BEGIN
    -- Jika nama berubah, update tabel users
    IF OLD.nama != NEW.nama THEN
        UPDATE users 
        SET name = NEW.nama
        WHERE id_staf_lab = NEW.id_staf_lab;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tarif_layanan`
--

DROP TABLE IF EXISTS `tarif_layanan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarif_layanan` (
  `id_tarif_layanan` int NOT NULL AUTO_INCREMENT,
  `tipe_layanan` enum('Dokter','Laboratorium','Administrasi') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Harga` int DEFAULT NULL,
  `nama_layanan` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_tarif_layanan`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarif_layanan`
--

LOCK TABLES `tarif_layanan` WRITE;
/*!40000 ALTER TABLE `tarif_layanan` DISABLE KEYS */;
INSERT INTO `tarif_layanan` VALUES (1,'Dokter',150000,'Konsultasi Umum'),(2,'Dokter',200000,'Konsultasi Spesialis'),(3,'Laboratorium',75000,'Pemeriksaan Darah Lengkap'),(4,'Laboratorium',50000,'Pemeriksaan Urin'),(5,'Laboratorium',120000,'Pemeriksaan Kolesterol'),(6,'Laboratorium',100000,'Pemeriksaan Gula Darah'),(7,'Dokter',300000,'Tindakan Minor'),(8,'Dokter',500000,'Tindakan Sedang'),(9,'Administrasi',5000,'Biaya Admin');
/*!40000 ALTER TABLE `tarif_layanan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksi_pembayaran`
--

DROP TABLE IF EXISTS `transaksi_pembayaran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaksi_pembayaran` (
  `id_pembayaran` int NOT NULL AUTO_INCREMENT,
  `id_antrian` int DEFAULT NULL,
  `id_kasir` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_pembayaran` enum('Lunas','Belum Lunas') COLLATE utf8mb4_unicode_ci DEFAULT 'Belum Lunas',
  `metode_pembayaran` enum('Tunai','Transfer bank') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_transaksi` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pembayaran`),
  KEY `id_kasir` (`id_kasir`),
  KEY `fk_transaksi_pembayaran_antrian` (`id_antrian`),
  CONSTRAINT `fk_transaksi_pembayaran_antrian` FOREIGN KEY (`id_antrian`) REFERENCES `antrian` (`id_antrian`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `transaksi_pembayaran_ibfk_1` FOREIGN KEY (`id_kasir`) REFERENCES `kasir` (`id_kasir`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksi_pembayaran`
--

LOCK TABLES `transaksi_pembayaran` WRITE;
/*!40000 ALTER TABLE `transaksi_pembayaran` DISABLE KEYS */;
INSERT INTO `transaksi_pembayaran` VALUES (1,1,'K001','Lunas','Tunai','2025-11-03 09:30:00'),(2,2,'K001','Lunas','Transfer bank','2025-11-03 09:45:00'),(4,4,'K003','Lunas','Transfer bank','2025-11-03 10:15:00'),(5,5,'K002','Lunas','Tunai','2025-11-03 10:30:00'),(6,6,'K003','Lunas','Transfer bank','2025-11-03 10:45:00'),(7,7,'K001','Lunas','Tunai','2025-11-03 11:00:00'),(8,8,'K002','Lunas','Transfer bank','2025-11-03 11:15:00'),(9,11,'K003','Lunas','Tunai','2025-11-13 00:00:00'),(10,9,'K002','Lunas','Transfer bank','2025-11-07 16:45:00'),(11,10,'K001','Lunas','Transfer bank','2025-11-14 00:00:00'),(12,12,'K001','Lunas','Transfer bank','2025-11-27 00:00:00'),(13,13,'K001','Lunas','Transfer bank','2025-11-28 00:00:00'),(14,14,'K001','Lunas','Tunai','2025-11-28 00:00:00'),(15,15,'K002','Lunas','Tunai','2025-11-28 00:00:00'),(16,16,'K002','Lunas','Tunai','2025-12-06 00:00:00'),(17,17,'K002','Lunas','Tunai','2025-12-06 00:00:00'),(18,18,'K003','Lunas','Transfer bank','2025-12-06 00:00:00'),(19,19,'K001','Lunas','Tunai','2025-12-06 06:01:54'),(20,20,'K003','Lunas','Tunai','2025-12-06 13:13:45');
/*!40000 ALTER TABLE `transaksi_pembayaran` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `lock_transaksi_lunas` BEFORE UPDATE ON `transaksi_pembayaran` FOR EACH ROW BEGIN
    -- Jika mengubah dari Lunas ke status lain, cek dulu
    IF OLD.status_pembayaran = 'Lunas' AND NEW.status_pembayaran != 'Lunas' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Transaksi LUNAS tidak bisa diubah statusnya';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('receptionist','doctor','lab','cashier','manager','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_resepsionis` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_dokter` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_staf_lab` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_kasir` char(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  KEY `users_ibfk_1` (`id_resepsionis`),
  KEY `users_ibfk_2` (`id_dokter`),
  KEY `users_ibfk_3` (`id_staf_lab`),
  KEY `users_ibfk_4` (`id_kasir`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_resepsionis`) REFERENCES `resepsionis` (`id_resepsionis`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`id_dokter`) REFERENCES `dokter` (`id_dokter`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`id_staf_lab`) REFERENCES `staf_lab` (`id_staf_lab`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_4` FOREIGN KEY (`id_kasir`) REFERENCES `kasir` (`id_kasir`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'admin','$2y$12$bTcQ5Zt5PvLWAyR.fwvRxuqc0QF2vTuJUVtLhHY1/ey86Yr3vBwtS','Admin','admin',NULL,NULL,NULL,NULL,NULL,'2025-10-19 18:06:07','2025-10-19 18:06:07'),(4,'resepsionis','$2y$12$Tl0q57FUFX2kKHX/sryH5OYecQtB/98S06XQ3esMw7ZG5XtV9vDIS','Dewi Lestari Septi','receptionist','R001',NULL,NULL,NULL,NULL,'2025-11-05 21:58:22','2025-12-04 00:45:33'),(5,'dokter','$2y$12$VuqJG0tIYlRdIT1R2B4m9.yli7fxPfzpIkyvoT6E7ShRepZZ5.rMi','Dr. Ahmad Wijaya','doctor',NULL,'D001',NULL,NULL,NULL,'2025-11-06 01:10:20','2025-11-06 01:10:20'),(6,'staflab','$2y$12$FPfCrM2rNzFdeQhDr7eUUuk6umOc1fl5OZ50KFOno09qoJhEfcbiS','Bambang Sutrisno','lab',NULL,NULL,'L001',NULL,NULL,'2025-11-19 17:39:05','2025-11-19 17:39:05'),(7,'kasir','$2y$12$udEgcv/bT3.6PO/3bY6EguTv6d4sQR1ZF32WmzslByAwFGxD6V8Ia','Fajar Setiawan','cashier',NULL,NULL,NULL,'K001',NULL,'2025-11-19 17:40:13','2025-11-19 17:40:13'),(8,'manajer','$2y$12$bqbzLRc0rSzsWe6QmXtWB.j7Ok6bprER8UAO9SBOijyvEy9nay.fW','Manajer','manager',NULL,NULL,NULL,NULL,NULL,'2025-11-19 17:40:45','2025-12-04 02:03:59'),(11,'resepsionis2','$2y$12$CZr3vxyAPGwcedaHXzFkP.fVp/FSfpAOKK7pls8siQ83K5bfD61uW','Rina Andriani','receptionist','R002',NULL,NULL,NULL,NULL,'2025-12-04 08:12:41','2025-12-04 01:18:55'),(12,'resepsionis3','$2y$12$/4l14pHfz/Ojc/N48FHc2.ZrTNpxjmsGUm1vfllVZSHOtWvpG0iLi','Ari Pratama','receptionist','R003',NULL,NULL,NULL,NULL,'2025-12-04 01:15:49','2025-12-04 01:15:49'),(13,'resepsionis4','$2y$12$sNNnWRzYeq./9e2gsPRk.eJSoCmoSpF6oa0Z12xotEkD1c1CS5j9W','Bintang Al Asror','receptionist','R004',NULL,NULL,NULL,NULL,'2025-12-04 01:41:08','2025-12-04 01:41:08'),(14,'dokter2','$2y$12$pc5nn3pPgDeQ1n70a/xRweLSd3N/LidufQI5hEfod6wrWN83m1r7O','Dr. Sari Dewi','doctor',NULL,'D002',NULL,NULL,NULL,'2025-12-04 01:43:57','2025-12-04 01:43:57'),(15,'dr.kulit','$2y$12$BwSPXZK3KtJspao3lUNZ8OWSBXB3yI18B2laXaCzNe63IxHz0YFYy','Dr. Maya Sari','doctor',NULL,'D004',NULL,NULL,NULL,'2025-12-05 20:39:43','2025-12-05 20:39:43'),(16,'citra','$2y$12$PISaq.Mef2VRYXuFPWsRE.MilUZUvogmm7C1anQLJngtC8zmcayg.','Citra Ayu','lab',NULL,NULL,'L002',NULL,NULL,'2025-12-05 20:55:49','2025-12-05 20:55:49');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `auto_fill_name_role_on_insert` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
    DECLARE employee_name VARCHAR(150);
    
    -- Jika id_resepsionis diisi
    IF NEW.id_resepsionis IS NOT NULL THEN
        -- Ambil nama dari tabel resepsionis
        SELECT nama INTO employee_name
        FROM resepsionis
        WHERE id_resepsionis = NEW.id_resepsionis;
        
        SET NEW.name = COALESCE(employee_name, NEW.name);
        SET NEW.role = 'receptionist';
    
    -- Jika id_dokter diisi
    ELSEIF NEW.id_dokter IS NOT NULL THEN
        -- Ambil nama dari tabel dokter
        SELECT nama INTO employee_name
        FROM dokter
        WHERE id_dokter = NEW.id_dokter;
        
        SET NEW.name = COALESCE(employee_name, NEW.name);
        SET NEW.role = 'doctor';
    
    -- Jika id_staf_lab diisi
    ELSEIF NEW.id_staf_lab IS NOT NULL THEN
        -- Ambil nama dari tabel staf_lab
        SELECT nama INTO employee_name
        FROM staf_lab
        WHERE id_staf_lab = NEW.id_staf_lab;
        
        SET NEW.name = COALESCE(employee_name, NEW.name);
        SET NEW.role = 'lab';
    
    -- Jika id_kasir diisi
    ELSEIF NEW.id_kasir IS NOT NULL THEN
        -- Ambil nama dari tabel kasir
        SELECT nama INTO employee_name
        FROM kasir
        WHERE id_kasir = NEW.id_kasir;
        
        SET NEW.name = COALESCE(employee_name, NEW.name);
        SET NEW.role = 'cashier';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `view_antrian_lengkap`
--

DROP TABLE IF EXISTS `view_antrian_lengkap`;
/*!50001 DROP VIEW IF EXISTS `view_antrian_lengkap`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_antrian_lengkap` AS SELECT 
 1 AS `id_antrian`,
 1 AS `id_pasien`,
 1 AS `id_dokter`,
 1 AS `nomor_antrian`,
 1 AS `nama_pasien`,
 1 AS `poli`,
 1 AS `nama_dokter`,
 1 AS `keluhan`,
 1 AS `tanggal`,
 1 AS `keterangan`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_dokter_lengkap`
--

DROP TABLE IF EXISTS `view_dokter_lengkap`;
/*!50001 DROP VIEW IF EXISTS `view_dokter_lengkap`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_dokter_lengkap` AS SELECT 
 1 AS `id_dokter`,
 1 AS `id_poli`,
 1 AS `nama_poli`,
 1 AS `nama_dokter`,
 1 AS `tanggal_lahir`,
 1 AS `gaji`,
 1 AS `nomor_telepon`,
 1 AS `spesialis`,
 1 AS `nomor_lisensi`,
 1 AS `jenis_kelamin`,
 1 AS `alamat`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_hasil_lab_lengkap`
--

DROP TABLE IF EXISTS `view_hasil_lab_lengkap`;
/*!50001 DROP VIEW IF EXISTS `view_hasil_lab_lengkap`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_hasil_lab_lengkap` AS SELECT 
 1 AS `id_hasil_lab`,
 1 AS `id_staf_lab`,
 1 AS `id_rekam_medis`,
 1 AS `nama_staf_lab`,
 1 AS `jenis_pemeriksaan`,
 1 AS `tanggal_pemeriksaan`,
 1 AS `keterangan`,
 1 AS `hasil_pemeriksaan`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_jadwal_karyawan_lengkap`
--

DROP TABLE IF EXISTS `view_jadwal_karyawan_lengkap`;
/*!50001 DROP VIEW IF EXISTS `view_jadwal_karyawan_lengkap`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_jadwal_karyawan_lengkap` AS SELECT 
 1 AS `id_jadwal`,
 1 AS `jenis_karyawan`,
 1 AS `id_karyawan`,
 1 AS `nama_karyawan`,
 1 AS `spesialis`,
 1 AS `nomor_lisensi`,
 1 AS `senin`,
 1 AS `selasa`,
 1 AS `rabu`,
 1 AS `kamis`,
 1 AS `jumat`,
 1 AS `sabtu`,
 1 AS `minggu`,
 1 AS `jam_mulai`,
 1 AS `jam_selesai`,
 1 AS `jenis_kelamin`,
 1 AS `nomor_telepon`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_karyawan_tanpa_jadwal`
--

DROP TABLE IF EXISTS `view_karyawan_tanpa_jadwal`;
/*!50001 DROP VIEW IF EXISTS `view_karyawan_tanpa_jadwal`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_karyawan_tanpa_jadwal` AS SELECT 
 1 AS `jenis_karyawan`,
 1 AS `id_karyawan`,
 1 AS `nama_karyawan`,
 1 AS `spesialis`,
 1 AS `unit_kerja`,
 1 AS `nomor_telepon`,
 1 AS `jenis_kelamin`,
 1 AS `jabatan_lainnya`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_soap_lengkap`
--

DROP TABLE IF EXISTS `view_soap_lengkap`;
/*!50001 DROP VIEW IF EXISTS `view_soap_lengkap`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_soap_lengkap` AS SELECT 
 1 AS `id_soap`,
 1 AS `id_rekam_medis`,
 1 AS `id_dokter`,
 1 AS `nama_dokter`,
 1 AS `subjective`,
 1 AS `objective`,
 1 AS `assessment`,
 1 AS `plan`,
 1 AS `tanggal_pencatatan`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_transaksi_pembayaran_lengkap`
--

DROP TABLE IF EXISTS `view_transaksi_pembayaran_lengkap`;
/*!50001 DROP VIEW IF EXISTS `view_transaksi_pembayaran_lengkap`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_transaksi_pembayaran_lengkap` AS SELECT 
 1 AS `id_pembayaran`,
 1 AS `id_antrian`,
 1 AS `id_kasir`,
 1 AS `nama_pasien`,
 1 AS `jumlah_total`,
 1 AS `status_pembayaran`,
 1 AS `metode_pembayaran`,
 1 AS `tanggal_transaksi`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'simakapi'
--

--
-- Dumping routines for database 'simakapi'
--
/*!50003 DROP PROCEDURE IF EXISTS `GetHasilLabByNIK` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetHasilLabByNIK`(IN `p_nik` VARCHAR(16))
BEGIN
    SELECT 
    	h.id_hasil_lab,
    	h.id_staf_lab,
    	h.id_rekam_medis,
    	s.nama as nama_staf_lab,
    	h.jenis_pemeriksaan,
    	h.tanggal_pemeriksaan,
    	h.keterangan,
    	h.hasil_pemeriksaan
    FROM hasil_lab h
    LEFT JOIN staf_lab s ON h.id_staf_lab = s.id_staf_lab
    LEFT JOIN rekam_medis rm ON h.id_rekam_medis = rm.id_rekam_medis
    LEFT JOIN pasien p ON rm.id_pasien = p.id_pasien
    WHERE p.NIK = p_nik COLLATE utf8mb4_unicode_ci
    ORDER BY h.tanggal_pemeriksaan DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetPasienByRekamMedis` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPasienByRekamMedis`(IN `p_id_rekam_medis` INT)
BEGIN
    SELECT 
        p.id_pasien,
        p.NIK,
        p.nama,
        p.nomor_telepon,
        p.jenis_kelamin,
        p.tanggal_lahir,
        p.alamat
    FROM pasien p
    LEFT JOIN rekam_medis rm ON p.id_pasien = rm.id_pasien
    WHERE rm.id_rekam_medis = p_id_rekam_medis COLLATE utf8mb4_unicode_ci;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetPenggunaanLayananByIdPembayaran` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPenggunaanLayananByIdPembayaran`(IN id_bayar INT)
BEGIN
    SELECT 
		p.id_penggunaan_layanan,
        p.id_pembayaran,
        p.id_tarif_layanan,
        t.nama_layanan,
        t.tipe_layanan,
        p.kuantitas,
        p.harga_saat_itu
    FROM penggunaan_layanan p
    LEFT JOIN tarif_layanan t ON p.id_tarif_layanan = t.id_tarif_layanan
    WHERE p.id_pembayaran = id_bayar COLLATE utf8mb4_unicode_ci
    ORDER BY p.id_penggunaan_layanan;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetRekamMedisByNIK` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRekamMedisByNIK`(IN p_nik VARCHAR(16))
BEGIN
    SELECT 
        rm.id_rekam_medis,
        rm.id_pasien,
        rm.tanggal_pencatatan
    FROM rekam_medis rm
    LEFT JOIN pasien p ON rm.id_pasien = p.id_pasien
    WHERE p.NIK = p_nik COLLATE utf8mb4_unicode_ci;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetResepDokterByNIK` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetResepDokterByNIK`(IN p_nik VARCHAR(16))
BEGIN
    SELECT 
		r.id_resep_dokter,
        r.id_dokter,
        r.id_rekam_medis,
        r.id_pembayaran,
        d.nama AS nama_dokter,
        r.nama_obat,
        r.keterangan_resep,
        r.tanggal_resep
    FROM resep_dokter r
    LEFT JOIN dokter d ON r.id_dokter = d.id_dokter
    LEFT JOIN rekam_medis rm ON r.id_rekam_medis = rm.id_rekam_medis
    LEFT JOIN pasien p ON rm.id_pasien = p.id_pasien
    WHERE p.NIK = p_nik COLLATE utf8mb4_unicode_ci
    ORDER BY r.tanggal_resep DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetSOAPByNIK` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSOAPByNIK`(IN `p_nik` VARCHAR(16))
BEGIN
    SELECT 
        s.id_soap,
        s.id_rekam_medis,
        s.id_dokter,
        d.nama as nama_dokter,
        s.subjective,
        s.objective,
        s.assessment,
        s.plan,
        s.tanggal_pencatatan
    FROM soap s
    LEFT JOIN dokter d ON s.id_dokter = d.id_dokter
    LEFT JOIN rekam_medis rm ON s.id_rekam_medis = rm.id_rekam_medis
    LEFT JOIN pasien p ON rm.id_pasien = p.id_pasien
    WHERE p.NIK = p_nik COLLATE utf8mb4_unicode_ci
    ORDER BY s.tanggal_pencatatan DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `view_antrian_lengkap`
--

/*!50001 DROP VIEW IF EXISTS `view_antrian_lengkap`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_antrian_lengkap` AS select `a`.`id_antrian` AS `id_antrian`,`p`.`id_pasien` AS `id_pasien`,`d`.`id_dokter` AS `id_dokter`,`a`.`nomor_antrian` AS `nomor_antrian`,`p`.`nama` AS `nama_pasien`,`po`.`nama_poli` AS `poli`,`d`.`nama` AS `nama_dokter`,`a`.`keluhan` AS `keluhan`,`a`.`tanggal` AS `tanggal`,`a`.`keterangan` AS `keterangan` from (((`antrian` `a` left join `pasien` `p` on((`a`.`id_pasien` = `p`.`id_pasien`))) left join `dokter` `d` on((`a`.`id_dokter` = `d`.`id_dokter`))) left join `poli` `po` on((`d`.`id_poli` = `po`.`id_poli`))) order by `a`.`tanggal` desc,`a`.`id_antrian` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_dokter_lengkap`
--

/*!50001 DROP VIEW IF EXISTS `view_dokter_lengkap`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_dokter_lengkap` AS select `d`.`id_dokter` AS `id_dokter`,`d`.`id_poli` AS `id_poli`,`p`.`nama_poli` AS `nama_poli`,`d`.`nama` AS `nama_dokter`,`d`.`tanggal_lahir` AS `tanggal_lahir`,`d`.`gaji` AS `gaji`,`d`.`nomor_telepon` AS `nomor_telepon`,`d`.`spesialis` AS `spesialis`,`d`.`nomor_lisensi` AS `nomor_lisensi`,`d`.`jenis_kelamin` AS `jenis_kelamin`,`d`.`alamat` AS `alamat` from (`dokter` `d` left join `poli` `p` on((`d`.`id_poli` = `p`.`id_poli`))) order by `d`.`id_dokter` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_hasil_lab_lengkap`
--

/*!50001 DROP VIEW IF EXISTS `view_hasil_lab_lengkap`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_hasil_lab_lengkap` AS select `h`.`id_hasil_lab` AS `id_hasil_lab`,`h`.`id_staf_lab` AS `id_staf_lab`,`h`.`id_rekam_medis` AS `id_rekam_medis`,`s`.`nama` AS `nama_staf_lab`,`h`.`jenis_pemeriksaan` AS `jenis_pemeriksaan`,`h`.`tanggal_pemeriksaan` AS `tanggal_pemeriksaan`,`h`.`keterangan` AS `keterangan`,`h`.`hasil_pemeriksaan` AS `hasil_pemeriksaan` from (`hasil_lab` `h` left join `staf_lab` `s` on((`h`.`id_staf_lab` = `s`.`id_staf_lab`))) order by `h`.`tanggal_pemeriksaan` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_jadwal_karyawan_lengkap`
--

/*!50001 DROP VIEW IF EXISTS `view_jadwal_karyawan_lengkap`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_jadwal_karyawan_lengkap` AS select `jk`.`id_jadwal` AS `id_jadwal`,'Resepsionis' AS `jenis_karyawan`,`r`.`id_resepsionis` AS `id_karyawan`,`r`.`nama` AS `nama_karyawan`,NULL AS `spesialis`,NULL AS `nomor_lisensi`,`jk`.`senin` AS `senin`,`jk`.`selasa` AS `selasa`,`jk`.`rabu` AS `rabu`,`jk`.`kamis` AS `kamis`,`jk`.`jumat` AS `jumat`,`jk`.`sabtu` AS `sabtu`,`jk`.`minggu` AS `minggu`,`jk`.`jam_mulai` AS `jam_mulai`,`jk`.`jam_selesai` AS `jam_selesai`,`r`.`jenis_kelamin` AS `jenis_kelamin`,`r`.`nomor_telepon` AS `nomor_telepon` from (`jadwal_karyawan` `jk` join `resepsionis` `r` on((`jk`.`id_resepsionis` = `r`.`id_resepsionis`))) where (`jk`.`id_resepsionis` is not null) union all select `jk`.`id_jadwal` AS `id_jadwal`,'Dokter' AS `jenis_karyawan`,`d`.`id_dokter` AS `id_karyawan`,`d`.`nama` AS `nama_karyawan`,`d`.`spesialis` AS `spesialis`,`d`.`nomor_lisensi` AS `nomor_lisensi`,`jk`.`senin` AS `senin`,`jk`.`selasa` AS `selasa`,`jk`.`rabu` AS `rabu`,`jk`.`kamis` AS `kamis`,`jk`.`jumat` AS `jumat`,`jk`.`sabtu` AS `sabtu`,`jk`.`minggu` AS `minggu`,`jk`.`jam_mulai` AS `jam_mulai`,`jk`.`jam_selesai` AS `jam_selesai`,`d`.`jenis_kelamin` AS `jenis_kelamin`,`d`.`nomor_telepon` AS `nomor_telepon` from (`jadwal_karyawan` `jk` join `dokter` `d` on((`jk`.`id_dokter` = `d`.`id_dokter`))) where (`jk`.`id_dokter` is not null) union all select `jk`.`id_jadwal` AS `id_jadwal`,'Staf Lab' AS `jenis_karyawan`,`sl`.`id_staf_lab` AS `id_karyawan`,`sl`.`nama` AS `nama_karyawan`,NULL AS `spesialis`,`sl`.`nomor_lisensi` AS `nomor_lisensi`,`jk`.`senin` AS `senin`,`jk`.`selasa` AS `selasa`,`jk`.`rabu` AS `rabu`,`jk`.`kamis` AS `kamis`,`jk`.`jumat` AS `jumat`,`jk`.`sabtu` AS `sabtu`,`jk`.`minggu` AS `minggu`,`jk`.`jam_mulai` AS `jam_mulai`,`jk`.`jam_selesai` AS `jam_selesai`,`sl`.`jenis_kelamin` AS `jenis_kelamin`,`sl`.`nomor_telepon` AS `nomor_telepon` from (`jadwal_karyawan` `jk` join `staf_lab` `sl` on((`jk`.`id_staf_lab` = `sl`.`id_staf_lab`))) where (`jk`.`id_staf_lab` is not null) union all select `jk`.`id_jadwal` AS `id_jadwal`,'Kasir' AS `jenis_karyawan`,`k`.`id_kasir` AS `id_karyawan`,`k`.`nama` AS `nama_karyawan`,NULL AS `spesialis`,NULL AS `nomor_lisensi`,`jk`.`senin` AS `senin`,`jk`.`selasa` AS `selasa`,`jk`.`rabu` AS `rabu`,`jk`.`kamis` AS `kamis`,`jk`.`jumat` AS `jumat`,`jk`.`sabtu` AS `sabtu`,`jk`.`minggu` AS `minggu`,`jk`.`jam_mulai` AS `jam_mulai`,`jk`.`jam_selesai` AS `jam_selesai`,`k`.`jenis_kelamin` AS `jenis_kelamin`,`k`.`nomor_telepon` AS `nomor_telepon` from (`jadwal_karyawan` `jk` join `kasir` `k` on((`jk`.`id_kasir` = `k`.`id_kasir`))) where (`jk`.`id_kasir` is not null) order by `jenis_karyawan` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_karyawan_tanpa_jadwal`
--

/*!50001 DROP VIEW IF EXISTS `view_karyawan_tanpa_jadwal`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_karyawan_tanpa_jadwal` AS select 'Dokter' AS `jenis_karyawan`,`d`.`id_dokter` AS `id_karyawan`,`d`.`nama` AS `nama_karyawan`,`d`.`spesialis` AS `spesialis`,`p`.`nama_poli` AS `unit_kerja`,`d`.`nomor_telepon` AS `nomor_telepon`,`d`.`jenis_kelamin` AS `jenis_kelamin`,NULL AS `jabatan_lainnya` from (`dokter` `d` join `poli` `p` on((`d`.`id_poli` = `p`.`id_poli`))) where `d`.`id_dokter` in (select distinct `jadwal_karyawan`.`id_dokter` from `jadwal_karyawan` where (`jadwal_karyawan`.`id_dokter` is not null)) is false union all select 'Resepsionis' AS `jenis_karyawan`,`r`.`id_resepsionis` AS `id_karyawan`,`r`.`nama` AS `nama_karyawan`,NULL AS `spesialis`,'Front Office' AS `unit_kerja`,`r`.`nomor_telepon` AS `nomor_telepon`,`r`.`jenis_kelamin` AS `jenis_kelamin`,NULL AS `jabatan_lainnya` from `resepsionis` `r` where `r`.`id_resepsionis` in (select distinct `jadwal_karyawan`.`id_resepsionis` from `jadwal_karyawan` where (`jadwal_karyawan`.`id_resepsionis` is not null)) is false union all select 'Staf Lab' AS `jenis_karyawan`,`sl`.`id_staf_lab` AS `id_karyawan`,`sl`.`nama` AS `nama_karyawan`,NULL AS `spesialis`,'Laboratorium' AS `unit_kerja`,`sl`.`nomor_telepon` AS `nomor_telepon`,`sl`.`jenis_kelamin` AS `jenis_kelamin`,`sl`.`nomor_lisensi` AS `jabatan_lainnya` from `staf_lab` `sl` where `sl`.`id_staf_lab` in (select distinct `jadwal_karyawan`.`id_staf_lab` from `jadwal_karyawan` where (`jadwal_karyawan`.`id_staf_lab` is not null)) is false union all select 'Kasir' AS `jenis_karyawan`,`k`.`id_kasir` AS `id_karyawan`,`k`.`nama` AS `nama_karyawan`,NULL AS `spesialis`,'Administrasi' AS `unit_kerja`,`k`.`nomor_telepon` AS `nomor_telepon`,`k`.`jenis_kelamin` AS `jenis_kelamin`,NULL AS `jabatan_lainnya` from `kasir` `k` where `k`.`id_kasir` in (select distinct `jadwal_karyawan`.`id_kasir` from `jadwal_karyawan` where (`jadwal_karyawan`.`id_kasir` is not null)) is false order by `jenis_karyawan`,`id_karyawan` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_soap_lengkap`
--

/*!50001 DROP VIEW IF EXISTS `view_soap_lengkap`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_soap_lengkap` AS select `s`.`id_soap` AS `id_soap`,`s`.`id_rekam_medis` AS `id_rekam_medis`,`s`.`id_dokter` AS `id_dokter`,`d`.`nama` AS `nama_dokter`,`s`.`subjective` AS `subjective`,`s`.`objective` AS `objective`,`s`.`assessment` AS `assessment`,`s`.`plan` AS `plan`,`s`.`tanggal_pencatatan` AS `tanggal_pencatatan` from (`soap` `s` left join `dokter` `d` on((`s`.`id_dokter` = `d`.`id_dokter`))) order by `s`.`tanggal_pencatatan` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_transaksi_pembayaran_lengkap`
--

/*!50001 DROP VIEW IF EXISTS `view_transaksi_pembayaran_lengkap`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_transaksi_pembayaran_lengkap` AS select `tp`.`id_pembayaran` AS `id_pembayaran`,`tp`.`id_antrian` AS `id_antrian`,`tp`.`id_kasir` AS `id_kasir`,coalesce(`p`.`nama`,'Pasien Tidak Ditemukan') AS `nama_pasien`,coalesce(sum((`pl`.`kuantitas` * `pl`.`harga_saat_itu`)),0) AS `jumlah_total`,`tp`.`status_pembayaran` AS `status_pembayaran`,coalesce(`tp`.`metode_pembayaran`,'Belum Dipilih') AS `metode_pembayaran`,`tp`.`tanggal_transaksi` AS `tanggal_transaksi` from (((`transaksi_pembayaran` `tp` left join `antrian` `a` on((`tp`.`id_antrian` = `a`.`id_antrian`))) left join `pasien` `p` on((`a`.`id_pasien` = `p`.`id_pasien`))) left join `penggunaan_layanan` `pl` on((`tp`.`id_pembayaran` = `pl`.`id_pembayaran`))) group by `tp`.`id_pembayaran`,`tp`.`id_antrian`,`tp`.`id_kasir`,`p`.`nama`,`tp`.`status_pembayaran`,`tp`.`metode_pembayaran`,`tp`.`tanggal_transaksi` order by `tp`.`tanggal_transaksi` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-06 17:50:09
