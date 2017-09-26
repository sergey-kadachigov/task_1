jQuery(function () {
	initOpenPanel();
});

function initOpenPanel() {
	jQuery('.fixed-panel').openPanel({});
};

//initOpenPanel
;(function ($) {
	function OpenPanel(options) {
		this.options = $.extend({
			x: 'left',
			y: 'top',
			position: 'left',
			holder: '.fixed-panel',
			btn: '.panel-btn',
			btnClose: '.btn-close',
			activeClass: 'open',
			inactiveClass: 'close',
			btnActiveClass: 'active'

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
			this.btn = $(this.options.btn);
			this.btnClose = this.holder.find(this.options.btnClose);
			this.positionOpt = eval('(' + this.holder.attr('data-options') + ')') || {
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
			this.btn.on('click', function (e) {
				e.preventDefault();
				self.panelAction($(this));
			});
			this.btnClose.on('click', function (e) {
				e.preventDefault();
				self.panelClose();
				$(self.btn).removeClass(self.options.btnActiveClass);
			});
			$(window).on('click',function (e) {
				if(self.holder.has(e.target).length === 0 && self.btn.has(e.target).length === 0 && !($(e.target).hasClass('panel-btn'))){
					self.panelClose();
					$(self.btn).removeClass(self.options.btnActiveClass);
				}
			})
		},
		positionPanel: function () {
			var self = this;
			self.holder.addClass(self.y + ' ' + self.x + ' ' + 'animate-' + self.position)
		},
		panelAction: function (item) {
			var self = this;
			item.toggleClass(self.options.btnActiveClass);
			if (item.hasClass(self.options.btnActiveClass)) {
				self.panelOpen();
			} else {
				self.panelClose();
			}
		},
		panelOpen: function () {
			var self = this;
			self.holder.addClass(self.options.activeClass);
			self.holder.removeClass(self.options.inactiveClass);


		},
		panelClose: function () {
			var self = this;
			self.holder.removeClass(self.options.activeClass);
			self.holder.addClass(self.options.inactiveClass);
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