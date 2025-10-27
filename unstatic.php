<?php

    $allowedEmails = array("info@lsfusion.org", "elena@mite.club");
    $defaultEmails = array("info@lsfusion.org");

    $replaceSign = "#";

    $subject = "Запрос с МайКомпани (" .date("Y-m-d H:i:s") . ")";


    $message = "";

    foreach ($_POST as $_name => $_value){
        switch( $_name ){
            case "subject":
                $subject = $_value . " (" .date("Y-m-d H:i:s") . ")";
                break;
            case "thankyou":
            case "to":
                break;
            default:
                $message .= "<strong>{$_name}:</strong> {$_value} <br />";
        }
    }

    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";


    if( isset($_POST["to"]) ){

        if( is_array($_POST["to"]) ){
            foreach($_POST["to"] as $_email){
                $_email = str_replace($replaceSign, "@", $_email);
                if( in_array($_email, $allowedEmails) ){
                    @mail($_email, $subject, $message, $headers);
                }

            }
        }else{
            $_email = str_replace($replaceSign, "@", $_POST["to"]);
            if( in_array($_email, $allowedEmails) ){
                $result = @mail($_email, $subject, $message, $headers);
            }
        }

    }else{

        foreach($defaultEmails as $_email){
            @mail($_email, $subject, $message, $headers);
        }
    }

    if( isset($_POST["thankyou"]) ) {
        header("Location: {$_POST["thankyou"]}");
    }else{
        echo "Are you bot?";
    }
