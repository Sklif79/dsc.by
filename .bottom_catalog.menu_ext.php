<?php

if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED === false)
    die();

$cacheId = 'bottom_nav';
$cacheDir = '/bottom_nav';
$obCache = new CPHPCache;
if ($obCache->InitCache(3600000, $cacheId, $cacheDir)) {
    $actionsMenuLinks = $obCache->GetVars();
} else {
    $obCache->StartDataCache();
    \Bitrix\Main\Loader::includeModule("iblock");
    $rsSect = CIBlockSection::GetList(['SORT' => 'DESC', 'NAME' => 'ASC'], [
                'IBLOCK_ID' => CATALOG_IBLOCK_ID,
                'ACTIVE' => 'Y',
                'DEPTH_LEVEL' => 1,
                    ], true, ['ID', 'IBLOCK_ID', 'NAME', 'SECTION_PAGE_URL']);
    while ($arSect = $rsSect->GetNext()) {
        if (!$arSect['ELEMENT_CNT']) {
            continue;
        }
        $actionsMenuLinks[] = [$arSect['NAME'], '/' . $arSect['SECTION_PAGE_URL'], [], [], ''];
    }
    global $CACHE_MANAGER;
    $CACHE_MANAGER->StartTagCache($cacheDir);
    $CACHE_MANAGER->RegisterTag("iblock_id_" . CATALOG_IBLOCK_ID);
    $CACHE_MANAGER->EndTagCache();
    $obCache->EndDataCache($actionsMenuLinks);
}

$aMenuLinks = array_merge($aMenuLinks, $actionsMenuLinks);
