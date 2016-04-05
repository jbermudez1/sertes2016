<?php

function getParameters($allowedParameters)
{
    $parameters = [];

    foreach ($allowedParameters as $allowedParameter) {
        if (isset($_GET[$allowedParameter])) {
            $parameters[$allowedParameter] = $_GET[$allowedParameter];
        }
    }

    return $parameters;
}
