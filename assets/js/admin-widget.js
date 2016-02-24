/**
 * Shopify Buy Button - v0.1.0 - 2016-02-24
 * http://webdevstudios.com
 *
 * Copyright (c) 2016;
 * Licensed GPLv2+
 */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createButtonModal;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var open = false,
    modal = undefined,
    html = sbbAdminModal.modal.trim(),
    closeModal = function closeModal() {
	if (modal && modal.remove) {
		modal.remove();
	}
	open = false;
}; /**
    * Shopify Buy Button - Add Button Modal
    * https://www.shopify.com/buy-button
    *
    * Licensed under the GPLv2+ license.
    */

/* global sbbAdminModal */


function createButtonModal(callback) {
	// Only open one at a time.
	if (open) {
		return;
	}
	open = true;

	// Add modal to document.
	modal = (0, _jquery2.default)(html).appendTo(document.body);

	// Handle close button event.
	modal.on('click', '.sbb-modal-close', function (e) {
		e.preventDefault();
		closeModal();
	});

	// Handle post message from iframe.
	window.addEventListener('message', function (event) {
		var origin = event.origin || event.originalEvent.origin;

		// Return if origin isn't shopify.
		if ('https://widgets.shopifyapps.com' !== origin) {
			return;
		}

		// If data returned, trigger callback.
		if (event.data.resourceType && event.data.resourceHandles && event.data.resourceHandles.length) {
			callback(event.data);
		}

		closeModal();
	});
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

var _addButtonModal = require('./add-button-modal');

var _addButtonModal2 = _interopRequireDefault(_addButtonModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Shopify Buy Button - Admin Widget
 * https://www.shopify.com/buy-button
 *
 * Licensed under the GPLv2+ license.
 */

(0, _jquery2.default)(function () {
	(0, _jquery2.default)(document.body).on('click', '#sbb-add-widget', function (e) {
		var $widgetContent = (0, _jquery2.default)(this).closest('.widget-content'),
		    $c = {
			inputType: $widgetContent.find('.sbb-hidden-embed_type'),
			inputShop: $widgetContent.find('.sbb-hidden-shop'),
			inputHandle: $widgetContent.find('.sbb-hidden-product_handle'),
			iframe: $widgetContent.find('.sbb-widget-preview')
		};

		e.preventDefault();

		(0, _addButtonModal2.default)(function (data) {
			var fakeEnterPress = new _jquery2.default.Event('keydown');

			fakeEnterPress.which = 13;

			$c.inputType.val(data.resourceType);
			$c.inputShop.val(data.shop);
			$c.inputHandle.val(data.resourceHandles.join(', '));

			$c.inputHandle.trigger(fakeEnterPress);

			$c.iframe.attr('src', document.location.protocol + '//' + document.location.host + '?product_handle=' + encodeURIComponent(data.resourceHandles.join(', ')) + '&shop=' + encodeURIComponent(data.shop) + '&embed_type=' + encodeURIComponent(data.resourceType));

			console.log(data);
		});
	});
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./add-button-modal":1}]},{},[2]);