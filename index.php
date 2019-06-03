<?

define("MAIN_PAGE", true);
define("HIDE_H1", true);
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "Интернет-магазин материалов для кровли и фасада \"DOCKE\" с доставкой по Минску и городам Беларуси. Предоставляем рассрочку, длительную гарантию и выгодные цены в Dsc.by.");
$APPLICATION->SetPageProperty("title", "Интернет-магазин материалов для кровли и фасада \"DOCKE\"");
$APPLICATION->SetTitle("Docke");
?>
<div class="container main-banner">
    <div class="layout clearfix">
        <div class="col part-left layout__aside">
            <div class="sticky-left-menu__main">
            <?
									$APPLICATION->IncludeComponent(
											"sh:catalog.menu", "", array(
									 "CACHE_TIME"			 => "10",
									 "CACHE_TYPE"			 => "Y",
									 "COMPONENT_TEMPLATE"	 => "",
									 "SKIPAJAXCHECK"			 => "N",
									 "SMARTCACHE"			 => "N",
									 "SMARTCACHE_ADMIN"		 => "N",
									 "FIRST_LOAD"			 => "Y",
									 "SMARTCACHE_HIDE_RESULT" => "N",
									 "AJAX_MODE"				 => "N",
									 "AJAX_OPTION_JUMP"		 => "N",
									 "AJAX_OPTION_STYLE"		 => "N",
									 "AJAX_OPTION_HISTORY"	 => "N",
									 "AJAX_OPTION_ADDITIONAL" => "",
									 "IS_MAIN_PAGE" => "Y",
											), false
									);
									?>
            </div>
        </div>
        <div class="col part-right layout__main">
            <?$APPLICATION->IncludeComponent(
                "sh:bannerList",
                "mainBannerSlider",
                Array(
                    "ADD_CUR_URL" => "N",
                    "AJAX_MODE" => "N",
                    "AJAX_OPTION_ADDITIONAL" => "",
                    "AJAX_OPTION_HISTORY" => "N",
                    "AJAX_OPTION_JUMP" => "N",
                    "AJAX_OPTION_STYLE" => "Y",
                    "AUTOPLAY" => "Y",
                    "AUTOPLAY_SPEED" => "5000",
                    "BANNER_CACHE_KEYS" => array("LOCATION_GROUP", "GENDER", "SECTIONS", "AUTHSTATUS", "USER_GROUP"),
                    "CACHE_TIME" => "36000",
                    "CACHE_TYPE" => "A",
                    "FIRST_LOAD" => "Y",
                    "NOINDEX" => "N",
                    "QUANTITY" => "5",
                    "SKIPAJAXCHECK" => "N",
                    "SMARTCACHE" => "Y",
                    "SMARTCACHE_ADMIN" => "Y",
                    "SMARTCACHE_HIDE_RESULT" => "N",
                    "TYPE" => "mainRotator"
                )
            );?>
     <?$APPLICATION->IncludeComponent(
                "sh:bannerList",
                "mainBanners",
                Array(
                    "ADD_CUR_URL" => "N",
                    "AJAX_MODE" => "N",
                    "AJAX_OPTION_ADDITIONAL" => "",
                    "AJAX_OPTION_HISTORY" => "N",
                    "AJAX_OPTION_JUMP" => "N",
                    "AJAX_OPTION_STYLE" => "Y", 
                    "BANNER_CACHE_KEYS" => array("LOCATION_GROUP", "GENDER", "SECTIONS", "AUTHSTATUS", "USER_GROUP"),
                    "CACHE_TIME" => "36000",
                    "CACHE_TYPE" => "A",
                    "FIRST_LOAD" => "Y",
                    "NOINDEX" => "N",
                    "QUANTITY" => "3",
                    "SKIPAJAXCHECK" => "N",
                    "SMARTCACHE" => "Y",
                    "SMARTCACHE_ADMIN" => "Y",
                    "SMARTCACHE_HIDE_RESULT" => "N",
                    "TYPE" => "mainBanner"
                )
            );?> 
<?$APPLICATION->IncludeComponent(
	"sh:catalogProducts",
	"mainpage",
	Array(
		"AJAX_MODE" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "Y",
		"AUTOPLAY" => "N",
		"AUTOPLAY_SPEED" => "3600",
		"BUTTON_LINK" => "/f_news/",
		"BUTTON_TEXT" => "",
		"CACHE_TIME" => "3600",
		"CACHE_TYPE" => "A",
		"COMPONENT_TEMPLATE" => "mainpage",
		"COUNT_ON_PAGE" => "20",
		"FILTER_PROPERTY_" . PROPERTY_STATUS_ID => array(STATUS_ACTION),
		"FILTER_SECTION_ID" => array(),
		"FIRST_LOAD" => "Y",
		"INCLUDE_FILE" => "/include_areas/main/discountBaner.php",
		"LINK" => "/new/",
		"PAGE_BASE_LINK" => "/index.php",
		"PFILTER_IDS" => array(PROPERTY_STATUS_ID),
		"SHOW_TYPE" => "FILTER_PAGE_TABLE",
		"SKIPAJAXCHECK" => "N",
		"SMARTCACHE" => "Y",
		"SMARTCACHE_ADMIN" => "Y",
		"SMARTCACHE_HIDE_RESULT" => "N",
		"TITLE" => "Акции",
                "SLIDER_CLASS" => 'cl_1',
	)
);?>

<?$APPLICATION->IncludeComponent(
	"sh:catalogProducts",
	"mainpage",
	Array(
		"AJAX_MODE" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "Y",
		"AUTOPLAY" => "N",
		"AUTOPLAY_SPEED" => "3600",
		"BUTTON_LINK" => "",
		"BUTTON_TEXT" => "",
		"CACHE_TIME" => "3600",
		"CACHE_TYPE" => "A",
		"COMPONENT_TEMPLATE" => "mainpage",
		"COUNT_ON_PAGE" => "20",
		"FILTER_PROPERTY_" . PROPERTY_STATUS_ID => array(STATUS_NEW),
		"FILTER_SECTION_ID" => array(),
		"FIRST_LOAD" => "Y",
		"INCLUDE_FILE" => "/include_areas/main/discountBaner.php",
		"LINK" => "/new/",
		"PAGE_BASE_LINK" => "/index.php",
		"PFILTER_IDS" => array(PROPERTY_STATUS_ID),
		"SHOW_TYPE" => "FILTER_PAGE_TABLE",
		"SKIPAJAXCHECK" => "N",
		"SMARTCACHE" => "Y",
		"SMARTCACHE_ADMIN" => "Y",
		"SMARTCACHE_HIDE_RESULT" => "N",
		"TITLE" => "Новинки",
                "SLIDER_CLASS" => 'cl_2',
	)
);?>

<?$APPLICATION->IncludeComponent(
	"sh:catalogProducts",
	"mainpage",
	Array(
		"AJAX_MODE" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "N",
		"AUTOPLAY" => "N",
		"AUTOPLAY_SPEED" => "3600",
		"BUTTON_LINK" => "",
		"BUTTON_TEXT" => "",
		"CACHE_TIME" => "3600",
		"CACHE_TYPE" => "A",
		"COUNT_ON_PAGE" => "20",
		"FILTER_PROPERTY_" . PROPERTY_STATUS_ID => array(STATUS_HIT),
		"FILTER_SECTION_ID" => array(), 
		"FIRST_LOAD" => "Y",
		"INCLUDE_FILE" => "/include_areas/main/discountBaner.php",
		"LINK" => "/new/",
		"PAGE_BASE_LINK" => "/index.php",
		"PFILTER_IDS" => array(PROPERTY_STATUS_ID),
		"SHOW_TYPE" => "FILTER_PAGE_TABLE",
		"SKIPAJAXCHECK" => "N",
		"SMARTCACHE" => "Y",
		"SMARTCACHE_ADMIN" => "Y",
		"SMARTCACHE_HIDE_RESULT" => "N",
		"TITLE" => "Хиты",
                "SLIDER_CLASS" => 'cl_3',
	)
);?> 
            
            
        </div>
    </div>
</div>
<?
 
$GLOBALS['newsFilter'] = ['PROPERTY_HIDE_FROM_MAIN' => false];

$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"main",
	Array(
		"ACTIVE_DATE_FORMAT" => "j F Y",
		"ADD_SECTIONS_CHAIN" => "N",
		"AJAX_MODE" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "N",
		"CACHE_FILTER" => "Y",
		"CACHE_GROUPS" => "Y",
		"CACHE_TIME" => "36000000",
		"CACHE_TYPE" => "A",
		"CHECK_DATES" => "Y",
		"DETAIL_URL" => "",
		"DISPLAY_BOTTOM_PAGER" => "N",
		"DISPLAY_DATE" => "Y",
		"DISPLAY_NAME" => "Y",
		"DISPLAY_PICTURE" => "Y",
		"DISPLAY_PREVIEW_TEXT" => "Y",
		"DISPLAY_TOP_PAGER" => "N",
		"FIELD_CODE" => array("",""),
		"FILTER_NAME" => "newsFilter",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"IBLOCK_ID" => "26",
		"IBLOCK_TYPE" => "content",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "N",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "4",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array("",""),
		"SET_BROWSER_TITLE" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "N",
		"SET_META_KEYWORDS" => "N",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "N",
		"SORT_BY1" => "SORT",
		"SORT_BY2" => "ID",
		"SORT_ORDER1" => "DESC",
		"SORT_ORDER2" => "DESC",
		"STRICT_SECTION_CHECK" => "N"
	)
);?> 


    <div class="section-info-main">
        <div class="container">
         <?= includeEditHtmlFile("/include/main_text_block.php", "", false) ?> 
        </div>  
    </div>

<? require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>

