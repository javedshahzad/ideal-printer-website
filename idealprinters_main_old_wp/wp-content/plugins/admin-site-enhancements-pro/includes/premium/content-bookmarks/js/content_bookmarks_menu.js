(function (window, document) {
	'use strict';

	var DATA = window.contentBookmarksMenuData || {};
	var LABEL = DATA.label || 'Bookmarks';
	var menus = Array.isArray(DATA.menus) ? DATA.menus.slice() : [];

	window.ContentBookmarksMenuData = DATA;

	function attachToggleBehaviour(group, toggle, submenu) {
		function openMenu() {
			group.classList.add('is-open');
			toggle.setAttribute('aria-expanded', 'true');
		}

		function closeMenu() {
			group.classList.remove('is-open');
			toggle.setAttribute('aria-expanded', 'false');
		}

		group.addEventListener('mouseenter', openMenu);
		group.addEventListener('mouseleave', closeMenu);

		toggle.addEventListener('focus', openMenu);
		group.addEventListener('focusout', function (event) {
			if (!group.contains(event.relatedTarget)) {
				closeMenu();
			}
		});

		toggle.addEventListener('click', function (event) {
			if (!group.classList.contains('is-open')) {
				event.preventDefault();
				openMenu();
			}
		});

		group.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' || event.key === 'Esc') {
				closeMenu();
				toggle.focus();
			}
		});
	}

	function preparePlaceholder(listItem, toggle) {
		listItem.classList.add('content-bookmarks-group');

		toggle.classList.add('content-bookmarks-group__toggle');
		toggle.setAttribute('aria-haspopup', 'true');
		toggle.setAttribute('aria-expanded', 'false');
		toggle.innerHTML = '<span class="content-bookmarks-icon bookmarked content-bookmarks-group__icon" aria-hidden="true"></span>' +
			'<span class="content-bookmarks-group__label">' + LABEL + '</span>';

		var submenu = listItem.querySelector('ul.content-bookmarks-submenu');
		if (!submenu) {
			submenu = document.createElement('ul');
			submenu.className = 'content-bookmarks-submenu';
			listItem.appendChild(submenu);
		}

		if (!listItem.dataset.contentBookmarksBound) {
			attachToggleBehaviour(listItem, toggle, submenu);
			listItem.dataset.contentBookmarksBound = 'true';
		}

		submenu.innerHTML = '';

		return submenu;
	}

	function renderMenu(menu) {
		if (!menu || !menu.href) {
			return;
		}

		var selector = '.wp-submenu a[href$="' + menu.href + '"]';
		var toggle = document.querySelector(selector);

		if (!toggle) {
			return;
		}

		var listItem = toggle.parentElement;
		if (!listItem) {
			return;
		}

		var submenu = preparePlaceholder(listItem, toggle);
		if (!submenu) {
			return;
		}

		(menu.items || []).forEach(function (item) {
			var li = document.createElement('li');
			var anchor = document.createElement('a');
			anchor.href = item.url;
			anchor.innerHTML = item.label;
			li.appendChild(anchor);
			submenu.appendChild(li);
		});
	}

	function refreshMenu() {
		var adminMenu = document.getElementById('adminmenu');
		if (!adminMenu) {
			return;
		}

		adminMenu.querySelectorAll('.content-bookmarks-submenu').forEach(function (submenu) {
			submenu.parentElement.classList.remove('is-open');
			submenu.remove();
		});

		menus.forEach(renderMenu);

		var event;
		if (typeof window.CustomEvent === 'function') {
			event = new CustomEvent('contentBookmarksMenuRefreshed');
		} else {
			event = document.createEvent('Event');
			event.initEvent('contentBookmarksMenuRefreshed', true, true);
		}
		document.dispatchEvent(event);
	}

	function setMenus(newMenus) {
		menus = Array.isArray(newMenus) ? newMenus.slice() : [];
		DATA.menus = menus;
		refreshMenu();
	}

	window.ContentBookmarksMenu = {
		refresh: refreshMenu,
		setMenus: setMenus
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', refreshMenu);
	} else {
		refreshMenu();
	}

})(window, document);
