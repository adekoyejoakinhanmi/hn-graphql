import { HackerNews } from "graphqlhub-schemas";
import { GraphQLSchema, graphql } from "graphql";

let schema = new GraphQLSchema({
  query: HackerNews.QueryObjectType
});


export const HackerNewsAPI = {
  async getTopStories(limit = 30, offset = 0) {
    const query = `{
      topStories(limit: ${limit}, offset: ${offset}) {
        title,
        score,
        id,
        url,
        descendants,
        time,
        by{
          id
        }
      }
    }`
    return graphql(schema, query)
      .then((res) => {
        return res.data.topStories;
      })
      .catch(err => Promise.reject(err));
  }
};