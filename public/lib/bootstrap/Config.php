<?php

class Config
{

    protected $config = [
        'database' => 'proyecc4_sertes',
        'host' => '174.136.30.161',
        'username' => 'proyecc4_sertes',
        'password' => 'Sertes123'
    ];

    public function __get($var)
    {
        return isset($this->config[$var])
            ? $this->config[$var]
            : null;
    }
}
