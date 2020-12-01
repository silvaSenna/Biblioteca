CREATE DATABASE  IF NOT EXISTS `aps` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `aps`;
-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: aps
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `dataNasc` date DEFAULT NULL,
  `endereco` varchar(100) DEFAULT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `cep` varchar(20) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `cpf` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `UN_cpf` (`cpf`),
  UNIQUE KEY `UN_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Ayrton Silva Meireles','1994-06-02','Rua sem saída ','Bairro Novo','60451-074','(88) 8888-8325','(88) 88888-8444','333.333.333-33','ayrton@gmail.com'),(2,'Mary Silva Meireles','1997-05-20','Rua sem saída ','Bairro','60431-074','(85) 5555-5555','(85) 55555-5555','054.888.995-57','mary@gmail.com');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emprestimo`
--

DROP TABLE IF EXISTS `emprestimo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emprestimo` (
  `id_emp` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_livro` int(11) DEFAULT NULL,
  `cliente` int(11) DEFAULT NULL,
  `dataEmprestimo` date DEFAULT NULL,
  `dataDevolucao` date DEFAULT NULL,
  PRIMARY KEY (`id_emp`),
  KEY `fk_emp_user` (`id_user`),
  KEY `fk_emp_livro` (`id_livro`),
  KEY `fk_emprestimo_cliente` (`cliente`),
  CONSTRAINT `fk_emp_user` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id_user`),
  CONSTRAINT `fk_emprestimo_cliente` FOREIGN KEY (`cliente`) REFERENCES `cliente` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emprestimo`
--

LOCK TABLES `emprestimo` WRITE;
/*!40000 ALTER TABLE `emprestimo` DISABLE KEYS */;
INSERT INTO `emprestimo` VALUES (4,1,1,1,'2019-06-02','2019-06-02'),(5,1,11,2,'2019-06-02','2019-06-12');
/*!40000 ALTER TABLE `emprestimo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo`
--

DROP TABLE IF EXISTS `grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupo` (
  `id_group` int(11) NOT NULL AUTO_INCREMENT,
  `nome_group` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_group`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo`
--

LOCK TABLES `grupo` WRITE;
/*!40000 ALTER TABLE `grupo` DISABLE KEYS */;
INSERT INTO `grupo` VALUES (1,'Administrador'),(2,'Atendimento');
/*!40000 ALTER TABLE `grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livro`
--

DROP TABLE IF EXISTS `livro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `livro` (
  `idlivro` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `autor` varchar(50) DEFAULT NULL,
  `editora` varchar(50) DEFAULT NULL,
  `edicao` varchar(45) DEFAULT NULL,
  `nome_identificacao` varchar(20) DEFAULT NULL,
  `codigo` varchar(27) NOT NULL,
  PRIMARY KEY (`idlivro`),
  UNIQUE KEY `un_livro` (`nome_identificacao`,`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livro`
--

LOCK TABLES `livro` WRITE;
/*!40000 ALTER TABLE `livro` DISABLE KEYS */;
INSERT INTO `livro` VALUES (1,'Ayrton Senna','Globo','Abril','1° edição','isbn','111-11-111-1111-1'),(11,'aaaaaaaaaaaaaaaaaa','aaaaaaaa','aaaaaaaa','aaaaaaaaa','isbn','111-11-111-1111-2'),(12,'dsadfasdf','asdfasd','fasdfasdf','1º Edição','isbn','111-11-111-1111-3');
/*!40000 ALTER TABLE `livro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livroStatus`
--

DROP TABLE IF EXISTS `livroStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `livroStatus` (
  `idStatus` int(11) NOT NULL AUTO_INCREMENT,
  `idlivro` int(11) DEFAULT NULL,
  `idEmprestimo` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idStatus`),
  KEY `idEmprestimo` (`idEmprestimo`),
  CONSTRAINT `livroStatus_ibfk_1` FOREIGN KEY (`idEmprestimo`) REFERENCES `emprestimo` (`id_emp`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livroStatus`
--

LOCK TABLES `livroStatus` WRITE;
/*!40000 ALTER TABLE `livroStatus` DISABLE KEYS */;
INSERT INTO `livroStatus` VALUES (4,1,4,0),(5,11,5,1);
/*!40000 ALTER TABLE `livroStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(100) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `u_login` (`login`),
  KEY `fk_login_user` (`user`),
  CONSTRAINT `fk_login_user` FOREIGN KEY (`user`) REFERENCES `usuario` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'ayrton','81dc9bdb52d04dc20036dbd8313ed055',1),(4,'mary','81dc9bdb52d04dc20036dbd8313ed055',4);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissao`
--

DROP TABLE IF EXISTS `permissao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissao` (
  `id_permiss` int(11) NOT NULL AUTO_INCREMENT,
  `nomePermissao` varchar(45) DEFAULT NULL,
  `interface` varchar(40) DEFAULT NULL,
  `grupo` int(11) DEFAULT NULL,
  `ver` tinyint(1) DEFAULT NULL,
  `editar` tinyint(1) DEFAULT NULL,
  `excluir` tinyint(1) DEFAULT NULL,
  `gravar` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_permiss`),
  KEY `fk_permissao_grupo` (`grupo`),
  CONSTRAINT `fk_permissao_grupo` FOREIGN KEY (`grupo`) REFERENCES `grupo` (`id_group`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissao`
--

LOCK TABLES `permissao` WRITE;
/*!40000 ALTER TABLE `permissao` DISABLE KEYS */;
INSERT INTO `permissao` VALUES (1,'Livros - Cadastrar','/app/livro/livroCad',1,1,1,1,1),(2,'Home - Pagina Inicial','/app/home/home',1,1,1,1,1),(3,'','/app/livro/view',1,1,1,1,1),(4,NULL,'/app/livro/consulta',1,1,1,1,1),(5,'','/app/livro/paginar',1,1,1,1,1),(6,'Livros - Excluir','/app/livro/excluir',1,1,1,1,1),(7,NULL,'/app/livro/ConsultaEditar',1,1,1,1,1),(8,'Livros - Editar','/app/livro/editar',1,1,1,1,1),(9,'Usuários - Pagina Usuário','/app/usuario/view',1,1,1,1,1),(10,'Usuários - Consulta','/app/usuario/consulta',1,1,1,1,1),(11,'Usuário - Cadastro','/app/usuario/cadastro',1,1,1,1,1),(12,'Usuário - Excluir','/app/usuario/excluir',1,1,1,1,1),(13,'Usuario - Consulta Editar','/app/usuario/consultaEditar',1,1,1,1,1),(14,'Usuário - Editar','/app/usuario/editar',1,1,1,1,1),(15,'Livros - Cadastrar','/app/livro/livroCad',2,1,1,1,1),(16,'Home - Pagina Inicial','/app/home/home',2,1,1,1,1),(17,'','/app/livro/view',2,1,1,1,1),(18,NULL,'/app/livro/consulta',2,1,1,1,1),(19,'','/app/livro/paginar',2,1,1,1,1),(20,'Livros - Excluir','/app/livro/excluir',2,0,0,0,0),(21,NULL,'/app/livro/ConsultaEditar',2,1,1,1,1),(22,'Livros - Editar','/app/livro/editar',2,1,1,1,1),(23,'Usuários - Pagina','/app/usuario/view',2,0,0,0,0),(24,'Usuários - Consulta','/app/usuario/consulta',2,0,0,0,0),(25,'Usuário - Cadastro','/app/usuario/cadastro',2,0,0,0,0),(26,'Usuário - Excluir','/app/usuario/excluir',2,0,0,0,0),(28,'Usuario - Consulta Editar','/app/usuario/consultaEditar',2,0,0,0,0),(29,'Usuário - Editar','/app/usuario/editar',2,0,0,0,0),(30,'Cliente - Pagina','/app/cliente/view',1,1,1,1,1),(31,'Cliente - Pagina','/app/cliente/view',2,1,1,1,1),(32,'Cliente - Cadastro','/app/cliente/cadastro',1,1,1,1,1),(33,'Cliente - Cadastro','/app/cliente/cadastro',2,1,1,1,1),(34,'Usuario- Validar Campos','/app/usuario/validarCampUnique',1,1,1,1,1),(35,'Usuario- Validar Campos','/app/usuario/validarCampUnique',2,1,1,1,1),(36,NULL,'/app/cliente/consulta',1,1,1,1,1),(37,'','/app/cliente/consulta',2,1,1,1,1),(38,NULL,'/app/cliente/excluir',1,1,1,1,1),(39,NULL,'/app/cliente/excluir',2,0,0,0,0),(40,NULL,'/app/cliente/consultaEditar',1,1,1,1,1),(41,NULL,'/app/cliente/consultaEditar',2,1,1,1,1),(42,NULL,'/app/cliente/editar',1,1,1,1,1),(43,NULL,'/app/cliente/editar',2,1,1,1,1),(44,NULL,'/app/emprestimo/view',1,1,1,1,1),(45,NULL,'/app/emprestimo/view',2,1,1,1,1),(46,NULL,'/app/emprestimo/consultaCliente',1,1,1,1,1),(47,NULL,'/app/emprestimo/consultaCliente',2,1,1,1,1),(48,NULL,'/app/emprestimo/consultaLivro',1,1,1,1,1),(49,NULL,'/app/emprestimo/consultaLivro',2,1,1,1,1),(50,'','/app/emprestimo/cadastro',1,1,1,1,1),(51,NULL,'/app/emprestimo/cadastro',2,1,1,1,1),(52,NULL,'/app/emprestimo/consulta',1,1,1,1,1),(53,NULL,'/app/emprestimo/consulta',2,1,1,1,1),(54,NULL,'/app/emprestimo/consultaEditar',1,1,1,1,1),(55,NULL,'/app/emprestimo/consultaEditar',2,1,1,1,1),(56,NULL,'/app/emprestimo/editar',1,1,1,1,1),(57,NULL,'/app/emprestimo/editar',2,1,1,1,1),(58,NULL,'/app/emprestimo/finalizarEmprestimo',1,1,1,1,1),(59,NULL,'/app/emprestimo/finalizarEmprestimo',2,1,1,1,1),(60,NULL,'/app/emprestimo/excluir',1,1,1,1,1),(61,NULL,'/app/emprestimo/excluir',2,0,0,0,0);
/*!40000 ALTER TABLE `permissao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `dataNasc` date DEFAULT NULL,
  `endereco` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `grupo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `UN_email` (`email`),
  KEY `fk_usuario_grupo_idx` (`grupo`),
  CONSTRAINT `fk_usuario_grupo` FOREIGN KEY (`grupo`) REFERENCES `grupo` (`id_group`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Ayrton','(85)99999-9999','(85)99999-9999','1994-06-02','Rua','ayrton@gmail.com',1),(4,'mary','(33) 3333-3333','(44) 44444-4444','2004-03-12','Rua sem saída ','mary@gmail.com',2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'aps'
--

--
-- Dumping routines for database 'aps'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-02  9:14:25
