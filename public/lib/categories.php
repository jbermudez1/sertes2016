<?php

require __DIR__.'/bootstrap/start.php';
require __DIR__.'/helpers/helpers.php';
require __DIR__.'/entities/Category.php';

$allowedParameters = [
    'id'
];

$parameters = getParameters($allowedParameters);

header('Content-type: application/json');
$categories = new Category();
echo $categories->get($parameters, $connection);
