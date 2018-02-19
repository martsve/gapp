/* Persistent App Binding */
$(function() {

    /* Persitent App Functions */
    function GetValue(key, type) {
        return Gloomhaven.Get(key);
    } 
    function SetValue(key, type, val) {
        if (type == 'int') {
            val = parseInt(val);
        }
        if (type == 'float') {
            val = parseFloat(val);
        }

        Gloomhaven.Set(key, val);

        $('[data-parent="'+key+'"]').trigger('update'); 
    } 
    function AddValue(key, val) {
        Gloomhaven.Add(key, val);
        $('[data-parent="'+key+'"]').trigger('update'); 
    } 

    $('[data-bind]').each(function() {
        var $this = $(this);
        var type = $this.data('type') || "string";
        var tag = $this.prop("tagName").toLowerCase();
        var key = $this.data('bind');
        var val = GetValue(key);
        if (tag == "input") {
            $this.val(val);
            $this.on('keyup blur', function() {
                var val = $this.val();
                SetValue(key, type, val);
            });
        }
        else if (tag == 'ul') {
            $this.children('li[data-val]').toggleClass('selected', false);
            $this.children('li[data-val="'+val+'"]').toggleClass('selected', true);

            $this.on('click','.select',function() {
                var val = $(this).parent('li').data('val');
                SetValue(key, type, val);
                $this.trigger('update');
            });
        }
        else {
            $this.text(val);
        }

        $this.on('update', function() {
            var val = GetValue(key);
            if (tag == "input") {
                $this.val(val);
            }
            else if (tag == 'ul') {
                $this.children('li[data-val]').toggleClass('selected', false);
                $this.children('li[data-val="'+val+'"]').toggleClass('selected', true);
            }
            else {
                $this.text(val);
            }

            $('[data-parent="'+key+'"]').trigger('update'); 
        });
    });

    $('button[data-change]').on('click', function() {
        var $this = $(this);
        var key = $this.data('change');
        var val = $this.data('val');
        AddValue(key, val);
        $('[data-bind="'+key+'"]').trigger('update'); 
    });

    $('[data-onload]').each(function() {
        var $this = $(this);
        var func = $this.data("onload");
        window[func]();
    });

    $('[data-toggle]').on('click', function() {
        var $this = $(this);
        var item = $this.data('toggle');
        var key = $this.data('key');
        $(item).toggleClass('d-none');
        Gloomhaven.Set(key, !$(item).is('.d-none'));
    });

    $('[data-toggle]').each(function() {
        var $this = $(this);
        var item = $this.data('toggle');
        var key = $this.data('key');
        var state = Gloomhaven.Get(key);
        if (state == undefined) {
            state = true;
            Gloomhaven.Set(key, state);
        }
        $(item).toggleClass('d-none', !state);
    });

});