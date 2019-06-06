<section class="form-w-steps__step form-step flc form-step--current form-step-2">
    <header class="form-step__header step-header step-header--current">
        <div class="step-header__cell-title"><h2 class="step-header__title">Доставка</h2></div>
    </header>
    <div mode="out-in">
        <div class="form-step__body" style="opacity: 1;">
            <div class="form-card form-card--w-arrow flc">
                <form class="form flc delivery-form" method="POST">
                    <input type="hidden" name="step" value="<?= $arResult['CURRENT_STEP']; ?>">
                    <div class="rich-form-row">
                        <div slot="input" class="check-blocks">
                            <div>
                                <div class="check-blocks__row"><label class="checkbox js-set-delivery-type"
                                                                      data-type="<?= DELIVERY_SAMOVIVIZ; ?>"><input
                                                type="radio"
                                                name="DELIVERY_ID"
                                                <? if ($arResult['FIELDS']['DELIVERY_ID'] == DELIVERY_SAMOVIVIZ) { ?>checked<? } ?>
                                                class="checkbox-row__input" value="<?= DELIVERY_SAMOVIVIZ; ?>"> <span
                                                class="checkbox__visual checkbox-row__visual"></span> <span
                                                class="checkbox__text checkbox--delivery-checkout"> Самовывоз (Минск, Гомель, Гродно) </span></label>
                                </div>
                                <div class="check-blocks__row"><label class="checkbox js-set-delivery-type"
                                                                      data-type="<?= DELIVERY_AUTO; ?>"><input
                                                type="radio"
                                                name="DELIVERY_ID"
                                                <? if ($arResult['FIELDS']['DELIVERY_ID'] == DELIVERY_AUTO) { ?>checked<? } ?>
                                                class="checkbox-row__input"
                                                value="<?= DELIVERY_AUTO; ?>"> <span
                                                class="checkbox__visual checkbox-row__visual"></span> <span
                                                class="checkbox__text checkbox--delivery-checkout"> Доставка транспортом продавца </span></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="for-delivery-type delivery-type_<?= DELIVERY_SAMOVIVIZ; ?> <? if ($arResult['FIELDS']['DELIVERY_ID'] == DELIVERY_SAMOVIVIZ) { ?>current<? } ?>">
                        <div class="rich-form-row ">
                            <div class="rich-text-input rich-text-input-checkout rich-text-input--w-label filled"
                                 slot="input"><label class="rich-text-input__label-checkout">Адрес пунктов самовывоза
                                    товаров </label>
                                <div class="input rich-text-input__input-checkout">
                                    <div class="">
                                        <div class="js-parent">
                                            <?

                                            $currentIndex = 0;
                                            if ($arResult['FIELDS']['point']) {
                                                foreach ($arResult['ADRESA_PUNKTOV'] as $ind => $adr) {
                                                    if ($adr['ID'] == $arResult['FIELDS']['point']) {
                                                        $currentIndex = $ind;
                                                    }
                                                }
                                            }
                                            $selected = $arResult['ADRESA_PUNKTOV'][$currentIndex];

                                            ?>
                                            <div class="select select--block js-accordeon-title">
                                                <input type="hidden" name="point" value="<?= $selected['ID']; ?>">
                                                <span class="select-value"><?= $selected['NAME']; ?></span>
                                                <svg class="select-chevron svg-icon svg-icon--dd-arrow">
                                                    <use xlink:href="#svg-icon-dd-arrow"></use>
                                                </svg>
                                                <ul class="select-list js-select-list select-list--new ">
                                                    <? foreach ($arResult['ADRESA_PUNKTOV'] as $id => $punkt) { ?>
                                                        <li data-tab="<?= $id; ?>"
                                                            data-value="<?= $punkt['ID']; ?>"><?= $punkt['NAME']; ?></li>
                                                    <? } ?>
                                                </ul>
                                            </div>
                                            <?
                                            foreach ($arResult['ADRESA_PUNKTOV'] as $id => $punkt) { ?>
                                                <div class="optionExtra optionExtra_<?= $id; ?><? if ($id == $currentIndex) { ?> current<? } ?>">
                                                    <? if ($punkt['WORK_TIME']) { ?>
                                                        <div class="optionExtra__line ">
                                                            <div class="optionExtra__param">Время работы</div>
                                                            <div class="optionExtra__data-time"><?= $punkt['WORK_TIME']; ?></div>
                                                        </div>
                                                    <? } ?>
                                                    <div class="optionExtra__line">
                                                        <div class="optionExtra__param">Статус товара</div>
                                                        <div class="optionExtra__data-time">
                                                            <span
                                                                    class="<?= $punkt['STATUS_CLASS']; ?> js_in-stock"><?= $punkt['STATUS']; ?></span>
                                                            <? if ($_REQUEST["dev"] == "y") {
                                                                $mass_sclad = array();
                                                                foreach ($arResult["ORDER_INFO"]["ITEMS"] as $key => $value) {
                                                                    $select_fields = Array();
                                                                    $arFilter = Array("ACTIVE" => "Y", "PRODUCT_ID" => $value['ID']);
                                                                    $res = CCatalogStoreProduct::GetList(Array(), $arFilter, false, false, Array());
                                                                    $product['amount_new'] = [];
                                                                    $sum_kol = 0;
                                                                    $i = 0;
                                                                    while ($arRes = $res->GetNext()) {
                                                                        $mass_sclad[$i]["count"] += $arRes["AMOUNT"];
                                                                        $mass_sclad[$i]["name"] = $arRes["STORE_NAME"];
                                                                        $mass_sclad["summ"] += $arRes["AMOUNT"];
                                                                        $i++;
                                                                    }
                                                                }
                                                                ?>
                                                                <div style="display: none;" class="js_in-stock-list">
                                                                    <ul class="in-stock-table">
                                                                        <?
                                                                        if ($mass_sclad["summ"] > 0) {
                                                                            ?>
                                                                            <li class="in-stock-table__header"><div>Доступно всего:</div><div><?= $mass_sclad["summ"] ?> шт.</div>
                                                                            </li>
                                                                            <?
                                                                        }
                                                                        ?>
                                                                    </ul>
                                                                    <ul class="in-stock-table in-stock-table__rows">
                                                                        <?
                                                                        foreach ($mass_sclad as $key => $value) {
                                                                            if ($value["name"] != "") {
                                                                                ?>
                                                                                <li class="in-stock-table__row">
                                                                                    <div><?= $value["name"] ?></div>
                                                                                    <div><?= $value["count"] ?> шт.</div>
                                                                                </li>

                                                                                <?
                                                                            }
                                                                        }

                                                                        ?>
                                                                    </ul>
                                                                </div>
                                                                <?
                                                            } ?>
                                                        </div>
                                                    </div>

                                                    <? if ($punkt['STATUS_CLASS'] == 'noinstore') { ?>
                                                        <div class="optionExtra__line">
                                                            <div class="optionExtra__data-time"><span
                                                                        class="<?= $punkt['STATUS_CLASS']; ?>">На выбранном складе нет достаточного количества товара в наличии. Заказ будет доставлен в указанный срок.</span>
                                                            </div>
                                                        </div>
                                                    <? } ?>
                                                </div>
                                            <? } ?>
                                        </div>
                                    </div>
                                    <span
                                            class="rich-text-input__border"></span></div>
                            </div>
                        </div>

                    </div>

                    <div class="for-delivery-type delivery-type_<?= DELIVERY_AUTO; ?> <? if ($arResult['FIELDS']['DELIVERY_ID'] == DELIVERY_AUTO) { ?>current<? } ?>">
                        <div class="rich-form-row citySearch">
                            <div class="form-city-select js-parent">
                                <div class="rich-text-input rich-text-input-checkout rich-text-input--w-label<? if ($arResult['ERRORS']['location']) { ?> form-error <? } ?>">
                                    <label
                                            class="rich-text-input__label-checkout">Населенный пункт <span
                                                class="color-red">*</span></label>
                                    <div class="input rich-text-input__input-checkout ">
                                        <input type="hidden" name="city_id" class="js-livesearch-id"
                                               value="<?= $arResult['FIELDS']['city_id']; ?>">
                                        <input name="location" value="<?= $arResult['FIELDS']['location']; ?>"
                                               type="search" autocomplete="off" placeholder="Начните вводить город"
                                               novalidate="novalidate"
                                               class="rich-text-input__input text-input js-ajaxsearch"
                                               value="<?= $arResult['FIELDS']['location']; ?>">
                                        <ul class="select-list livesearch-box js-livesearch-box js-ajax-container select-list--new "></ul>
                                        <? if ($arResult['ERRORS']['location']) { ?> <span
                                                class="rich-text-input__message rich-text-input__message--error"><?= $arResult['ERRORS']['location']; ?></span><? } ?>
                                    </div>
                                </div>
                                <div class="hotkey-cities-row">
                                    <?
                                    foreach ($arResult['ALL_CITIES'] as $city) {
                                        ?>
                                        <span class="hotkey-city js-hotkey-city"
                                              data-id="<?= $city['ID']; ?>"><?= $city['NAME']; ?></span>
                                        <?
                                    }
                                    ?>
                                </div>
                            </div>
                        </div>
                        <div class="rich-form-row">
                            <div class="rich-text-input rich-text-input-checkout rich-text-input--w-label<? if ($arResult['ERRORS']['addres']) { ?> form-error <? } ?>"
                                 slot="input"><label
                                        class="rich-text-input__label-checkout">Адрес <span
                                            class="color-red">*</span></label>
                                <div class="input rich-text-input__input-checkout"><input type="text" autocomplete="off"
                                                                                          placeholder="Улица, дом, корпус, квартира"
                                                                                          novalidate="novalidate"
                                                                                          name="addres"
                                                                                          value="<?= $arResult['FIELDS']['addres']; ?>"
                                                                                          class="rich-text-input__input text-input">
                                    <? if ($arResult['ERRORS']['addres']) { ?> <span
                                            class="rich-text-input__message rich-text-input__message--error"><?= $arResult['ERRORS']['addres']; ?></span><? } ?>
                                </div>
                            </div>
                        </div>
                        <div class="rich-form-row formInline">
                            <div class="rich-text-input rich-text-input-checkout rich-text-input--w-label filled <? if ($arResult['ERRORS']['date']) { ?> form-error <? } ?>"
                                 slot="input"><label
                                        class="rich-text-input__label-checkout">Желаемый день и время доставки <span
                                            class="color-red">*</span></label>
                                <div class="input rich-text-input__input-checkout"><input type="text" autocomplete="off"
                                                                                          placeholder="<? if (isMobile()) { ?>Дата<? } else { ?>Укажите желаемый день<? } ?>"
                                                                                          novalidate="novalidate"
                                                                                          data-min-date="<?= $arResult['DELIVERY_FROM_DATE']; ?>"
                                                                                          name="date"
                                                                                          value="<?= $arResult['FIELDS']['date']; ?>"
                                                                                          class="rich-text-input__input text-input js-has-inputmask js-delivery-datapick">
                                    <? if ($arResult['ERRORS']['date']) { ?> <span
                                            class="rich-text-input__message rich-text-input__message--error"><?= $arResult['ERRORS']['date']; ?></span><? } ?>
                                </div>
                            </div>
                        </div>
                        <div class="rich-form-row formInline">
                            <div class="rich-text-input rich-text-input-checkout rich-text-input--w-label" slot="input">
                                <label
                                        class="rich-text-input__label-checkout"> </label>
                                <div class="input rich-text-input__input-checkout">
                                    <div class="">
                                        <div class="js-parent">
                                            <div class="select select--block js-accordeon-title">
                                                <?

                                                $timeIndex = 0;

                                                if ($arResult['FIELDS']['time']) {
                                                    foreach ($arResult['TIME'] as $ind => $el) {
                                                        if ($el['VALUE'] == $arResult['FIELDS']['time']) {
                                                            $timeIndex = $ind;
                                                        }
                                                    }
                                                }

                                                $curVal = $arResult['TIME'][$timeIndex];

                                                ?>
                                                <input type="hidden" name="time" value="<?= $curVal['VALUE']; ?>">
                                                <span class="select-value"><?= $curVal['NAME']; ?></span>
                                                <svg class="select-chevron svg-icon svg-icon--dd-arrow">
                                                    <use xlink:href="#svg-icon-dd-arrow"></use>
                                                </svg>
                                                <ul class="select-list js-select-list select-list--new ">
                                                    <? foreach ($arResult['TIME'] as $ind => $el) { ?>
                                                        <li data-value="<?= $el['VALUE']; ?>"><?= $el['NAME']; ?></li>
                                                    <? } ?>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <span
                                            class="rich-text-input__border"></span></div>
                            </div>
                        </div>
                        <div class="rich-form-row">
                            <div class="rich-text-input rich-text-input-checkout rich-text-input--w-label rich-text-input--textarea"
                                 slot="input"><label class="rich-text-input__label-checkout">Комментарий </label>
                                <div class="input rich-text-input__input-checkout">  <textarea autocomplete="off"
                                                                                               name="comment"
                                                                                               placeholder="Оставьте комментарий к заказу"
                                                                                               class="rich-text-input__input text-input"><?= $arResult['FIELDS']['comment']; ?></textarea>
                                    <span class="rich-text-input__border"></span>
                                </div>
                            </div>
                        </div>
                        <div class="rich-form-row">
                            <div slot="input" class="check-blocks">
                                <div>
                                    <div class="check-blocks__row"><label class="checkbox "><input type="radio"
                                                                                                   name="typecar"
                                                                                                   class="checkbox-row__input"
                                                                                                   value="<?= DELIVERY_AUTO; ?>"
                                                                                                   <? if (DELIVERY_AUTO == $arResult['FIELDS']['typecar']) { ?>checked<? } ?>>
                                            <span
                                                    class="checkbox__visual checkbox-row__visual"></span> <span
                                                    class="checkbox__text checkbox--delivery-checkout"> Грузовое авто<span> - <span
                                                            class="js-delivery_price"><?= $arResult['DELIVERY_PRICES'][DELIVERY_AUTO]; ?></span></span></span></label>
                                    </div>
                                    <div class="check-blocks__row"><label class="checkbox "><input type="radio"
                                                                                                   name="typecar"
                                                                                                   class="checkbox-row__input"
                                                                                                   value="<?= DELIVERY_AUTO_MANIPILATOR; ?>"
                                                                                                   <? if (DELIVERY_AUTO_MANIPILATOR == $arResult['FIELDS']['typecar']) { ?>checked<? } ?>>
                                            <span
                                                    class="checkbox__visual checkbox-row__visual"></span> <span
                                                    class="checkbox__text checkbox--delivery-checkout delivery-checkout"> Грузовое авто с манипулятором<span> - <span
                                                            class="js-delivery_price"><?= $arResult['DELIVERY_PRICES'][DELIVERY_AUTO_MANIPILATOR]; ?></span></span></span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="rich-form-btns-line">
                        <div class="rich-form-btns-line__aside rich-form-btns-line__aside--left"><a
                                    href="?step=1" tabindex="0"
                                    class="btn btn--back btn--lg link--local">
                                <svg class="btn__icon btn__icon--left svg-btn--back svg-icon ">
                                    <use xlink:href="#svg-icon-small-arrow-left"></use>
                                </svg>
                                <span class="btn__inner">Назад</span></a></div>
                        <div class="rich-form-btns-line__main">
                            <button type="submit" class="btn btn--lg btn--primary"><span class="btn__inner">Перейти к оплате</span>
                                <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
                                    <use xlink:href="#svg-icon-arrow-right"></use>
                                </svg>
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</section> 