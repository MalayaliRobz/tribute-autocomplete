(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tribute = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _TributeEvents = require("./TributeEvents");

var _TributeEvents2 = _interopRequireDefault(_TributeEvents);

var _TributeMenuEvents = require("./TributeMenuEvents");

var _TributeMenuEvents2 = _interopRequireDefault(_TributeMenuEvents);

var _TributeRange = require("./TributeRange");

var _TributeRange2 = _interopRequireDefault(_TributeRange);

var _TributeSearch = require("./TributeSearch");

var _TributeSearch2 = _interopRequireDefault(_TributeSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tribute = function () {
    function Tribute(_ref) {
        var _this = this;

        var _ref$values = _ref.values,
            values = _ref$values === undefined ? null : _ref$values,
            _ref$iframe = _ref.iframe,
            iframe = _ref$iframe === undefined ? null : _ref$iframe,
            _ref$selectClass = _ref.selectClass,
            selectClass = _ref$selectClass === undefined ? 'highlight' : _ref$selectClass,
            _ref$trigger = _ref.trigger,
            trigger = _ref$trigger === undefined ? '@' : _ref$trigger,
            _ref$autoCompleteMode = _ref.autoCompleteMode,
            autoCompleteMode = _ref$autoCompleteMode === undefined ? false : _ref$autoCompleteMode,
            _ref$selectTemplate = _ref.selectTemplate,
            selectTemplate = _ref$selectTemplate === undefined ? null : _ref$selectTemplate,
            _ref$menuItemTemplate = _ref.menuItemTemplate,
            menuItemTemplate = _ref$menuItemTemplate === undefined ? null : _ref$menuItemTemplate,
            _ref$lookup = _ref.lookup,
            lookup = _ref$lookup === undefined ? 'key' : _ref$lookup,
            _ref$fillAttr = _ref.fillAttr,
            fillAttr = _ref$fillAttr === undefined ? 'value' : _ref$fillAttr,
            _ref$collection = _ref.collection,
            collection = _ref$collection === undefined ? null : _ref$collection,
            _ref$menuContainer = _ref.menuContainer,
            menuContainer = _ref$menuContainer === undefined ? null : _ref$menuContainer,
            _ref$noMatchTemplate = _ref.noMatchTemplate,
            noMatchTemplate = _ref$noMatchTemplate === undefined ? null : _ref$noMatchTemplate,
            _ref$requireLeadingSp = _ref.requireLeadingSpace,
            requireLeadingSpace = _ref$requireLeadingSp === undefined ? true : _ref$requireLeadingSp,
            _ref$allowSpaces = _ref.allowSpaces,
            allowSpaces = _ref$allowSpaces === undefined ? false : _ref$allowSpaces,
            _ref$replaceTextSuffi = _ref.replaceTextSuffix,
            replaceTextSuffix = _ref$replaceTextSuffi === undefined ? null : _ref$replaceTextSuffi,
            _ref$positionMenu = _ref.positionMenu,
            positionMenu = _ref$positionMenu === undefined ? true : _ref$positionMenu,
            _ref$spaceSelectsMatc = _ref.spaceSelectsMatch,
            spaceSelectsMatch = _ref$spaceSelectsMatc === undefined ? false : _ref$spaceSelectsMatc,
            _ref$searchOpts = _ref.searchOpts,
            searchOpts = _ref$searchOpts === undefined ? {} : _ref$searchOpts;

        _classCallCheck(this, Tribute);

        this.autoCompleteMode = autoCompleteMode;
        this.menuSelected = 0;
        this.current = {};
        this.inputEvent = false;
        this.isActive = false;
        this.menuContainer = menuContainer;
        this.allowSpaces = allowSpaces;
        this.replaceTextSuffix = replaceTextSuffix;
        this.positionMenu = positionMenu;
        this.hasTrailingSpace = false;
        this.spaceSelectsMatch = spaceSelectsMatch;

        if (this.autoCompleteMode) {
            trigger = '';
        }

        if (values) {
            this.collection = [{
                // symbol that starts the lookup
                trigger: trigger,

                // is it wrapped in an iframe
                iframe: iframe,

                // class applied to selected item
                selectClass: selectClass,

                // function called on select that retuns the content to insert
                selectTemplate: (selectTemplate || Tribute.defaultSelectTemplate).bind(this),

                // function called that returns content for an item
                menuItemTemplate: (menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(this),

                // function called when menu is empty, disables hiding of menu.
                noMatchTemplate: function (t) {
                    if (typeof t === 'function') {
                        return t.bind(_this);
                    }

                    return noMatchTemplate;
                }(noMatchTemplate),

                // column to search against in the object
                lookup: lookup,

                // column that contains the content to insert by default
                fillAttr: fillAttr,

                // array of objects or a function returning an array of objects
                values: values,

                requireLeadingSpace: requireLeadingSpace,

                searchOpts: searchOpts
            }];
        } else if (collection) {
            this.collection = collection.map(function (item) {
                return {
                    trigger: item.trigger || trigger,
                    iframe: item.iframe || iframe,
                    selectClass: item.selectClass || selectClass,
                    selectTemplate: (item.selectTemplate || Tribute.defaultSelectTemplate).bind(_this),
                    menuItemTemplate: (item.menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(_this),
                    // function called when menu is empty, disables hiding of menu.
                    noMatchTemplate: function (t) {
                        if (typeof t === 'function') {
                            return t.bind(_this);
                        }

                        return null;
                    }(noMatchTemplate),
                    lookup: item.lookup || lookup,
                    fillAttr: item.fillAttr || fillAttr,
                    values: item.values,
                    requireLeadingSpace: item.requireLeadingSpace,
                    searchOpts: item.searchOpts || searchOpts
                };
            });
        } else {
            throw new Error('[Tribute] No collection specified.');
        }

        new _TributeRange2.default(this);
        new _TributeEvents2.default(this);
        new _TributeMenuEvents2.default(this);
        new _TributeSearch2.default(this);
    }

    _createClass(Tribute, [{
        key: "triggers",
        value: function triggers() {
            return this.collection.map(function (config) {
                return config.trigger;
            });
        }
    }, {
        key: "attach",
        value: function attach(el) {
            if (!el) {
                throw new Error('[Tribute] Must pass in a DOM node or NodeList.');
            }

            // Check if it is a jQuery collection
            if (typeof jQuery !== 'undefined' && el instanceof jQuery) {
                el = el.get();
            }

            // Is el an Array/Array-like object?
            if (el.constructor === NodeList || el.constructor === HTMLCollection || el.constructor === Array) {
                var length = el.length;
                for (var i = 0; i < length; ++i) {
                    this._attach(el[i]);
                }
            } else {
                this._attach(el);
            }
        }
    }, {
        key: "_attach",
        value: function _attach(el) {
            if (el.hasAttribute('data-tribute')) {
                console.warn('Tribute was already bound to ' + el.nodeName);
            }

            this.ensureEditable(el);
            this.events.bind(el);
            el.setAttribute('data-tribute', true);
        }
    }, {
        key: "ensureEditable",
        value: function ensureEditable(element) {
            if (Tribute.inputTypes().indexOf(element.nodeName) === -1) {
                if (element.contentEditable) {
                    element.contentEditable = true;
                } else {
                    throw new Error('[Tribute] Cannot bind to ' + element.nodeName);
                }
            }
        }
    }, {
        key: "createMenu",
        value: function createMenu() {
            var wrapper = this.range.getDocument().createElement('div'),
                ul = this.range.getDocument().createElement('ul');

            wrapper.className = 'tribute-container';
            wrapper.appendChild(ul);

            if (this.menuContainer) {
                return this.menuContainer.appendChild(wrapper);
            }

            return this.range.getDocument().body.appendChild(wrapper);
        }
    }, {
        key: "showMenuFor",
        value: function showMenuFor(element, scrollTo) {
            var _this2 = this;

            // Only proceed if menu isn't already shown for the current element & mentionText
            if (this.isActive && this.current.element === element && this.current.mentionText === this.currentMentionTextSnapshot) {
                return;
            }
            this.currentMentionTextSnapshot = this.current.mentionText;

            // create the menu if it doesn't exist.
            if (!this.menu) {
                this.menu = this.createMenu();
                element.tributeMenu = this.menu;
                this.menuEvents.bind(this.menu);
            }

            this.isActive = true;
            this.menuSelected = 0;

            if (!this.current.mentionText) {
                this.current.mentionText = '';
            }

            var processValues = function processValues(values) {
                // Tribute may not be active any more by the time the value callback returns
                if (!_this2.isActive) {
                    return;
                }

                var items = _this2.search.filter(_this2.current.mentionText, values, {
                    pre: _this2.current.collection.searchOpts.pre || '<span>',
                    post: _this2.current.collection.searchOpts.post || '</span>',
                    extract: function extract(el) {
                        if (typeof _this2.current.collection.lookup === 'string') {
                            return el[_this2.current.collection.lookup];
                        } else if (typeof _this2.current.collection.lookup === 'function') {
                            return _this2.current.collection.lookup(el, _this2.current.mentionText);
                        } else {
                            throw new Error('Invalid lookup attribute, lookup must be string or function.');
                        }
                    }
                });

                _this2.current.filteredItems = items;
                var ul = _this2.menu.querySelector('ul');

                _this2.range.positionMenuAtCaret(scrollTo);

                if (!items.length) {
                    var noMatchEvent = new CustomEvent('tribute-no-match', { detail: _this2.menu });
                    _this2.current.element.dispatchEvent(noMatchEvent);
                    if (!_this2.current.collection.noMatchTemplate) {
                        _this2.hideMenu();
                    } else {
                        ul.innerHTML = _this2.current.collection.noMatchTemplate();
                    }

                    return;
                }

                ul.innerHTML = '';

                items.forEach(function (item, index) {
                    var li = _this2.range.getDocument().createElement('li');

                    li.setAttribute('data-index', index);
                    li.addEventListener('mouseenter', function (e) {
                        var li = e.target;
                        var index = li.getAttribute('data-index');
                        _this2.events.setActiveLi(index, false);
                    });
                    if (_this2.menuSelected === index) {
                        li.className = _this2.current.collection.selectClass;
                    }
                    li.innerHTML = _this2.current.collection.menuItemTemplate(item);

                    ul.appendChild(li);
                });
            };

            if (typeof this.current.collection.values === 'function') {
                this.current.collection.values(this.current.mentionText, processValues);
            } else {
                processValues(this.current.collection.values);
            }
        }
    }, {
        key: "showMenuForCollection",
        value: function showMenuForCollection(element, collectionIndex) {
            if (element !== document.activeElement) {
                this.placeCaretAtEnd(element);
            }

            this.current.collection = this.collection[collectionIndex || 0];
            this.current.externalTrigger = true;
            this.current.element = element;

            if (element.isContentEditable) this.insertTextAtCursor(this.current.collection.trigger);else this.insertAtCaret(element, this.current.collection.trigger);

            this.showMenuFor(element);
        }

        // TODO: make sure this works for inputs/textareas

    }, {
        key: "placeCaretAtEnd",
        value: function placeCaretAtEnd(el) {
            el.focus();
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }

        // for contenteditable

    }, {
        key: "insertTextAtCursor",
        value: function insertTextAtCursor(text) {
            var sel, range, html;
            sel = window.getSelection();
            range = sel.getRangeAt(0);
            range.deleteContents();
            var textNode = document.createTextNode(text);
            range.insertNode(textNode);
            range.selectNodeContents(textNode);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        }

        // for regular inputs

    }, {
        key: "insertAtCaret",
        value: function insertAtCaret(textarea, text) {
            var scrollPos = textarea.scrollTop;
            var caretPos = textarea.selectionStart;

            var front = textarea.value.substring(0, caretPos);
            var back = textarea.value.substring(textarea.selectionEnd, textarea.value.length);
            textarea.value = front + text + back;
            caretPos = caretPos + text.length;
            textarea.selectionStart = caretPos;
            textarea.selectionEnd = caretPos;
            textarea.focus();
            textarea.scrollTop = scrollPos;
        }
    }, {
        key: "hideMenu",
        value: function hideMenu() {
            if (this.menu) {
                this.menu.style.cssText = 'display: none;';
                this.isActive = false;
                this.menuSelected = 0;
                this.current = {};
            }
        }
    }, {
        key: "selectItemAtIndex",
        value: function selectItemAtIndex(index, originalEvent) {
            index = parseInt(index);
            if (typeof index !== 'number' || isNaN(index)) return;
            var item = this.current.filteredItems[index];
            var content = this.current.collection.selectTemplate(item);
            if (content !== null) this.replaceText(content, originalEvent, item);
        }
    }, {
        key: "replaceText",
        value: function replaceText(content, originalEvent, item) {
            this.range.replaceTriggerText(content, true, true, originalEvent, item);
        }
    }, {
        key: "_append",
        value: function _append(collection, newValues, replace) {
            if (typeof collection.values === 'function') {
                throw new Error('Unable to append to values, as it is a function.');
            } else if (!replace) {
                collection.values = collection.values.concat(newValues);
            } else {
                collection.values = newValues;
            }
        }
    }, {
        key: "append",
        value: function append(collectionIndex, newValues, replace) {
            var index = parseInt(collectionIndex);
            if (typeof index !== 'number') throw new Error('please provide an index for the collection to update.');

            var collection = this.collection[index];

            this._append(collection, newValues, replace);
        }
    }, {
        key: "appendCurrent",
        value: function appendCurrent(newValues, replace) {
            if (this.isActive) {
                this._append(this.current.collection, newValues, replace);
            } else {
                throw new Error('No active state. Please use append instead and pass an index.');
            }
        }
    }, {
        key: "detach",
        value: function detach(el) {
            if (!el) {
                throw new Error('[Tribute] Must pass in a DOM node or NodeList.');
            }

            // Check if it is a jQuery collection
            if (typeof jQuery !== 'undefined' && el instanceof jQuery) {
                el = el.get();
            }

            // Is el an Array/Array-like object?
            if (el.constructor === NodeList || el.constructor === HTMLCollection || el.constructor === Array) {
                var length = el.length;
                for (var i = 0; i < length; ++i) {
                    this._detach(el[i]);
                }
            } else {
                this._detach(el);
            }
        }
    }, {
        key: "_detach",
        value: function _detach(el) {
            var _this3 = this;

            this.events.unbind(el);
            if (el.tributeMenu) {
                this.menuEvents.unbind(el.tributeMenu);
            }

            setTimeout(function () {
                el.removeAttribute('data-tribute');
                _this3.isActive = false;
                if (el.tributeMenu) {
                    el.tributeMenu.remove();
                }
            });
        }
    }], [{
        key: "defaultSelectTemplate",
        value: function defaultSelectTemplate(item) {
            if (typeof item === 'undefined') return null;
            if (this.range.isContentEditable(this.current.element)) {
                return '<span class="tribute-mention">' + (this.current.collection.trigger + item.original[this.current.collection.fillAttr]) + '</span>';
            }

            return this.current.collection.trigger + item.original[this.current.collection.fillAttr];
        }
    }, {
        key: "defaultMenuItemTemplate",
        value: function defaultMenuItemTemplate(matchItem) {
            return matchItem.string;
        }
    }, {
        key: "inputTypes",
        value: function inputTypes() {
            return ['TEXTAREA', 'INPUT'];
        }
    }]);

    return Tribute;
}();

exports.default = Tribute;
module.exports = exports["default"];

},{"./TributeEvents":2,"./TributeMenuEvents":3,"./TributeRange":4,"./TributeSearch":5,"./utils":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeEvents = function () {
    function TributeEvents(tribute) {
        _classCallCheck(this, TributeEvents);

        this.tribute = tribute;
        this.tribute.events = this;
    }

    _createClass(TributeEvents, [{
        key: 'bind',
        value: function bind(element) {
            element.boundKeydown = this.keydown.bind(element, this);
            element.boundKeyup = this.keyup.bind(element, this);
            element.boundInput = this.input.bind(element, this);

            element.addEventListener('keydown', element.boundKeydown, false);
            element.addEventListener('keyup', element.boundKeyup, false);
            element.addEventListener('input', element.boundInput, false);
        }
    }, {
        key: 'unbind',
        value: function unbind(element) {
            element.removeEventListener('keydown', element.boundKeydown, false);
            element.removeEventListener('keyup', element.boundKeyup, false);
            element.removeEventListener('input', element.boundInput, false);

            delete element.boundKeydown;
            delete element.boundKeyup;
            delete element.boundInput;
        }
    }, {
        key: 'keydown',
        value: function keydown(instance, event) {
            if (instance.shouldDeactivate(event)) {
                instance.tribute.isActive = false;
                instance.tribute.hideMenu();
            }

            var element = this;
            instance.commandEvent = false;

            TributeEvents.keys().forEach(function (o) {
                if (o.key === event.keyCode) {
                    instance.commandEvent = true;
                    instance.callbacks()[o.value.toLowerCase()](event, element);
                }
            });
        }
    }, {
        key: 'input',
        value: function input(instance, event) {
            instance.inputEvent = true;
            instance.keyup.call(this, instance, event);
        }
    }, {
        key: 'click',
        value: function click(instance, event) {
            var tribute = instance.tribute;
            if (tribute.menu && tribute.menu.contains(event.target)) {
                var li = event.target;
                event.preventDefault();
                event.stopPropagation();
                while (li.nodeName.toLowerCase() !== 'li') {
                    li = li.parentNode;
                    if (!li || li === tribute.menu) {
                        throw new Error('cannot find the <li> container for the click');
                    }
                }
                tribute.selectItemAtIndex(li.getAttribute('data-index'), event);
                tribute.hideMenu();

                // TODO: should fire with externalTrigger and target is outside of menu
            } else if (tribute.current.element && !tribute.current.externalTrigger) {
                tribute.current.externalTrigger = false;
                setTimeout(function () {
                    return tribute.hideMenu();
                });
            }
        }
    }, {
        key: 'keyup',
        value: function keyup(instance, event) {
            if (instance.inputEvent) {
                instance.inputEvent = false;
            }
            instance.updateSelection(this);

            if (event.keyCode === 27) return;

            if (!instance.tribute.allowSpaces && instance.tribute.hasTrailingSpace) {
                instance.tribute.hasTrailingSpace = false;
                instance.commandEvent = true;
                instance.callbacks()["space"](event, this);
                return;
            }

            if (!instance.tribute.isActive) {
                if (instance.tribute.autoCompleteMode) {
                    instance.callbacks().triggerChar(event, this, '');
                } else {
                    var keyCode = instance.getKeyCode(instance, this, event);

                    if (isNaN(keyCode) || !keyCode) return;

                    var trigger = instance.tribute.triggers().find(function (trigger) {
                        return trigger.charCodeAt(0) === keyCode;
                    });

                    if (typeof trigger !== 'undefined') {
                        instance.callbacks().triggerChar(event, this, trigger);
                    }
                }
            }

            if ((instance.tribute.current.trigger || instance.tribute.autoCompleteMode) && instance.commandEvent === false || instance.tribute.isActive && event.keyCode === 8) {
                instance.tribute.showMenuFor(this, true);
            }
        }
    }, {
        key: 'shouldDeactivate',
        value: function shouldDeactivate(event) {
            if (!this.tribute.isActive) return false;

            if (this.tribute.current.mentionText.length === 0) {
                var eventKeyPressed = false;
                TributeEvents.keys().forEach(function (o) {
                    if (event.keyCode === o.key) eventKeyPressed = true;
                });

                return !eventKeyPressed;
            }

            return false;
        }
    }, {
        key: 'getKeyCode',
        value: function getKeyCode(instance, el, event) {
            var char = void 0;
            var tribute = instance.tribute;
            var info = tribute.range.getTriggerInfo(false, tribute.hasTrailingSpace, true, tribute.allowSpaces, tribute.autoCompleteMode);

            if (info) {
                return info.mentionTriggerChar.charCodeAt(0);
            } else {
                return false;
            }
        }
    }, {
        key: 'updateSelection',
        value: function updateSelection(el) {
            this.tribute.current.element = el;
            var info = this.tribute.range.getTriggerInfo(false, this.tribute.hasTrailingSpace, true, this.tribute.allowSpaces, this.tribute.autoCompleteMode);

            if (info) {
                this.tribute.current.selectedPath = info.mentionSelectedPath;
                this.tribute.current.mentionText = info.mentionText;
                this.tribute.current.selectedOffset = info.mentionSelectedOffset;
            }
        }
    }, {
        key: 'callbacks',
        value: function callbacks() {
            var _this = this;

            return {
                triggerChar: function triggerChar(e, el, trigger) {
                    var tribute = _this.tribute;
                    tribute.current.trigger = trigger;

                    var collectionItem = tribute.collection.find(function (item) {
                        return item.trigger === trigger;
                    });

                    tribute.current.collection = collectionItem;

                    if (tribute.inputEvent) tribute.showMenuFor(el, true);
                },
                enter: function enter(e, el) {
                    // choose selection
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        setTimeout(function () {
                            _this.tribute.selectItemAtIndex(_this.tribute.menuSelected, e);
                            _this.tribute.hideMenu();
                        }, 0);
                    }
                },
                escape: function escape(e, el) {
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this.tribute.isActive = false;
                        _this.tribute.hideMenu();
                    }
                },
                tab: function tab(e, el) {
                    // choose first match
                    _this.callbacks().enter(e, el);
                },
                space: function space(e, el) {
                    if (_this.tribute.isActive) {
                        if (_this.tribute.spaceSelectsMatch) {
                            _this.callbacks().enter(e, el);
                        } else if (!_this.tribute.allowSpaces) {
                            e.stopPropagation();
                            setTimeout(function () {
                                _this.tribute.hideMenu();
                                _this.tribute.isActive = false;
                            }, 0);
                        }
                    }
                },
                up: function up(e, el) {
                    // navigate up ul
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length,
                            selected = _this.tribute.menuSelected;

                        if (count > selected && selected > 0) {
                            _this.tribute.menuSelected--;
                            _this.setActiveLi();
                        } else if (selected === 0) {
                            _this.tribute.menuSelected = count - 1;
                            _this.setActiveLi();
                            _this.tribute.menu.scrollTop = _this.tribute.menu.scrollHeight;
                        }
                    }
                },
                down: function down(e, el) {
                    // navigate down ul
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length - 1,
                            selected = _this.tribute.menuSelected;

                        if (count > selected) {
                            _this.tribute.menuSelected++;
                            _this.setActiveLi();
                        } else if (count === selected) {
                            _this.tribute.menuSelected = 0;
                            _this.setActiveLi();
                            _this.tribute.menu.scrollTop = 0;
                        }
                    }
                },
                delete: function _delete(e, el) {
                    if (_this.tribute.isActive && _this.tribute.current.mentionText.length < 1) {
                        _this.tribute.hideMenu();
                    } else if (_this.tribute.isActive) {
                        _this.tribute.showMenuFor(el);
                    }
                }
            };
        }
    }, {
        key: 'setActiveLi',
        value: function setActiveLi(index) {
            var scrollToPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var lis = this.tribute.menu.querySelectorAll('li'),
                length = lis.length >>> 0;

            // get heights
            var menuFullHeight = this.getFullHeight(this.tribute.menu),
                liHeight = this.getFullHeight(lis[0]);

            if (index) this.tribute.menuSelected = parseInt(index);

            for (var i = 0; i < length; i++) {
                var li = lis[i];
                if (i === this.tribute.menuSelected) {
                    var offset = liHeight * (i + 1);
                    var scrollTop = this.tribute.menu.scrollTop;
                    var totalScroll = scrollTop + menuFullHeight;

                    if (scrollToPos) {
                        if (offset > totalScroll) {
                            this.tribute.menu.scrollTop += liHeight;
                        } else if (offset < totalScroll) {
                            this.tribute.menu.scrollTop -= liHeight;
                        }
                    }

                    li.classList.add(this.tribute.current.collection.selectClass);
                } else {
                    li.classList.remove(this.tribute.current.collection.selectClass);
                }
            }
        }
    }, {
        key: 'getFullHeight',
        value: function getFullHeight(elem, includeMargin) {
            var height = elem.getBoundingClientRect().height;

            if (includeMargin) {
                var style = elem.currentStyle || window.getComputedStyle(elem);
                return height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
            }

            return height;
        }
    }], [{
        key: 'keys',
        value: function keys() {
            return [{
                key: 9,
                value: 'TAB'
            }, {
                key: 8,
                value: 'DELETE'
            }, {
                key: 13,
                value: 'ENTER'
            }, {
                key: 27,
                value: 'ESCAPE'
            }, {
                key: 32,
                value: 'SPACE'
            }, {
                key: 38,
                value: 'UP'
            }, {
                key: 40,
                value: 'DOWN'
            }];
        }
    }]);

    return TributeEvents;
}();

exports.default = TributeEvents;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeMenuEvents = function () {
    function TributeMenuEvents(tribute) {
        _classCallCheck(this, TributeMenuEvents);

        this.tribute = tribute;
        this.tribute.menuEvents = this;
        this.menu = this.tribute.menu;
    }

    _createClass(TributeMenuEvents, [{
        key: 'bind',
        value: function bind(menu) {
            var _this = this;

            this.menuClickEvent = this.tribute.events.click.bind(null, this);
            this.menuContainerScrollEvent = this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.showMenuFor(_this.tribute.current.element, false);
                }
            }, 300, false);
            this.windowResizeEvent = this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.range.positionMenuAtCaret(true);
                }
            }, 300, false);

            // fixes IE11 issues with mousedown
            this.tribute.range.getDocument().addEventListener('MSPointerDown', this.menuClickEvent, false);
            this.tribute.range.getDocument().addEventListener('mousedown', this.menuClickEvent, false);
            window.addEventListener('resize', this.windowResizeEvent);

            if (this.menuContainer) {
                this.menuContainer.addEventListener('scroll', this.menuContainerScrollEvent, false);
            } else {
                window.addEventListener('scroll', this.menuContainerScrollEvent);
            }
        }
    }, {
        key: 'unbind',
        value: function unbind(menu) {
            this.tribute.range.getDocument().removeEventListener('mousedown', this.menuClickEvent, false);
            this.tribute.range.getDocument().removeEventListener('MSPointerDown', this.menuClickEvent, false);
            window.removeEventListener('resize', this.windowResizeEvent);

            if (this.menuContainer) {
                this.menuContainer.removeEventListener('scroll', this.menuContainerScrollEvent, false);
            } else {
                window.removeEventListener('scroll', this.menuContainerScrollEvent);
            }
        }
    }, {
        key: 'debounce',
        value: function debounce(func, wait, immediate) {
            var _this2 = this,
                _arguments = arguments;

            var timeout;
            return function () {
                var context = _this2,
                    args = _arguments;
                var later = function later() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
    }]);

    return TributeMenuEvents;
}();

exports.default = TributeMenuEvents;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/jeff-collins/ment.io
var TributeRange = function () {
    function TributeRange(tribute) {
        _classCallCheck(this, TributeRange);

        this.tribute = tribute;
        this.tribute.range = this;
    }

    _createClass(TributeRange, [{
        key: 'getDocument',
        value: function getDocument() {
            var iframe = void 0;
            if (this.tribute.current.collection) {
                iframe = this.tribute.current.collection.iframe;
            }

            if (!iframe) {
                return document;
            }

            return iframe.contentWindow.document;
        }
    }, {
        key: 'positionMenuAtCaret',
        value: function positionMenuAtCaret(scrollTo) {
            var _this = this;

            var context = this.tribute.current,
                coordinates = void 0;

            var info = this.getTriggerInfo(false, this.tribute.hasTrailingSpace, true, this.tribute.allowSpaces, this.tribute.autoCompleteMode);

            if (typeof info !== 'undefined') {

                if (!this.tribute.positionMenu) {
                    this.tribute.menu.style.cssText = 'display: block;';
                    return;
                }

                if (!this.isContentEditable(context.element)) {
                    coordinates = this.getTextAreaOrInputUnderlinePosition(this.tribute.current.element, info.mentionPosition);
                } else {
                    coordinates = this.getContentEditableCaretPosition(info.mentionPosition);
                }

                this.tribute.menu.style.cssText = 'top: ' + coordinates.top + 'px;\n                                     left: ' + coordinates.left + 'px;\n                                     right: ' + coordinates.right + 'px;\n                                     bottom: ' + coordinates.bottom + 'px;\n                                     position: absolute;\n                                     z-index: 10000;\n                                     display: block;';

                if (coordinates.left === 'auto') {
                    this.tribute.menu.style.left = 'auto';
                }

                if (coordinates.top === 'auto') {
                    this.tribute.menu.style.top = 'auto';
                }

                if (scrollTo) this.scrollIntoView();

                window.setTimeout(function () {
                    var menuDimensions = {
                        width: _this.tribute.menu.offsetWidth,
                        height: _this.tribute.menu.offsetHeight
                    };
                    var menuIsOffScreen = _this.isMenuOffScreen(coordinates, menuDimensions);

                    var menuIsOffScreenHorizontally = window.innerWidth > menuDimensions.width && (menuIsOffScreen.left || menuIsOffScreen.right);
                    var menuIsOffScreenVertically = window.innerHeight > menuDimensions.height && (menuIsOffScreen.top || menuIsOffScreen.bottom);
                    if (menuIsOffScreenHorizontally || menuIsOffScreenVertically) {
                        _this.tribute.menu.style.cssText = 'display: none';
                        _this.positionMenuAtCaret(scrollTo);
                    }
                }, 0);
            } else {
                this.tribute.menu.style.cssText = 'display: none';
            }
        }
    }, {
        key: 'selectElement',
        value: function selectElement(targetElement, path, offset) {
            var range = void 0;
            var elem = targetElement;

            if (path) {
                for (var i = 0; i < path.length; i++) {
                    elem = elem.childNodes[path[i]];
                    if (elem === undefined) {
                        return;
                    }
                    while (elem.length < offset) {
                        offset -= elem.length;
                        elem = elem.nextSibling;
                    }
                    if (elem.childNodes.length === 0 && !elem.length) {
                        elem = elem.previousSibling;
                    }
                }
            }
            var sel = this.getWindowSelection();

            range = this.getDocument().createRange();
            range.setStart(elem, offset);
            range.setEnd(elem, offset);
            range.collapse(true);

            try {
                sel.removeAllRanges();
            } catch (error) {}

            sel.addRange(range);
            targetElement.focus();
        }
    }, {
        key: 'replaceTriggerText',
        value: function replaceTriggerText(text, requireLeadingSpace, hasTrailingSpace, originalEvent, item) {
            var context = this.tribute.current;

            var info = this.getTriggerInfo(true, hasTrailingSpace, requireLeadingSpace, this.tribute.allowSpaces, this.tribute.autoCompleteMode);

            // Create the event
            var replaceEvent = new CustomEvent('tribute-replaced', {
                detail: {
                    item: item,
                    event: originalEvent
                }
            });

            if (info !== undefined) {
                if (!this.isContentEditable(context.element)) {
                    var myField = this.tribute.current.element;
                    var textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : ' ';
                    text += textSuffix;
                    var startPos = info.mentionPosition;
                    var endPos = info.mentionPosition + info.mentionText.length + textSuffix.length;
                    myField.value = myField.value.substring(0, startPos) + text + myField.value.substring(endPos, myField.value.length);
                    myField.selectionStart = startPos + text.length;
                    myField.selectionEnd = startPos + text.length;
                } else {
                    // add a space to the end of the pasted text
                    var _textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : '\xA0';
                    text += _textSuffix;

                    this.pasteHtml(text, info.mentionPosition, info.mentionPosition + info.mentionText.length + !this.tribute.autoCompleteMode);
                }

                context.element.dispatchEvent(replaceEvent);
            }
        }
    }, {
        key: 'pasteHtml',
        value: function pasteHtml(html, startPos, endPos) {
            var range = void 0,
                sel = void 0;
            sel = this.getWindowSelection();
            range = this.getDocument().createRange();
            range.setStart(sel.anchorNode, startPos);
            range.setEnd(sel.anchorNode, endPos);
            range.deleteContents();

            var el = this.getDocument().createElement('div');
            el.innerHTML = html;
            var frag = this.getDocument().createDocumentFragment(),
                node = void 0,
                lastNode = void 0;
            while (node = el.firstChild) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }, {
        key: 'getWindowSelection',
        value: function getWindowSelection() {
            if (this.tribute.collection.iframe) {
                return this.tribute.collection.iframe.contentWindow.getSelection();
            }

            return window.getSelection();
        }
    }, {
        key: 'getNodePositionInParent',
        value: function getNodePositionInParent(element) {
            if (element.parentNode === null) {
                return 0;
            }

            for (var i = 0; i < element.parentNode.childNodes.length; i++) {
                var node = element.parentNode.childNodes[i];

                if (node === element) {
                    return i;
                }
            }
        }
    }, {
        key: 'getContentEditableSelectedPath',
        value: function getContentEditableSelectedPath(ctx) {
            var sel = this.getWindowSelection();
            var selected = sel.anchorNode;
            var path = [];
            var offset = void 0;

            if (selected != null) {
                var i = void 0;
                var ce = selected.contentEditable;
                while (selected !== null && ce !== 'true') {
                    i = this.getNodePositionInParent(selected);
                    path.push(i);
                    selected = selected.parentNode;
                    if (selected !== null) {
                        ce = selected.contentEditable;
                    }
                }
                path.reverse();

                // getRangeAt may not exist, need alternative
                offset = sel.getRangeAt(0).startOffset;

                return {
                    selected: selected,
                    path: path,
                    offset: offset
                };
            }
        }
    }, {
        key: 'getTextPrecedingCurrentSelection',
        value: function getTextPrecedingCurrentSelection() {
            var context = this.tribute.current,
                text = '';

            if (!this.isContentEditable(context.element)) {
                var textComponent = this.tribute.current.element;
                if (textComponent) {
                    var startPos = textComponent.selectionStart;
                    if (textComponent.value && startPos >= 0) {
                        text = textComponent.value.substring(0, startPos);
                    }
                }
            } else {
                var selectedElem = this.getWindowSelection().anchorNode;

                if (selectedElem != null) {
                    var workingNodeContent = selectedElem.textContent;
                    var selectStartOffset = this.getWindowSelection().getRangeAt(0).startOffset;

                    if (workingNodeContent && selectStartOffset >= 0) {
                        text = workingNodeContent.substring(0, selectStartOffset);
                    }
                }
            }

            return text;
        }
    }, {
        key: 'getTriggerInfo',
        value: function getTriggerInfo(menuAlreadyActive, hasTrailingSpace, requireLeadingSpace, allowSpaces, isAutocomplete) {
            var _this2 = this;

            var ctx = this.tribute.current;
            var selected = void 0,
                path = void 0,
                offset = void 0;

            if (!this.isContentEditable(ctx.element)) {
                selected = this.tribute.current.element;
            } else {
                var selectionInfo = this.getContentEditableSelectedPath(ctx);

                if (selectionInfo) {
                    selected = selectionInfo.selected;
                    path = selectionInfo.path;
                    offset = selectionInfo.offset;
                }
            }

            var effectiveRange = this.getTextPrecedingCurrentSelection();
            var wordsArray = effectiveRange.split(' ');
            var worldsCount = wordsArray.length - 1;
            var mentionText = wordsArray[worldsCount].trim();

            if (isAutocomplete) {
                return {
                    mentionPosition: effectiveRange.length - mentionText.length,
                    mentionText: mentionText,
                    mentionSelectedElement: selected,
                    mentionSelectedPath: path,
                    mentionSelectedOffset: offset
                };
            }

            if (effectiveRange !== undefined && effectiveRange !== null) {
                var mostRecentTriggerCharPos = -1;
                var triggerChar = void 0;

                this.tribute.collection.forEach(function (config) {
                    var c = config.trigger;
                    var idx = config.requireLeadingSpace ? _this2.lastIndexWithLeadingSpace(effectiveRange, c) : effectiveRange.lastIndexOf(c);

                    if (idx > mostRecentTriggerCharPos) {
                        mostRecentTriggerCharPos = idx;
                        triggerChar = c;
                        requireLeadingSpace = config.requireLeadingSpace;
                    }
                });

                if (mostRecentTriggerCharPos >= 0 && (mostRecentTriggerCharPos === 0 || !requireLeadingSpace || /[\xA0\s]/g.test(effectiveRange.substring(mostRecentTriggerCharPos - 1, mostRecentTriggerCharPos)))) {
                    var currentTriggerSnippet = effectiveRange.substring(mostRecentTriggerCharPos + 1, effectiveRange.length);

                    triggerChar = effectiveRange.substring(mostRecentTriggerCharPos, mostRecentTriggerCharPos + 1);
                    var firstSnippetChar = currentTriggerSnippet.substring(0, 1);
                    var leadingSpace = currentTriggerSnippet.length > 0 && (firstSnippetChar === ' ' || firstSnippetChar === '\xA0');
                    if (hasTrailingSpace) {
                        currentTriggerSnippet = currentTriggerSnippet.trim();
                    }

                    var regex = allowSpaces ? /[^\S ]/g : /[\xA0\s]/g;

                    this.tribute.hasTrailingSpace = regex.test(currentTriggerSnippet);

                    if (!leadingSpace && (menuAlreadyActive || !regex.test(currentTriggerSnippet))) {
                        return {
                            mentionPosition: mostRecentTriggerCharPos,
                            mentionText: currentTriggerSnippet,
                            mentionSelectedElement: selected,
                            mentionSelectedPath: path,
                            mentionSelectedOffset: offset,
                            mentionTriggerChar: triggerChar
                        };
                    }
                }
            }
        }
    }, {
        key: 'lastIndexWithLeadingSpace',
        value: function lastIndexWithLeadingSpace(str, char) {
            var reversedStr = str.split('').reverse().join('');
            var index = -1;

            for (var cidx = 0, len = str.length; cidx < len; cidx++) {
                var firstChar = cidx === str.length - 1;
                var leadingSpace = /\s/.test(reversedStr[cidx + 1]);
                var match = char === reversedStr[cidx];

                if (match && (firstChar || leadingSpace)) {
                    index = str.length - 1 - cidx;
                    break;
                }
            }

            return index;
        }
    }, {
        key: 'isContentEditable',
        value: function isContentEditable(element) {
            return element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA';
        }
    }, {
        key: 'isMenuOffScreen',
        value: function isMenuOffScreen(coordinates, menuDimensions) {
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            var menuTop = typeof coordinates.top === 'number' ? coordinates.top : windowTop + windowHeight - coordinates.bottom - menuDimensions.height;
            var menuRight = typeof coordinates.right === 'number' ? coordinates.right : coordinates.left + menuDimensions.width;
            var menuBottom = typeof coordinates.bottom === 'number' ? coordinates.bottom : coordinates.top + menuDimensions.height;
            var menuLeft = typeof coordinates.left === 'number' ? coordinates.left : windowLeft + windowWidth - coordinates.right - menuDimensions.width;

            return {
                top: menuTop < Math.floor(windowTop),
                right: menuRight > Math.ceil(windowLeft + windowWidth),
                bottom: menuBottom > Math.ceil(windowTop + windowHeight),
                left: menuLeft < Math.floor(windowLeft)
            };
        }
    }, {
        key: 'getMenuDimensions',
        value: function getMenuDimensions() {
            // Width of the menu depends of its contents and position
            // We must check what its width would be without any obstruction
            // This way, we can achieve good positioning for flipping the menu
            var dimensions = {
                width: null,
                height: null
            };

            this.tribute.menu.style.cssText = 'top: 0px;\n                                 left: 0px;\n                                 position: fixed;\n                                 zIndex: 10000;\n                                 display: block;\n                                 visibility; hidden;';
            dimensions.width = this.tribute.menu.offsetWidth;
            dimensions.height = this.tribute.menu.offsetHeight;

            this.tribute.menu.style.cssText = 'display: none;';

            return dimensions;
        }
    }, {
        key: 'getTextAreaOrInputUnderlinePosition',
        value: function getTextAreaOrInputUnderlinePosition(element, position, flipped) {
            var properties = ['direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing'];

            var isFirefox = window.mozInnerScreenX !== null;

            var div = this.getDocument().createElement('div');
            div.id = 'input-textarea-caret-position-mirror-div';
            this.getDocument().body.appendChild(div);

            var style = div.style;
            var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;

            style.whiteSpace = 'pre-wrap';
            if (element.nodeName !== 'INPUT') {
                style.wordWrap = 'break-word';
            }

            // position off-screen
            style.position = 'absolute';
            style.visibility = 'hidden';

            // transfer the element's properties to the div
            properties.forEach(function (prop) {
                style[prop] = computed[prop];
            });

            if (isFirefox) {
                style.width = parseInt(computed.width) - 2 + 'px';
                if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll';
            } else {
                style.overflow = 'hidden';
            }

            div.textContent = element.value.substring(0, position);

            if (element.nodeName === 'INPUT') {
                div.textContent = div.textContent.replace(/\s/g, ' ');
            }

            var span = this.getDocument().createElement('span');
            span.textContent = element.value.substring(position) || '.';
            div.appendChild(span);

            var rect = element.getBoundingClientRect();
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            var coordinates = {
                top: rect.top + windowTop + span.offsetTop + parseInt(computed.borderTopWidth) + parseInt(computed.fontSize) - element.scrollTop,
                left: rect.left + windowLeft + span.offsetLeft + parseInt(computed.borderLeftWidth)
            };

            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;

            var menuDimensions = this.getMenuDimensions();
            var menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

            if (menuIsOffScreen.right) {
                coordinates.right = windowWidth - coordinates.left;
                coordinates.left = 'auto';
            }

            var parentHeight = this.tribute.menuContainer ? this.tribute.menuContainer.offsetHeight : this.getDocument().body.offsetHeight;

            if (menuIsOffScreen.bottom) {
                var parentRect = this.tribute.menuContainer ? this.tribute.menuContainer.getBoundingClientRect() : this.getDocument().body.getBoundingClientRect();
                var scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);

                coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top - span.offsetTop);
                coordinates.top = 'auto';
            }

            menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);
            if (menuIsOffScreen.left) {
                coordinates.left = windowWidth > menuDimensions.width ? windowLeft + windowWidth - menuDimensions.width : windowLeft;
                delete coordinates.right;
            }
            if (menuIsOffScreen.top) {
                coordinates.top = windowHeight > menuDimensions.height ? windowTop + windowHeight - menuDimensions.height : windowTop;
                delete coordinates.bottom;
            }

            this.getDocument().body.removeChild(div);
            return coordinates;
        }
    }, {
        key: 'getContentEditableCaretPosition',
        value: function getContentEditableCaretPosition(selectedNodePosition) {
            var markerTextChar = '﻿';
            var markerEl = void 0,
                markerId = 'sel_' + new Date().getTime() + '_' + Math.random().toString().substr(2);
            var range = void 0;
            var sel = this.getWindowSelection();
            var prevRange = sel.getRangeAt(0);

            range = this.getDocument().createRange();
            range.setStart(sel.anchorNode, selectedNodePosition);
            range.setEnd(sel.anchorNode, selectedNodePosition);

            range.collapse(false);

            // Create the marker element containing a single invisible character using DOM methods and insert it
            markerEl = this.getDocument().createElement('span');
            markerEl.id = markerId;

            markerEl.appendChild(this.getDocument().createTextNode(markerTextChar));
            range.insertNode(markerEl);
            sel.removeAllRanges();
            sel.addRange(prevRange);

            var rect = markerEl.getBoundingClientRect();
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            var coordinates = {
                left: rect.left + windowLeft,
                top: rect.top + markerEl.offsetHeight + windowTop
            };
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;

            var menuDimensions = this.getMenuDimensions();
            var menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

            if (menuIsOffScreen.right) {
                coordinates.left = 'auto';
                coordinates.right = windowWidth - rect.left - windowLeft;
            }

            var parentHeight = this.tribute.menuContainer ? this.tribute.menuContainer.offsetHeight : this.getDocument().body.offsetHeight;

            if (menuIsOffScreen.bottom) {
                var parentRect = this.tribute.menuContainer ? this.tribute.menuContainer.getBoundingClientRect() : this.getDocument().body.getBoundingClientRect();
                var scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);

                coordinates.top = 'auto';
                coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top);
            }

            menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);
            if (menuIsOffScreen.left) {
                coordinates.left = windowWidth > menuDimensions.width ? windowLeft + windowWidth - menuDimensions.width : windowLeft;
                delete coordinates.right;
            }
            if (menuIsOffScreen.top) {
                coordinates.top = windowHeight > menuDimensions.height ? windowTop + windowHeight - menuDimensions.height : windowTop;
                delete coordinates.bottom;
            }

            markerEl.parentNode.removeChild(markerEl);
            return coordinates;
        }
    }, {
        key: 'scrollIntoView',
        value: function scrollIntoView(elem) {
            var reasonableBuffer = 20,
                clientRect = void 0;
            var maxScrollDisplacement = 100;
            var e = this.menu;

            if (typeof e === 'undefined') return;

            while (clientRect === undefined || clientRect.height === 0) {
                clientRect = e.getBoundingClientRect();

                if (clientRect.height === 0) {
                    e = e.childNodes[0];
                    if (e === undefined || !e.getBoundingClientRect) {
                        return;
                    }
                }
            }

            var elemTop = clientRect.top;
            var elemBottom = elemTop + clientRect.height;

            if (elemTop < 0) {
                window.scrollTo(0, window.pageYOffset + clientRect.top - reasonableBuffer);
            } else if (elemBottom > window.innerHeight) {
                var maxY = window.pageYOffset + clientRect.top - reasonableBuffer;

                if (maxY - window.pageYOffset > maxScrollDisplacement) {
                    maxY = window.pageYOffset + maxScrollDisplacement;
                }

                var targetY = window.pageYOffset - (window.innerHeight - elemBottom);

                if (targetY > maxY) {
                    targetY = maxY;
                }

                window.scrollTo(0, targetY);
            }
        }
    }]);

    return TributeRange;
}();

exports.default = TributeRange;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/mattyork/fuzzy
var TributeSearch = function () {
    function TributeSearch(tribute) {
        _classCallCheck(this, TributeSearch);

        this.tribute = tribute;
        this.tribute.search = this;
    }

    _createClass(TributeSearch, [{
        key: 'simpleFilter',
        value: function simpleFilter(pattern, array) {
            var _this = this;

            return array.filter(function (string) {
                return _this.test(pattern, string);
            });
        }
    }, {
        key: 'test',
        value: function test(pattern, string) {
            return this.match(pattern, string) !== null;
        }
    }, {
        key: 'match',
        value: function match(pattern, string, opts) {
            opts = opts || {};
            var patternIdx = 0,
                result = [],
                len = string.length,
                totalScore = 0,
                currScore = 0,
                pre = opts.pre || '',
                post = opts.post || '',
                compareString = opts.caseSensitive && string || string.toLowerCase(),
                ch = void 0,
                compareChar = void 0;

            pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

            var patternCache = this.traverse(compareString, pattern, 0, 0, []);
            if (!patternCache) {
                return null;
            }

            return {
                rendered: this.render(string, patternCache.cache, pre, post),
                score: patternCache.score
            };
        }
    }, {
        key: 'traverse',
        value: function traverse(string, pattern, stringIndex, patternIndex, patternCache) {
            // if the pattern search at end
            if (pattern.length === patternIndex) {

                // calculate score and copy the cache containing the indices where it's found
                return {
                    score: this.calculateScore(patternCache),
                    cache: patternCache.slice()
                };
            }

            // if string at end or remaining pattern > remaining string
            if (string.length === stringIndex || pattern.length - patternIndex > string.length - stringIndex) {
                return undefined;
            }

            var c = pattern[patternIndex];
            var index = string.indexOf(c, stringIndex);
            var best = void 0,
                temp = void 0;

            while (index > -1) {
                patternCache.push(index);
                temp = this.traverse(string, pattern, index + 1, patternIndex + 1, patternCache);
                patternCache.pop();

                // if downstream traversal failed, return best answer so far
                if (!temp) {
                    return best;
                }

                if (!best || best.score < temp.score) {
                    best = temp;
                }

                index = string.indexOf(c, index + 1);
            }

            return best;
        }
    }, {
        key: 'calculateScore',
        value: function calculateScore(patternCache) {
            var score = 0;
            var temp = 1;

            patternCache.forEach(function (index, i) {
                if (i > 0) {
                    if (patternCache[i - 1] + 1 === index) {
                        temp += temp + 1;
                    } else {
                        temp = 1;
                    }
                }

                score += temp;
            });

            return score;
        }
    }, {
        key: 'render',
        value: function render(string, indices, pre, post) {
            var rendered = string.substring(0, indices[0]);

            indices.forEach(function (index, i) {
                rendered += pre + string[index] + post + string.substring(index + 1, indices[i + 1] ? indices[i + 1] : string.length);
            });

            return rendered;
        }
    }, {
        key: 'filter',
        value: function filter(pattern, arr, opts) {
            var _this2 = this;

            opts = opts || {};
            return arr.reduce(function (prev, element, idx, arr) {
                var str = element;

                if (opts.extract) {
                    str = opts.extract(element);

                    if (!str) {
                        // take care of undefineds / nulls / etc.
                        str = '';
                    }
                }

                var rendered = _this2.match(pattern, str, opts);

                if (rendered != null) {
                    prev[prev.length] = {
                        string: rendered.rendered,
                        score: rendered.score,
                        index: idx,
                        original: element
                    };
                }

                return prev;
            }, []).sort(function (a, b) {
                var compare = b.score - a.score;
                if (compare) return compare;
                return a.index - b.index;
            });
        }
    }]);

    return TributeSearch;
}();

exports.default = TributeSearch;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tribute = require("./Tribute");

var _Tribute2 = _interopRequireDefault(_Tribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Tribute2.default; /**
                                     * Tribute.js
                                     * Native ES6 JavaScript @mention Plugin
                                     **/

module.exports = exports["default"];

},{"./Tribute":1}],7:[function(require,module,exports){
'use strict';

if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

if (window && typeof window.CustomEvent !== "function") {
    var CustomEvent = function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };

    if (typeof window.Event !== 'undefined') {
        CustomEvent.prototype = window.Event.prototype;
    }

    window.CustomEvent = CustomEvent;
}

},{}]},{},[6])(6)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVHJpYnV0ZS5qcyIsInNyYy9UcmlidXRlRXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVNZW51RXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVSYW5nZS5qcyIsInNyYy9UcmlidXRlU2VhcmNoLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNLE87QUFDRiwyQkFtQkc7QUFBQTs7QUFBQSwrQkFsQkMsTUFrQkQ7QUFBQSxZQWxCQyxNQWtCRCwrQkFsQlUsSUFrQlY7QUFBQSwrQkFqQkMsTUFpQkQ7QUFBQSxZQWpCQyxNQWlCRCwrQkFqQlUsSUFpQlY7QUFBQSxvQ0FoQkMsV0FnQkQ7QUFBQSxZQWhCQyxXQWdCRCxvQ0FoQmUsV0FnQmY7QUFBQSxnQ0FmQyxPQWVEO0FBQUEsWUFmQyxPQWVELGdDQWZXLEdBZVg7QUFBQSx5Q0FkQyxnQkFjRDtBQUFBLFlBZEMsZ0JBY0QseUNBZG9CLEtBY3BCO0FBQUEsdUNBYkMsY0FhRDtBQUFBLFlBYkMsY0FhRCx1Q0Fia0IsSUFhbEI7QUFBQSx5Q0FaQyxnQkFZRDtBQUFBLFlBWkMsZ0JBWUQseUNBWm9CLElBWXBCO0FBQUEsK0JBWEMsTUFXRDtBQUFBLFlBWEMsTUFXRCwrQkFYVSxLQVdWO0FBQUEsaUNBVkMsUUFVRDtBQUFBLFlBVkMsUUFVRCxpQ0FWWSxPQVVaO0FBQUEsbUNBVEMsVUFTRDtBQUFBLFlBVEMsVUFTRCxtQ0FUYyxJQVNkO0FBQUEsc0NBUkMsYUFRRDtBQUFBLFlBUkMsYUFRRCxzQ0FSaUIsSUFRakI7QUFBQSx3Q0FQQyxlQU9EO0FBQUEsWUFQQyxlQU9ELHdDQVBtQixJQU9uQjtBQUFBLHlDQU5DLG1CQU1EO0FBQUEsWUFOQyxtQkFNRCx5Q0FOdUIsSUFNdkI7QUFBQSxv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b0JBQVksU0FBWixHQUF3QixPQUFPLEtBQVAsQ0FBYSxTQUFyQztBQUNEOztBQUVBLFdBQU8sV0FBUCxHQUFxQixXQUFyQjtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IFRyaWJ1dGVVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IFRyaWJ1dGVFdmVudHMgZnJvbSBcIi4vVHJpYnV0ZUV2ZW50c1wiO1xuaW1wb3J0IFRyaWJ1dGVNZW51RXZlbnRzIGZyb20gXCIuL1RyaWJ1dGVNZW51RXZlbnRzXCI7XG5pbXBvcnQgVHJpYnV0ZVJhbmdlIGZyb20gXCIuL1RyaWJ1dGVSYW5nZVwiO1xuaW1wb3J0IFRyaWJ1dGVTZWFyY2ggZnJvbSBcIi4vVHJpYnV0ZVNlYXJjaFwiO1xuXG5jbGFzcyBUcmlidXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIHZhbHVlcyA9IG51bGwsXG4gICAgICAgIGlmcmFtZSA9IG51bGwsXG4gICAgICAgIHNlbGVjdENsYXNzID0gJ2hpZ2hsaWdodCcsXG4gICAgICAgIHRyaWdnZXIgPSAnQCcsXG4gICAgICAgIGF1dG9Db21wbGV0ZU1vZGUgPSBmYWxzZSxcbiAgICAgICAgc2VsZWN0VGVtcGxhdGUgPSBudWxsLFxuICAgICAgICBtZW51SXRlbVRlbXBsYXRlID0gbnVsbCxcbiAgICAgICAgbG9va3VwID0gJ2tleScsXG4gICAgICAgIGZpbGxBdHRyID0gJ3ZhbHVlJyxcbiAgICAgICAgY29sbGVjdGlvbiA9IG51bGwsXG4gICAgICAgIG1lbnVDb250YWluZXIgPSBudWxsLFxuICAgICAgICBub01hdGNoVGVtcGxhdGUgPSBudWxsLFxuICAgICAgICByZXF1aXJlTGVhZGluZ1NwYWNlID0gdHJ1ZSxcbiAgICAgICAgYWxsb3dTcGFjZXMgPSBmYWxzZSxcbiAgICAgICAgcmVwbGFjZVRleHRTdWZmaXggPSBudWxsLFxuICAgICAgICBwb3NpdGlvbk1lbnUgPSB0cnVlLFxuICAgICAgICBzcGFjZVNlbGVjdHNNYXRjaCA9IGZhbHNlLFxuICAgICAgICBzZWFyY2hPcHRzID0ge31cbiAgICB9KSB7XG4gICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlTW9kZSA9IGF1dG9Db21wbGV0ZU1vZGVcbiAgICAgICAgdGhpcy5tZW51U2VsZWN0ZWQgPSAwXG4gICAgICAgIHRoaXMuY3VycmVudCA9IHt9XG4gICAgICAgIHRoaXMuaW5wdXRFdmVudCA9IGZhbHNlXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICB0aGlzLm1lbnVDb250YWluZXIgPSBtZW51Q29udGFpbmVyXG4gICAgICAgIHRoaXMuYWxsb3dTcGFjZXMgPSBhbGxvd1NwYWNlc1xuICAgICAgICB0aGlzLnJlcGxhY2VUZXh0U3VmZml4ID0gcmVwbGFjZVRleHRTdWZmaXhcbiAgICAgICAgdGhpcy5wb3NpdGlvbk1lbnUgPSBwb3NpdGlvbk1lbnVcbiAgICAgICAgdGhpcy5oYXNUcmFpbGluZ1NwYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3BhY2VTZWxlY3RzTWF0Y2ggPSBzcGFjZVNlbGVjdHNNYXRjaDtcblxuICAgICAgICBpZiAodGhpcy5hdXRvQ29tcGxldGVNb2RlKSB7XG4gICAgICAgICAgICB0cmlnZ2VyPSAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gW3tcbiAgICAgICAgICAgICAgICAvLyBzeW1ib2wgdGhhdCBzdGFydHMgdGhlIGxvb2t1cFxuICAgICAgICAgICAgICAgIHRyaWdnZXI6IHRyaWdnZXIsXG5cbiAgICAgICAgICAgICAgICAvLyBpcyBpdCB3cmFwcGVkIGluIGFuIGlmcmFtZVxuICAgICAgICAgICAgICAgIGlmcmFtZTogaWZyYW1lLFxuXG4gICAgICAgICAgICAgICAgLy8gY2xhc3MgYXBwbGllZCB0byBzZWxlY3RlZCBpdGVtXG4gICAgICAgICAgICAgICAgc2VsZWN0Q2xhc3M6IHNlbGVjdENsYXNzLFxuXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIG9uIHNlbGVjdCB0aGF0IHJldHVucyB0aGUgY29udGVudCB0byBpbnNlcnRcbiAgICAgICAgICAgICAgICBzZWxlY3RUZW1wbGF0ZTogKHNlbGVjdFRlbXBsYXRlIHx8IFRyaWJ1dGUuZGVmYXVsdFNlbGVjdFRlbXBsYXRlKS5iaW5kKHRoaXMpLFxuXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHRoYXQgcmV0dXJucyBjb250ZW50IGZvciBhbiBpdGVtXG4gICAgICAgICAgICAgICAgbWVudUl0ZW1UZW1wbGF0ZTogKG1lbnVJdGVtVGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZSkuYmluZCh0aGlzKSxcblxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIG1lbnUgaXMgZW1wdHksIGRpc2FibGVzIGhpZGluZyBvZiBtZW51LlxuICAgICAgICAgICAgICAgIG5vTWF0Y2hUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub01hdGNoVGVtcGxhdGVcbiAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuXG4gICAgICAgICAgICAgICAgLy8gY29sdW1uIHRvIHNlYXJjaCBhZ2FpbnN0IGluIHRoZSBvYmplY3RcbiAgICAgICAgICAgICAgICBsb29rdXA6IGxvb2t1cCxcblxuICAgICAgICAgICAgICAgIC8vIGNvbHVtbiB0aGF0IGNvbnRhaW5zIHRoZSBjb250ZW50IHRvIGluc2VydCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgZmlsbEF0dHI6IGZpbGxBdHRyLFxuXG4gICAgICAgICAgICAgICAgLy8gYXJyYXkgb2Ygb2JqZWN0cyBvciBhIGZ1bmN0aW9uIHJldHVybmluZyBhbiBhcnJheSBvZiBvYmplY3RzXG4gICAgICAgICAgICAgICAgdmFsdWVzOiB2YWx1ZXMsXG5cbiAgICAgICAgICAgICAgICByZXF1aXJlTGVhZGluZ1NwYWNlOiByZXF1aXJlTGVhZGluZ1NwYWNlLFxuXG4gICAgICAgICAgICAgICAgc2VhcmNoT3B0czogc2VhcmNoT3B0c1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBpdGVtLnRyaWdnZXIgfHwgdHJpZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lOiBpdGVtLmlmcmFtZSB8fCBpZnJhbWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzOiBpdGVtLnNlbGVjdENsYXNzIHx8IHNlbGVjdENsYXNzLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RUZW1wbGF0ZTogKGl0ZW0uc2VsZWN0VGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0U2VsZWN0VGVtcGxhdGUpLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtVGVtcGxhdGU6IChpdGVtLm1lbnVJdGVtVGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZSkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gbWVudSBpcyBlbXB0eSwgZGlzYWJsZXMgaGlkaW5nIG9mIG1lbnUuXG4gICAgICAgICAgICAgICAgICAgIG5vTWF0Y2hUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuICAgICAgICAgICAgICAgICAgICBsb29rdXA6IGl0ZW0ubG9va3VwIHx8IGxvb2t1cCxcbiAgICAgICAgICAgICAgICAgICAgZmlsbEF0dHI6IGl0ZW0uZmlsbEF0dHIgfHwgZmlsbEF0dHIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogaXRlbS52YWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2U6IGl0ZW0ucmVxdWlyZUxlYWRpbmdTcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoT3B0czogaXRlbS5zZWFyY2hPcHRzIHx8IHNlYXJjaE9wdHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gTm8gY29sbGVjdGlvbiBzcGVjaWZpZWQuJylcbiAgICAgICAgfVxuXG4gICAgICAgIG5ldyBUcmlidXRlUmFuZ2UodGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVFdmVudHModGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVNZW51RXZlbnRzKHRoaXMpXG4gICAgICAgIG5ldyBUcmlidXRlU2VhcmNoKHRoaXMpXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRTZWxlY3RUZW1wbGF0ZShpdGVtKSB7XG4gICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICh0aGlzLnJhbmdlLmlzQ29udGVudEVkaXRhYmxlKHRoaXMuY3VycmVudC5lbGVtZW50KSkge1xuICAgICAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCJ0cmlidXRlLW1lbnRpb25cIj4nICsgKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIgKyBpdGVtLm9yaWdpbmFsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmZpbGxBdHRyXSkgKyAnPC9zcGFuPic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi50cmlnZ2VyICsgaXRlbS5vcmlnaW5hbFt0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5maWxsQXR0cl07XG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRNZW51SXRlbVRlbXBsYXRlKG1hdGNoSXRlbSkge1xuICAgICAgICByZXR1cm4gbWF0Y2hJdGVtLnN0cmluZ1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnB1dFR5cGVzKCkge1xuICAgICAgICByZXR1cm4gWydURVhUQVJFQScsICdJTlBVVCddXG4gICAgfVxuXG4gICAgdHJpZ2dlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24ubWFwKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29uZmlnLnRyaWdnZXJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhdHRhY2goZWwpIHtcbiAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gTXVzdCBwYXNzIGluIGEgRE9NIG5vZGUgb3IgTm9kZUxpc3QuJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIGl0IGlzIGEgalF1ZXJ5IGNvbGxlY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnICYmIGVsIGluc3RhbmNlb2YgalF1ZXJ5KSB7XG4gICAgICAgICAgICBlbCA9IGVsLmdldCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJcyBlbCBhbiBBcnJheS9BcnJheS1saWtlIG9iamVjdD9cbiAgICAgICAgaWYgKGVsLmNvbnN0cnVjdG9yID09PSBOb2RlTGlzdCB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gSFRNTENvbGxlY3Rpb24gfHwgZWwuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gZWwubGVuZ3RoXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXR0YWNoKGVsW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYXR0YWNoKGVsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2F0dGFjaChlbCkge1xuICAgICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdkYXRhLXRyaWJ1dGUnKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdUcmlidXRlIHdhcyBhbHJlYWR5IGJvdW5kIHRvICcgKyBlbC5ub2RlTmFtZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5zdXJlRWRpdGFibGUoZWwpXG4gICAgICAgIHRoaXMuZXZlbnRzLmJpbmQoZWwpXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS10cmlidXRlJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBlbnN1cmVFZGl0YWJsZShlbGVtZW50KSB7XG4gICAgICAgIGlmIChUcmlidXRlLmlucHV0VHlwZXMoKS5pbmRleE9mKGVsZW1lbnQubm9kZU5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY29udGVudEVkaXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jb250ZW50RWRpdGFibGUgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW1RyaWJ1dGVdIENhbm5vdCBiaW5kIHRvICcgKyBlbGVtZW50Lm5vZGVOYW1lKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlTWVudSgpIHtcbiAgICAgICAgbGV0IHdyYXBwZXIgPSB0aGlzLnJhbmdlLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICB1bCA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICAgICAgd3JhcHBlci5jbGFzc05hbWUgPSAndHJpYnV0ZS1jb250YWluZXInXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodWwpXG5cbiAgICAgICAgaWYgKHRoaXMubWVudUNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5ib2R5LmFwcGVuZENoaWxkKHdyYXBwZXIpXG4gICAgfVxuXG4gICAgc2hvd01lbnVGb3IoZWxlbWVudCwgc2Nyb2xsVG8pIHtcbiAgICAgICAgLy8gT25seSBwcm9jZWVkIGlmIG1lbnUgaXNuJ3QgYWxyZWFkeSBzaG93biBmb3IgdGhlIGN1cnJlbnQgZWxlbWVudCAmIG1lbnRpb25UZXh0XG4gICAgICAgIGlmICh0aGlzLmlzQWN0aXZlICYmIHRoaXMuY3VycmVudC5lbGVtZW50ID09PSBlbGVtZW50ICYmIHRoaXMuY3VycmVudC5tZW50aW9uVGV4dCA9PT0gdGhpcy5jdXJyZW50TWVudGlvblRleHRTbmFwc2hvdCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudE1lbnRpb25UZXh0U25hcHNob3QgPSB0aGlzLmN1cnJlbnQubWVudGlvblRleHRcblxuICAgICAgICAvLyBjcmVhdGUgdGhlIG1lbnUgaWYgaXQgZG9lc24ndCBleGlzdC5cbiAgICAgICAgaWYgKCF0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMubWVudSA9IHRoaXMuY3JlYXRlTWVudSgpXG4gICAgICAgICAgICBlbGVtZW50LnRyaWJ1dGVNZW51ID0gdGhpcy5tZW51XG4gICAgICAgICAgICB0aGlzLm1lbnVFdmVudHMuYmluZCh0aGlzLm1lbnUpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZVxuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcblxuICAgICAgICBpZiAoIXRoaXMuY3VycmVudC5tZW50aW9uVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0ID0gJydcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb2Nlc3NWYWx1ZXMgPSAodmFsdWVzKSA9PiB7XG4gICAgICAgICAgICAvLyBUcmlidXRlIG1heSBub3QgYmUgYWN0aXZlIGFueSBtb3JlIGJ5IHRoZSB0aW1lIHRoZSB2YWx1ZSBjYWxsYmFjayByZXR1cm5zXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5zZWFyY2guZmlsdGVyKHRoaXMuY3VycmVudC5tZW50aW9uVGV4dCwgdmFsdWVzLCB7XG4gICAgICAgICAgICAgICAgcHJlOiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5zZWFyY2hPcHRzLnByZSB8fCAnPHNwYW4+JyxcbiAgICAgICAgICAgICAgICBwb3N0OiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5zZWFyY2hPcHRzLnBvc3QgfHwgJzwvc3Bhbj4nLFxuICAgICAgICAgICAgICAgIGV4dHJhY3Q6IChlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLmxvb2t1cCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbFt0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5sb29rdXBdXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLmxvb2t1cCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLmxvb2t1cChlbCwgdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxvb2t1cCBhdHRyaWJ1dGUsIGxvb2t1cCBtdXN0IGJlIHN0cmluZyBvciBmdW5jdGlvbi4nKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50LmZpbHRlcmVkSXRlbXMgPSBpdGVtc1xuICAgICAgICAgICAgbGV0IHVsID0gdGhpcy5tZW51LnF1ZXJ5U2VsZWN0b3IoJ3VsJylcblxuICAgICAgICAgICAgdGhpcy5yYW5nZS5wb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKVxuXG4gICAgICAgICAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxldCBub01hdGNoRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RyaWJ1dGUtbm8tbWF0Y2gnLCB7IGRldGFpbDogdGhpcy5tZW51IH0pXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50LmVsZW1lbnQuZGlzcGF0Y2hFdmVudChub01hdGNoRXZlbnQpXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5ub01hdGNoVGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdWwuaW5uZXJIVE1MID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubm9NYXRjaFRlbXBsYXRlKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdWwuaW5uZXJIVE1MID0gJydcblxuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbGkgPSB0aGlzLnJhbmdlLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsaSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXRBY3RpdmVMaShpbmRleCwgZmFsc2UpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51U2VsZWN0ZWQgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTmFtZSA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdENsYXNzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxpLmlubmVySFRNTCA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLm1lbnVJdGVtVGVtcGxhdGUoaXRlbSlcblxuICAgICAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udmFsdWVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi52YWx1ZXModGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0LCBwcm9jZXNzVmFsdWVzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvY2Vzc1ZhbHVlcyh0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi52YWx1ZXMpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93TWVudUZvckNvbGxlY3Rpb24oZWxlbWVudCwgY29sbGVjdGlvbkluZGV4KSB7XG4gICAgICAgIGlmIChlbGVtZW50ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnBsYWNlQ2FyZXRBdEVuZChlbGVtZW50KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25bY29sbGVjdGlvbkluZGV4IHx8IDBdXG4gICAgICAgIHRoaXMuY3VycmVudC5leHRlcm5hbFRyaWdnZXIgPSB0cnVlXG4gICAgICAgIHRoaXMuY3VycmVudC5lbGVtZW50ID0gZWxlbWVudFxuXG4gICAgICAgIGlmIChlbGVtZW50LmlzQ29udGVudEVkaXRhYmxlKVxuICAgICAgICAgICAgdGhpcy5pbnNlcnRUZXh0QXRDdXJzb3IodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlcilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5pbnNlcnRBdENhcmV0KGVsZW1lbnQsIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIpXG5cbiAgICAgICAgdGhpcy5zaG93TWVudUZvcihlbGVtZW50KVxuICAgIH1cblxuICAgIC8vIFRPRE86IG1ha2Ugc3VyZSB0aGlzIHdvcmtzIGZvciBpbnB1dHMvdGV4dGFyZWFzXG4gICAgcGxhY2VDYXJldEF0RW5kKGVsKSB7XG4gICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93LmdldFNlbGVjdGlvbiAhPSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgJiYgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZVJhbmdlICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZWwpO1xuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgICAgICAgICAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0UmFuZ2UgPSBkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgICAgICAgdGV4dFJhbmdlLm1vdmVUb0VsZW1lbnRUZXh0KGVsKTtcbiAgICAgICAgICAgIHRleHRSYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgICAgICAgICB0ZXh0UmFuZ2Uuc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmb3IgY29udGVudGVkaXRhYmxlXG4gICAgaW5zZXJ0VGV4dEF0Q3Vyc29yKHRleHQpIHtcbiAgICAgICAgdmFyIHNlbCwgcmFuZ2UsIGh0bWw7XG4gICAgICAgIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcbiAgICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgICAgIHJhbmdlLmluc2VydE5vZGUodGV4dE5vZGUpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHModGV4dE5vZGUpXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKVxuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgIH1cblxuICAgIC8vIGZvciByZWd1bGFyIGlucHV0c1xuICAgIGluc2VydEF0Q2FyZXQodGV4dGFyZWEsIHRleHQpIHtcbiAgICAgICAgdmFyIHNjcm9sbFBvcyA9IHRleHRhcmVhLnNjcm9sbFRvcDtcbiAgICAgICAgdmFyIGNhcmV0UG9zID0gdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG5cbiAgICAgICAgdmFyIGZyb250ID0gKHRleHRhcmVhLnZhbHVlKS5zdWJzdHJpbmcoMCwgY2FyZXRQb3MpO1xuICAgICAgICB2YXIgYmFjayA9ICh0ZXh0YXJlYS52YWx1ZSkuc3Vic3RyaW5nKHRleHRhcmVhLnNlbGVjdGlvbkVuZCwgdGV4dGFyZWEudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBmcm9udCArIHRleHQgKyBiYWNrO1xuICAgICAgICBjYXJldFBvcyA9IGNhcmV0UG9zICsgdGV4dC5sZW5ndGg7XG4gICAgICAgIHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ID0gY2FyZXRQb3M7XG4gICAgICAgIHRleHRhcmVhLnNlbGVjdGlvbkVuZCA9IGNhcmV0UG9zO1xuICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICB0ZXh0YXJlYS5zY3JvbGxUb3AgPSBzY3JvbGxQb3M7XG4gICAgfVxuXG4gICAgaGlkZU1lbnUoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMubWVudS5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6IG5vbmU7J1xuICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IHt9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RJdGVtQXRJbmRleChpbmRleCwgb3JpZ2luYWxFdmVudCkge1xuICAgICAgICBpbmRleCA9IHBhcnNlSW50KGluZGV4KVxuICAgICAgICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJyB8fCBpc05hTihpbmRleCkpIHJldHVyblxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY3VycmVudC5maWx0ZXJlZEl0ZW1zW2luZGV4XVxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdFRlbXBsYXRlKGl0ZW0pXG4gICAgICAgIGlmIChjb250ZW50ICE9PSBudWxsKSB0aGlzLnJlcGxhY2VUZXh0KGNvbnRlbnQsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pXG4gICAgfVxuXG4gICAgcmVwbGFjZVRleHQoY29udGVudCwgb3JpZ2luYWxFdmVudCwgaXRlbSkge1xuICAgICAgICB0aGlzLnJhbmdlLnJlcGxhY2VUcmlnZ2VyVGV4dChjb250ZW50LCB0cnVlLCB0cnVlLCBvcmlnaW5hbEV2ZW50LCBpdGVtKVxuICAgIH1cblxuICAgIF9hcHBlbmQoY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29sbGVjdGlvbi52YWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGFwcGVuZCB0byB2YWx1ZXMsIGFzIGl0IGlzIGEgZnVuY3Rpb24uJylcbiAgICAgICAgfSBlbHNlIGlmICghcmVwbGFjZSkge1xuICAgICAgICAgICAgY29sbGVjdGlvbi52YWx1ZXMgPSBjb2xsZWN0aW9uLnZhbHVlcy5jb25jYXQobmV3VmFsdWVzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sbGVjdGlvbi52YWx1ZXMgPSBuZXdWYWx1ZXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZChjb2xsZWN0aW9uSW5kZXgsIG5ld1ZhbHVlcywgcmVwbGFjZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBwYXJzZUludChjb2xsZWN0aW9uSW5kZXgpXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSB0aHJvdyBuZXcgRXJyb3IoJ3BsZWFzZSBwcm92aWRlIGFuIGluZGV4IGZvciB0aGUgY29sbGVjdGlvbiB0byB1cGRhdGUuJylcblxuICAgICAgICBsZXQgY29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvbltpbmRleF1cblxuICAgICAgICB0aGlzLl9hcHBlbmQoY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKVxuICAgIH1cblxuICAgIGFwcGVuZEN1cnJlbnQobmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBlbmQodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24sIG5ld1ZhbHVlcywgcmVwbGFjZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYWN0aXZlIHN0YXRlLiBQbGVhc2UgdXNlIGFwcGVuZCBpbnN0ZWFkIGFuZCBwYXNzIGFuIGluZGV4LicpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXRhY2goZWwpIHtcbiAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gTXVzdCBwYXNzIGluIGEgRE9NIG5vZGUgb3IgTm9kZUxpc3QuJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIGl0IGlzIGEgalF1ZXJ5IGNvbGxlY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnICYmIGVsIGluc3RhbmNlb2YgalF1ZXJ5KSB7XG4gICAgICAgICAgICBlbCA9IGVsLmdldCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJcyBlbCBhbiBBcnJheS9BcnJheS1saWtlIG9iamVjdD9cbiAgICAgICAgaWYgKGVsLmNvbnN0cnVjdG9yID09PSBOb2RlTGlzdCB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gSFRNTENvbGxlY3Rpb24gfHwgZWwuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gZWwubGVuZ3RoXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGV0YWNoKGVsW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGV0YWNoKGVsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2RldGFjaChlbCkge1xuICAgICAgICB0aGlzLmV2ZW50cy51bmJpbmQoZWwpXG4gICAgICAgIGlmIChlbC50cmlidXRlTWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51RXZlbnRzLnVuYmluZChlbC50cmlidXRlTWVudSlcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyaWJ1dGUnKVxuICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICBpZiAoZWwudHJpYnV0ZU1lbnUpIHtcbiAgICAgICAgICAgICAgICBlbC50cmlidXRlTWVudS5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZTtcbiIsImNsYXNzIFRyaWJ1dGVFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUuZXZlbnRzID0gdGhpc1xuICAgIH1cblxuICAgIHN0YXRpYyBrZXlzKCkge1xuICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgIGtleTogOSxcbiAgICAgICAgICAgIHZhbHVlOiAnVEFCJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDgsXG4gICAgICAgICAgICB2YWx1ZTogJ0RFTEVURSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAxMyxcbiAgICAgICAgICAgIHZhbHVlOiAnRU5URVInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMjcsXG4gICAgICAgICAgICB2YWx1ZTogJ0VTQ0FQRSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAzMixcbiAgICAgICAgICAgIHZhbHVlOiAnU1BBQ0UnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMzgsXG4gICAgICAgICAgICB2YWx1ZTogJ1VQJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDQwLFxuICAgICAgICAgICAgdmFsdWU6ICdET1dOJ1xuICAgICAgICB9XVxuICAgIH1cblxuICAgIGJpbmQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmJvdW5kS2V5ZG93biA9IHRoaXMua2V5ZG93bi5iaW5kKGVsZW1lbnQsIHRoaXMpO1xuICAgICAgICBlbGVtZW50LmJvdW5kS2V5dXAgPSB0aGlzLmtleXVwLmJpbmQoZWxlbWVudCwgdGhpcyk7XG4gICAgICAgIGVsZW1lbnQuYm91bmRJbnB1dCA9IHRoaXMuaW5wdXQuYmluZChlbGVtZW50LCB0aGlzKTtcblxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleWRvd24sIGZhbHNlKVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJyxcbiAgICAgICAgICAgIGVsZW1lbnQuYm91bmRLZXl1cCwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZElucHV0LCBmYWxzZSlcbiAgICB9XG5cbiAgICB1bmJpbmQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleWRvd24sIGZhbHNlKVxuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJyxcbiAgICAgICAgICAgIGVsZW1lbnQuYm91bmRLZXl1cCwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZElucHV0LCBmYWxzZSlcblxuICAgICAgICBkZWxldGUgZWxlbWVudC5ib3VuZEtleWRvd25cbiAgICAgICAgZGVsZXRlIGVsZW1lbnQuYm91bmRLZXl1cFxuICAgICAgICBkZWxldGUgZWxlbWVudC5ib3VuZElucHV0XG4gICAgfVxuXG4gICAga2V5ZG93bihpbnN0YW5jZSwgZXZlbnQpIHtcbiAgICAgICAgaWYgKGluc3RhbmNlLnNob3VsZERlYWN0aXZhdGUoZXZlbnQpKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS50cmlidXRlLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzXG4gICAgICAgIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9IGZhbHNlXG5cbiAgICAgICAgVHJpYnV0ZUV2ZW50cy5rZXlzKCkuZm9yRWFjaChvID0+IHtcbiAgICAgICAgICAgIGlmIChvLmtleSA9PT0gZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9IHRydWVcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jYWxsYmFja3MoKVtvLnZhbHVlLnRvTG93ZXJDYXNlKCldKGV2ZW50LCBlbGVtZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGlucHV0KGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBpbnN0YW5jZS5pbnB1dEV2ZW50ID0gdHJ1ZVxuICAgICAgICBpbnN0YW5jZS5rZXl1cC5jYWxsKHRoaXMsIGluc3RhbmNlLCBldmVudClcbiAgICB9XG5cbiAgICBjbGljayhpbnN0YW5jZSwgZXZlbnQpIHtcbiAgICAgICAgbGV0IHRyaWJ1dGUgPSBpbnN0YW5jZS50cmlidXRlXG4gICAgICAgIGlmICh0cmlidXRlLm1lbnUgJiYgdHJpYnV0ZS5tZW51LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIGxldCBsaSA9IGV2ZW50LnRhcmdldFxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgIHdoaWxlIChsaS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnbGknKSB7XG4gICAgICAgICAgICAgICAgbGkgPSBsaS5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgaWYgKCFsaSB8fCBsaSA9PT0gdHJpYnV0ZS5tZW51KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGZpbmQgdGhlIDxsaT4gY29udGFpbmVyIGZvciB0aGUgY2xpY2snKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyaWJ1dGUuc2VsZWN0SXRlbUF0SW5kZXgobGkuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIGV2ZW50KVxuICAgICAgICAgICAgdHJpYnV0ZS5oaWRlTWVudSgpXG5cbiAgICAgICAgLy8gVE9ETzogc2hvdWxkIGZpcmUgd2l0aCBleHRlcm5hbFRyaWdnZXIgYW5kIHRhcmdldCBpcyBvdXRzaWRlIG9mIG1lbnVcbiAgICAgICAgfSBlbHNlIGlmICh0cmlidXRlLmN1cnJlbnQuZWxlbWVudCAmJiAhdHJpYnV0ZS5jdXJyZW50LmV4dGVybmFsVHJpZ2dlcikge1xuICAgICAgICAgICAgdHJpYnV0ZS5jdXJyZW50LmV4dGVybmFsVHJpZ2dlciA9IGZhbHNlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWJ1dGUuaGlkZU1lbnUoKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGtleXVwKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBpZiAoaW5zdGFuY2UuaW5wdXRFdmVudCkge1xuICAgICAgICAgICAgaW5zdGFuY2UuaW5wdXRFdmVudCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2UudXBkYXRlU2VsZWN0aW9uKHRoaXMpXG5cbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSByZXR1cm5cblxuICAgICAgICBpZiAoIWluc3RhbmNlLnRyaWJ1dGUuYWxsb3dTcGFjZXMgJiYgaW5zdGFuY2UudHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS50cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgICAgIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9IHRydWU7XG4gICAgICAgICAgICBpbnN0YW5jZS5jYWxsYmFja3MoKVtcInNwYWNlXCJdKGV2ZW50LCB0aGlzKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpbnN0YW5jZS50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UudHJpYnV0ZS5hdXRvQ29tcGxldGVNb2RlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY2FsbGJhY2tzKCkudHJpZ2dlckNoYXIoZXZlbnQsIHRoaXMsICcnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5Q29kZSA9IGluc3RhbmNlLmdldEtleUNvZGUoaW5zdGFuY2UsIHRoaXMsIGV2ZW50KVxuICAgIFxuICAgICAgICAgICAgICAgIGlmIChpc05hTihrZXlDb2RlKSB8fCAha2V5Q29kZSkgcmV0dXJuXG4gICAgXG4gICAgICAgICAgICAgICAgbGV0IHRyaWdnZXIgPSBpbnN0YW5jZS50cmlidXRlLnRyaWdnZXJzKCkuZmluZCh0cmlnZ2VyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyaWdnZXIuY2hhckNvZGVBdCgwKSA9PT0ga2V5Q29kZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0cmlnZ2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5jYWxsYmFja3MoKS50cmlnZ2VyQ2hhcihldmVudCwgdGhpcywgdHJpZ2dlcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKGluc3RhbmNlLnRyaWJ1dGUuY3VycmVudC50cmlnZ2VyIHx8IGluc3RhbmNlLnRyaWJ1dGUuYXV0b0NvbXBsZXRlTW9kZSlcbiAgICAgICAgICAgICAmJiBpbnN0YW5jZS5jb21tYW5kRXZlbnQgPT09IGZhbHNlXG4gICAgICAgICAgICB8fCBpbnN0YW5jZS50cmlidXRlLmlzQWN0aXZlICYmIGV2ZW50LmtleUNvZGUgPT09IDgpIHtcbiAgICAgICAgICBpbnN0YW5jZS50cmlidXRlLnNob3dNZW51Rm9yKHRoaXMsIHRydWUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGREZWFjdGl2YXRlKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy50cmlidXRlLmlzQWN0aXZlKSByZXR1cm4gZmFsc2VcblxuICAgICAgICBpZiAodGhpcy50cmlidXRlLmN1cnJlbnQubWVudGlvblRleHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgZXZlbnRLZXlQcmVzc2VkID0gZmFsc2VcbiAgICAgICAgICAgIFRyaWJ1dGVFdmVudHMua2V5cygpLmZvckVhY2gobyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IG8ua2V5KSBldmVudEtleVByZXNzZWQgPSB0cnVlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gIWV2ZW50S2V5UHJlc3NlZFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZ2V0S2V5Q29kZShpbnN0YW5jZSwgZWwsIGV2ZW50KSB7XG4gICAgICAgIGxldCBjaGFyXG4gICAgICAgIGxldCB0cmlidXRlID0gaW5zdGFuY2UudHJpYnV0ZVxuICAgICAgICBsZXQgaW5mbyA9IHRyaWJ1dGUucmFuZ2UuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIHRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSwgdHJ1ZSwgdHJpYnV0ZS5hbGxvd1NwYWNlcywgdHJpYnV0ZS5hdXRvQ29tcGxldGVNb2RlKVxuXG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mby5tZW50aW9uVHJpZ2dlckNoYXIuY2hhckNvZGVBdCgwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3Rpb24oZWwpIHtcbiAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudCA9IGVsXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy50cmlidXRlLnJhbmdlLmdldFRyaWdnZXJJbmZvKGZhbHNlLCB0aGlzLnRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSwgdHJ1ZSwgdGhpcy50cmlidXRlLmFsbG93U3BhY2VzLCB0aGlzLnRyaWJ1dGUuYXV0b0NvbXBsZXRlTW9kZSlcblxuICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQuc2VsZWN0ZWRQYXRoID0gaW5mby5tZW50aW9uU2VsZWN0ZWRQYXRoXG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dCA9IGluZm8ubWVudGlvblRleHRcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50LnNlbGVjdGVkT2Zmc2V0ID0gaW5mby5tZW50aW9uU2VsZWN0ZWRPZmZzZXRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGxiYWNrcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRyaWdnZXJDaGFyOiAoZSwgZWwsIHRyaWdnZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdHJpYnV0ZSA9IHRoaXMudHJpYnV0ZVxuICAgICAgICAgICAgICAgIHRyaWJ1dGUuY3VycmVudC50cmlnZ2VyID0gdHJpZ2dlclxuXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxlY3Rpb25JdGVtID0gdHJpYnV0ZS5jb2xsZWN0aW9uLmZpbmQoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnRyaWdnZXIgPT09IHRyaWdnZXJcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgdHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uSXRlbVxuXG4gICAgICAgICAgICAgICAgaWYgKHRyaWJ1dGUuaW5wdXRFdmVudCkgdHJpYnV0ZS5zaG93TWVudUZvcihlbCwgdHJ1ZSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnRlcjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuc2VsZWN0SXRlbUF0SW5kZXgodGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCwgZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVzY2FwZTogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWI6IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNob29zZSBmaXJzdCBtYXRjaFxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzKCkuZW50ZXIoZSwgZWwpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BhY2U6IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5zcGFjZVNlbGVjdHNNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MoKS5lbnRlcihlLCBlbClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy50cmlidXRlLmFsbG93U3BhY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cDogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbmF2aWdhdGUgdXAgdWxcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmZpbHRlcmVkSXRlbXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gc2VsZWN0ZWQgJiYgc2VsZWN0ZWQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkLS1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCA9IGNvdW50IC0gMVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcCA9IHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvd246IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIG5hdmlnYXRlIGRvd24gdWxcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmZpbHRlcmVkSXRlbXMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkKytcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsVG9wID0gMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlbGV0ZTogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSAmJiB0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKGVsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEFjdGl2ZUxpKGluZGV4LCBzY3JvbGxUb1Bvcz10cnVlKSB7XG4gICAgICAgIGxldCBsaXMgPSB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLFxuICAgICAgICAgICAgbGVuZ3RoID0gbGlzLmxlbmd0aCA+Pj4gMFxuXG4gICAgICAgIC8vIGdldCBoZWlnaHRzXG4gICAgICAgIGxldCBtZW51RnVsbEhlaWdodCA9IHRoaXMuZ2V0RnVsbEhlaWdodCh0aGlzLnRyaWJ1dGUubWVudSksXG4gICAgICAgICAgICBsaUhlaWdodCA9IHRoaXMuZ2V0RnVsbEhlaWdodChsaXNbMF0pXG5cbiAgICAgICAgaWYgKGluZGV4KSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gcGFyc2VJbnQoaW5kZXgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsaSA9IGxpc1tpXVxuICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gbGlIZWlnaHQgKiAoaSsxKVxuICAgICAgICAgICAgICAgIGxldCBzY3JvbGxUb3AgPSB0aGlzLnRyaWJ1dGUubWVudS5zY3JvbGxUb3BcbiAgICAgICAgICAgICAgICBsZXQgdG90YWxTY3JvbGwgPSBzY3JvbGxUb3AgKyBtZW51RnVsbEhlaWdodFxuXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFRvUG9zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPiB0b3RhbFNjcm9sbCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcCArPSBsaUhlaWdodFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9mZnNldCA8IHRvdGFsU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsVG9wIC09IGxpSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RnVsbEhlaWdodChlbGVtLCBpbmNsdWRlTWFyZ2luKSB7XG4gICAgICBsZXQgaGVpZ2h0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcblxuICAgICAgaWYgKGluY2x1ZGVNYXJnaW4pIHtcbiAgICAgICAgbGV0IHN0eWxlID0gZWxlbS5jdXJyZW50U3R5bGUgfHwgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSlcbiAgICAgICAgcmV0dXJuIGhlaWdodCArIHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luVG9wKSArIHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luQm90dG9tKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVpZ2h0XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVFdmVudHM7XG4iLCJjbGFzcyBUcmlidXRlTWVudUV2ZW50cyB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5tZW51RXZlbnRzID0gdGhpc1xuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLnRyaWJ1dGUubWVudVxuICAgIH1cblxuICAgIGJpbmQobWVudSkge1xuICAgICAgICB0aGlzLm1lbnVDbGlja0V2ZW50ID0gdGhpcy50cmlidXRlLmV2ZW50cy5jbGljay5iaW5kKG51bGwsIHRoaXMpXG4gICAgICAgIHRoaXMubWVudUNvbnRhaW5lclNjcm9sbEV2ZW50ID0gdGhpcy5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQsIGZhbHNlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAzMDAsIGZhbHNlKVxuICAgICAgICB0aGlzLndpbmRvd1Jlc2l6ZUV2ZW50ID0gdGhpcy5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlLnBvc2l0aW9uTWVudUF0Q2FyZXQodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwLCBmYWxzZSlcblxuICAgICAgICAvLyBmaXhlcyBJRTExIGlzc3VlcyB3aXRoIG1vdXNlZG93blxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0RG9jdW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJEb3duJyxcbiAgICAgICAgICAgIHRoaXMubWVudUNsaWNrRXZlbnQsIGZhbHNlKVxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0RG9jdW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLFxuICAgICAgICAgICAgdGhpcy5tZW51Q2xpY2tFdmVudCwgZmFsc2UpXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLndpbmRvd1Jlc2l6ZUV2ZW50KVxuXG4gICAgICAgIGlmICh0aGlzLm1lbnVDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1lbnVDb250YWluZXJTY3JvbGxFdmVudCwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5tZW51Q29udGFpbmVyU2Nyb2xsRXZlbnQpXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHVuYmluZChtZW51KSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5nZXREb2N1bWVudCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsXG4gICAgICAgICAgICB0aGlzLm1lbnVDbGlja0V2ZW50LCBmYWxzZSlcbiAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlLmdldERvY3VtZW50KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyRG93bicsXG4gICAgICAgICAgICB0aGlzLm1lbnVDbGlja0V2ZW50LCBmYWxzZSlcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMud2luZG93UmVzaXplRXZlbnQpXG5cbiAgICAgICAgaWYgKHRoaXMubWVudUNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubWVudUNvbnRhaW5lclNjcm9sbEV2ZW50LCBmYWxzZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1lbnVDb250YWluZXJTY3JvbGxFdmVudClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgICAgICB2YXIgdGltZW91dFxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHNcbiAgICAgICAgICAgIHZhciBsYXRlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbFxuICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dFxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdClcbiAgICAgICAgICAgIGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZU1lbnVFdmVudHM7XG4iLCIvLyBUaGFua3MgdG8gaHR0cHM6Ly9naXRodWIuY29tL2plZmYtY29sbGlucy9tZW50LmlvXG5jbGFzcyBUcmlidXRlUmFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UgPSB0aGlzXG4gICAgfVxuXG4gICAgZ2V0RG9jdW1lbnQoKSB7XG4gICAgICAgIGxldCBpZnJhbWVcbiAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmcmFtZSA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24uaWZyYW1lXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlmcmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnRcbiAgICB9XG5cbiAgICBwb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnQsXG4gICAgICAgICAgICBjb29yZGluYXRlc1xuXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRUcmlnZ2VySW5mbyhmYWxzZSwgdGhpcy50cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UsIHRydWUsIHRoaXMudHJpYnV0ZS5hbGxvd1NwYWNlcywgdGhpcy50cmlidXRlLmF1dG9Db21wbGV0ZU1vZGUpXG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbmZvICE9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBpZighdGhpcy50cmlidXRlLnBvc2l0aW9uTWVudSl7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9IGBkaXNwbGF5OiBibG9jaztgXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSB0aGlzLmdldFRleHRBcmVhT3JJbnB1dFVuZGVybGluZVBvc2l0aW9uKHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGluZm8ubWVudGlvblBvc2l0aW9uKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSB0aGlzLmdldENvbnRlbnRFZGl0YWJsZUNhcmV0UG9zaXRpb24oaW5mby5tZW50aW9uUG9zaXRpb24pXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9IGB0b3A6ICR7Y29vcmRpbmF0ZXMudG9wfXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICR7Y29vcmRpbmF0ZXMubGVmdH1weDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogJHtjb29yZGluYXRlcy5yaWdodH1weDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206ICR7Y29vcmRpbmF0ZXMuYm90dG9tfXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LWluZGV4OiAxMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztgXG5cbiAgICAgICAgICAgIGlmIChjb29yZGluYXRlcy5sZWZ0ID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5sZWZ0ID0gJ2F1dG8nXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb29yZGluYXRlcy50b3AgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLnRvcCA9ICdhdXRvJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG8pIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKVxuXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVEaW1lbnNpb25zID0ge1xuICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnRyaWJ1dGUubWVudS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMudHJpYnV0ZS5tZW51Lm9mZnNldEhlaWdodFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbWVudUlzT2ZmU2NyZWVuID0gdGhpcy5pc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKVxuXG4gICAgICAgICAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlbkhvcml6b250YWxseSA9IHdpbmRvdy5pbm5lcldpZHRoID4gbWVudURpbWVuc2lvbnMud2lkdGggJiYgKG1lbnVJc09mZlNjcmVlbi5sZWZ0IHx8IG1lbnVJc09mZlNjcmVlbi5yaWdodClcbiAgICAgICAgICAgICAgICBsZXQgbWVudUlzT2ZmU2NyZWVuVmVydGljYWxseSA9IHdpbmRvdy5pbm5lckhlaWdodCA+IG1lbnVEaW1lbnNpb25zLmhlaWdodCAmJiAobWVudUlzT2ZmU2NyZWVuLnRvcCB8fCBtZW51SXNPZmZTY3JlZW4uYm90dG9tKVxuICAgICAgICAgICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW5Ib3Jpem9udGFsbHkgfHwgbWVudUlzT2ZmU2NyZWVuVmVydGljYWxseSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6IG5vbmUnXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25NZW51QXRDYXJldChzY3JvbGxUbylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAwKVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6IG5vbmUnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RFbGVtZW50KHRhcmdldEVsZW1lbnQsIHBhdGgsIG9mZnNldCkge1xuICAgICAgICBsZXQgcmFuZ2VcbiAgICAgICAgbGV0IGVsZW0gPSB0YXJnZXRFbGVtZW50XG5cbiAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtLmNoaWxkTm9kZXNbcGF0aFtpXV1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAoZWxlbS5sZW5ndGggPCBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0IC09IGVsZW0ubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlbGVtLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwICYmICFlbGVtLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5wcmV2aW91c1NpYmxpbmdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcblxuICAgICAgICByYW5nZSA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVSYW5nZSgpXG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KGVsZW0sIG9mZnNldClcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKGVsZW0sIG9mZnNldClcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSlcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuXG4gICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSlcbiAgICAgICAgdGFyZ2V0RWxlbWVudC5mb2N1cygpXG4gICAgfVxuXG4gICAgcmVwbGFjZVRyaWdnZXJUZXh0KHRleHQsIHJlcXVpcmVMZWFkaW5nU3BhY2UsIGhhc1RyYWlsaW5nU3BhY2UsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudFxuXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRUcmlnZ2VySW5mbyh0cnVlLCBoYXNUcmFpbGluZ1NwYWNlLCByZXF1aXJlTGVhZGluZ1NwYWNlLCB0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMsIHRoaXMudHJpYnV0ZS5hdXRvQ29tcGxldGVNb2RlKVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgZXZlbnRcbiAgICAgICAgbGV0IHJlcGxhY2VFdmVudCA9IG5ldyBDdXN0b21FdmVudCgndHJpYnV0ZS1yZXBsYWNlZCcsIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICAgICAgZXZlbnQ6IG9yaWdpbmFsRXZlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoaW5mbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUoY29udGV4dC5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIGxldCBteUZpZWxkID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudFxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3VmZml4ID0gdHlwZW9mIHRoaXMudHJpYnV0ZS5yZXBsYWNlVGV4dFN1ZmZpeCA9PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICA/IHRoaXMudHJpYnV0ZS5yZXBsYWNlVGV4dFN1ZmZpeFxuICAgICAgICAgICAgICAgICAgICA6ICcgJ1xuICAgICAgICAgICAgICAgIHRleHQgKz0gdGV4dFN1ZmZpeFxuICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IGluZm8ubWVudGlvblBvc2l0aW9uXG4gICAgICAgICAgICAgICAgbGV0IGVuZFBvcyA9IGluZm8ubWVudGlvblBvc2l0aW9uICsgaW5mby5tZW50aW9uVGV4dC5sZW5ndGggKyB0ZXh0U3VmZml4Lmxlbmd0aFxuICAgICAgICAgICAgICAgIG15RmllbGQudmFsdWUgPSBteUZpZWxkLnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgKyB0ZXh0ICtcbiAgICAgICAgICAgICAgICAgICAgbXlGaWVsZC52YWx1ZS5zdWJzdHJpbmcoZW5kUG9zLCBteUZpZWxkLnZhbHVlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBteUZpZWxkLnNlbGVjdGlvblN0YXJ0ID0gc3RhcnRQb3MgKyB0ZXh0Lmxlbmd0aFxuICAgICAgICAgICAgICAgIG15RmllbGQuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyB0ZXh0Lmxlbmd0aFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgYSBzcGFjZSB0byB0aGUgZW5kIG9mIHRoZSBwYXN0ZWQgdGV4dFxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3VmZml4ID0gdHlwZW9mIHRoaXMudHJpYnV0ZS5yZXBsYWNlVGV4dFN1ZmZpeCA9PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICA/IHRoaXMudHJpYnV0ZS5yZXBsYWNlVGV4dFN1ZmZpeFxuICAgICAgICAgICAgICAgICAgICA6ICdcXHhBMCdcbiAgICAgICAgICAgICAgICB0ZXh0ICs9IHRleHRTdWZmaXhcblxuICAgICAgICAgICAgICAgIHRoaXMucGFzdGVIdG1sKHRleHQsIGluZm8ubWVudGlvblBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICBpbmZvLm1lbnRpb25Qb3NpdGlvbiArIGluZm8ubWVudGlvblRleHQubGVuZ3RoICsgIXRoaXMudHJpYnV0ZS5hdXRvQ29tcGxldGVNb2RlKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250ZXh0LmVsZW1lbnQuZGlzcGF0Y2hFdmVudChyZXBsYWNlRXZlbnQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXN0ZUh0bWwoaHRtbCwgc3RhcnRQb3MsIGVuZFBvcykge1xuICAgICAgICBsZXQgcmFuZ2UsIHNlbFxuICAgICAgICBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG4gICAgICAgIHJhbmdlID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVJhbmdlKClcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoc2VsLmFuY2hvck5vZGUsIHN0YXJ0UG9zKVxuICAgICAgICByYW5nZS5zZXRFbmQoc2VsLmFuY2hvck5vZGUsIGVuZFBvcylcbiAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKVxuXG4gICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBlbC5pbm5lckhUTUwgPSBodG1sXG4gICAgICAgIGxldCBmcmFnID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgICAgICAgIG5vZGUsIGxhc3ROb2RlXG4gICAgICAgIHdoaWxlICgobm9kZSA9IGVsLmZpcnN0Q2hpbGQpKSB7XG4gICAgICAgICAgICBsYXN0Tm9kZSA9IGZyYWcuYXBwZW5kQ2hpbGQobm9kZSlcbiAgICAgICAgfVxuICAgICAgICByYW5nZS5pbnNlcnROb2RlKGZyYWcpXG5cbiAgICAgICAgLy8gUHJlc2VydmUgdGhlIHNlbGVjdGlvblxuICAgICAgICBpZiAobGFzdE5vZGUpIHtcbiAgICAgICAgICAgIHJhbmdlID0gcmFuZ2UuY2xvbmVSYW5nZSgpXG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydEFmdGVyKGxhc3ROb2RlKVxuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSlcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0V2luZG93U2VsZWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lLmNvbnRlbnRXaW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICB9XG5cbiAgICBnZXROb2RlUG9zaXRpb25JblBhcmVudChlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzW2ldXG5cbiAgICAgICAgICAgIGlmIChub2RlID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbnRlbnRFZGl0YWJsZVNlbGVjdGVkUGF0aChjdHgpIHtcbiAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gc2VsLmFuY2hvck5vZGVcbiAgICAgICAgbGV0IHBhdGggPSBbXVxuICAgICAgICBsZXQgb2Zmc2V0XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBpXG4gICAgICAgICAgICBsZXQgY2UgPSBzZWxlY3RlZC5jb250ZW50RWRpdGFibGVcbiAgICAgICAgICAgIHdoaWxlIChzZWxlY3RlZCAhPT0gbnVsbCAmJiBjZSAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgaSA9IHRoaXMuZ2V0Tm9kZVBvc2l0aW9uSW5QYXJlbnQoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKGkpXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZC5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlID0gc2VsZWN0ZWQuY29udGVudEVkaXRhYmxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0aC5yZXZlcnNlKClcblxuICAgICAgICAgICAgLy8gZ2V0UmFuZ2VBdCBtYXkgbm90IGV4aXN0LCBuZWVkIGFsdGVybmF0aXZlXG4gICAgICAgICAgICBvZmZzZXQgPSBzZWwuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUZXh0UHJlY2VkaW5nQ3VycmVudFNlbGVjdGlvbigpIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudCxcbiAgICAgICAgICAgIHRleHQgPSAnJ1xuXG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICBsZXQgdGV4dENvbXBvbmVudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGV4dENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IHRleHRDb21wb25lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgICAgICAgICAgICBpZiAodGV4dENvbXBvbmVudC52YWx1ZSAmJiBzdGFydFBvcyA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0Q29tcG9uZW50LnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEVsZW0gPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpLmFuY2hvck5vZGVcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRWxlbSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHdvcmtpbmdOb2RlQ29udGVudCA9IHNlbGVjdGVkRWxlbS50ZXh0Q29udGVudFxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RTdGFydE9mZnNldCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgICAgICAgICAgaWYgKHdvcmtpbmdOb2RlQ29udGVudCAmJiBzZWxlY3RTdGFydE9mZnNldCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB3b3JraW5nTm9kZUNvbnRlbnQuc3Vic3RyaW5nKDAsIHNlbGVjdFN0YXJ0T2Zmc2V0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuXG4gICAgZ2V0VHJpZ2dlckluZm8obWVudUFscmVhZHlBY3RpdmUsIGhhc1RyYWlsaW5nU3BhY2UsIHJlcXVpcmVMZWFkaW5nU3BhY2UsIGFsbG93U3BhY2VzLCBpc0F1dG9jb21wbGV0ZSkge1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy50cmlidXRlLmN1cnJlbnRcbiAgICAgICAgbGV0IHNlbGVjdGVkLCBwYXRoLCBvZmZzZXRcblxuICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUoY3R4LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICBzZWxlY3RlZCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25JbmZvID0gdGhpcy5nZXRDb250ZW50RWRpdGFibGVTZWxlY3RlZFBhdGgoY3R4KVxuXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uSW5mbykge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gc2VsZWN0aW9uSW5mby5zZWxlY3RlZFxuICAgICAgICAgICAgICAgIHBhdGggPSBzZWxlY3Rpb25JbmZvLnBhdGhcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBzZWxlY3Rpb25JbmZvLm9mZnNldFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVmZmVjdGl2ZVJhbmdlID0gdGhpcy5nZXRUZXh0UHJlY2VkaW5nQ3VycmVudFNlbGVjdGlvbigpXG4gICAgICAgIGxldCB3b3Jkc0FycmF5ID0gZWZmZWN0aXZlUmFuZ2Uuc3BsaXQoJyAnKVxuICAgICAgICBsZXQgd29ybGRzQ291bnQgPSB3b3Jkc0FycmF5Lmxlbmd0aCAtIDFcbiAgICAgICAgbGV0IG1lbnRpb25UZXh0ID0gd29yZHNBcnJheVt3b3JsZHNDb3VudF0udHJpbSgpXG5cbiAgICAgICAgaWYgKGlzQXV0b2NvbXBsZXRlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG1lbnRpb25Qb3NpdGlvbjogZWZmZWN0aXZlUmFuZ2UubGVuZ3RoIC0gbWVudGlvblRleHQubGVuZ3RoLFxuICAgICAgICAgICAgICAgIG1lbnRpb25UZXh0OiBtZW50aW9uVGV4dCxcbiAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRFbGVtZW50OiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZE9mZnNldDogb2Zmc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWZmZWN0aXZlUmFuZ2UgIT09IHVuZGVmaW5lZCAmJiBlZmZlY3RpdmVSYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA9IC0xXG4gICAgICAgICAgICBsZXQgdHJpZ2dlckNoYXJcblxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmNvbGxlY3Rpb24uZm9yRWFjaChjb25maWcgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjID0gY29uZmlnLnRyaWdnZXJcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gY29uZmlnLnJlcXVpcmVMZWFkaW5nU3BhY2UgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RJbmRleFdpdGhMZWFkaW5nU3BhY2UoZWZmZWN0aXZlUmFuZ2UsIGMpIDpcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0aXZlUmFuZ2UubGFzdEluZGV4T2YoYylcblxuICAgICAgICAgICAgICAgIGlmIChpZHggPiBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID0gaWR4XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJDaGFyID0gY1xuICAgICAgICAgICAgICAgICAgICByZXF1aXJlTGVhZGluZ1NwYWNlID0gY29uZmlnLnJlcXVpcmVMZWFkaW5nU3BhY2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID49IDAgJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA9PT0gMCB8fFxuICAgICAgICAgICAgICAgICAgICAhcmVxdWlyZUxlYWRpbmdTcGFjZSB8fFxuICAgICAgICAgICAgICAgICAgICAvW1xceEEwXFxzXS9nLnRlc3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFRyaWdnZXJTbmlwcGV0ID0gZWZmZWN0aXZlUmFuZ2Uuc3Vic3RyaW5nKG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyArIDEsXG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdGl2ZVJhbmdlLmxlbmd0aClcblxuICAgICAgICAgICAgICAgIHRyaWdnZXJDaGFyID0gZWZmZWN0aXZlUmFuZ2Uuc3Vic3RyaW5nKG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcywgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zICsgMSlcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RTbmlwcGV0Q2hhciA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC5zdWJzdHJpbmcoMCwgMSlcbiAgICAgICAgICAgICAgICBsZXQgbGVhZGluZ1NwYWNlID0gY3VycmVudFRyaWdnZXJTbmlwcGV0Lmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RTbmlwcGV0Q2hhciA9PT0gJyAnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFNuaXBwZXRDaGFyID09PSAnXFx4QTAnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBpZiAoaGFzVHJhaWxpbmdTcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VHJpZ2dlclNuaXBwZXQgPSBjdXJyZW50VHJpZ2dlclNuaXBwZXQudHJpbSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHJlZ2V4ID0gYWxsb3dTcGFjZXMgPyAvW15cXFMgXS9nIDogL1tcXHhBMFxcc10vZztcblxuICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlID0gcmVnZXgudGVzdChjdXJyZW50VHJpZ2dlclNuaXBwZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFsZWFkaW5nU3BhY2UgJiYgKG1lbnVBbHJlYWR5QWN0aXZlIHx8ICEocmVnZXgudGVzdChjdXJyZW50VHJpZ2dlclNuaXBwZXQpKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25Qb3NpdGlvbjogbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblRleHQ6IGN1cnJlbnRUcmlnZ2VyU25pcHBldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZEVsZW1lbnQ6IHNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZE9mZnNldDogb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblRyaWdnZXJDaGFyOiB0cmlnZ2VyQ2hhclxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGFzdEluZGV4V2l0aExlYWRpbmdTcGFjZSAoc3RyLCBjaGFyKSB7XG4gICAgICAgIGxldCByZXZlcnNlZFN0ciA9IHN0ci5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpXG4gICAgICAgIGxldCBpbmRleCA9IC0xXG5cbiAgICAgICAgZm9yIChsZXQgY2lkeCA9IDAsIGxlbiA9IHN0ci5sZW5ndGg7IGNpZHggPCBsZW47IGNpZHgrKykge1xuICAgICAgICAgICAgbGV0IGZpcnN0Q2hhciA9IGNpZHggPT09IHN0ci5sZW5ndGggLSAxXG4gICAgICAgICAgICBsZXQgbGVhZGluZ1NwYWNlID0gL1xccy8udGVzdChyZXZlcnNlZFN0cltjaWR4ICsgMV0pXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBjaGFyID09PSByZXZlcnNlZFN0cltjaWR4XVxuXG4gICAgICAgICAgICBpZiAobWF0Y2ggJiYgKGZpcnN0Q2hhciB8fCBsZWFkaW5nU3BhY2UpKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBzdHIubGVuZ3RoIC0gMSAtIGNpZHhcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgaXNDb250ZW50RWRpdGFibGUoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5ub2RlTmFtZSAhPT0gJ0lOUFVUJyAmJiBlbGVtZW50Lm5vZGVOYW1lICE9PSAnVEVYVEFSRUEnXG4gICAgfVxuXG4gICAgaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucykge1xuICAgICAgICBsZXQgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIGxldCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgICAgICAgbGV0IHdpbmRvd0xlZnQgPSAod2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvYy5zY3JvbGxMZWZ0KSAtIChkb2MuY2xpZW50TGVmdCB8fCAwKVxuICAgICAgICBsZXQgd2luZG93VG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApXG5cbiAgICAgICAgbGV0IG1lbnVUb3AgPSB0eXBlb2YgY29vcmRpbmF0ZXMudG9wID09PSAnbnVtYmVyJyA/IGNvb3JkaW5hdGVzLnRvcCA6IHdpbmRvd1RvcCArIHdpbmRvd0hlaWdodCAtIGNvb3JkaW5hdGVzLmJvdHRvbSAtIG1lbnVEaW1lbnNpb25zLmhlaWdodFxuICAgICAgICBsZXQgbWVudVJpZ2h0ID0gdHlwZW9mIGNvb3JkaW5hdGVzLnJpZ2h0ID09PSAnbnVtYmVyJyA/IGNvb3JkaW5hdGVzLnJpZ2h0IDogY29vcmRpbmF0ZXMubGVmdCArIG1lbnVEaW1lbnNpb25zLndpZHRoXG4gICAgICAgIGxldCBtZW51Qm90dG9tID0gdHlwZW9mIGNvb3JkaW5hdGVzLmJvdHRvbSA9PT0gJ251bWJlcicgPyBjb29yZGluYXRlcy5ib3R0b20gOiBjb29yZGluYXRlcy50b3AgKyBtZW51RGltZW5zaW9ucy5oZWlnaHRcbiAgICAgICAgbGV0IG1lbnVMZWZ0ID0gdHlwZW9mIGNvb3JkaW5hdGVzLmxlZnQgPT09ICdudW1iZXInID8gY29vcmRpbmF0ZXMubGVmdCA6IHdpbmRvd0xlZnQgKyB3aW5kb3dXaWR0aCAtIGNvb3JkaW5hdGVzLnJpZ2h0IC0gbWVudURpbWVuc2lvbnMud2lkdGhcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wOiBtZW51VG9wIDwgTWF0aC5mbG9vcih3aW5kb3dUb3ApLFxuICAgICAgICAgICAgcmlnaHQ6IG1lbnVSaWdodCA+IE1hdGguY2VpbCh3aW5kb3dMZWZ0ICsgd2luZG93V2lkdGgpLFxuICAgICAgICAgICAgYm90dG9tOiBtZW51Qm90dG9tID4gTWF0aC5jZWlsKHdpbmRvd1RvcCArIHdpbmRvd0hlaWdodCksXG4gICAgICAgICAgICBsZWZ0OiBtZW51TGVmdCA8IE1hdGguZmxvb3Iod2luZG93TGVmdClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1lbnVEaW1lbnNpb25zKCkge1xuICAgICAgICAvLyBXaWR0aCBvZiB0aGUgbWVudSBkZXBlbmRzIG9mIGl0cyBjb250ZW50cyBhbmQgcG9zaXRpb25cbiAgICAgICAgLy8gV2UgbXVzdCBjaGVjayB3aGF0IGl0cyB3aWR0aCB3b3VsZCBiZSB3aXRob3V0IGFueSBvYnN0cnVjdGlvblxuICAgICAgICAvLyBUaGlzIHdheSwgd2UgY2FuIGFjaGlldmUgZ29vZCBwb3NpdGlvbmluZyBmb3IgZmxpcHBpbmcgdGhlIG1lbnVcbiAgICAgICAgbGV0IGRpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAgICAgICAgIGhlaWdodDogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9IGB0b3A6IDBweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDBweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk7IGhpZGRlbjtgXG4gICAgICAgZGltZW5zaW9ucy53aWR0aCA9IHRoaXMudHJpYnV0ZS5tZW51Lm9mZnNldFdpZHRoXG4gICAgICAgZGltZW5zaW9ucy5oZWlnaHQgPSB0aGlzLnRyaWJ1dGUubWVudS5vZmZzZXRIZWlnaHRcblxuICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSBgZGlzcGxheTogbm9uZTtgXG5cbiAgICAgICByZXR1cm4gZGltZW5zaW9uc1xuICAgIH1cblxuICAgIGdldFRleHRBcmVhT3JJbnB1dFVuZGVybGluZVBvc2l0aW9uKGVsZW1lbnQsIHBvc2l0aW9uLCBmbGlwcGVkKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gWydkaXJlY3Rpb24nLCAnYm94U2l6aW5nJywgJ3dpZHRoJywgJ2hlaWdodCcsICdvdmVyZmxvd1gnLFxuICAgICAgICAgICAgJ292ZXJmbG93WScsICdib3JkZXJUb3BXaWR0aCcsICdib3JkZXJSaWdodFdpZHRoJyxcbiAgICAgICAgICAgICdib3JkZXJCb3R0b21XaWR0aCcsICdib3JkZXJMZWZ0V2lkdGgnLCAncGFkZGluZ1RvcCcsXG4gICAgICAgICAgICAncGFkZGluZ1JpZ2h0JywgJ3BhZGRpbmdCb3R0b20nLCAncGFkZGluZ0xlZnQnLFxuICAgICAgICAgICAgJ2ZvbnRTdHlsZScsICdmb250VmFyaWFudCcsICdmb250V2VpZ2h0JywgJ2ZvbnRTdHJldGNoJyxcbiAgICAgICAgICAgICdmb250U2l6ZScsICdmb250U2l6ZUFkanVzdCcsICdsaW5lSGVpZ2h0JywgJ2ZvbnRGYW1pbHknLFxuICAgICAgICAgICAgJ3RleHRBbGlnbicsICd0ZXh0VHJhbnNmb3JtJywgJ3RleHRJbmRlbnQnLFxuICAgICAgICAgICAgJ3RleHREZWNvcmF0aW9uJywgJ2xldHRlclNwYWNpbmcnLCAnd29yZFNwYWNpbmcnXG4gICAgICAgIF1cblxuICAgICAgICBsZXQgaXNGaXJlZm94ID0gKHdpbmRvdy5tb3pJbm5lclNjcmVlblggIT09IG51bGwpXG5cbiAgICAgICAgbGV0IGRpdiA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBkaXYuaWQgPSAnaW5wdXQtdGV4dGFyZWEtY2FyZXQtcG9zaXRpb24tbWlycm9yLWRpdidcbiAgICAgICAgdGhpcy5nZXREb2N1bWVudCgpLmJvZHkuYXBwZW5kQ2hpbGQoZGl2KVxuXG4gICAgICAgIGxldCBzdHlsZSA9IGRpdi5zdHlsZVxuICAgICAgICBsZXQgY29tcHV0ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSA/IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkgOiBlbGVtZW50LmN1cnJlbnRTdHlsZVxuXG4gICAgICAgIHN0eWxlLndoaXRlU3BhY2UgPSAncHJlLXdyYXAnXG4gICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lICE9PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICBzdHlsZS53b3JkV3JhcCA9ICdicmVhay13b3JkJ1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcG9zaXRpb24gb2ZmLXNjcmVlblxuICAgICAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICAgICAgc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nXG5cbiAgICAgICAgLy8gdHJhbnNmZXIgdGhlIGVsZW1lbnQncyBwcm9wZXJ0aWVzIHRvIHRoZSBkaXZcbiAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgICAgc3R5bGVbcHJvcF0gPSBjb21wdXRlZFtwcm9wXVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChpc0ZpcmVmb3gpIHtcbiAgICAgICAgICAgIHN0eWxlLndpZHRoID0gYCR7KHBhcnNlSW50KGNvbXB1dGVkLndpZHRoKSAtIDIpfXB4YFxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gcGFyc2VJbnQoY29tcHV0ZWQuaGVpZ2h0KSlcbiAgICAgICAgICAgICAgICBzdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICAgICAgICB9XG5cbiAgICAgICAgZGl2LnRleHRDb250ZW50ID0gZWxlbWVudC52YWx1ZS5zdWJzdHJpbmcoMCwgcG9zaXRpb24pXG5cbiAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgIGRpdi50ZXh0Q29udGVudCA9IGRpdi50ZXh0Q29udGVudC5yZXBsYWNlKC9cXHMvZywgJ8KgJylcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzcGFuID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gZWxlbWVudC52YWx1ZS5zdWJzdHJpbmcocG9zaXRpb24pIHx8ICcuJ1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoc3BhbilcblxuICAgICAgICBsZXQgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgICAgICBsZXQgd2luZG93TGVmdCA9ICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApXG4gICAgICAgIGxldCB3aW5kb3dUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMClcblxuICAgICAgICBsZXQgY29vcmRpbmF0ZXMgPSB7XG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgd2luZG93VG9wICsgc3Bhbi5vZmZzZXRUb3AgKyBwYXJzZUludChjb21wdXRlZC5ib3JkZXJUb3BXaWR0aCkgKyBwYXJzZUludChjb21wdXRlZC5mb250U2l6ZSkgLSBlbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbmRvd0xlZnQgKyBzcGFuLm9mZnNldExlZnQgKyBwYXJzZUludChjb21wdXRlZC5ib3JkZXJMZWZ0V2lkdGgpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICAgICAgbGV0IG1lbnVEaW1lbnNpb25zID0gdGhpcy5nZXRNZW51RGltZW5zaW9ucygpXG4gICAgICAgIGxldCBtZW51SXNPZmZTY3JlZW4gPSB0aGlzLmlzTWVudU9mZlNjcmVlbihjb29yZGluYXRlcywgbWVudURpbWVuc2lvbnMpXG5cbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi5yaWdodCkge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMucmlnaHQgPSB3aW5kb3dXaWR0aCAtIGNvb3JkaW5hdGVzLmxlZnRcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLmxlZnQgPSAnYXV0bydcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnRIZWlnaHQgPSB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lclxuICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lci5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5nZXREb2N1bWVudCgpLmJvZHkub2Zmc2V0SGVpZ2h0XG5cbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi5ib3R0b20pIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnRSZWN0ID0gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXJcbiAgICAgICAgICAgICAgICA/IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgOiB0aGlzLmdldERvY3VtZW50KCkuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgbGV0IHNjcm9sbFN0aWxsQXZhaWxhYmxlID0gcGFyZW50SGVpZ2h0IC0gKHdpbmRvd0hlaWdodCAtIHBhcmVudFJlY3QudG9wKVxuXG4gICAgICAgICAgICBjb29yZGluYXRlcy5ib3R0b20gPSBzY3JvbGxTdGlsbEF2YWlsYWJsZSArICh3aW5kb3dIZWlnaHQgLSByZWN0LnRvcCAtIHNwYW4ub2Zmc2V0VG9wKVxuICAgICAgICAgICAgY29vcmRpbmF0ZXMudG9wID0gJ2F1dG8nXG4gICAgICAgIH1cblxuICAgICAgICBtZW51SXNPZmZTY3JlZW4gPSB0aGlzLmlzTWVudU9mZlNjcmVlbihjb29yZGluYXRlcywgbWVudURpbWVuc2lvbnMpXG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4ubGVmdCkge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMubGVmdCA9IHdpbmRvd1dpZHRoID4gbWVudURpbWVuc2lvbnMud2lkdGhcbiAgICAgICAgICAgICAgICA/IHdpbmRvd0xlZnQgKyB3aW5kb3dXaWR0aCAtIG1lbnVEaW1lbnNpb25zLndpZHRoXG4gICAgICAgICAgICAgICAgOiB3aW5kb3dMZWZ0XG4gICAgICAgICAgICBkZWxldGUgY29vcmRpbmF0ZXMucmlnaHRcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuLnRvcCkge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMudG9wID0gd2luZG93SGVpZ2h0ID4gbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgICAgICAgICAgPyB3aW5kb3dUb3AgKyB3aW5kb3dIZWlnaHQgLSBtZW51RGltZW5zaW9ucy5oZWlnaHRcbiAgICAgICAgICAgICAgICA6IHdpbmRvd1RvcFxuICAgICAgICAgICAgZGVsZXRlIGNvb3JkaW5hdGVzLmJvdHRvbVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXREb2N1bWVudCgpLmJvZHkucmVtb3ZlQ2hpbGQoZGl2KVxuICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICBnZXRDb250ZW50RWRpdGFibGVDYXJldFBvc2l0aW9uKHNlbGVjdGVkTm9kZVBvc2l0aW9uKSB7XG4gICAgICAgIGxldCBtYXJrZXJUZXh0Q2hhciA9ICfvu78nXG4gICAgICAgIGxldCBtYXJrZXJFbCwgbWFya2VySWQgPSBgc2VsXyR7bmV3IERhdGUoKS5nZXRUaW1lKCl9XyR7TWF0aC5yYW5kb20oKS50b1N0cmluZygpLnN1YnN0cigyKX1gXG4gICAgICAgIGxldCByYW5nZVxuICAgICAgICBsZXQgc2VsID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKVxuICAgICAgICBsZXQgcHJldlJhbmdlID0gc2VsLmdldFJhbmdlQXQoMClcblxuICAgICAgICByYW5nZSA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVSYW5nZSgpXG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KHNlbC5hbmNob3JOb2RlLCBzZWxlY3RlZE5vZGVQb3NpdGlvbilcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKHNlbC5hbmNob3JOb2RlLCBzZWxlY3RlZE5vZGVQb3NpdGlvbilcblxuICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSlcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIG1hcmtlciBlbGVtZW50IGNvbnRhaW5pbmcgYSBzaW5nbGUgaW52aXNpYmxlIGNoYXJhY3RlciB1c2luZyBET00gbWV0aG9kcyBhbmQgaW5zZXJ0IGl0XG4gICAgICAgIG1hcmtlckVsID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBtYXJrZXJFbC5pZCA9IG1hcmtlcklkXG5cbiAgICAgICAgbWFya2VyRWwuYXBwZW5kQ2hpbGQodGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVRleHROb2RlKG1hcmtlclRleHRDaGFyKSlcbiAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZShtYXJrZXJFbClcbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICAgIHNlbC5hZGRSYW5nZShwcmV2UmFuZ2UpXG5cbiAgICAgICAgbGV0IHJlY3QgPSBtYXJrZXJFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgICAgIGxldCB3aW5kb3dMZWZ0ID0gKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2Muc2Nyb2xsTGVmdCkgLSAoZG9jLmNsaWVudExlZnQgfHwgMClcbiAgICAgICAgbGV0IHdpbmRvd1RvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKVxuICAgICAgICBsZXQgY29vcmRpbmF0ZXMgPSB7XG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW5kb3dMZWZ0LFxuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIG1hcmtlckVsLm9mZnNldEhlaWdodCArIHdpbmRvd1RvcFxuICAgICAgICB9XG4gICAgICAgIGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIGxldCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblxuICAgICAgICBsZXQgbWVudURpbWVuc2lvbnMgPSB0aGlzLmdldE1lbnVEaW1lbnNpb25zKClcbiAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcblxuICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuLnJpZ2h0KSB7XG4gICAgICAgICAgICBjb29yZGluYXRlcy5sZWZ0ID0gJ2F1dG8nXG4gICAgICAgICAgICBjb29yZGluYXRlcy5yaWdodCA9IHdpbmRvd1dpZHRoIC0gcmVjdC5sZWZ0IC0gd2luZG93TGVmdFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhcmVudEhlaWdodCA9IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyXG4gICAgICAgICAgICA/IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgOiB0aGlzLmdldERvY3VtZW50KCkuYm9keS5vZmZzZXRIZWlnaHRcblxuICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuLmJvdHRvbSkge1xuICAgICAgICAgICAgbGV0IHBhcmVudFJlY3QgPSB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lclxuICAgICAgICAgICAgICAgID8gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICA6IHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICBsZXQgc2Nyb2xsU3RpbGxBdmFpbGFibGUgPSBwYXJlbnRIZWlnaHQgLSAod2luZG93SGVpZ2h0IC0gcGFyZW50UmVjdC50b3ApXG5cbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnRvcCA9ICdhdXRvJ1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMuYm90dG9tID0gc2Nyb2xsU3RpbGxBdmFpbGFibGUgKyAod2luZG93SGVpZ2h0IC0gcmVjdC50b3ApXG4gICAgICAgIH1cblxuICAgICAgICBtZW51SXNPZmZTY3JlZW4gPSB0aGlzLmlzTWVudU9mZlNjcmVlbihjb29yZGluYXRlcywgbWVudURpbWVuc2lvbnMpXG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4ubGVmdCkge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMubGVmdCA9IHdpbmRvd1dpZHRoID4gbWVudURpbWVuc2lvbnMud2lkdGhcbiAgICAgICAgICAgICAgICA/IHdpbmRvd0xlZnQgKyB3aW5kb3dXaWR0aCAtIG1lbnVEaW1lbnNpb25zLndpZHRoXG4gICAgICAgICAgICAgICAgOiB3aW5kb3dMZWZ0XG4gICAgICAgICAgICBkZWxldGUgY29vcmRpbmF0ZXMucmlnaHRcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuLnRvcCkge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMudG9wID0gd2luZG93SGVpZ2h0ID4gbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgICAgICAgICAgPyB3aW5kb3dUb3AgKyB3aW5kb3dIZWlnaHQgLSBtZW51RGltZW5zaW9ucy5oZWlnaHRcbiAgICAgICAgICAgICAgICA6IHdpbmRvd1RvcFxuICAgICAgICAgICAgZGVsZXRlIGNvb3JkaW5hdGVzLmJvdHRvbVxuICAgICAgICB9XG5cbiAgICAgICAgbWFya2VyRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtYXJrZXJFbClcbiAgICAgICAgcmV0dXJuIGNvb3JkaW5hdGVzXG4gICAgfVxuXG4gICAgc2Nyb2xsSW50b1ZpZXcoZWxlbSkge1xuICAgICAgICBsZXQgcmVhc29uYWJsZUJ1ZmZlciA9IDIwLFxuICAgICAgICAgICAgY2xpZW50UmVjdFxuICAgICAgICBsZXQgbWF4U2Nyb2xsRGlzcGxhY2VtZW50ID0gMTAwXG4gICAgICAgIGxldCBlID0gdGhpcy5tZW51XG5cbiAgICAgICAgaWYgKHR5cGVvZiBlID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgICAgIHdoaWxlIChjbGllbnRSZWN0ID09PSB1bmRlZmluZWQgfHwgY2xpZW50UmVjdC5oZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgIGNsaWVudFJlY3QgPSBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgICAgICAgIGlmIChjbGllbnRSZWN0LmhlaWdodCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGUgPSBlLmNoaWxkTm9kZXNbMF1cbiAgICAgICAgICAgICAgICBpZiAoZSA9PT0gdW5kZWZpbmVkIHx8ICFlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbVRvcCA9IGNsaWVudFJlY3QudG9wXG4gICAgICAgIGxldCBlbGVtQm90dG9tID0gZWxlbVRvcCArIGNsaWVudFJlY3QuaGVpZ2h0XG5cbiAgICAgICAgaWYgKGVsZW1Ub3AgPCAwKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgd2luZG93LnBhZ2VZT2Zmc2V0ICsgY2xpZW50UmVjdC50b3AgLSByZWFzb25hYmxlQnVmZmVyKVxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1Cb3R0b20gPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgICAgIGxldCBtYXhZID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgY2xpZW50UmVjdC50b3AgLSByZWFzb25hYmxlQnVmZmVyXG5cbiAgICAgICAgICAgIGlmIChtYXhZIC0gd2luZG93LnBhZ2VZT2Zmc2V0ID4gbWF4U2Nyb2xsRGlzcGxhY2VtZW50KSB7XG4gICAgICAgICAgICAgICAgbWF4WSA9IHdpbmRvdy5wYWdlWU9mZnNldCArIG1heFNjcm9sbERpc3BsYWNlbWVudFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdGFyZ2V0WSA9IHdpbmRvdy5wYWdlWU9mZnNldCAtICh3aW5kb3cuaW5uZXJIZWlnaHQgLSBlbGVtQm90dG9tKVxuXG4gICAgICAgICAgICBpZiAodGFyZ2V0WSA+IG1heFkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRZID0gbWF4WVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgdGFyZ2V0WSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlUmFuZ2U7XG4iLCIvLyBUaGFua3MgdG8gaHR0cHM6Ly9naXRodWIuY29tL21hdHR5b3JrL2Z1enp5XG5jbGFzcyBUcmlidXRlU2VhcmNoIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmlidXRlKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZSA9IHRyaWJ1dGVcbiAgICAgICAgdGhpcy50cmlidXRlLnNlYXJjaCA9IHRoaXNcbiAgICB9XG5cbiAgICBzaW1wbGVGaWx0ZXIocGF0dGVybiwgYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5LmZpbHRlcihzdHJpbmcgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVzdChwYXR0ZXJuLCBzdHJpbmcpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdGVzdChwYXR0ZXJuLCBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2gocGF0dGVybiwgc3RyaW5nKSAhPT0gbnVsbFxuICAgIH1cblxuICAgIG1hdGNoKHBhdHRlcm4sIHN0cmluZywgb3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgICAgICBsZXQgcGF0dGVybklkeCA9IDAsXG4gICAgICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgICAgIGxlbiA9IHN0cmluZy5sZW5ndGgsXG4gICAgICAgICAgICB0b3RhbFNjb3JlID0gMCxcbiAgICAgICAgICAgIGN1cnJTY29yZSA9IDAsXG4gICAgICAgICAgICBwcmUgPSBvcHRzLnByZSB8fCAnJyxcbiAgICAgICAgICAgIHBvc3QgPSBvcHRzLnBvc3QgfHwgJycsXG4gICAgICAgICAgICBjb21wYXJlU3RyaW5nID0gb3B0cy5jYXNlU2Vuc2l0aXZlICYmIHN0cmluZyB8fCBzdHJpbmcudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgIGNoLCBjb21wYXJlQ2hhclxuXG4gICAgICAgIHBhdHRlcm4gPSBvcHRzLmNhc2VTZW5zaXRpdmUgJiYgcGF0dGVybiB8fCBwYXR0ZXJuLnRvTG93ZXJDYXNlKClcblxuICAgICAgICBsZXQgcGF0dGVybkNhY2hlID0gdGhpcy50cmF2ZXJzZShjb21wYXJlU3RyaW5nLCBwYXR0ZXJuLCAwLCAwLCBbXSlcbiAgICAgICAgaWYgKCFwYXR0ZXJuQ2FjaGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVuZGVyZWQ6IHRoaXMucmVuZGVyKHN0cmluZywgcGF0dGVybkNhY2hlLmNhY2hlLCBwcmUsIHBvc3QpLFxuICAgICAgICAgICAgc2NvcmU6IHBhdHRlcm5DYWNoZS5zY29yZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhdmVyc2Uoc3RyaW5nLCBwYXR0ZXJuLCBzdHJpbmdJbmRleCwgcGF0dGVybkluZGV4LCBwYXR0ZXJuQ2FjaGUpIHtcbiAgICAgICAgLy8gaWYgdGhlIHBhdHRlcm4gc2VhcmNoIGF0IGVuZFxuICAgICAgICBpZiAocGF0dGVybi5sZW5ndGggPT09IHBhdHRlcm5JbmRleCkge1xuXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgc2NvcmUgYW5kIGNvcHkgdGhlIGNhY2hlIGNvbnRhaW5pbmcgdGhlIGluZGljZXMgd2hlcmUgaXQncyBmb3VuZFxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzY29yZTogdGhpcy5jYWxjdWxhdGVTY29yZShwYXR0ZXJuQ2FjaGUpLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBwYXR0ZXJuQ2FjaGUuc2xpY2UoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgc3RyaW5nIGF0IGVuZCBvciByZW1haW5pbmcgcGF0dGVybiA+IHJlbWFpbmluZyBzdHJpbmdcbiAgICAgICAgaWYgKHN0cmluZy5sZW5ndGggPT09IHN0cmluZ0luZGV4IHx8IHBhdHRlcm4ubGVuZ3RoIC0gcGF0dGVybkluZGV4ID4gc3RyaW5nLmxlbmd0aCAtIHN0cmluZ0luZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYyA9IHBhdHRlcm5bcGF0dGVybkluZGV4XVxuICAgICAgICBsZXQgaW5kZXggPSBzdHJpbmcuaW5kZXhPZihjLCBzdHJpbmdJbmRleClcbiAgICAgICAgbGV0IGJlc3QsIHRlbXBcblxuICAgICAgICB3aGlsZSAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgcGF0dGVybkNhY2hlLnB1c2goaW5kZXgpXG4gICAgICAgICAgICB0ZW1wID0gdGhpcy50cmF2ZXJzZShzdHJpbmcsIHBhdHRlcm4sIGluZGV4ICsgMSwgcGF0dGVybkluZGV4ICsgMSwgcGF0dGVybkNhY2hlKVxuICAgICAgICAgICAgcGF0dGVybkNhY2hlLnBvcCgpXG5cbiAgICAgICAgICAgIC8vIGlmIGRvd25zdHJlYW0gdHJhdmVyc2FsIGZhaWxlZCwgcmV0dXJuIGJlc3QgYW5zd2VyIHNvIGZhclxuICAgICAgICAgICAgaWYgKCF0ZW1wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFiZXN0IHx8IGJlc3Quc2NvcmUgPCB0ZW1wLnNjb3JlKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IHRlbXBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5kZXggPSBzdHJpbmcuaW5kZXhPZihjLCBpbmRleCArIDEpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYmVzdFxuICAgIH1cblxuICAgIGNhbGN1bGF0ZVNjb3JlKHBhdHRlcm5DYWNoZSkge1xuICAgICAgICBsZXQgc2NvcmUgPSAwXG4gICAgICAgIGxldCB0ZW1wID0gMVxuXG4gICAgICAgIHBhdHRlcm5DYWNoZS5mb3JFYWNoKChpbmRleCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhdHRlcm5DYWNoZVtpIC0gMV0gKyAxID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wICs9IHRlbXAgKyAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NvcmUgKz0gdGVtcFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBzY29yZVxuICAgIH1cblxuICAgIHJlbmRlcihzdHJpbmcsIGluZGljZXMsIHByZSwgcG9zdCkge1xuICAgICAgICB2YXIgcmVuZGVyZWQgPSBzdHJpbmcuc3Vic3RyaW5nKDAsIGluZGljZXNbMF0pXG5cbiAgICAgICAgaW5kaWNlcy5mb3JFYWNoKChpbmRleCwgaSkgPT4ge1xuICAgICAgICAgICAgcmVuZGVyZWQgKz0gcHJlICsgc3RyaW5nW2luZGV4XSArIHBvc3QgK1xuICAgICAgICAgICAgICAgIHN0cmluZy5zdWJzdHJpbmcoaW5kZXggKyAxLCAoaW5kaWNlc1tpICsgMV0pID8gaW5kaWNlc1tpICsgMV0gOiBzdHJpbmcubGVuZ3RoKVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiByZW5kZXJlZFxuICAgIH1cblxuICAgIGZpbHRlcihwYXR0ZXJuLCBhcnIsIG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cbiAgICAgICAgcmV0dXJuIGFyclxuICAgICAgICAgICAgLnJlZHVjZSgocHJldiwgZWxlbWVudCwgaWR4LCBhcnIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3RyID0gZWxlbWVudFxuXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuZXh0cmFjdCkge1xuICAgICAgICAgICAgICAgICAgICBzdHIgPSBvcHRzLmV4dHJhY3QoZWxlbWVudClcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0cikgeyAvLyB0YWtlIGNhcmUgb2YgdW5kZWZpbmVkcyAvIG51bGxzIC8gZXRjLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gJydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCByZW5kZXJlZCA9IHRoaXMubWF0Y2gocGF0dGVybiwgc3RyLCBvcHRzKVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldltwcmV2Lmxlbmd0aF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmc6IHJlbmRlcmVkLnJlbmRlcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IHJlbmRlcmVkLnNjb3JlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGlkeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsOiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldlxuICAgICAgICAgICAgfSwgW10pXG5cbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGxldCBjb21wYXJlID0gYi5zY29yZSAtIGEuc2NvcmVcbiAgICAgICAgICAgIGlmIChjb21wYXJlKSByZXR1cm4gY29tcGFyZVxuICAgICAgICAgICAgcmV0dXJuIGEuaW5kZXggLSBiLmluZGV4XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlU2VhcmNoO1xuIiwiLyoqXG4qIFRyaWJ1dGUuanNcbiogTmF0aXZlIEVTNiBKYXZhU2NyaXB0IEBtZW50aW9uIFBsdWdpblxuKiovXG5cbmltcG9ydCBUcmlidXRlIGZyb20gXCIuL1RyaWJ1dGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZTtcbiIsImlmICghQXJyYXkucHJvdG90eXBlLmZpbmQpIHtcbiAgICBBcnJheS5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uKHByZWRpY2F0ZSkge1xuICAgICAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkucHJvdG90eXBlLmZpbmQgY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkJylcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3QgPSBPYmplY3QodGhpcylcbiAgICAgICAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoID4+PiAwXG4gICAgICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdXG4gICAgICAgIHZhciB2YWx1ZVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhbHVlID0gbGlzdFtpXVxuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG59XG5cbmlmICh3aW5kb3cgJiYgdHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gIGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMpIHtcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge1xuICAgICAgYnViYmxlczogZmFsc2UsXG4gICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgIGRldGFpbDogdW5kZWZpbmVkXG4gICAgfVxuICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbClcbiAgICByZXR1cm4gZXZ0XG4gIH1cblxuIGlmICh0eXBlb2Ygd2luZG93LkV2ZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZVxuIH1cblxuICB3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudFxufSJdfQ==
