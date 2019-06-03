

var body=$('body');
var deliveryPice;


var remInputError = function(selector){
    selector.closest('.rich-text-input').removeClass('form-error');
    selector.closest('.rich-text-input').find('.rich-text-input__message--error').removeClass('rich-text-input__message--error').html('');
};
body.off('click.switch', '.js-switch-tab').on('click.switch', '.js-switch-tab', function(event) {
    var obj = $(event.currentTarget);
    var group = obj.closest('.js-parent');
    var target = obj.data('tab');
    group.find('.js-switch-tab, .js-tab').removeClass('current');
    group.find('.' + target).addClass("current");
    obj.addClass('current');
});


body.off('click.toggle', '.js-accordeon-title').on('click.toggle', '.js-accordeon-title', function(event) {
    var obj = $(event.currentTarget);
    var parent = obj.closest('.js-parent');
    var accordeon = parent.children('.js-accordeon-content');
    if (parent.hasClass("open")) {
        parent.removeClass("open");

        if(accordeon.length>0){
            accordeon.slideUp(500);
        }
    }
    else {
        parent.addClass("open");
        if(accordeon.length>0){
            accordeon.slideDown(500);
        }
    }
});
body.off('click.toggle', '.clone-field-link').on('click.toggle', '.clone-field-link', function(event) {
    var obj = $(event.currentTarget);
    var parent = obj.closest('.rich-form-row');
   obj.remove();
   parent.find('.rich-text-input').slideDown(300);

});
body.off('click.toggle', '.js-set-delivery-type').on('click.toggle', '.js-set-delivery-type', function(event) {
    var obj = $(event.currentTarget);
    var type = obj.data('type');
   $('.for-delivery-type').removeClass('current');
   $('.delivery-type_'+type).addClass('current');

});
body.off('mousedown.select', '.js-select-list li').on('mousedown.select', '.js-select-list li', function(event) {
    var obj = $(event.currentTarget);
    var value = obj.data('value');
    var tab = obj.data('tab');
    var parent =  obj.closest('.js-parent');
   parent.find('input[type="hidden"]').val(value);
   parent.find('.select-value').html(obj.html());
       parent.find('.optionExtra').removeClass('current');
       parent.find('.optionExtra_'+tab).addClass('current');


});
body.off('mousedown.select', '.js-livesearch-box li, .js-hotkey-city').on('mousedown.select', '.js-livesearch-box li, .js-hotkey-city', function(event) {
    var obj = $(event.currentTarget);
    var parent =  obj.closest('.js-parent');
    var id=obj.data('id');
    remInputError( parent.find('input[type="search"]'));
    setTimeout(function(){
        parent.find('input[type="hidden"]').val(id);
        parent.find('input[type="search"]').val(obj.html());
    }, 10);
    $.ajax({
        type: "POST",
        data: "id=" + id,
        url: "/api/price.php",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            deliveryPice=json;
            $('input[name="typecar"]').each(function(event, item){
                if( deliveryPice[$(this).val()]>0){ var deliveryPiceText=deliveryPice[$(this).val()]+' руб.';}
                else { var deliveryPiceText='бесплатно';}
                $(this).closest('label').find('.js-delivery_price').html(deliveryPiceText);
            });
            if( deliveryPice[$('input[name="typecar"]:checked').val()]>0){ var deliveryPiceText=deliveryPice[$('input[name="typecar"]:checked').val()]+' руб.';}
            else { var deliveryPiceText='бесплатно';}
            $('.js-delivery-price-aside').html(deliveryPiceText);
        }

    });

});

body.off('change.cartype' , 'input[name="typecar"]').on('change.cartype' , 'input[name="typecar"]', function(event) {
    if( deliveryPice[$('input[name="typecar"]:checked').val()]>0){ var deliveryPiceText=deliveryPice[$('input[name="typecar"]:checked').val()]+' руб.';}
    else { var deliveryPiceText='бесплатно';}
    $('.js-delivery-price-aside').html(deliveryPiceText);
});

body.off('change.deltype' , 'input[name="DELIVERY_ID"]').on('change.deltype' , 'input[name="DELIVERY_ID"]', function() {
    if($('input[name="DELIVERY_ID"]:checked').val()=='4'){$('.js-has-delivery').slideUp(300);}
     else{$('.js-has-delivery').slideDown(300);}
});

body.off('keyup.checkinput change.checkinput', 'input').on('keyup.checkinput change.checkinput', 'input', function(event) {
    var selector = $(event.target);
    remInputError(selector);
    if(selector.attr('type')=='number' && selector.val()<1){selector.val(1);}
    if(selector.attr('type')=='number' && selector.val()>5000){selector.val(5000);}
    if(selector.val()){
        selector.addClass('notempty');
    }
    else{
        selector.removeClass('notempty');
    }

});
var searchTimeout;
body.off('keyup.livesearch', '.js-ajaxsearch').on('keyup.livesearch', '.js-ajaxsearch', function(event)  {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function() {
        var obj = $(event.target);
        var parent = $(event.target).closest('.js-parent');

        if (obj.val() !== '') {
            parent.addClass("load");
            var container=parent.find('.js-ajax-container');
            console.log(container);
            $.ajax({
                type: "POST",
                data: "q=" + obj.val(),
                url: "/api/search.php",
                success: function (result) {
                    console.log(result);
                    container.html(result);
                }

            });
        }
    }, 600);

});
body.off('blur.livesearchclear', '.js-ajaxsearch').on('blur.livesearchclear', '.js-ajaxsearch', function(event)  {
    console.log('src');
    $(event.target).val(' ');
});


$(document).ready(function(){
    $('.js-delivery-datapick').datepicker({
        format: "dd.mm.yyyy",
        startDate: $('.js-delivery-datapick').data('min-date'),
        autoHide: true,
    });



});

body.off( 'change', '.file-input__input--new ').on('change', '.file-input__input--new ', function(event){
        var filename = $(this).val().replace(/.*\\/, "");
    console.log('filename='+filename);
    $(this).closest('.file-input').find('.file-input__text').html(filename);
});
body.off( 'click', '.js-load-modal ').on('click', '.js-load-modal', function(event){
    var filename = $(this).data('modal');
    $.ajax({
        url: filename,
        success: function (result) {
            $('.js-modal').remove();
            body.addClass('modal-open');
            body.append(result);
            setTimeout(function(){View.initAllLocal()},50);
        }

    });
});
body.off( 'click', '.js-modal-remove').on('click', '.js-modal-remove', function(event){
            body.removeClass('modal-open');
            body.append(result);
            $('.js-modal').remove();

});
body.off( 'click', '.js-bf-close').on('click', '.js-bf-close', function(event){
    $('.basic-filter').removeClass('open');
});
body.off( 'click', '.js-bf-open').on('click', '.js-bf-open', function(event){
    $('.basic-filter').addClass('open');
});
body.off( 'click.inBasket', '.js-add-to-cart').on('click.inBasket', '.js-add-to-cart', function(event){
    var item=$(this);
    var dataArray = {};
    if(item.hasClass('btn--light')){
        dataArray = {
            BASKET_DELETE: $(this).data('basket-add'),
                COUNT: 1,
            bxajaxid: $(this).data('id'),
            increment: 0
        }
    }
    else {
        dataArray = {
            BASKET_ADD: $(this).data('basket-add'),
            COUNT: 1,
            bxajaxid: $(this).data('id'),
            increment: 0
        }
    }
    $.post({
        url: $(this).data('url'),
        data: dataArray,
        dataType: 'json'
    }).done(function( result ){
        if(item.hasClass('btn--light')){
            item.removeClass('btn--light');
            item.addClass('compare-item__btn');
            item.html('<span class="btn__inner">Положить в корзину</span>');
        }
        else{
            item.removeClass('compare-item__btn');
            item.addClass('btn--light');
            item.html('<span class="btn__inner">Убрать из корзины</span>');
        }
        Model.updateBasket(result.products);
    }).fail(function (response) {
        console.warn('addToBasket failed:', response);
    });
});



