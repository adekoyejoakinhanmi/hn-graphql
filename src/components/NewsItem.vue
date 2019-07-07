<template>
  <div class="item">
    <div class="first-col">
      <span class="numbering">{{ itemCount }}.</span>
      <span class="vote-arrow"/>
    </div>
    <div> 
      <a :href="newsItem.url" class="black-link no-hover">
        {{ newsItem.title }}
      </a>
      <a href="" class="small-link">({{ hostUrl }})</a>
      <br>
      <small>
        {{ upvotes }} by
        <a href="#">{{ newsItem.by.id }}</a> {{ timeago }} |
        <a href="#">hide</a> |
        <a v-if="newsItem.descendants" href="#">{{ comments }}</a>
        <a v-else href="#">discuss</a>
      </small>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'NewsItem',
  props: {
    newsItem: {
      type: Object,
      default: () => {},
      required: true
    },
    itemCount: {
      type: Number,
      default: 1
    }
  },
  computed: {
    timeago() {
      let timestamp = this.newsItem.time * 1000;
      return moment(timestamp).fromNow();
    },
    hostUrl() {
      let vm = this;
      let url = new URL(vm.newsItem.url);
      return url.hostname;
    },
    upvotes() {
      const { score } = this.newsItem;
      const suffix = score === 1 ? 'point' : 'points';
      return `${score} ${suffix}`;
    },
    comments() {
      const { descendants } = this.newsItem;
      const suffix = descendants > 1 ? 'comments' : 'comment';
      return `${descendants} ${suffix}`;
    }
  }
}
</script>