
(function () {
    // Design-ui pages are single compositions, so the whole body is editable.
    function markEditable() {
        document.body.classList.add('artifact-editable');
    }

    // Credit badge with idle-fade. Hover devices only.
    function initChromeUI() {
        if (!matchMedia('(hover: hover)').matches) return;

        var credit = document.createElement('div');
        credit.className = 'design-ui-credit';
        credit.setAttribute('aria-hidden', 'true');
        credit.innerHTML = '\u{1F49C} by ClickUp Brain';
        document.body.appendChild(credit);

        var timer = null;
        var fade = function (out) { credit.style.opacity = out ? '0' : ''; };
        fade(true);
        var show = function () {
            fade(false);
            clearTimeout(timer);
            timer = setTimeout(function () { fade(true); }, 3000);
        };
        document.addEventListener('mousemove', show);
        show();
    }

    function init() {
        markEditable();
        initChromeUI();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

