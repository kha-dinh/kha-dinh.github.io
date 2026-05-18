---
layout: page
permalink: /publications/
title: all publications
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

<div class="pub-filter-bar" id="pub-filter-bar">
  <button class="filter-btn active" data-filter="all">all</button>
  {%- for topic in site.data.topics %}
  <button class="filter-btn" data-filter="{{ topic }}">{{ topic }}</button>
  {%- endfor %}
</div>

<h2>conferences</h2>

{% bibliography -f {{ site.scholar.bibliography }} --query @inproceedings %}

<h2>journals</h2>

{% bibliography -f {{ site.scholar.bibliography }} --query @article %}

</div>
