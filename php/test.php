<?php

include_once('dbconn.php');

$sql = selectRandomQuery('question, answer1, answer2, answer3, answer4, answer_ok', 'questions');
$questions = $db_questions->getAll($sql);

header('Content-Type: application/json');
echo json_encode($questions);
