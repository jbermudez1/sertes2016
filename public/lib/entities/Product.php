<?php

require __DIR__.'/Entity.php';

class Product extends Entity
{

    protected function query($parameters)
    {
        $query = 'SELECT * FROM products';
        $operator = 'AND';
        $relations = [];

        if (count($parameters) > 0) {
            $conditional = $this->conditional($parameters);
            $conditionalQuery = implode(' '.$operator.' ', $conditional);
            $query .= ' WHERE '.$conditionalQuery;
        }

        return compact('query', 'relations');
    }
}
