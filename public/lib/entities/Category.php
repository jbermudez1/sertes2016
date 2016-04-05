<?php

require __DIR__.'/Entity.php';

class Category extends Entity
{

    protected function query($parameters)
    {
        $query = 'SELECT * FROM categories';
        $operator = 'AND';
        $relations = [];

        if (count($parameters) > 0) {
            $conditional = $this->conditional($parameters);
            $conditionalQuery = implode(' '.$operator.' ', $conditional);
            $query .= ' WHERE '.$conditionalQuery;

            
            $relations['subcategories1'] = $this->subcategories1($parameters);
            $relations['subcategories2'] = $this->subcategories2($parameters);
        }

        return compact('query', 'relations');
    }

    protected function products($id)
    {
        if (is_array($id)) {
            $id = $id['id'];
        }

        $query = 'SELECT *
                        FROM products
                        WHERE category_id = '.$id;

        return $query;
    }

    protected function subcategories1($id)
    {
        if (is_array($id)) {
            $id = $id['id'];
        }

        $query = '  SELECT sb1.id, sb1.title
                    FROM products p
                      INNER JOIN categories c ON c.id = p.category_id
                      INNER JOIN categories sb1 ON sb1.id = p.subcategory1_id
                    WHERE category_id = '.$id.'
                    GROUP BY sb1.title;';

        return $query;
    }

    protected function subcategories2($id)
    {
        if (is_array($id)) {
            $id = $id['id'];
        }

        $query = '  SELECT sb2.id, p.subcategory1_id, sb2.title
                    FROM products p
                      INNER JOIN categories c ON c.id = p.category_id
                      INNER JOIN categories sb2 ON sb2.id = p.subcategory2_id
                    WHERE category_id = '.$id.'
                    GROUP BY sb2.title;';

        return $query;
    }
}
