// ==UserScript==
// @name        Pixel Perfect
// @namespace   localhost
// @include     *localhost*
// @include     *127.0.0.1*
// @version     0.0.2
// @grant       none
// ==/UserScript==


var style = document.createElement('style')
style.type = 'text/css'
style.innerHTML = '.pf{position:fixed;font-size:12px;font-family:Arial,"Nimbus Sans L",Helvetica,sans-serif;background:#1caf9a;z-index:1001}.pf_head{padding:0 20px;min-width:200px;overflow:hidden;background:#1a9c89;cursor:move}.pf_layer-control{float:left;margin:0;padding:10px 0;overflow:hidden;list-style:none}.pf_layer-control li{float:left;margin:0 10px 0 0;cursor:pointer}.pf_icon{display:block;width:20px;height:20px;font:0/0 a;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAoCAYAAACiu5n/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDZGQzQ1MkU2MDYxMUUzOUFGNzhBMDdBRjE4QTJERiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4NzhCM0YwMkU2MTcxMUUzOUFGNzhBMDdBRjE4QTJERiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIwNkZDNDUwRTYwNjExRTM5QUY3OEEwN0FGMThBMkRGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIwNkZDNDUxRTYwNjExRTM5QUY3OEEwN0FGMThBMkRGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+UFVO7wAABFlJREFUeNrsmVtIFUEYx/VgZmIXQirESoLuYDc1EAJDoYckCLpR2UNFxnkJhO4WVA8VJWFJFtRDlEjZaxkU2YWirNQSzVNYkkmJhoSZpunpP/RfmKbZPXvupX7ww92Z2bM7M99lvs9It9sdMZTEodzHg1Oadp3EgD0g+r+asdhhMga8cP+W41K7GZc59jaf1Y1JAeWgi5SzLSJcGBex4KH7T9lo8eA+ZWwtSFTGZIEf7O8jbrZlhWvCkbThNeCqsvk9YBcYASayrQ2MBvmK2v8EmeAB76PAW5AEjoEjbD9AM2gC0/mcryJMygk2gDlsqwcl4Cy/31KlL7p9l+3KSqaxvVqzytXsS/Njp6ZQq1zASTNJ4bWLfVOsVNqw4SbNZFr4cRmgQ9NfBeKUH85mX6nmpaXsy/ZxsjGcUBmvdf1lHPNXv6GWieA+mKpRggSqYhEYp+lfAJ5SfUMhTkaGHEltn4FWyRRzOMapC0viQx+B+RYvyQZzLfqFDT0E03jfDu6CWs3YWva1+zhhYbOFio06NP6nkGP/EOG0xOqkaH7YBWaavPQyV1GVKrDI4mPj6WzsSI/JonSDJaCGWikkmb9byfvV1EyxCaNUp7UG9GtscwV4rWm/CeJNnNdWD/ZX4YUjrDD5jW46qCjwlfQT434ax3TrbPga2KFZybWSisoiVHulpv0kuBACGxahJ40hbSypoTYY9+84pt4qLG2SDgpCBixWv1u5P2rTw+p2OI/Y3eE8hh7ZA4sTYqviqV0caxqWjKNgg/LiHpALTms+qg2s8iKkqBPu4ykvVjqJeZqwLiwJFZ5hJyxFKRsuVKNZcVYjwTkT9RKJxnU/1FO8P0+6tuvMloMb4CW9caUUsoR59nJMj+6F6gSyeC084GGGnMls+0QveZBe8BA98y0/Jp3pwzMfQConuAUUSPZ93u7R0impUyG9oJlqJoBHHCtOX7P8sGFvvXRAsqVk2lAnWGfz4Whwhh/nskgR/6kJG9mSgxnNJfDGS/USmdZisBMM/Ov5f+RQK/EMT3ioFfFCKSJhKQddpNwkiRkUO5zFg0O0VOaJkg4Md8Ix4ViQztRLrmm9Ao/BNz9OV8Gud9kq0xrMYn2r00PyUML47W0sDHa9yxKHUgUsYEViM4jjLu4H88BskAs+cux6UA2KOdauTODfBk1fgzImaDucKK2uIaJwvpD9k5iRGNfvlbF1IMnmKgezwGdrh81qWkVMDEQ20wIaWdr5DHZ7qGlZSTDrXbaclllNS2QxT0CH8v+jVFYUvoSppuWXCI95ApQGKCYXe+gvAxk2f+seWBqMg4dZTWsZ+A72SknBFfBcypnDUdMKWFhSa1reOK1Q1rQCkg/LNa066aWd/E9hMuPzNtAc5ppWQCdsJPai+tFocfBo466O9/KFuh3OJyHZYV3hrJc1oXMMVelKTauKR8tAHf0yQ2nCVpXCAU6uKsjfkBHKCTsihpgMVzwGu/wSYABQ6Zv3p8a0lgAAAABJRU5ErkJggg==) 0 0 no-repeat}.pf_icon.__on{background-position:0 -20px}.pf_icon.__off{background-position:0 0}.pf_icon.__lock{background-position:-20px -20px}.pf_icon.__unlock{background-position:-20px 0}.pf_title{position:relative;float:right;margin:0;padding:0 15px 0 20px;color:#fff;font-size:14px;font-weight:bold;line-height:40px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4NzhCM0YwNUU2MTcxMUUzOUFGNzhBMDdBRjE4QTJERiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4NzhCM0YwNkU2MTcxMUUzOUFGNzhBMDdBRjE4QTJERiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg3OEIzRjAzRTYxNzExRTM5QUY3OEEwN0FGMThBMkRGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg3OEIzRjA0RTYxNzExRTM5QUY3OEEwN0FGMThBMkRGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Ea0RwwAAADxJREFUeNpi/A8EDNgB45/8fKxyTAxkALI0saA7iWY2kaWJEXfg4df0n0g//R94TejB/58YP9FOE0CAAQAIdyfRDY+o8wAAAABJRU5ErkJggg==) 0 50% no-repeat}.pf_title:after{content:"";position:absolute;top:50%;right:0;width:0;height:0;border-width:4px;border-style:solid;border-color:#fff transparent transparent transparent}.pf_entry{padding:20px 20px 15px 20px}.pf_form{color:#c1eae5}.pf_form fieldset{border:0;margin:0;padding:0}.pf_field{margin:0 0 10px 0}.pf_field.__first{margin-left:0 !important}.pf_field_group .pf_field{float:left;margin:0 0 10px 10px}.pf_form label{display:block;margin:0 0 5px 0}.pf_form input[type="text"]{padding:0 5px;width:200px;height:23px;border:0;box-sizing:border-box;font-size:12px;font-family:Arial,"Nimbus Sans L",Helvetica,sans-serif}.pf_field_group input[type="text"]{width:95px}.pf_layer{display:none;position:absolute;top:0;left:0;cursor:move}'
document.getElementsByTagName('head') [0].appendChild(style);


/**
 * Perfetto - Pixel Perfect - for Greasemonkey/Tampermonkey
 *
 * @author      Artem Terekhin (and Georgy Daneke)
 * @version     0.0.2
 */
var Perfetto = new function () {
    this.init = function () {
        this.generateUI();
        this.getOptions();
        this.fillOptions();
        this.bind([this.c.lock], 'click', this.proxy('toggleLock'));
        this.bind([this.c.show], 'click', this.proxy('toggleShow'));
        this.bind([this.c.close], 'click', this.proxy('toggleEntry'));
        this.bind([
                this.c.url,
                this.c.position.x,
                this.c.position.y,
                this.c.opacity,
                this.c.zIndex
            ], 'keyup', this.proxy('updateOptions')
        );
        this.bind([
                this.c.position.x,
                this.c.position.y,
                this.c.opacity,
                this.c.zIndex
            ], 'keydown', this.proxy('valueChange')
        );
        this.bind([this.c.head,
            this.layer], 'mousedown', this.proxy('dragTo'));
        this.bind([this.c.head,
            this.layer], 'dragstart', function (e) {
            e.preventDefault();
        });
    }
    this.generateUI = function () {
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
    this.saveOptions = function () {
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
    this.getOptions = function () {
        if (localStorage['Perfetto'] === 'true') {
            var pfPos = localStorage['Perfetto.o.position'].split(',');
            var layerPos = localStorage['Perfetto.o.layer.position'].split(',');
            this.o.position = [
                parseInt(pfPos[0]),
                parseInt(pfPos[1])
            ];
            this.o.close = localStorage['Perfetto.o.close'] === 'true';
            this.o.layer.current = parseInt(localStorage['Perfetto.o.layer.current']);
            this.o.layer.show = localStorage['Perfetto.o.layer.show'] === 'true';
            this.o.layer.lock = localStorage['Perfetto.o.layer.lock'] === 'true';
            this.o.layer.url = localStorage['Perfetto.o.layer.url'];
            this.o.layer.position = [
                parseInt(layerPos[0]),
                parseInt(layerPos[1])
            ];
            this.o.layer.opacity = parseFloat(localStorage['Perfetto.o.layer.opacity']);
            this.o.layer.zIndex = parseInt(localStorage['Perfetto.o.layer.zIndex']);
        }
    }
    this.fillOptions = function () {
        this.pf.style.left = this.o.position[0] + 'px';
        this.pf.style.top = this.o.position[1] + 'px ';
        if (this.o.close) {
            this.toggleEntryToHidden();
        } else {
            this.toggleEntryToVisible();
        }
        if (this.o.layer.show) {
            this.toggleShowToVisible();
        } else {
            this.toggleShowToHidden();
        }
        if (this.o.layer.lock) {
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
    this.updateOptions = function (e) {
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
    this.valueChange = function (e) {
        if (e.keyCode == 38) {
            if (e.currentTarget.name == 'opacity') {
                var value = e.currentTarget.value * 10 + 1;
                if (value > 10) value = 10;
                this.c.opacity.value = value / 10;
            } else {
                if (e.currentTarget.name == 'pos-x' || e.currentTarget.name == 'pos-y') {
                    if (!this.o.layer.lock) e.currentTarget.value++;
                } else {
                    e.currentTarget.value++;
                }
            }
        } else if (e.keyCode == 40) {
            if (e.currentTarget.name == 'opacity') {
                var value = e.currentTarget.value * 10 - 1;
                if (value < 0) value = 0;
                this.c.opacity.value = value / 10;
            } else {
                if (e.currentTarget.name == 'pos-x' || e.currentTarget.name == 'pos-y') {
                    if (!this.o.layer.lock) e.currentTarget.value--;
                } else {
                    e.currentTarget.value--;
                }
            }
        }
    }
    this.dragTo = function (e) {
        var self = this;
        var el = e.currentTarget;
        if (el == this.c.head) el = this.pf;
        if (el.className != self.o.namespaces.layer || (el.className == self.o.namespaces.layer && !self.o.layer.lock)) {
            var shiftX = e.pageX - el.offsetLeft;
            var shiftY = e.pageY - el.offsetTop;

            function moveAt(e) {
                var x = e.pageX - shiftX;
                var y = e.pageY - shiftY;
                el.style.left = x + 'px';
                el.style.top = y + 'px';
                if (el.className == self.o.namespaces.wrapper) {
                    self.o.position[0] = x;
                    self.o.position[1] = y;
                }
                if (el.className == self.o.namespaces.layer) {
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
    this.toggleLock = function () {
        if (this.o.layer.lock) {
            this.toggleLockToUnlocked();
            this.o.layer.lock = false;
        } else {
            this.toggleLockToLocked();
            this.o.layer.lock = true;
        }
        this.saveOptions();
    }
    this.toggleLockToLocked = function () {
        this.removeClass(this.c.lock, '__unlock');
        this.addClass(this.c.lock, '__lock');
    }
    this.toggleLockToUnlocked = function () {
        this.removeClass(this.c.lock, '__lock');
        this.addClass(this.c.lock, '__unlock');
    }
    this.toggleShow = function () {
        if (this.o.layer.show) {
            this.toggleShowToHidden();
            this.o.layer.show = false;
        } else {
            this.toggleShowToVisible();
            this.o.layer.show = true;
        }
        this.saveOptions();
    }
    this.toggleShowToVisible = function () {
        this.removeClass(this.c.show, '__off');
        this.addClass(this.c.show, '__on');
        this.layer.style.display = 'block';
    }
    this.toggleShowToHidden = function () {
        this.removeClass(this.c.show, '__on');
        this.addClass(this.c.show, '__off');
        this.layer.style.display = 'none';
    }
    this.toggleEntry = function () {
        if (this.o.close) {
            this.toggleEntryToVisible();
            this.o.close = false;
        } else {
            this.toggleEntryToHidden();
            this.o.close = true;
        }
        this.saveOptions();
    }
    this.toggleEntryToVisible = function () {
        this.addClass(this.c.entry, '__visible');
        this.c.entry.style.display = 'block';
    }
    this.toggleEntryToHidden = function () {
        this.removeClass(this.c.entry, '__visible');
        this.c.entry.style.display = 'none';
    }
    this.changeURL = function () {
        this.layer.innerHTML = '<img src="' + this.o.layer.url + '"/>';
    }
    this.changePosition = function () {
        this.layer.style.left = this.o.layer.position[0] + 'px';
        this.layer.style.top = this.o.layer.position[1] + 'px';
    }
    this.changeOpacity = function () {
        this.layer.style.opacity = this.o.layer.opacity;
    }
    this.changeZIndex = function () {
        this.layer.style.zIndex = this.o.layer.zIndex;
    }
    this.hasClass = function (elem, className) {
        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    }
    this.addClass = function (elem, className) {
        if (!this.hasClass(elem, className)) {
            elem.className += ' ' + className;
        }
    }
    this.removeClass = function (elem, className) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
        if (this.hasClass(elem, className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    }
    this.bind = function (elem, event, callback) {
        for (var i = 0; i < elem.length; i++) {
            if (elem[i].addEventListener) {
                elem[i].addEventListener(event, callback);
            } else {
                elem[i].attachEvent('on' + event, callback);
            }
        }
    }
    this.unbind = function (elem, event, callback) {
        for (var i = 0; i < elem.length; i++) {
            if (elem[i].removeEventListener) {
                elem[i].removeEventListener(event, callback);
            } else {
                elem[i].detachEvent('on' + event, callback);
            }
        }
    }
    this.proxy = function (func, args, context) {
        context = context || this;
        args = args || [];
        if (typeof func == 'string')
            func = context[func];
        return function () {
            var a = args.slice();
            for (var i = 0; i < arguments.length; i++)
                if (typeof a[i] == 'undefined' || a[i] === null)
                    a[i] = arguments[i];
            return func.apply(context, a);
        };
    }
    this.o = {
        namespaces: {
            wrapper: 'pf',
            layer: 'pf_layer'
        },
        position: [
            15,
            15
        ],
        close: false,
        layer: {
            current: 0,
            show: true,
            lock: false,
            url: '/1.jpg',
            position: [
                0,
                0
            ],
            opacity: 0.5,
            zIndex: 1000
        }
    }
    this.init();
}
