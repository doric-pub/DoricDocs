(function() {
  'use strict';

  var Cookies = window.Cookies.noConflict();

  function changeLang() {
    var lang = this.value;
    var canonical = this.dataset.canonical;
    var path = '/';
    if (lang !== 'zh-cn') path += lang + '/';

    Cookies.set('nf_lang', lang, { expires: 365 });
    location.href = path + canonical;
  }

  var langSelect = document.getElementById('lang-select');
  var mobileLangSelect = document.getElementById('mobile-lang-select');

  if (langSelect) langSelect.addEventListener('change', changeLang);
  if (mobileLangSelect) mobileLangSelect.addEventListener('change', changeLang);
}());
