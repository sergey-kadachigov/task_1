jQuery(function () {
	initOpenPanel();
});

function initOpenPanel() {
	jQuery('.fix-panel-wrap').openPanel();
};

//initOpenPanel
;(function ($) {
	function OpenPanel(options) {
		this.options = $.extend({
			x: 'left',
			y: 'top',
			position: 'left',
			holder: '.fix-panel-wrap',
			panel: '.fixed-panel',
			btn: '.panel-btn',
			btnClose: '.btn-close',
			activeClass: 'active',
			clickOutside: true
		}, options);
		this.init();
	}

	OpenPanel.prototype = {
		init: function () {
			if (this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.positionPanel();
			}
		},
		findElements: function () {
			this.holder = $(this.options.holder);
			this.btn = this.holder.find(this.options.btn);
			this.btnClose = this.holder.find(this.options.btnClose);
			this.panel = this.holder.find(this.options.panel);
			this.positionOpt = JSON.parse(this.panel.data('options')?this.panel.data('options').replace(/'/g, '"'):false) || {
				x: this.options.x,
				y: this.options.y,
				position: this.options.position
			};
			this.x = this.positionOpt.x;
			this.y = this.positionOpt.y;
			this.position = this.positionOpt.position;
		},
		attachEvents: function () {
			var self = this;
			this.btn.on('click.btn-click', function (e) {
				e.preventDefault();
				self.panelAction();
			});
			this.btnClose.on('click.btn-click', function (e) {
				e.preventDefault();
				self.panelClose();
			});

		},
		positionPanel: function () {
			var self = this;
			self.panel.addClass(self.y + ' ' + self.x + ' ' + 'animate-' + self.position);
			self.panel.removeAttr('data-options');

		},
		panelAction: function () {
			var self = this;
			if (self.holder.hasClass(self.options.activeClass)) {
				self.panelClose();
			} else {
				self.panelOpen();
			}
		},
		panelOpen: function () {
			var self = this;
			self.holder.addClass(self.options.activeClass);
			if (this.options.clickOutside) {
				this.activeClickOutside();
			}
		},
		panelClose: function () {
			this.holder.removeClass(this.options.activeClass);
		},
		activeClickOutside: function () {
			var self = this;
			var doc = $(document);
			doc.on('click.doc-click', function (e) {
				var target = $(e.target);
				if (target.closest(self.panel).length === 0 && target.closest(self.btn).length === 0 && !(target.hasClass(self.options.btn.replace('.','')))) {
					self.panelClose();
					doc.off('click.doc-click');
				}
			})
		},
		destroy: function () {
			this.btn.off('click.btn-click');
			this.btnClose.off('click.btn-click');
			$(document).off('click.doc-click');
			this.panel.removeClass(this.y + ' ' + this.x + ' ' + 'animate-' + this.position);
		}
	};

	// jquery plugin
	$.fn.openPanel = function (opt) {
		return this.each(function () {
			$(this).data('OpenPanel', new OpenPanel($.extend({
				holder: this
			}, opt)));
		});
	};
}(jQuery));