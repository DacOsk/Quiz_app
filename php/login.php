<?php
include_once('dbconn.php');
$data = [];

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data)) {

    $data['name'] = htmlspecialchars(trim($data['name']));
    $data['password'] = htmlspecialchars(trim($data['password']));

    $sql = selectWhereQuery('name, password, admin', 'users', 'name = ?');
    $sql_admin = selectWhereQuery("name", "users", "name = 'admin'");
    $user = $db_users->getSingleRow($sql, $data['name']);
    $admin = $db_users->getRow($sql_admin);

    if (!$user && !$admin) {
        $sql = insertQuery('users', 'name, password, admin', '?, ?, ?');
        $admin_data = ['admin', password_hash('admin', PASSWORD_DEFAULT), 1];
        if ($db_users->setRow($sql, $admin_data)) {
            echo json_encode(['name' => 'Added default admin account. Login with name: admin, password: admin.']);
        } else {
            echo json_encode(['name' => 'Error!']);
        }
    } else if ($user) {
        if (password_verify($data['password'], $user['password'])) {
            echo json_encode(['name' => 'Login OK!']);
        } else {
            echo json_encode(['name' => 'Login FAILED!']);
        }
    } else {
        echo json_encode(['name' => 'No users. Login as admin.']);
    }
}
