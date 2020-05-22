<?php
session_start();

include_once("mypdo.php");
include_once("data.php");
include_once("querybuilder.php");
$db_data = parse_ini_file("dbc.ini");
$dsn = "mysql:host={$db_data['host']};dbname={$db_data['database']};charset=utf8mb4";
$db_conn = new MyPDO($dsn, $db_data['user'], $db_data['pass']);
$db_questions = new Data($db_conn);
$db_users = new Data($db_conn);