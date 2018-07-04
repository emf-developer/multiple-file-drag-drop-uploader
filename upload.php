<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

header('Content-Type: application/json');

$allowed = ['png', 'jpg', 'jpeg'];
$processed = [];
$destFolder = 'uploads/';


foreach ($_FILES['files']['name'] as $key => $name) {
    if($_FILES['files']['error'][$key] === 0){

        $temp = $_FILES['files']['tmp_name'][$key];
        $ext = explode('.',$name);
        $ext = strtolower(end($ext));

        $newFile = uniqid('', true) . '_' . time() . '.' . $ext;

        try{

            if(in_array($ext, $allowed)){
                if(move_uploaded_file($temp, $destFolder . $newFile)){
                    $processed[] = array(
                        'name' => $name,
                        'newFile' => $newFile,
                        'destFolder' => $destFolder,
                        'uploaded' => true
                    );
                } else {
                    $processed[] = array(
                        'name' => $name,
                        'error' => 'cant move uploaded file',
                        'uploaded' => false
                    );
                }
            } else {
                $processed[] = array(
                    'name' => $name,
                    'error' => 'file with \'' . $ext . '\' extension is not allowed to upload',
                    'uploaded' => false
                );
            }

        } catch(Exception $e) {

           $processed[] = array(
               'php_error: ' =>  $e->getMessage(),
               'uploaded' => false
           );

        }

    } else {
        $processed[] = array(
            'php_file_uploading_error_number: ' =>  $_FILES['files']['error'][$key],
            'uploaded' => false
        );
    }
}

echo json_encode($processed);