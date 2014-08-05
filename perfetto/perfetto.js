var PixelBest = new function() {

    this.init = function() {
        // Generate "pb" & "layer"
        this.generateUI();

        // Get & fill options
        this.getOptions();
        this.fillOptions();

        // Bind controls events
        this.bind(this.c.lock, 'click', this.proxy('toggleLock'));
        this.bind(this.c.show, 'click', this.proxy('toggleShow'));
        this.bind(this.c.close, 'click', this.proxy('toggleEntry'));
    }

    this.generateUI = function(){
        var template = '<div class="pb_head">' +
                           '<ul class="pb_layer-control">' +
                               '<li data-pb="show" class="pb_icon __off"></li>' +
                               '<li data-pb="lock" class="pb_icon __unlock"></li>' +
                           '</ul>' +
                           '<h3 data-pb="close" class="pb_title">Perfetto</h3>' +
                       '</div>' +
                       '<div class="pb_entry __visible">' +
                           '<form action="#" class="pb_form">' +
                               '<fieldset class="pb_field_wrap">' +
                                   '<h4 class="pb_form_label">Layers <span data-pb="add-layer" class="pb_layer-add pb_icon __add"></span></h4>' +
                                   '<div class="pb_field">' +
                                       '<input name="pb-layer" type="radio" checked="checked"/>' +
                                       '<input type="text"/>' +
                                   '</div>' +
                               '</fieldset>' +
                               '<fieldset class="pb_field_group">' +
                                   '<div class="pb_field __first">' +
                                       '<label>X</label>' +
                                       '<input type="text" name="pb-pos-x"/>' +
                                   '</div>' +
                                   '<div class="pb_field">' +
                                       '<label>Y</label>' +
                                       '<input type="text" name="pb-pos-y"/>' +
                                   '</div>' +
                               '</fieldset>' +
                               '<fieldset class="pb_field_group">' +
                                   '<div class="pb_field __first">' +
                                       '<label>Opacity</label>' +
                                       '<input type="text" name="pb-opacity"/>' +
                                   '</div>' +
                                   '<div class="pb_field">' +
                                       '<label>z-Index</label>' +
                                       '<input type="text" name="pb-zindex"/>' +
                                   '</div>' +
                               '</fieldset>' +
                            '</form>' +
                       '</div>';

        this.pb = document.createElement('div');
        this.pb.className = 'pb';
        this.pb.innerHTML = template;

        this.layer = document.createElement('div');
        this.layer.className = 'pb_layer';

        // Plugin controls
        this.c = {
            show: this.pb.querySelector('[data-pb="show"]'),
            entry: this.pb.querySelector('.pb_entry'),
            lock: this.pb.querySelector('[data-pb="lock"]'),
            close: this.pb.querySelector('[data-pb="close"]'),
            layers: this.pb.querySelectorAll('[name="pb-layer"]'),
            position: {
                x: this.pb.querySelector('[name="pb-pos-x"]'),
                y: this.pb.querySelector('[name="pb-pos-y"]')
            },
            opacity: this.pb.querySelector('[name="pb-opacity"]'),
            zIndex: this.pb.querySelector('[name="pb-zindex"]')
        }

        document.body.appendChild(this.pb);
        document.body.appendChild(this.layer);
    }

    this.saveOptions = function(){
        localStorage['PixelBest'] = true;
        localStorage['PixelBest.o.close'] = this.o.close;
        localStorage['PixelBest.o.layer.current'] = this.o.layer.current;
        localStorage['PixelBest.o.layer.show'] = this.o.layer.show;
        localStorage['PixelBest.o.layer.opacity'] = this.o.layer.opacity;
        localStorage['PixelBest.o.layer.position'] = this.o.layer.position;
        localStorage['PixelBest.o.layer.lock'] = this.o.layer.lock;
        localStorage['PixelBest.o.layer.zIndex'] = this.o.layer.zIndex;
        localStorage['PixelBest.o.layers'] = this.o.layers;
    }

    this.getOptions = function(){
        if(localStorage['PixelBest'] === 'true') {
            var pos = localStorage['PixelBest.o.layer.position'].split(',');

            this.o.close = localStorage['PixelBest.o.close'] === 'true';
            this.o.layer.current = parseInt(localStorage['PixelBest.o.layer.current']);
            this.o.layer.show = localStorage['PixelBest.o.layer.show'] === 'true';
            this.o.layer.opacity = parseFloat(localStorage['PixelBest.o.layer.opacity']);
            this.o.layer.position = [parseInt(pos[0]), parseInt(pos[1])];
            this.o.layer.lock = localStorage['PixelBest.o.layer.lock'] === 'true';
            this.o.layer.zIndex = parseInt(localStorage['PixelBest.o.layer.zIndex']);
            this.o.layers = localStorage['PixelBest.o.layers'].split(',');
        }
    }

    this.fillOptions = function(){
        // Resume entry visibility
        if(this.o.close) {
            this.toggleEntryToHidden();
        } else {
            this.toggleEntryToVisible();
        }

        // Resume layer visibility
        if(this.o.layer.show) {
            this.toggleShowToVisible();
        } else {
            this.toggleShowToHidden();
        }

        // Resume layer lock
        if(this.o.layer.lock) {
            this.toggleLockToLocked();
        } else {
            this.toggleLockToUnlocked();
        }

        // Resume layer position
        this.c.position.x.value = this.o.layer.position[0];
        this.c.position.y.value = this.o.layer.position[1];

        // Resume layer opacity & z-index
        this.c.opacity.value = this.o.layer.opacity;
        this.c.zIndex.value = this.o.layer.zIndex;

    }

    // Toggle layer lock
    this.toggleLock = function(){
        if(this.o.layer.lock) {
            this.toggleLockToUnlocked();
            this.o.layer.lock = false;
        } else {
            this.toggleLockToLocked();
            this.o.layer.lock = true;
        }

        this.saveOptions();
    }

    this.toggleLockToLocked = function(){
        this.removeClass(this.c.lock, '__unlock');
        this.addClass(this.c.lock, '__lock');
    }

    this.toggleLockToUnlocked = function(){
        this.removeClass(this.c.lock, '__lock');
        this.addClass(this.c.lock, '__unlock');
    }


    // Toggle layer visibility
    this.toggleShow = function(){
        if(this.o.layer.show) {
            this.toggleShowToHidden();
            this.o.layer.show = false;
        } else {
            this.toggleShowToVisible();
            this.o.layer.show = true;
        }

        this.saveOptions();
    }

    this.toggleShowToVisible = function(){
        this.removeClass(this.c.show, '__off');
        this.addClass(this.c.show, '__on');
        this.layer.style.display = 'block';
    }

    this.toggleShowToHidden = function(){
        this.removeClass(this.c.show, '__on');
        this.addClass(this.c.show, '__off');
        this.layer.style.display = 'none';
    }


    // Toggle entry visibility
    this.toggleEntry = function(){
        if(this.o.close) {
            this.toggleEntryToVisible();
            this.o.close = false;
        } else {
            this.toggleEntryToHidden();
            this.o.close = true;
        }

        this.saveOptions();
    }

    this.toggleEntryToVisible = function(){
        this.addClass(this.c.entry, '__visible');
        this.c.entry.style.display = 'block';
    }

    this.toggleEntryToHidden = function(){
        this.removeClass(this.c.entry, '__visible');
        this.c.entry.style.display = 'none';
    }

    // Service methods
    this.hasClass = function(elem, className) {
        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    }

    this.addClass = function(elem, className) {
        if (!this.hasClass(elem, className)) {
            elem.className += ' ' + className;
        }
    }

    this.removeClass = function(elem, className) {
        var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
        if (this.hasClass(elem, className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    }

    this.bind = function(elem, event, callback) {
        if (elem.addEventListener) {
            elem.addEventListener(event, callback);
        } else {
            elem.attachEvent('on' + event, callback);
        }
    }

    this.proxy = function(func, args, context){
        context = context || this;
        args = args || [];

        if(typeof func == 'string')
            func = context[func];

        return function(){
            var a = args.slice();

            for(var i=0; i<arguments.length; i++)
                if(typeof a[i]=='undefined' || a[i]===null)
                    a[i] = arguments[i];

            return func.apply(context, a);
        };
    }

    // Plugin options
    this.o = {
        close: true,
        layer: {
            current: 0,
            show: true,
            opacity: 1,
            position: [20, 20],
            lock: false,
            zIndex: 1000
        },
        layers: ['pixelbest/']
    }

    this.init();
}