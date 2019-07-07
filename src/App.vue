<template>
  <div class="container" id="app">
    <div class="top-bar">
      <img src="https://news.ycombinator.com/y18.gif" width="18" height="18" style="border:1px white solid;" alt="Hacker News Logo">
      <div>
        <b class="title">Hacker News</b>
        <nav class="black-links">
          <a href="#">new</a> |
          <a href="#">past</a> |
          <a href="#">comments</a> |
          <a href="#">ask</a> |
          <a href="#">show</a> |
          <a href="#">jobs</a> |
          <a href="#">submit</a>
        </nav>
      </div>

      <span class="right">
        <a href="#" class="black-link">login</a>
      </span>
    </div>

    <div class="page-body">
      <news-item v-for="(item, index) in newsItems" :key="item.id" :newsItem="item" :itemCount="index + 1 + offset" />
      <a href="" class="more-link">More</a>
      
      <div class="divider"/>
      
      <footer>
        <p>Registration is open for Startup School 2019. Classes start July 22nd.</p>
        <nav class="black-links small-links">
        <a href="#">Guidelines</a> |
        <a href="#">FAQ</a> |
        <a href="#">Support</a> |
        <a href="#">API</a> |
        <a href="#">Security</a> |
        <a href="#">Lists</a> |
        <a href="#">Bookmarklet</a> |
        <a href="#">Legal</a> |
        <a href="#">Apply to YC</a> |
        <a href="#">Contact</a>
        </nav>
        <div>
          <label for="Search">Search: </label>
          <input type="text">
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { HackerNewsAPI } from "@/api/index";
import { NewsItem } from '@/components/index'; // @ is an alias to /src

export default{
  name: 'App',
  data() {
    return {
      newsItems: [],
      offset: 0,
      count: 30
    }
  },
  components: {
    NewsItem
  },
  methods: {
    async getNewItems() {
      try {
        let items = await HackerNewsAPI.getTopStories(this.count, this.offset);
        this.newsItems = items;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getNewItems();
  }
}
</script>
