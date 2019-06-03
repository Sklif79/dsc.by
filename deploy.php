<?
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
putenv("HOME=/home/bitrix/");

$commands = array(
 'pwd',
 'git config --global user.email "git@newsite.by',
 'git config --global user.name "git_newsite"',
 'git config --global --list',
 'git config core.filemode false',
 'whoami',
 'git status',
 'git add --all',
 'git commit -m "Changes on production"',
 'git pull origin master',
 'git checkout --theirs .',
 'git commit -am "Remote Conflict"',
 'git push origin master',
 'git submodule sync',
 'git submodule update',
 'git submodule status',
 'touch execafterdeploy.php',
 'cat execafterdeploy.php',
);

// Run the commands for output
$output = '';
foreach ($commands AS $command) {
// Run it
    $tmp = shell_exec($command . " 2>&1 ");
// Output
    $output .= "<span style=\"color: #6BE234;\">\$</span> <span style=\"color: #729FCF;\">{$command}\n</span>";
    $output .= "<div style='padding-left:20px;'>" . nl2br(htmlentities(trim($tmp))) . "</div>";
}
if (filesize($_SERVER["DOCUMENT_ROOT"] . "/execafterdeploy.php")) {
    ob_start();
//выполнение файла и его последующая очистка
    require_once $_SERVER["DOCUMENT_ROOT"] . "/execafterdeploy.php";
    file_put_contents($_SERVER["DOCUMENT_ROOT"] . "/execafterdeploy.php", "");
    $output.= "<div style='padding-left:20px;'><h2>Выполнения файла после деплоя</h2><br/>" . ob_get_clean() . "</div>";


    $commands = array(
     'git status',
     'git add --all',
     'git commit -m "Changes on production"',
     'git push origin master',
    );

// 
    foreach ($commands AS $command) {
        // Run it
        $tmp = shell_exec($command . " 2>&1 ");
        // Output
        $output .= "<span style=\"color: #6BE234;\">\$</span> <span style=\"color: #729FCF;\">{$command}\n</span>";
        $output .= "<div style='padding-left:20px;'>" . nl2br(htmlentities(trim($tmp))) . "</div>";
    }
}

// Make it pretty for manual user access (and why not?)
$APPLICATION->SetTitle("GIT DEPLOYMENT SCRIPT");
?>
<div style="color: #FFFFFF; background-color: #000000; border: 2px solid #666; padding: 5px;"><?= $output; ?></div>

<? require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>