<?php

class Config
{

    protected $config = [
        'database' => 'sertes',
        'host' => 'localhost',
        'username' => 'root',
        'password' => 'root'
    ];

    public function __get($var)
    {
        return isset($this->config[$var])
            ? $this->config[$var]
            : null;
    }
}
