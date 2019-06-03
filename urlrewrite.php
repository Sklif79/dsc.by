<?php
$arUrlRewrite=array (
  8 => 
  array (
    'CONDITION' => '#^/([0-9A-Za-z\\_\\-]+)-([0-9A-Za-z\\_\\-]+)-p(?:\\?.*)?$#',
    'RULE' => 'ELEMENT_CODE=$1&ELEMENT_ID=$2',
    'ID' => '',
    'PATH' => '/catalog/index.php',
    'SORT' => 100,
  ),
  7 => 
  array (
    'CONDITION' => '#^/search/([0-9A-Za-z\\_\\-]+)\\-(\\d+)\\-f(?:\\?.*)?$#',
    'RULE' => 'FILTER=$1&SEARCHRESULT=Y',
    'ID' => '',
    'PATH' => '/catalog/index.php',
    'SORT' => 100,
  ),
  9 => 
  array (
    'CONDITION' => '#^/([0-9A-Za-z\\_\\-]+)\\-(\\d+)\\-s(?:\\?.*)?$#',
    'RULE' => 'SECTION_CODE=$1&SECTION_ID=$2',
    'ID' => '',
    'PATH' => '/catalog/index.php',
    'SORT' => 100,
  ),
  12 => 
  array (
    'CONDITION' => '#^/([0-9A-Za-z\\_\\-]+)\\-(\\d+)\\-f(?:\\?.*)?$#',
    'RULE' => 'FILTER=$1&SECTION_ID=$2',
    'ID' => '',
    'PATH' => '/catalog/index.php',
    'SORT' => 100,
  ),
  2 => 
  array (
    'CONDITION' => '#^/actions/([0-9A-Za-z\\_\\-]+)/(?:\\?.*)?$#',
    'RULE' => 'CODE=$1',
    'ID' => '',
    'PATH' => '/actions/index.php',
    'SORT' => 100,
  ),
  1 => 
  array (
    'CONDITION' => '#^/news/([0-9A-Za-z\\_\\-]+)/(?:\\?.*)?$#',
    'RULE' => 'CODE=$1',
    'ID' => '',
    'PATH' => '/news/index.php',
    'SORT' => 100,
  ),
  13 => 
  array (
    'CONDITION' => '#^/order/checkout/(?:\\?.*)?$#',
    'RULE' => 'ORDERMAKE=1',
    'ID' => '',
    'PATH' => '/order/index.php',
    'SORT' => 100,
  ),
  6 => 
  array (
    'CONDITION' => '#^/search/(?:\\?.*)?$#',
    'RULE' => 'SEARCHRESULT=Y',
    'ID' => '',
    'PATH' => '/catalog/index.php',
    'SORT' => 100,
  ),
);
