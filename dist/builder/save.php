<?php

    /* CONFIG */

    $pathToAssets = array("elements/css", "elements/fonts", "elements/images", "elements/js", "elements/json-files", "elements/pdf", "elements/php", "elements/video");

    $filename = "tmp/website.zip"; //use the /tmp folder to circumvent any permission issues on the root folder

    /* END CONFIG */


    $zip = new ZipArchive();

    $zip->open($filename, ZipArchive::CREATE);


    $imagesArray = array();

    if(isset($_POST['gfort_images'])) {
        $imagesArray = explode('/', $_POST['gfort_images']);
    }


    //add folder structure

    foreach( $pathToAssets as $thePath ) {

        // Create recursive directory iterator
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator( $thePath ),
            RecursiveIteratorIterator::LEAVES_ONLY
        );

        if ($thePath === "elements/images") {
            foreach ($files as $name => $file) {

                foreach ($imagesArray as $image) {
                    if( $file->getFilename() != '.' && $file->getFilename() != '..' && $file->getFilename() === $image) {

                        // Get real path for current file
                        $filePath = $file->getRealPath();

                        $temp = explode("/", $name);

                        array_shift( $temp );

                        $newName = implode("/", $temp);

                        // Add current file to archive
                        $zip->addFile($filePath, $newName);

                    }
                }

            }
        } else {
            foreach ($files as $name => $file) {

                if( $file->getFilename() != '.' && $file->getFilename() != '..' ) {

                    // Get real path for current file
                    $filePath = $file->getRealPath();

                    $temp = explode("/", $name);

                    array_shift( $temp );

                    $newName = implode("/", $temp);

                    // Add current file to archive
                    $zip->addFile($filePath, $newName);

                }

            }
        }

    }


    foreach( $_POST['pages'] as $page=>$content ) {

        $pageTitle = "/<title>(.*)<\/title>/";
        $content = preg_replace($pageTitle, "<title>".$_POST['page_title']."</title>", $content);

        $metaDescription = "/<meta name=\"description\" content=\"(.*)\">/";
        $content = preg_replace($metaDescription, "<meta name=\"description\" content=\"".$_POST['meta_desc']."\">", $content);

        $metaKeywords = "/<meta name=\"keywords\" content=\"(.*)\">/";
        $content = preg_replace($metaKeywords, "<meta name=\"keywords\" content=\"".$_POST['meta_keywords']."\">", $content);

        $htmlTag = "<!DOCTYPE html>\n<!--[if IE 9 ]>    <html lang=\"en\" class=\"no-js ie9\"> <![endif]-->\n<!--[if (gt IE 9)|!(IE)]><!--> <html lang=\"en\" class=\"no-js\">\n";

        $pageLoader = "/<div id=\"main-wrapper\"(.*)>/";
        if (isset($_POST['page_loader'])) {
            $content = preg_replace($pageLoader, "  <div class=\"loader-block\">
                <div class=\"loader-block-container\">
                    <div class=\"circle-block circle-block-style-" . $_POST['loader_no'] . "\"></div>
                </div>
            </div>
            <div id=\"main-wrapper\">", $content);
        } else {
            $content = preg_replace($pageLoader, "<div id=\"main-wrapper\">", $content);
        }

        if (isset($_POST['full_width_switch'])) {
            $fullWidthPage = "/<body data-spy=\"scroll\" data-target=\".header-menu-container\" data-offset=\"61\">/";
            $content = preg_replace($fullWidthPage, "<body class=\"full-width-page\">", $content);
        }


        $zip->addFromString($page.".html", $htmlTag.stripslashes($content));

    }

    //$zip->addFromString("testfilephp.txt" . time(), "#1 This is a test string added as testfilephp.txt.\n");
    //$zip->addFromString("testfilephp2.txt" . time(), "#2 This is a test string added as testfilephp2.txt.\n");

    $zip->close();


    $file_name = basename($filename);

    header("Content-Type: application/zip");
    header("Content-Transfer-Encoding: Binary");
    header("Content-Disposition: attachment; filename=$file_name");
    header("Content-Length: " . filesize($filename));

    readfile($filename);

    unlink($filename);

    exit;
?>