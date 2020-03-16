<header id="banner" class="wrapper">
  <div class="inner">
    <h2 id="banner-title">{{ page.subtitle }}</h2>
    <div id="banner-start">
      <span id="banner-start-command">npm install doric-cli -g</span><a id="banner-start-link" href="docs/"><i class="fa fa-arrow-right"></i></a>
    </div>
    <div id="banner-share">{{ partial('partial/share') }}</div>
  </div>
</header>
<div id="intro-news-list">
  <div class="wrapper">
    <div class="inner">
      <div id="intro-news-flex">
        {% set posts = site.posts.sort('-date'). %}
        {% for post in posts.slice('0', '4') %}
        <a href="{{ url_for(post.path) }}" class="intro-news-wrap">
          <div class="intro-news-time">{{ time_tag(post.date) }}</div>
          <div class="intro-news-title">{{ truncate(post.title, {length: 120, separator: ' '}) }}</div>
        </a>
        {% endfor %}
      </div>
    </div>
  </div>
</div>
<div id="content-wrap">
  <div class="wrapper">
    <div class="inner">
      {{ page.content }}
      <div id="intro-get-started-wrap">
        <a href="docs/" id="intro-get-started-link">{{ __('index.get_started') }}</a>
      </div>
    </div>
  </div>
</div>

<iframe id="playground"  
        src = "https://p.doric.pub/play"
        style = "width:100%;height:100%;">
</iframe>