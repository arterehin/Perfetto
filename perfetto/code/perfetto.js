var Perfetto = new function() {
    this.init = function() {
        this.generateUI();
        this.getOptions();
        this.fillOptions();

        this.bind([this.c.lock], 'click', this.proxy('toggleLock'));
        this.bind([this.c.show], 'click', this.proxy('toggleShow'));
        this.bind([this.c.close], 'click', this.proxy('toggleEntry'));
        this.bind(
            [
                this.c.url,
                this.c.position.x,
                this.c.position.y,
                this.c.opacity,
                this.c.zIndex
            ],
            'keyup',
            this.proxy('updateOptions')
        );
        this.bind(
            [
                this.c.position.x,
                this.c.position.y,
                this.c.opacity,
                this.c.zIndex
            ],
            'keydown',
            this.proxy('valueChange')
        );

        this.bind([this.c.head, this.layer], 'mousedown', this.proxy('dragTo'));
        this.bind([this.c.head, this.layer], 'dragstart', function(e){ e.preventDefault(); });
    }

    this.generateUI = function(){
        var template = '<div class="pf_head" data-pf="head">' +
                           '<ul class="pf_layer-control">' +
                               '<li data-pf="show" class="pf_icon __off"></li>' +
                               '<li data-pf="lock" class="pf_icon __unlock"></li>' +
                           '</ul>' +
                           '<h3 data-pf="close" class="pf_title">Perfetto</h3>' +
                       '</div>' +
                       '<div data-pf="entry" class="pf_entry __visible">' +
                           '<form action="#" class="pf_form">' +
                               '<fieldset class="pf_field_wrap">' +
                                   '<div class="pf_field">' +
                                       '<label>URL</label>' +
                                       '<input type="text" name="url"/>' +
                                   '</div>' +
                               '</fieldset>' +
                               '<fieldset class="pf_field_group">' +
                                   '<div class="pf_field __first">' +
                                       '<label>X</label>' +
                                       '<input type="text" name="pos-x"/>' +
                                   '</div>' +
                                   '<div class="pf_field">' +
                                       '<label>Y</label>' +
                                       '<input type="text" name="pos-y"/>' +
                                   '</div>' +
                               '</fieldset>' +
                               '<fieldset class="pf_field_group">' +
                                   '<div class="pf_field __first">' +
                                       '<label>Opacity</label>' +
                                       '<input type="text" name="opacity"/>' +
                                   '</div>' +
                                   '<div class="pf_field">' +
                                       '<label>z-Index</label>' +
                                       '<input type="text" name="zindex"/>' +
                                   '</div>' +
                               '</fieldset>' +
                            '</form>' +
                       '</div>';

        this.pf = document.createElement('div');
        this.pf.className = this.o.namespaces.wrapper;
        this.pf.innerHTML = template;

        this.layer = document.createElement('div');
        this.layer.className = this.o.namespaces.layer;

        this.c = {
            head: this.pf.querySelector('[data-pf="head"]'),
            show: this.pf.querySelector('[data-pf="show"]'),
            lock: this.pf.querySelector('[data-pf="lock"]'),
            close: this.pf.querySelector('[data-pf="close"]'),
            entry: this.pf.querySelector('[data-pf="entry"]'),
            url: this.pf.querySelector('[name="url"]'),
            position: {
                x: this.pf.querySelector('[name="pos-x"]'),
                y: this.pf.querySelector('[name="pos-y"]')
            },
            opacity: this.pf.querySelector('[name="opacity"]'),
            zIndex: this.pf.querySelector('[name="zindex"]')
        }

        document.body.appendChild(this.pf);
        document.body.appendChild(this.layer);
    }

    this.saveOptions = function(){
        localStorage['Perfetto'] = true;
        localStorage['Perfetto.o.position'] = this.o.position;
        localStorage['Perfetto.o.close'] = this.o.close;
        localStorage['Perfetto.o.layer.current'] = this.o.layer.current;
        localStorage['Perfetto.o.layer.show'] = this.o.layer.show;
        localStorage['Perfetto.o.layer.lock'] = this.o.layer.lock;
        localStorage['Perfetto.o.layer.url'] = this.o.layer.url;
        localStorage['Perfetto.o.layer.position'] = this.o.layer.position;
        localStorage['Perfetto.o.layer.opacity'] = this.o.layer.opacity;
        localStorage['Perfetto.o.layer.zIndex'] = this.o.layer.zIndex;
    }

    this.getOptions = function(){
        if(localStorage['Perfetto'] === 'true') {
            var pfPos = localStorage['Perfetto.o.position'].split(',');
            var layerPos = localStorage['Perfetto.o.layer.position'].split(',');

            this.o.position = [parseInt(pfPos[0]), parseInt(pfPos[1])];
            this.o.close = localStorage['Perfetto.o.close'] === 'true';
            this.o.layer.current = parseInt(localStorage['Perfetto.o.layer.current']);
            this.o.layer.show = localStorage['Perfetto.o.layer.show'] === 'true';
            this.o.layer.lock = localStorage['Perfetto.o.layer.lock'] === 'true';
            this.o.layer.url = localStorage['Perfetto.o.layer.url'];
            this.o.layer.position = [parseInt(layerPos[0]), parseInt(layerPos[1])];
            this.o.layer.opacity = parseFloat(localStorage['Perfetto.o.layer.opacity']);
            this.o.layer.zIndex = parseInt(localStorage['Perfetto.o.layer.zIndex']);
        }
    }

    this.fillOptions = function(){
        this.pf.style.left = this.o.position[0] + 'px';
        this.pf.style.top = this.o.position[1] + 'px ';

        if(this.o.close) {
            this.toggleEntryToHidden();
        } else {
            this.toggleEntryToVisible();
        }

        if(this.o.layer.show) {
            this.toggleShowToVisible();
        } else {
            this.toggleShowToHidden();
        }

        if(this.o.layer.lock) {
            this.toggleLockToLocked();
        } else {
            this.toggleLockToUnlocked();
        }

        this.c.url.value = this.o.layer.url;
        this.changeURL();

        this.c.position.x.value = this.o.layer.position[0];
        this.c.position.y.value = this.o.layer.position[1];
        this.changePosition();

        this.c.opacity.value = this.o.layer.opacity;
        this.changeOpacity();

        this.c.zIndex.value = this.o.layer.zIndex;
        this.changeZIndex();
    }

    this.updateOptions = function(e){
        switch (e.currentTarget.name) {
            case 'url':
                this.o.layer.url = this.c.url.value;
                this.changeURL();
            break;

            case 'pos-x':
                this.o.layer.position[0] = this.c.position.x.value;
                this.changePosition();
            break;

            case 'pos-y':
                this.o.layer.position[1] = this.c.position.y.value;
                this.changePosition();
            break;

            case 'opacity':
                this.o.layer.opacity = this.c.opacity.value;
                this.changeOpacity();
            break;

            case 'zindex':
                this.o.layer.zIndex = this.c.zIndex.value;
                this.changeZIndex();
            break;
        }

        this.saveOptions();
    }

    this.valueChange = function(e){
        if(e.keyCode == 38) {
            if(e.currentTarget.name == 'opacity') {
                var value = e.currentTarget.value*10+1;
                if(value > 10) value = 10;
                this.c.opacity.value = value/10;
            } else {
                if(e.currentTarget.name == 'pos-x' || e.currentTarget.name == 'pos-y') {
                    if(!this.o.layer.lock) e.currentTarget.value++;
                } else {
                    e.currentTarget.value++;
                }
            }
        } else if(e.keyCode == 40) {
            if(e.currentTarget.name == 'opacity') {
                var value = e.currentTarget.value*10-1;
                if(value < 0) value = 0;
                this.c.opacity.value = value/10;
            } else {
                if(e.currentTarget.name == 'pos-x' || e.currentTarget.name == 'pos-y') {
                    if(!this.o.layer.lock) e.currentTarget.value--;
                } else {
                    e.currentTarget.value--;
                }
            }
        }
    }

    this.dragTo = function(e){
        var self = this;
        var el = e.currentTarget;

        if(el == this.c.head) el = this.pf;

        if(el.className != self.o.namespaces.layer || (el.className == self.o.namespaces.layer && !self.o.layer.lock)) {
            var shiftX = e.pageX - el.offsetLeft;
            var shiftY = e.pageY - el.offsetTop;

            function moveAt(e) {
                var x = e.pageX - shiftX;
                var y = e.pageY - shiftY;

                el.style.left = x + 'px';
                el.style.top = y + 'px';

                if(el.className == self.o.namespaces.wrapper) {
                    self.o.position[0] = x;
                    self.o.position[1] = y;
                }

                if(el.className == self.o.namespaces.layer) {
                    self.c.position.x.value = self.o.layer.position[0] = x;
                    self.c.position.y.value = self.o.layer.position[1] = y;
                }

                self.saveOptions();
            }

            function clearEvent() {
                self.unbind([document], 'mousemove', moveAt);
                self.unbind([document], 'mouseup', clearEvent);
            }

            self.bind([document], 'mousemove', moveAt);
            self.bind([document], 'mouseup', clearEvent);
        }
    }

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

    this.changeURL = function(){
        this.layer.innerHTML = '<img src="'+this.o.layer.url+'"/>';
        this.layer.style.backgroundImage = 'url('+this.o.layer.url+')';
    }

    this.changePosition = function(){
        this.layer.style.left = this.o.layer.position[0]+'px';
        this.layer.style.top = this.o.layer.position[1]+'px';
    }

    this.changeOpacity = function(){
        this.layer.style.opacity = this.o.layer.opacity;
    }

    this.changeZIndex = function(){
        this.layer.style.zIndex = this.o.layer.zIndex;
    }

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
        for(var i=0; i<elem.length;i++) {
            if (elem[i].addEventListener) {
                elem[i].addEventListener(event, callback);
            } else {
                elem[i].attachEvent('on' + event, callback);
            }
        }
    }

    this.unbind = function(elem, event, callback) {
        for(var i=0; i<elem.length;i++) {
            if (elem[i].removeEventListener) {
                elem[i].removeEventListener(event, callback);
            } else {
                elem[i].detachEvent('on' + event, callback);
            }
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

    this.o = {
        namespaces: {
            wrapper: 'pf',
            layer: 'pf_layer'
        },
        position: [15, 15],
        close: false,
        layer: {
            current: 0,
            show: true,
            lock: false,
            url: '/perfetto/layers/index.jpg',
            position: [0, 0],
            opacity: 1,
            zIndex: 1000
        }
    }

    this.init();
}