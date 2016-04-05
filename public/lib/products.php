<?php

require __DIR__.'/bootstrap/start.php';
require __DIR__.'/helpers/helpers.php';
require __DIR__.'/entities/Product.php';

$allowedParameters = [
    'id',
    'category_id',
    'subcategory1_id',
    'subcategory2_id',
];

$parameters = getParameters($allowedParameters);

header('Content-type: application/json');
$products = new Product();
echo $products->get($parameters, $connection);
