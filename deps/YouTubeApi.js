export class YouTubeApi {
  DEFAULT_WIDTH = 800;
  DEFAULT_HEIGHT = 500;

  YT_SEARCH_URL = 'https://gdata.youtube.com/feeds/api/videos/?alt=json&v=2';
  YT_EMBED_URL = 'http://www.youtube.com/embed/{ID}?autoplay=1';
  YT_POSTER_URL = 'https://i1.ytimg.com/vi/{ID}/hqdefault.jpg';
  YT_WEBPAGE_URL = 'https://www.youtube.com/watch?v={ID}';

  // this always needs to be here
  constructor() {}

  search(qs) {
    var self = this;
    var url = this.YT_SEARCH_URL + '&q=' + (qs || '');
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
      request.onload = function(e) {
        var data = self.prepareResults(JSON.parse(request.response));
        resolve(data);
      };
      request.open("GET", url, true);
      request.send();
    });
  }

  prepareResults(data) {
    return data.feed.entry.map(this.prepareEntry.bind(this));
  }

  prepareEntry(entry) {
    var id = entry.media$group.yt$videoid.$t;
    return {
      id: id,
      title: entry.title.$t,
      url: this.makeWebpageUrl(id),
      width: this.DEFAULT_WIDTH,
      height: this.DEFAULT_HEIGHT,
      posterUrl: this.makePosterUrl(id),
      embedUrl: this.makeEmbedUrl(id)
    };
  }

  makeEmbedUrl(id) {
    return this.YT_EMBED_URL.replace('{ID}', id);
  }

  makePosterUrl(id) {
    return this.YT_POSTER_URL.replace('{ID}', id);
  }

  makeWebpageUrl(id) {
    return this.YT_WEBPAGE_URL.replace('{ID}', id);
  }
}
