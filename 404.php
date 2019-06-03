<?
define("HIDE_H1", true);
define("ERROR_404", "Y");
if (preg_match("/\/.*\.((jpg)|(png)|(gif))/", $_SERVER["REQUEST_URI"])) {
    $bCgi = (stristr(php_sapi_name(), "cgi") !== false);
    if ($bCgi)
        header("Status: " . "404 Not Found");
    else
        header($_SERVER["SERVER_PROTOCOL"] . " " . "404 Not Found");

    die();
}

include_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/urlrewrite.php');

require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");
$APPLICATION->SetPageProperty("NOT_SHOW_NAV_CHAIN", "Y");
$APPLICATION->SetPageProperty("title_custom", "404 - cтраница не найдена");
$APPLICATION->SetPageProperty("keywords", "404 - cтраница не найдена");
$APPLICATION->SetPageProperty("description", "404 - cтраница не найдена");

/*if (Bitrix\Main\Loader::includeModule("sh.pageseo")) {
    $query = Sh\PageSeo\SeoTable::query();

    $result = $query->setSelect(array("LINK" => "SHPAGESEO_LINK"))
            ->setFilter(array("OLD_URL" => str_replace(" ", "+", $APPLICATION->GetCurPage(false)) . "%"))
            ->exec()
            ->fetch();

    if ($result && !empty($result["LINK"])) {
        LocalRedirect($result["LINK"], false, '301 Moved Permanently');
        die();
    }
}*/

CHTTP::SetStatus("404 Not Found");
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");


$APPLICATION->SetTitle("404 - cтраница не найдена");
$APPLICATION->AddChainItem('Страница не найдена');
?>
<div class="simple-page">
    <img src="/local/images/bg/404.png" alt="">
    <h2>Похоже запрашиваемой страницы<br>
        не существует.
    </h2>
    <p>
        К сожалению мы не можем предоставить её<br>
        Вам, но можем посоветовать
    </p>
    <p>
        <a href="/" class="link">Перейти на главную</a>
    </p>
</div>
<? require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>