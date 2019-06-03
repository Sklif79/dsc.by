<?

ini_set("display_errors", "1");
ini_set("display_startup_errors", "0");
ini_set('error_reporting', E_ERROR);

if ($_REQUEST["mode"] && $_REQUEST["mode"] == "init") {

    require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");
    if (Bitrix\Main\Loader::includeModule('seo') && $USER->Login($_POST["USER_LOGIN"], $_POST["USER_PASSWORD"])) {
        $APPLICATION->RestartBuffer();


        $dbl = Bitrix\Seo\SitemapTable::getList(array("select" => array("ID", "SETTINGS")));
        $domain = preg_replace('/^((?:http:\/\/)?(?:www\.)?)?/', '', $_SERVER["SERVER_NAME"]);

        $mapList = array();

        while ($res = $dbl->fetch()) {
            $res["SETTINGS"] = unserialize($res["SETTINGS"]);
            $res["SETTINGS"]["DOMAIN"] = preg_replace('/^((?:http:\/\/)?(?:www\.)?)?/', '', $res["SETTINGS"]["DOMAIN"]);
            if ($res["SETTINGS"]["DOMAIN"] == $domain) {
                $mapList[] = $res["ID"];
            }
        }

        echo json_encode(array("MAPS" => $mapList, "SESSID" => bitrix_sessid(), "IP" => $_SERVER["REMOTE_ADDR"]));
    }
    else {
        echo json_encode(array("ERROR" => "not init"));
    }

    die(PHP_EOL);
}


//домен логин пароль - должны быть заполнены
if (empty($argv[1]) || empty($argv[2]) || empty($argv[3])) {
    die("wrong argument." . PHP_EOL);
}
$site = $argv[1];

$ch = curl_init();
$url = "https://test:test@{$site}/sitemapgen.php?mode=init";
$arSend = array("USER_LOGIN" => $argv[2], "USER_PASSWORD" => $argv[3], "mode" => "init");
$cookiefile = __DIR__ . "/cookie.txt";

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($arSend));
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookiefile);
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookiefile);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$curlRes = curl_exec($ch);

$siteMapParams = json_decode($curlRes, true);

foreach ($siteMapParams["MAPS"] as $mapID) {
    $answer = false;

    $arSend = array("lang" => "ru", "action" => "sitemap_run", "ID" => $mapID, "value" => 0, "pid" => "", "NS" => array(), "sessid" => $siteMapParams["SESSID"]);
    while ($answer === false || preg_match("/top\.BX\.runSitemap\((\d+).*?,.*?(\d+).*?,.*?(\d+).*?,.*?({.*})\)/", $answer, $match)) {

        if ($answer !== false) {
            $arSend["ID"] = $match[1];
            $arSend["value"] = $match[2];
            $arSend["pid"] = $match[3];
            $arSend["NS"] = jsinit_decode($match[4]);
        }


        curl_setopt($ch, CURLOPT_URL, "https://{$site}/bitrix/admin/seo_sitemap_run.php");
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($arSend));


        $answer = curl_exec($ch);

        print_r("\nin work. wait......\n");
    }
}
//удаление куки
unlink($cookiefile);
echo "done" . PHP_EOL;

/**
 * Далее код для расшифровки js объкта и приведение его к массиву
 */
class JSvarDecoderCtx {

    public function __construct($type) {
        $this->fields = ($type == '[') ? array() : new stdClass();
    }

    public function add_name(&$text) {
        $this->name = $text;
        $text = '';
    }

    public function add_value(&$text) {
        // weird input like a mix of fields and array elements will cause warnings here
        if (!isset($this->name))
            $this->fields[] = $text;
        else
            $this->fields->{$this->name} = $text;
        $text = '';
    }

}

define('JSVAL_TEXT', 12001);
define('JSVAL_STRING', 12002);
define('JSVAL_REGEXP', 12003);
define('JSVAL_COMMT1', 12004);
define('JSVAL_COMMT2', 12005);

function jsinit_decode($json) {
    // parse a JS initializer
    $stack = array();
    $text = "";
    $state = JSVAL_TEXT;
    $len = strlen($json);
    for ($i = 0; $i != $len; $i++) {
        $c = $json[$i];
        switch ($state) {
            case JSVAL_TEXT:
                switch ($c) {
                    case '{' :
                    case '[' : array_unshift($stack, new JSvarDecoderCtx($c));
                        break;
                    case '}' :
                    case ']' : $stack[0]->add_value($text);
                        $text = array_shift($stack)->fields;
                        break;
                    case ':' : $stack[0]->add_name($text);
                        break;
                    case ',' : $stack[0]->add_value($text);
                        break;
                    case '"' :
                    case "'" : $closer = $c;
                        $state = JSVAL_STRING;
                        break;
                    case '/' :
                        assert($i != ($len - 1));
                        switch ($json[$i + 1]) {
                            case '/': $state = JSVAL_COMMT1;
                                break;
                            case '*': $state = JSVAL_COMMT2;
                                break;
                            default : $state = JSVAL_REGEXP;
                                $text .= $c;
                        }
                        break;
                    case "\r":
                    case "\n":
                    case "\t":
                    case ' ' : break;
                    default : $text .= $c;
                }
                break;
            case JSVAL_STRING: if ($c != $closer)
                    $text .= $c;
                else
                    $state = JSVAL_TEXT;
                break;
            case JSVAL_REGEXP: if (($c != ',') && ($c != '}'))
                    $text .= $c;
                else {
                    $i--;
                    $state = JSVAL_TEXT;
                } break;
            case JSVAL_COMMT1: if (($c == "\r") || ($c == "\n"))
                    $state = JSVAL_TEXT;
                break;
            case JSVAL_COMMT2:
                if ($c != '*')
                    break;
                assert($i != ($len - 1));
                if ($json[$i + 1] == '/') {
                    $i++;
                    $state = JSVAL_TEXT;
                }
        }
    }
    assert($state == JSVAL_TEXT);


    $result = array_filter(
            json_decode(json_encode($text), true), function($el)
        {
        if (is_array($el)) {
            $el = array_filter($el, function($el)
                {
                return !empty($el) || strlen($el);
                });
        }
        return !empty($el) || strlen($el);
        }
    );

    return $result;
}
