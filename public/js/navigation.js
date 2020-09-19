/*
 * jQuery Superfish Menu Plugin - v1.7.9
 * Copyright (c) 2016 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */

!(function(a, b) {
	'use strict';
	var c = (function() {
		var c = {
				bcClass: 'sf-breadcrumb',
				menuClass: 'sf-js-enabled',
				anchorClass: 'sf-with-ul',
				menuArrowClass: 'sf-arrows'
			},
			d = (function() {
				var b = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent);
				return b && a('html').css('cursor', 'pointer').on('click', a.noop), b;
			})(),
			e = (function() {
				var a = document.documentElement.style;
				return 'behavior' in a && 'fill' in a && /iemobile/i.test(navigator.userAgent);
			})(),
			f = (function() {
				return !!b.PointerEvent;
			})(),
			g = function(a, b, d) {
				var e,
					f = c.menuClass;
				b.cssArrows && (f += ' ' + c.menuArrowClass), (e = d ? 'addClass' : 'removeClass'), a[e](f);
			},
			h = function(b, d) {
				return b
					.find('li.' + d.pathClass)
					.slice(0, d.pathLevels)
					.addClass(d.hoverClass + ' ' + c.bcClass)
					.filter(function() {
						return a(this).children(d.popUpSelector).hide().show().length;
					})
					.removeClass(d.pathClass);
			},
			i = function(a, b) {
				var d = b ? 'addClass' : 'removeClass';
				a.children('a')[d](c.anchorClass);
			},
			j = function(a) {
				var b = a.css('ms-touch-action'),
					c = a.css('touch-action');
				(c = c || b),
					(c = 'pan-y' === c ? 'auto' : 'pan-y'),
					a.css({ 'ms-touch-action': c, 'touch-action': c });
			},
			k = function(a) {
				return a.closest('.' + c.menuClass);
			},
			l = function(a) {
				return k(a).data('sfOptions');
			},
			m = function() {
				var b = a(this),
					c = l(b);
				clearTimeout(c.sfTimer), b.siblings().superfish('hide').end().superfish('show');
			},
			n = function(b) {
				(b.retainPath = a.inArray(this[0], b.$path) > -1),
					this.superfish('hide'),
					this.parents('.' + b.hoverClass).length ||
						(b.onIdle.call(k(this)), b.$path.length && a.proxy(m, b.$path)());
			},
			o = function() {
				var b = a(this),
					c = l(b);
				d ? a.proxy(n, b, c)() : (clearTimeout(c.sfTimer), (c.sfTimer = setTimeout(a.proxy(n, b, c), c.delay)));
			},
			p = function(b) {
				var c = a(this),
					d = l(c),
					e = c.siblings(b.data.popUpSelector);
				return d.onHandleTouch.call(e) === !1
					? this
					: void (
							e.length > 0 &&
							e.is(':hidden') &&
							(c.one('click.superfish', !1),
							'MSPointerDown' === b.type || 'pointerdown' === b.type
								? c.trigger('focus')
								: a.proxy(m, c.parent('li'))())
						);
			},
			q = function(b, c) {
				var g = 'li:has(' + c.popUpSelector + ')';
				a.fn.hoverIntent && !c.disableHI
					? b.hoverIntent(m, o, g)
					: b.on('mouseenter.superfish', g, m).on('mouseleave.superfish', g, o);
				var h = 'MSPointerDown.superfish';
				f && (h = 'pointerdown.superfish'),
					d || (h += ' touchend.superfish'),
					e && (h += ' mousedown.superfish'),
					b.on('focusin.superfish', 'li', m).on('focusout.superfish', 'li', o).on(h, 'a', c, p);
			};
		return {
			hide: function(b) {
				if (this.length) {
					var c = this,
						d = l(c);
					if (!d) return this;
					var e = d.retainPath === !0 ? d.$path : '',
						f = c
							.find('li.' + d.hoverClass)
							.add(this)
							.not(e)
							.removeClass(d.hoverClass)
							.children(d.popUpSelector),
						g = d.speedOut;
					if ((b && (f.show(), (g = 0)), (d.retainPath = !1), d.onBeforeHide.call(f) === !1)) return this;
					f.stop(!0, !0).animate(d.animationOut, g, function() {
						var b = a(this);
						d.onHide.call(b);
					});
				}
				return this;
			},
			show: function() {
				var a = l(this);
				if (!a) return this;
				var b = this.addClass(a.hoverClass),
					c = b.children(a.popUpSelector);
				return a.onBeforeShow.call(c) === !1
					? this
					: (c.stop(!0, !0).animate(a.animation, a.speed, function() {
							a.onShow.call(c);
						}),
						this);
			},
			destroy: function() {
				return this.each(function() {
					var b,
						d = a(this),
						e = d.data('sfOptions');
					return e
						? ((b = d.find(e.popUpSelector).parent('li')),
							clearTimeout(e.sfTimer),
							g(d, e),
							i(b),
							j(d),
							d.off('.superfish').off('.hoverIntent'),
							b.children(e.popUpSelector).attr('style', function(a, b) {
								return b.replace(/display[^;]+;?/g, '');
							}),
							e.$path.removeClass(e.hoverClass + ' ' + c.bcClass).addClass(e.pathClass),
							d.find('.' + e.hoverClass).removeClass(e.hoverClass),
							e.onDestroy.call(d),
							void d.removeData('sfOptions'))
						: !1;
				});
			},
			init: function(b) {
				return this.each(function() {
					var d = a(this);
					if (d.data('sfOptions')) return !1;
					var e = a.extend({}, a.fn.superfish.defaults, b),
						f = d.find(e.popUpSelector).parent('li');
					(e.$path = h(d, e)),
						d.data('sfOptions', e),
						g(d, e, !0),
						i(f, !0),
						j(d),
						q(d, e),
						f.not('.' + c.bcClass).superfish('hide', !0),
						e.onInit.call(this);
				});
			}
		};
	})();
	(a.fn.superfish = function(b, d) {
		return c[b]
			? c[b].apply(this, Array.prototype.slice.call(arguments, 1))
			: 'object' != typeof b && b
				? a.error('Method ' + b + ' does not exist on jQuery.fn.superfish')
				: c.init.apply(this, arguments);
	}),
		(a.fn.superfish.defaults = {
			popUpSelector: 'ul,.sf-mega',
			hoverClass: 'sfHover',
			pathClass: 'overrideThisToUse',
			pathLevels: 1,
			delay: 800,
			animation: { opacity: 'show' },
			animationOut: { opacity: 'hide' },
			speed: 'normal',
			speedOut: 'fast',
			cssArrows: !0,
			disableHI: !1,
			onInit: a.noop,
			onBeforeShow: a.noop,
			onShow: a.noop,
			onBeforeHide: a.noop,
			onHide: a.noop,
			onIdle: a.noop,
			onDestroy: a.noop,
			onHandleTouch: a.noop
		});
})(jQuery, window);

/**
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 **/
!(function(e) {
	e.fn.hoverIntent = function(t, n, o) {
		var r = { interval: 100, sensitivity: 7, timeout: 0 };
		r =
			'object' == typeof t
				? e.extend(r, t)
				: e.isFunction(n)
					? e.extend(r, { over: t, out: n, selector: o })
					: e.extend(r, { over: t, out: t, selector: n });
		var v,
			u,
			i,
			s,
			h = function(e) {
				(v = e.pageX), (u = e.pageY);
			},
			a = function(t, n) {
				return (
					(n.hoverIntent_t = clearTimeout(n.hoverIntent_t)),
					Math.abs(i - v) + Math.abs(s - u) < r.sensitivity
						? (e(n).off('mousemove.hoverIntent', h), (n.hoverIntent_s = 1), r.over.apply(n, [ t ]))
						: ((i = v),
							(s = u),
							(n.hoverIntent_t = setTimeout(function() {
								a(t, n);
							}, r.interval)),
							void 0)
				);
			},
			I = function(e, t) {
				return (t.hoverIntent_t = clearTimeout(t.hoverIntent_t)), (t.hoverIntent_s = 0), r.out.apply(t, [ e ]);
			},
			c = function(t) {
				var n = jQuery.extend({}, t),
					o = this;
				o.hoverIntent_t && (o.hoverIntent_t = clearTimeout(o.hoverIntent_t)),
					'mouseenter' == t.type
						? ((i = n.pageX),
							(s = n.pageY),
							e(o).on('mousemove.hoverIntent', h),
							1 != o.hoverIntent_s &&
								(o.hoverIntent_t = setTimeout(function() {
									a(n, o);
								}, r.interval)))
						: (e(o).off('mousemove.hoverIntent', h),
							1 == o.hoverIntent_s &&
								(o.hoverIntent_t = setTimeout(function() {
									I(n, o);
								}, r.timeout)));
			};
		return this.on({ 'mouseenter.hoverIntent': c, 'mouseleave.hoverIntent': c }, r.selector);
	};
})(jQuery);

/**
 * jquery.slimmenu.js
 * http://adnantopal.github.io/slimmenu/
 * Author: @adnantopal
 * Copyright 2013, Adnan Topal (atopal.com)
 * Licensed under the MIT license.
 */
!(function(e, i) {
	function n(i, n) {
		(this.element = i), (this.$elem = e(this.element)), (this.options = e.extend({}, t, n)), this.init();
	}
	var s = 'slimmenu',
		t = {
			resizeWidth: '768',
			collapserTitle: 'Main Menu',
			animSpeed: 'medium',
			easingEffect: null,
			indentChildren: !1,
			childrenIndenter: '&nbsp;&nbsp;'
		},
		l = 0;
	(n.prototype = {
		init: function() {
			var n,
				s = this.options,
				t = this.$elem,
				l =
					'<div class="menu-collapser">' +
					s.collapserTitle +
					'<div class="collapse-button"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></div></div>';
			t.before(l),
				(n = t.prev('.menu-collapser')),
				t.on('click', '.sub-collapser', function(i) {
					i.preventDefault(), i.stopPropagation();
					var n = e(this).closest('li');
					e(this).hasClass('expanded')
						? (e(this).removeClass('expanded'),
							e(this).find('i').html('&#9660;'),
							n.find('>ul').slideUp(s.animSpeed, s.easingEffect))
						: (e(this).addClass('expanded'),
							e(this).find('i').html('&#9650;'),
							n.find('>ul').slideDown(s.animSpeed, s.easingEffect));
				}),
				n.on('click', '.collapse-button', function(e) {
					e.preventDefault(), t.slideToggle(s.animSpeed, s.easingEffect);
				}),
				this.resizeMenu({ data: { el: this.element, options: this.options } }),
				e(i).on('resize', { el: this.element, options: this.options }, this.resizeMenu);
		},
		resizeMenu: function(s) {
			var t = e(i),
				a = s.data.options,
				o = e(s.data.el),
				d = e('body').find('.menu-collapser');
			l != t.width() &&
				((l = t.width()),
				o.find('li').each(function() {
					e(this).has('ul').length &&
						(e(this).has('.sub-collapser').length
							? e(this).children('.sub-collapser i').html('&#9660;')
							: e(this).append('<span class="sub-collapser"><i>&#9660;</i></span>')),
						e(this).children('ul').hide(),
						e(this).find('.sub-collapser').removeClass('expanded').children('i').html('&#9660;');
				}),
				a.resizeWidth >= t.width()
					? (a.indentChildren &&
							o.find('ul').each(function() {
								var i = e(this).parents('ul').length;
								e(this).children('li').children('a').has('i').length ||
									e(this).children('li').children('a').prepend(n.prototype.indent(i, a));
							}),
						o.find('li').has('ul').off('mouseenter mouseleave'),
						o.addClass('collapsed').hide(),
						d.show())
					: (o
							.find('li')
							.has('ul')
							.on('mouseenter', function() {
								e(this).find('>ul').stop().slideDown(a.animSpeed, a.easingEffect);
							})
							.on('mouseleave', function() {
								e(this).find('>ul').stop().slideUp(a.animSpeed, a.easingEffect);
							}),
						o.find('li > a > i').remove(),
						o.removeClass('collapsed').show(),
						d.hide()));
		},
		indent: function(e, i) {
			for (var n = '', s = 0; e > s; s++) n += i.childrenIndenter;
			return '<i>' + n + '</i>';
		}
	}),
		(e.fn[s] = function(i) {
			return this.each(function() {
				e.data(this, 'plugin_' + s) || e.data(this, 'plugin_' + s, new n(this, i));
			});
		});
})(jQuery, window, document);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
*/
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
	def: 'easeOutQuad',
	swing: function(e, f, a, h, g) {
		return jQuery.easing[jQuery.easing.def](e, f, a, h, g);
	},
	easeInQuad: function(e, f, a, h, g) {
		return h * (f /= g) * f + a;
	},
	easeOutQuad: function(e, f, a, h, g) {
		return -h * (f /= g) * (f - 2) + a;
	},
	easeInOutQuad: function(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f + a;
		}
		return -h / 2 * (--f * (f - 2) - 1) + a;
	},
	easeInCubic: function(e, f, a, h, g) {
		return h * (f /= g) * f * f + a;
	},
	easeOutCubic: function(e, f, a, h, g) {
		return h * ((f = f / g - 1) * f * f + 1) + a;
	},
	easeInOutCubic: function(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f * f + a;
		}
		return h / 2 * ((f -= 2) * f * f + 2) + a;
	},
	easeInQuart: function(e, f, a, h, g) {
		return h * (f /= g) * f * f * f + a;
	},
	easeOutQuart: function(e, f, a, h, g) {
		return -h * ((f = f / g - 1) * f * f * f - 1) + a;
	},
	easeInOutQuart: function(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f * f * f + a;
		}
		return -h / 2 * ((f -= 2) * f * f * f - 2) + a;
	},
	easeInQuint: function(e, f, a, h, g) {
		return h * (f /= g) * f * f * f * f + a;
	},
	easeOutQuint: function(e, f, a, h, g) {
		return h * ((f = f / g - 1) * f * f * f * f + 1) + a;
	},
	easeInOutQuint: function(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return h / 2 * f * f * f * f * f + a;
		}
		return h / 2 * ((f -= 2) * f * f * f * f + 2) + a;
	},
	easeInSine: function(e, f, a, h, g) {
		return -h * Math.cos(f / g * (Math.PI / 2)) + h + a;
	},
	easeOutSine: function(e, f, a, h, g) {
		return h * Math.sin(f / g * (Math.PI / 2)) + a;
	},
	easeInOutSine: function(e, f, a, h, g) {
		return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a;
	},
	easeInExpo: function(e, f, a, h, g) {
		return f == 0 ? a : h * Math.pow(2, 10 * (f / g - 1)) + a;
	},
	easeOutExpo: function(e, f, a, h, g) {
		return f == g ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a;
	},
	easeInOutExpo: function(e, f, a, h, g) {
		if (f == 0) {
			return a;
		}
		if (f == g) {
			return a + h;
		}
		if ((f /= g / 2) < 1) {
			return h / 2 * Math.pow(2, 10 * (f - 1)) + a;
		}
		return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a;
	},
	easeInCirc: function(e, f, a, h, g) {
		return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a;
	},
	easeOutCirc: function(e, f, a, h, g) {
		return h * Math.sqrt(1 - (f = f / g - 1) * f) + a;
	},
	easeInOutCirc: function(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a;
		}
		return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a;
	},
	easeInElastic: function(f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e;
		}
		if ((h /= k) == 1) {
			return e + l;
		}
		if (!j) {
			j = k * 0.3;
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4;
		} else {
			var i = j / (2 * Math.PI) * Math.asin(l / g);
		}
		return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e;
	},
	easeOutElastic: function(f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e;
		}
		if ((h /= k) == 1) {
			return e + l;
		}
		if (!j) {
			j = k * 0.3;
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4;
		} else {
			var i = j / (2 * Math.PI) * Math.asin(l / g);
		}
		return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e;
	},
	easeInOutElastic: function(f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e;
		}
		if ((h /= k / 2) == 2) {
			return e + l;
		}
		if (!j) {
			j = k * (0.3 * 1.5);
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4;
		} else {
			var i = j / (2 * Math.PI) * Math.asin(l / g);
		}
		if (h < 1) {
			return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e;
		}
		return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e;
	},
	easeInBack: function(e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158;
		}
		return i * (f /= h) * f * ((g + 1) * f - g) + a;
	},
	easeOutBack: function(e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158;
		}
		return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a;
	},
	easeInOutBack: function(e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158;
		}
		if ((f /= h / 2) < 1) {
			return i / 2 * (f * f * (((g *= 1.525) + 1) * f - g)) + a;
		}
		return i / 2 * ((f -= 2) * f * (((g *= 1.525) + 1) * f + g) + 2) + a;
	},
	easeInBounce: function(e, f, a, h, g) {
		return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a;
	},
	easeOutBounce: function(e, f, a, h, g) {
		if ((f /= g) < 1 / 2.75) {
			return h * (7.5625 * f * f) + a;
		} else {
			if (f < 2 / 2.75) {
				return h * (7.5625 * (f -= 1.5 / 2.75) * f + 0.75) + a;
			} else {
				if (f < 2.5 / 2.75) {
					return h * (7.5625 * (f -= 2.25 / 2.75) * f + 0.9375) + a;
				} else {
					return h * (7.5625 * (f -= 2.625 / 2.75) * f + 0.984375) + a;
				}
			}
		}
	},
	easeInOutBounce: function(e, f, a, h, g) {
		if (f < g / 2) {
			return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a;
		}
		return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a;
	}
});

/*
 * ScrollToFixed
 * https://github.com/bigspotteddog/ScrollToFixed
 *
 * Copyright (c) 2011 Joseph Cava-Lynch
 * MIT license
 */
(function(a) {
	a.isScrollToFixed = function(b) {
		return !!a(b).data('ScrollToFixed');
	};
	a.ScrollToFixed = function(d, i) {
		var m = this;
		m.$el = a(d);
		m.el = d;
		m.$el.data('ScrollToFixed', m);
		var c = false;
		var H = m.$el;
		var I;
		var F;
		var k;
		var e;
		var z;
		var E = 0;
		var r = 0;
		var j = -1;
		var f = -1;
		var u = null;
		var A;
		var g;
		function v() {
			H.trigger('preUnfixed.ScrollToFixed');
			l();
			H.trigger('unfixed.ScrollToFixed');
			f = -1;
			E = H.offset().top;
			r = H.offset().left;
			if (m.options.offsets) {
				r += H.offset().left - H.position().left;
			}
			if (j == -1) {
				j = r;
			}
			I = H.css('position');
			c = true;
			if (m.options.bottom != -1) {
				H.trigger('preFixed.ScrollToFixed');
				x();
				H.trigger('fixed.ScrollToFixed');
			}
		}
		function o() {
			var J = m.options.limit;
			if (!J) {
				return 0;
			}
			if (typeof J === 'function') {
				return J.apply(H);
			}
			return J;
		}
		function q() {
			return I === 'fixed';
		}
		function y() {
			return I === 'absolute';
		}
		function h() {
			return !(q() || y());
		}
		function x() {
			if (!q()) {
				var J = H[0].getBoundingClientRect();
				u.css({ display: H.css('display'), width: J.width, height: J.height, float: H.css('float') });
				cssOptions = {
					'z-index': m.options.zIndex,
					position: 'fixed',
					top: m.options.bottom == -1 ? t() : '',
					bottom: m.options.bottom == -1 ? '' : m.options.bottom,
					'margin-left': '0px'
				};
				if (!m.options.dontSetWidth) {
					cssOptions.width = H.css('width');
				}
				H.css(cssOptions);
				H.addClass(m.options.baseClassName);
				if (m.options.className) {
					H.addClass(m.options.className);
				}
				I = 'fixed';
			}
		}
		function b() {
			var K = o();
			var J = r;
			if (m.options.removeOffsets) {
				J = '';
				K = K - E;
			}
			cssOptions = { position: 'absolute', top: K, left: J, 'margin-left': '0px', bottom: '' };
			if (!m.options.dontSetWidth) {
				cssOptions.width = H.css('width');
			}
			H.css(cssOptions);
			I = 'absolute';
		}
		function l() {
			if (!h()) {
				f = -1;
				u.css('display', 'none');
				H.css({ 'z-index': z, width: '', position: F, left: '', top: e, 'margin-left': '' });
				H.removeClass('scroll-to-fixed-fixed');
				if (m.options.className) {
					H.removeClass(m.options.className);
				}
				I = null;
			}
		}
		function w(J) {
			if (J != f) {
				H.css('left', r - J);
				f = J;
			}
		}
		function t() {
			var J = m.options.marginTop;
			if (!J) {
				return 0;
			}
			if (typeof J === 'function') {
				return J.apply(H);
			}
			return J;
		}
		function B() {
			if (!a.isScrollToFixed(H) || H.is(':hidden')) {
				return;
			}
			var M = c;
			var L = h();
			if (!c) {
				v();
			} else {
				if (h()) {
					E = H.offset().top;
					r = H.offset().left;
				}
			}
			var J = a(window).scrollLeft();
			var N = a(window).scrollTop();
			var K = o();
			if (m.options.minWidth && a(window).width() < m.options.minWidth) {
				if (!h() || !M) {
					p();
					H.trigger('preUnfixed.ScrollToFixed');
					l();
					H.trigger('unfixed.ScrollToFixed');
				}
			} else {
				if (m.options.maxWidth && a(window).width() > m.options.maxWidth) {
					if (!h() || !M) {
						p();
						H.trigger('preUnfixed.ScrollToFixed');
						l();
						H.trigger('unfixed.ScrollToFixed');
					}
				} else {
					if (m.options.bottom == -1) {
						if (K > 0 && N >= K - t()) {
							if (!L && (!y() || !M)) {
								p();
								H.trigger('preAbsolute.ScrollToFixed');
								b();
								H.trigger('unfixed.ScrollToFixed');
							}
						} else {
							if (N >= E - t()) {
								if (!q() || !M) {
									p();
									H.trigger('preFixed.ScrollToFixed');
									x();
									f = -1;
									H.trigger('fixed.ScrollToFixed');
								}
								w(J);
							} else {
								if (!h() || !M) {
									p();
									H.trigger('preUnfixed.ScrollToFixed');
									l();
									H.trigger('unfixed.ScrollToFixed');
								}
							}
						}
					} else {
						if (K > 0) {
							if (N + a(window).height() - H.outerHeight(true) >= K - (t() || -n())) {
								if (q()) {
									p();
									H.trigger('preUnfixed.ScrollToFixed');
									if (F === 'absolute') {
										b();
									} else {
										l();
									}
									H.trigger('unfixed.ScrollToFixed');
								}
							} else {
								if (!q()) {
									p();
									H.trigger('preFixed.ScrollToFixed');
									x();
								}
								w(J);
								H.trigger('fixed.ScrollToFixed');
							}
						} else {
							w(J);
						}
					}
				}
			}
		}
		function n() {
			if (!m.options.bottom) {
				return 0;
			}
			return m.options.bottom;
		}
		function p() {
			var J = H.css('position');
			if (J == 'absolute') {
				H.trigger('postAbsolute.ScrollToFixed');
			} else {
				if (J == 'fixed') {
					H.trigger('postFixed.ScrollToFixed');
				} else {
					H.trigger('postUnfixed.ScrollToFixed');
				}
			}
		}
		var D = function(J) {
			if (H.is(':visible')) {
				c = false;
				B();
			} else {
				l();
			}
		};
		var G = function(J) {
			!!window.requestAnimationFrame ? requestAnimationFrame(B) : B();
		};
		var C = function() {
			var K = document.body;
			if (document.createElement && K && K.appendChild && K.removeChild) {
				var M = document.createElement('div');
				if (!M.getBoundingClientRect) {
					return null;
				}
				M.innerHTML = 'x';
				M.style.cssText = 'position:fixed;top:100px;';
				K.appendChild(M);
				var N = K.style.height,
					O = K.scrollTop;
				K.style.height = '3000px';
				K.scrollTop = 500;
				var J = M.getBoundingClientRect().top;
				K.style.height = N;
				var L = J === 100;
				K.removeChild(M);
				K.scrollTop = O;
				return L;
			}
			return null;
		};
		var s = function(J) {
			J = J || window.event;
			if (J.preventDefault) {
				J.preventDefault();
			}
			J.returnValue = false;
		};
		m.init = function() {
			m.options = a.extend({}, a.ScrollToFixed.defaultOptions, i);
			z = H.css('z-index');
			m.$el.css('z-index', m.options.zIndex);
			u = a('<div />');
			I = H.css('position');
			F = H.css('position');
			k = H.css('float');
			e = H.css('top');
			if (h()) {
				m.$el.after(u);
			}
			a(window).bind('resize.ScrollToFixed', D);
			a(window).bind('scroll.ScrollToFixed', G);
			if ('ontouchmove' in window) {
				a(window).bind('touchmove.ScrollToFixed', B);
			}
			if (m.options.preFixed) {
				H.bind('preFixed.ScrollToFixed', m.options.preFixed);
			}
			if (m.options.postFixed) {
				H.bind('postFixed.ScrollToFixed', m.options.postFixed);
			}
			if (m.options.preUnfixed) {
				H.bind('preUnfixed.ScrollToFixed', m.options.preUnfixed);
			}
			if (m.options.postUnfixed) {
				H.bind('postUnfixed.ScrollToFixed', m.options.postUnfixed);
			}
			if (m.options.preAbsolute) {
				H.bind('preAbsolute.ScrollToFixed', m.options.preAbsolute);
			}
			if (m.options.postAbsolute) {
				H.bind('postAbsolute.ScrollToFixed', m.options.postAbsolute);
			}
			if (m.options.fixed) {
				H.bind('fixed.ScrollToFixed', m.options.fixed);
			}
			if (m.options.unfixed) {
				H.bind('unfixed.ScrollToFixed', m.options.unfixed);
			}
			if (m.options.spacerClass) {
				u.addClass(m.options.spacerClass);
			}
			H.bind('resize.ScrollToFixed', function() {
				u.height(H.height());
			});
			H.bind('scroll.ScrollToFixed', function() {
				H.trigger('preUnfixed.ScrollToFixed');
				l();
				H.trigger('unfixed.ScrollToFixed');
				B();
			});
			H.bind('detach.ScrollToFixed', function(J) {
				s(J);
				H.trigger('preUnfixed.ScrollToFixed');
				l();
				H.trigger('unfixed.ScrollToFixed');
				a(window).unbind('resize.ScrollToFixed', D);
				a(window).unbind('scroll.ScrollToFixed', G);
				H.unbind('.ScrollToFixed');
				u.remove();
				m.$el.removeData('ScrollToFixed');
			});
			D();
		};
		m.init();
	};
	a.ScrollToFixed.defaultOptions = {
		marginTop: 0,
		limit: 0,
		bottom: -1,
		zIndex: 1000,
		baseClassName: 'scroll-to-fixed-fixed'
	};
	a.fn.scrollToFixed = function(b) {
		return this.each(function() {
			new a.ScrollToFixed(this, b);
		});
	};
})(jQuery);

/*!
 * HC-Sticky
 * =========
 * Version: 2.1.1
 * Author: Some Web Media
 * Author URL: http://somewebmedia.com
 * Plugin URL: https://github.com/somewebmedia/hc-sticky
 * Description: Cross-browser plugin that makes any element on your page visible while you scroll
 * License: MIT
 */
!(function(t, e) {
	'use strict';
	if ('object' == typeof module && 'object' == typeof module.exports) {
		if (!t.document) throw new Error('HC-Sticky requires a browser to run.');
		module.exports = e(t);
	} else 'function' == typeof define && define.amd ? define('hcSticky', [], e(t)) : e(t);
})('undefined' != typeof window ? window : this, function(t) {
	'use strict';
	var e = {
			top: 0,
			bottom: 0,
			bottomEnd: 0,
			innerTop: 0,
			innerSticker: null,
			stickyClass: 'sticky',
			stickTo: null,
			followScroll: !0,
			queries: null,
			queryFlow: 'down',
			onStart: null,
			onStop: null,
			onBeforeResize: null,
			onResize: null,
			resizeDebounce: 100,
			disable: !1
		},
		o = t.document,
		i = function(n, s) {
			if (('string' == typeof n && (n = o.querySelector(n)), !n)) return !1;
			var r = {},
				l = i.Helpers,
				a = n.parentNode;
			'static' === l.getStyle(a, 'position') && (a.style.position = 'relative');
			var c = function() {
					var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					(l.isEmptyObject(t) && r) || (r = Object.assign({}, e, r, t));
				},
				f = function() {
					return r.disable;
				},
				d = function() {
					if (r.queries) {
						var o = t.innerWidth,
							i = r.queryFlow,
							n = r.queries;
						if (
							((function(t) {
								r = Object.assign({}, e, t || {});
							})(s),
							'up' === i)
						)
							for (var a in n) o >= a && !l.isEmptyObject(n[a]) && c(n[a]);
						else {
							var f = [];
							for (var d in r.queries) {
								var u = {};
								(u[d] = n[d]), f.push(u);
							}
							for (var p = f.length - 1; p >= 0; p--) {
								var g = f[p],
									m = Object.keys(g)[0];
								o <= m && !l.isEmptyObject(g[m]) && c(g[m]);
							}
						}
					}
				},
				u = {
					css: {},
					position: null,
					stick: function() {
						var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
						l.hasClass(n, r.stickyClass) ||
							(!1 === p.isAttached && p.attach(),
							(u.position = 'fixed'),
							(n.style.position = 'fixed'),
							(n.style.left = p.offsetLeft + 'px'),
							(n.style.width = p.width),
							void 0 === t.bottom ? (n.style.bottom = 'auto') : (n.style.bottom = t.bottom + 'px'),
							void 0 === t.top ? (n.style.top = 'auto') : (n.style.top = t.top + 'px'),
							n.classList ? n.classList.add(r.stickyClass) : (n.className += ' ' + r.stickyClass),
							r.onStart && r.onStart.call(n, r));
					},
					reset: function() {
						var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
						if (
							((t.disable = t.disable || !1),
							'fixed' === u.position ||
								null === u.position ||
								!(
									(void 0 === t.top && void 0 === t.bottom) ||
									(void 0 !== t.top && (parseInt(l.getStyle(n, 'top')) || 0) === t.top) ||
									(void 0 !== t.bottom && (parseInt(l.getStyle(n, 'bottom')) || 0) === t.bottom)
								))
						) {
							!0 === t.disable ? !0 === p.isAttached && p.detach() : !1 === p.isAttached && p.attach();
							var e = t.position || u.css.position;
							(u.position = e),
								(n.style.position = e),
								(n.style.left = !0 === t.disable ? u.css.left : p.positionLeft + 'px'),
								(n.style.width = 'absolute' !== e ? u.css.width : p.width),
								void 0 === t.bottom
									? (n.style.bottom = !0 === t.disable ? '' : 'auto')
									: (n.style.bottom = t.bottom + 'px'),
								void 0 === t.top
									? (n.style.top = !0 === t.disable ? '' : 'auto')
									: (n.style.top = t.top + 'px'),
								n.classList
									? n.classList.remove(r.stickyClass)
									: (n.className = n.className.replace(
											new RegExp('(^|\\b)' + r.stickyClass.split(' ').join('|') + '(\\b|$)', 'gi'),
											' '
										)),
								r.onStop && r.onStop.call(n, r);
						}
					}
				},
				p = {
					el: o.createElement('div'),
					offsetLeft: null,
					positionLeft: null,
					width: null,
					isAttached: !1,
					init: function() {
						for (var t in u.css) p.el.style[t] = u.css[t];
						var e = l.getStyle(n);
						(p.offsetLeft = l.offset(n).left - (parseInt(e.marginLeft) || 0)),
							(p.positionLeft = l.position(n).left),
							(p.width = l.getStyle(n, 'width'));
					},
					attach: function() {
						a.insertBefore(p.el, n.nextSibling), (p.isAttached = !0);
					},
					detach: function() {
						(p.el = a.removeChild(p.el)), (p.isAttached = !1);
					}
				},
				g = void 0,
				m = void 0,
				v = void 0,
				h = void 0,
				y = void 0,
				b = void 0,
				S = void 0,
				w = void 0,
				k = void 0,
				x = void 0,
				L = void 0,
				E = void 0,
				T = void 0,
				C = void 0,
				j = void 0,
				z = void 0,
				N = void 0,
				O = void 0,
				R = function() {
					(u.css = (function(t) {
						var e = l.getCascadedStyle(t),
							o = l.getStyle(t),
							i = {
								height: t.offsetHeight + 'px',
								left: e.left,
								right: e.right,
								top: e.top,
								bottom: e.bottom,
								position: o.position,
								display: o.display,
								verticalAlign: o.verticalAlign,
								boxSizing: o.boxSizing,
								marginLeft: e.marginLeft,
								marginRight: e.marginRight,
								marginTop: e.marginTop,
								marginBottom: e.marginBottom,
								paddingLeft: e.paddingLeft,
								paddingRight: e.paddingRight
							};
						return (
							e.float && (i.float = e.float || 'none'),
							e.cssFloat && (i.cssFloat = e.cssFloat || 'none'),
							o.MozBoxSizing && (i.MozBoxSizing = o.MozBoxSizing),
							(i.width =
								'auto' !== e.width
									? e.width
									: 'border-box' === i.boxSizing || 'border-box' === i.MozBoxSizing
										? t.offsetWidth + 'px'
										: o.width),
							i
						);
					})(n)),
						p.init(),
						(g = !(
							!r.stickTo ||
							!(
								'document' === r.stickTo ||
								(r.stickTo.nodeType && 9 === r.stickTo.nodeType) ||
								('object' == typeof r.stickTo &&
									r.stickTo instanceof ('undefined' != typeof HTMLDocument ? HTMLDocument : Document))
							)
						)),
						(m = r.stickTo
							? g ? o : 'string' == typeof r.stickTo ? o.querySelector(r.stickTo) : r.stickTo
							: a),
						(j = (O = function() {
							var t =
									n.offsetHeight +
									(parseInt(u.css.marginTop) || 0) +
									(parseInt(u.css.marginBottom) || 0),
								e = (j || 0) - t;
							return e >= -1 && e <= 1 ? j : t;
						})()),
						(h = (N = function() {
							return g
								? Math.max(
										o.documentElement.clientHeight,
										o.body.scrollHeight,
										o.documentElement.scrollHeight,
										o.body.offsetHeight,
										o.documentElement.offsetHeight
									)
								: m.offsetHeight;
						})()),
						(y = g ? 0 : l.offset(m).top),
						(b = r.stickTo ? (g ? 0 : l.offset(a).top) : y),
						(S = t.innerHeight),
						(z = n.offsetTop - (parseInt(u.css.marginTop) || 0)),
						(v = r.innerSticker
							? 'string' == typeof r.innerSticker ? o.querySelector(r.innerSticker) : r.innerSticker
							: null),
						(w = isNaN(r.top) && r.top.indexOf('%') > -1 ? parseFloat(r.top) / 100 * S : r.top),
						(k = isNaN(r.bottom) && r.bottom.indexOf('%') > -1 ? parseFloat(r.bottom) / 100 * S : r.bottom),
						(x = v ? v.offsetTop : r.innerTop ? r.innerTop : 0),
						(L =
							isNaN(r.bottomEnd) && r.bottomEnd.indexOf('%') > -1
								? parseFloat(r.bottomEnd) / 100 * S
								: r.bottomEnd),
						(E = y - w + x + z);
				},
				H = t.pageYOffset || o.documentElement.scrollTop,
				B = 0,
				I = void 0,
				q = function() {
					(j = O()), (h = N()), (T = y + h - w - L), (C = j > S);
					var e = t.pageYOffset || o.documentElement.scrollTop,
						i = Math.round(l.offset(n).top),
						s = i - e,
						c = void 0;
					(I = e < H ? 'up' : 'down'),
						(B = e - H),
						(H = e),
						e > E
							? T + w + (C ? k : 0) - (r.followScroll && C ? 0 : w) <=
								e + j - x - (j - x > S - (E - x) && r.followScroll && (c = j - S - x) > 0 ? c : 0)
								? u.reset({ position: 'absolute', bottom: b + a.offsetHeight - T - w })
								: C && r.followScroll
									? 'down' === I
										? s + j + k <= S
											? u.stick({ bottom: k })
											: 'fixed' === u.position &&
												u.reset({ position: 'absolute', top: i - w - E - B + x })
										: s + x < 0 && 'fixed' === u.position
											? u.reset({ position: 'absolute', top: i - w - E + x - B })
											: i >= e + w - x && u.stick({ top: w - x })
									: u.stick({ top: w - x })
							: u.reset({ disable: !0 });
				},
				A = !1,
				F = !1,
				M = function() {
					A && (l.event.unbind(t, 'scroll', q), (A = !1));
				},
				D = function() {
					R(), j >= h ? M() : (q(), A || (l.event.bind(t, 'scroll', q), (A = !0)));
				},
				W = function() {
					(n.style.position = ''),
						(n.style.left = ''),
						(n.style.top = ''),
						(n.style.bottom = ''),
						(n.style.width = ''),
						n.classList
							? n.classList.remove(r.stickyClass)
							: (n.className = n.className.replace(
									new RegExp('(^|\\b)' + r.stickyClass.split(' ').join('|') + '(\\b|$)', 'gi'),
									' '
								)),
						(u.css = {}),
						(u.position = null),
						!0 === p.isAttached && p.detach();
				},
				P = function() {
					W(), d(), f() ? M() : D();
				},
				V = function() {
					r.onBeforeResize && r.onBeforeResize.call(n, r), P(), r.onResize && r.onResize.call(n, r);
				},
				Y = r.resizeDebounce ? l.debounce(V, r.resizeDebounce) : V,
				$ = function() {
					F && (l.event.unbind(t, 'resize', Y), (F = !1)), M();
				},
				Q = function() {
					F || (l.event.bind(t, 'resize', Y), (F = !0)), d(), f() ? M() : D();
				};
			(this.options = function(t) {
				return t ? r.option || null : Object.assign({}, r);
			}),
				(this.reinit = P),
				(this.update = function(t) {
					c(t), P();
				}),
				(this.attach = Q),
				(this.detach = $),
				(this.destroy = function() {
					$(), W();
				}),
				c(s),
				Q(),
				l.event.bind(t, 'load', P);
		};
	if (void 0 !== t.jQuery) {
		var n = t.jQuery;
		n.fn.extend({
			hcSticky: function(t) {
				return this.length
					? this.each(function() {
							var e = n.data(this, 'hcSticky');
							e ? e.update(t) : ((e = new i(this, t)), n.data(this, 'hcSticky', e));
						})
					: this;
			}
		});
	}
	return (t.hcSticky = t.hcSticky || i), i;
}),
	(function(t) {
		'use strict';
		var e = t.hcSticky,
			o = t.document;
		'function' != typeof Object.assign &&
			Object.defineProperty(Object, 'assign', {
				value: function(t, e) {
					if (null == t) throw new TypeError('Cannot convert undefined or null to object');
					for (var o = Object(t), i = 1; i < arguments.length; i++) {
						var n = arguments[i];
						if (null != n) for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (o[s] = n[s]);
					}
					return o;
				},
				writable: !0,
				configurable: !0
			});
		var i = (function() {
				function e(e) {
					var o = t.event;
					return (o.target = o.target || o.srcElement || e), o;
				}
				var i = o.documentElement,
					n = function() {};
				i.addEventListener
					? (n = function(t, e, o) {
							t.addEventListener(e, o, !1);
						})
					: i.attachEvent &&
						(n = function(t, o, i) {
							(t[o + i] = i.handleEvent
								? function() {
										var o = e(t);
										i.handleEvent.call(i, o);
									}
								: function() {
										var o = e(t);
										i.call(t, o);
									}),
								t.attachEvent('on' + o, t[o + i]);
						});
				var s = function() {};
				return (
					i.removeEventListener
						? (s = function(t, e, o) {
								t.removeEventListener(e, o, !1);
							})
						: i.detachEvent &&
							(s = function(t, e, o) {
								t.detachEvent('on' + e, t[e + o]);
								try {
									delete t[e + o];
								} catch (i) {
									t[e + o] = void 0;
								}
							}),
					{ bind: n, unbind: s }
				);
			})(),
			n = function(e, i) {
				return t.getComputedStyle
					? i
						? o.defaultView.getComputedStyle(e, null).getPropertyValue(i)
						: o.defaultView.getComputedStyle(e, null)
					: e.currentStyle
						? i
							? e.currentStyle[
									i.replace(/-\w/g, function(t) {
										return t.toUpperCase().replace('-', '');
									})
								]
							: e.currentStyle
						: void 0;
			},
			s = function(e) {
				var i = e.getBoundingClientRect(),
					n = t.pageYOffset || o.documentElement.scrollTop,
					s = t.pageXOffset || o.documentElement.scrollLeft;
				return { top: i.top + n, left: i.left + s };
			};
		e.Helpers = {
			isEmptyObject: function(t) {
				for (var e in t) return !1;
				return !0;
			},
			debounce: function(t, e, o) {
				var i = void 0;
				return function() {
					var n = this,
						s = arguments,
						r = o && !i;
					clearTimeout(i),
						(i = setTimeout(function() {
							(i = null), o || t.apply(n, s);
						}, e)),
						r && t.apply(n, s);
				};
			},
			hasClass: function(t, e) {
				return t.classList
					? t.classList.contains(e)
					: new RegExp('(^| )' + e + '( |$)', 'gi').test(t.className);
			},
			offset: s,
			position: function(t) {
				var e = t.offsetParent,
					o = s(e),
					i = s(t),
					r = n(e),
					l = n(t);
				return (
					(o.top += parseInt(r.borderTopWidth) || 0),
					(o.left += parseInt(r.borderLeftWidth) || 0),
					{
						top: i.top - o.top - (parseInt(l.marginTop) || 0),
						left: i.left - o.left - (parseInt(l.marginLeft) || 0)
					}
				);
			},
			getStyle: n,
			getCascadedStyle: function(e) {
				var i = e.cloneNode(!0);
				(i.style.display = 'none'), e.parentNode.insertBefore(i, e.nextSibling);
				var n = void 0;
				i.currentStyle
					? (n = i.currentStyle)
					: t.getComputedStyle && (n = o.defaultView.getComputedStyle(i, null));
				var s = {};
				for (var r in n) !isNaN(r) || ('string' != typeof n[r] && 'number' != typeof n[r]) || (s[r] = n[r]);
				if (Object.keys(s).length < 3) {
					s = {};
					for (var l in n)
						isNaN(l) ||
							(s[
								n[l].replace(/-\w/g, function(t) {
									return t.toUpperCase().replace('-', '');
								})
							] = n.getPropertyValue(n[l]));
				}
				if (
					(s.margin || 'auto' !== s.marginLeft
						? s.margin ||
							s.marginLeft !== s.marginRight ||
							s.marginLeft !== s.marginTop ||
							s.marginLeft !== s.marginBottom ||
							(s.margin = s.marginLeft)
						: (s.margin = 'auto'),
					!s.margin && '0px' === s.marginLeft && '0px' === s.marginRight)
				) {
					var a = e.offsetLeft - e.parentNode.offsetLeft,
						c = a - (parseInt(s.left) || 0) - (parseInt(s.right) || 0),
						f =
							e.parentNode.offsetWidth -
							e.offsetWidth -
							a -
							(parseInt(s.right) || 0) +
							(parseInt(s.left) || 0) -
							c;
					(0 !== f && 1 !== f) || (s.margin = 'auto');
				}
				return i.parentNode.removeChild(i), (i = null), s;
			},
			event: i
		};
	})(window);
