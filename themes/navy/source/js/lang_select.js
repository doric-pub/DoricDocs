(function() {
  'use strict';

  function setLangCookie(lang) {
    if (window.Cookies && window.Cookies.noConflict) {
      window.Cookies.noConflict().set('nf_lang', lang, { expires: 365 });
      return;
    }

    document.cookie = 'nf_lang=' + encodeURIComponent(lang) + '; max-age=31536000; path=/';
  }

  function changeLang() {
    var lang = this.value;
    var canonical = (this.dataset.canonical || '').replace(/^\/+/, '');
    var path = '/';
    if (lang !== 'zh-cn') path += lang + '/';

    setLangCookie(lang);
    location.href = path + canonical;
  }

  var langSelect = document.getElementById('lang-select');
  var mobileLangSelect = document.getElementById('mobile-lang-select');

  if (langSelect) langSelect.addEventListener('change', changeLang);
  if (mobileLangSelect) mobileLangSelect.addEventListener('change', changeLang);
}());
