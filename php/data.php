<?php
/*
Running queries on database
*/
class Data {
    protected $db;
    protected $data;

    public function __construct(MyPDO $db) {
        $this->db = $db;
    }

    public function getRow($sql) {
        $this->data = $this->db->getOne($sql)->fetch(PDO::FETCH_NAMED);
        return $this->data;
    }

    public function getSingleRow($sql, $arg) {
        $this->data = $this->db->run($sql, [$arg])->fetch(PDO::FETCH_NAMED);
        return $this->data;
    }

    public function getAll($sql, $arg = NULL) {
        $this->data = $this->db->run($sql, $arg)->fetchAll(PDO::FETCH_NAMED);
        return $this->data;
    }

    public function getAllRows($sql, $arg) {
        $this->data = $this->db->run($sql, [$arg])->fetchAll(PDO::FETCH_NAMED);
        return $this->data;
    }

    public function setRow($sql, $args) {
        $this->db->write($sql, $args);
        return true;
    }
}
