$(function(){
    
   $(document).on('click', '#formOneClick #obbtn', function (e) {
        
   var myform = document.getElementById("formOneClick");
                var fd = new FormData(myform );
                
                $.ajax({
                    url: "/ajax/one.php",
                    data: fd,
                    cache: false,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function (resp) { 
                        $('#formOneClick .err').hide();$('#formOneClick .form-error').removeClass('form-error');
                        if(resp.status) {
                             $('#formOneClick').html('<p>Наш менеджер свяжется с вами в течение одного рабочего дня.</p>'); 
                        } else { 
                             
                             for (fid in resp.errors) { 
                                    jfield = $('#formOneClick [name=' + fid + ']');  
                                    jfield.closest('.rich-form-row').find('.err').text(resp.errors[fid]).show();
                                    jfield.closest('.rich-form-row').addClass('form-error'); 
                             } 
                        }
                    }
                });
                 
        
        return false;
        
        e.preventDefault();
        
    });
    
   
   
   
   
   
    
   $(document).on('click', '#formReview2 button', function (e) {
           
          
           var fd = new FormData(formReview2 ); 
             
                $.ajax({
                    url: "/ajax/callme.php",
                    data: fd,
                    cache: false,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function (resp) { 
                        $('#formReview2 .errorContacts').hide(); 
                        $('#formReview2 .form-error').removeClass('form-error');
                        if(resp.status) { 
                             $('#formReview2').html('<h3>Наш менеджер свяжется с вами в течение одного рабочего дня.</h3>'); 
                              
                                var destination = $('#form1contacts').offset().top - 200;
                                 $('html').animate({ scrollTop: destination }, 200); 
                        } else { 
                             
                             for (fid in resp.errors) { 
                                    jfield = $('#formReview2  [name=' + fid + ']');  
                                    jfield.closest('.rich-form-row').find('.rich-text-input__border').addClass('errorContacts').text(resp.errors[fid]).show();
                                    jfield.closest('.rich-form-row').addClass('form-error');  
                             } 
                        }
                    }
                });
                  
        return false; 
        e.preventDefault();
        
    });
    
    
   
   
    
   
    
   $(document).on('click', '#form1contacts form button', function (e) {
          
          $('#form1contacts form').attr('id', 'f1cont');
          
           var fd = new FormData(f1cont );
          fd.append('theme', $('#form1contacts form .select-value').text());
             
                $.ajax({
                    url: "/ajax/contact1.php",
                    data: fd,
                    cache: false,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function (resp) { 
                        $('#form1contacts form  .errorContacts').hide(); 
                        $('#form1contacts form  .form-error').removeClass('form-error');
                        if(resp.status) { 
                             $('#form1contacts').html('<h3>Наш менеджер свяжется с вами в течение одного рабочего дня.</h3>'); 
                             
                             
                                var destination = $('#form1contacts').offset().top - 200;
                                 $('html').animate({ scrollTop: destination }, 200);
                              
                             
                             
                        } else { 
                             
                             for (fid in resp.errors) { 
                                    jfield = $('#form1contacts form  [name=' + fid + ']');  
                                    jfield.closest('.rich-form-row').find('.rich-text-input__border').addClass('errorContacts').text(resp.errors[fid]).show();
                                    jfield.closest('.rich-form-row').addClass('form-error');  
                             } 
                        }
                    }
                });
                  
        return false; 
        e.preventDefault();
        
    });
    
    
    
   $(document).on('click', '#form2contacts form button', function (e) {
          
          $('#form2contacts form').attr('id', 'f2cont');
          
           var fd = new FormData(f2cont );
            
                $.ajax({
                    url: "/ajax/contact2.php",
                    data: fd,
                    cache: false,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function (resp) { 
                        $('#form2contacts form  .errorContacts').hide(); 
                        $('#form2contacts form  .form-error').removeClass('form-error');
                        if(resp.status) { 
                             $('#form2contacts').html('<h3>Наш менеджер свяжется с вами в течение одного рабочего дня.</h3>'); 
                             
                             
                                var destination = $('#form2contacts').offset().top - 200;
                                 $('html').animate({ scrollTop: destination }, 200);
                              
                              
                        } else { 
                             
                             for (fid in resp.errors) { 
                                    jfield = $('#form2contacts form  [name=' + fid + ']');  
                                    jfield.closest('.rich-form-row').find('.rich-text-input__border').addClass('errorContacts').text(resp.errors[fid]).show();
                                    jfield.closest('.rich-form-row').addClass('form-error');  
                             } 
                        }
                    }
                });
                  
        return false; 
        e.preventDefault();
        
    });
    
     
    
        
   $(document).on('click', '#form3contacts form button', function (e) {
          
          $('#form3contacts form').attr('id', 'f3cont');
          
           var fd = new FormData(f3cont );
           fd.append('theme', $('#form3contacts form .select-value').text());
             
                $.ajax({
                    url: "/ajax/contact3.php",
                    data: fd,
                    cache: false,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function (resp) { 
                        $('#form3contacts form  .errorContacts').hide(); 
                        $('#form3contacts form  .form-error').removeClass('form-error');
                        if(resp.status) { 
                             $('#form3contacts').html('<h3>Наш менеджер свяжется с вами в течение одного рабочего дня.</h3>'); 
                        } else { 
                             
                             for (fid in resp.errors) { 
                                    jfield = $('#form3contacts form  [name=' + fid + ']');  
                                    jfield.closest('.rich-form-row').find('.rich-text-input__border').addClass('errorContacts').text(resp.errors[fid]).show();
                                    jfield.closest('.rich-form-row').addClass('form-error');  
                             } 
                        }
                    }
                });
                 
        
        return false;
        
        e.preventDefault();
        
    });
    
    
    
         $(document).on('click', '.js-input-increase, .js-input-decrease', function() { 
            ratio  = $(this).closest('.compare-count-field').attr('data-ratio');
            val = $(this).closest('.compare-count-field').find('.compare-count-field__input').val();
            rez = ratio * val; 
             $(this).closest('.compare-item__param').find('.ratio_').text(rez.toFixed(2)); 
        });
    
     
    $('.compare-param--count .compare-count-field__input').on('input', function() {
        val = $(this).val();
       ratio  = $(this).closest('.compare-count-field').attr('data-ratio');
        rez = ratio * val; 
             $(this).closest('.compare-item__param').find('.ratio_').text(rez.toFixed(2)); 
    })


    //in stock list
    $('.js_in-stock').on('click', function (e) {
        $('.js_in-stock').not($(this)).next('.js_in-stock-list').slideUp(0);

        $(this).next('.js_in-stock-list').slideToggle({
            complete: function () {
                if (!$(this).is(':visible')) {
                    $('.in-stock-table').removeClass('scrollable');
                }
            },

            start: function () {
                if ($(this).is(':visible') && ($(this).find('.in-stock-table__rows li').length > 7)) {
                    $(this).find('.in-stock-table').addClass('scrollable');
                }
            }
        });
    });

    $(document).on('click', function (e) {
        var $list = $('.js_in-stock-list');

        if (
            $list.is(':visible')
            && !$(e.target).closest('.js_in-stock').length
            && !$(e.target).closest('.js_in-stock-list').length
        ) {
            e.preventDefault();
            $list.slideUp();
        }
    });

    $(document).ready(function () {
        $('.in-stock-table__rows').each(function () {
            if ($(this).is(':empty')) {
                $(this)
                    .closest('.js_in-stock-list')
                    .parent()
                    .find('.js_in-stock')
                    .css('border-color', 'transparent');
            }
        });
    });
});