<?php

require __DIR__.'/Config.php';

$config = new Config();

$connection = mysqli_connect($config->host, $config->username, $config->password, $config->database) or die('An error has occurred');

mysqli_set_charset($connection, 'utf8');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
