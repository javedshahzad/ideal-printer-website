(function (ContentBookmarks) {

	ContentBookmarks.highlightCurrentMenuItem = function () {
		var postIdField = document.getElementById('post_ID');
		var postId = postIdField ? postIdField.value : '';

		if (!postId) {
			return;
		}

		var bookmarkNodes = document.querySelectorAll('[data-content-bookmark="' + postId + '"]');
		if (!bookmarkNodes.length) {
			return;
		}

		document.querySelectorAll('[data-content-bookmark]').forEach(function (node) {
			var item = node.closest('li');
			if (item) {
				item.classList.remove('current');
			}
		});

		document.querySelectorAll('.content-bookmarks-group').forEach(function (group) {
			group.classList.remove('has-current-bookmark');
			var toggle = group.querySelector('.content-bookmarks-group__toggle');
			if (toggle) {
				toggle.removeAttribute('aria-current');
			}
		});

		bookmarkNodes.forEach(function (node) {
			var listItem = node.closest('li');
			if (listItem) {
				listItem.classList.add('current');
			}

			var group = listItem ? listItem.closest('.content-bookmarks-group') : null;
			if (group) {
				group.classList.add('has-current-bookmark');
				var toggle = group.querySelector('.content-bookmarks-group__toggle');
				if (toggle) {
					toggle.setAttribute('aria-current', 'true');
				}
			}
		});
	};

	ContentBookmarks.ready = function () {
		ContentBookmarks.highlightCurrentMenuItem();
	};
}(window.ContentBookmarks = window.ContentBookmarks || {}));

var contentBookmarksReady = function () {
	ContentBookmarks.ready();
};

document.addEventListener('contentBookmarksMenuRefreshed', function () {
	ContentBookmarks.highlightCurrentMenuItem();
});

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', contentBookmarksReady);
} else {
	contentBookmarksReady();
}
