<?php

abstract class Entity
{
    // protected $relations = [];
    
    public function get($parameters, $connection)
    {
        $queryInfo = $this->query($parameters);
        $data = $this->select($queryInfo['query'], $connection);

        // Get relations of entity
        foreach ($queryInfo['relations'] as $relation => $relationQuery) {
            $data[$relation] = $this->select($relationQuery, $connection);
        }

        // Close connection of mysql
        mysqli_close($connection);

        // Return JSON data
        return json_encode($data);
    }

    protected function conditional($parameters)
    {
        $conditional = [];

        foreach ($parameters as $key => $value) {
            if ($value) {
                $conditional[] = $key.'='.$value;
            }
        }

        return $conditional;
    }

    protected function select($query, $connection)
    {
        $select = mysqli_query($connection, $query) or die(mysql_error($connection));
        $data = [];

        $count = mysqli_num_rows($select);
        while ($row = mysqli_fetch_assoc($select)) {
            $data[] = $row;
        }

        return ($count == 1 ? $data[0] : $data);
    }


    abstract protected function query($conditional);
}
