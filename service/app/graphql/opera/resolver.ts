import { MutationOperaInput } from './interface';

// const tweets = [
//   { id: 1, body: 'Lorem Ipsum', date: new Date(), author_id: 10 },
//   { id: 2, body: 'Sic dolor amet', date: new Date(), author_id: 11 }
// ];
// const authors = [
//   { id: 10, username: 'johndoe', status: false, first_name: 'John', last_name: 'Doe', avatar_url: 'acme.com/avatars/10' },
//   { id: 10, username: 'janedoe', status: true, first_name: 'Jane', last_name: 'Doe', avatar_url: 'acme.com/avatars/11' },
// ];
// const stats = [
//   { tweet_id: 1, views: 123, likes: 4, retweets: 1, responses: 0 },
//   { tweet_id: 2, views: 567, likes: 45, retweets: 63, responses: 6 }
// ];

export default {
  Query: {
    async operaList(_, args, ctx: any ) {
      console.log(args);
      const operaList = await ctx.connector.opera.fetch();
      return ctx.helper.listToTree(operaList, 'parentId');
    },
    
    // tweets: async () => tweets,
    // tweet: (_, { id }) => {
    //   console.log(id)
    //   return tweets.find(tweet => tweet.id == id)
    // },

  },

//   Tweet: {
//     id: tweet => tweet.id * 10,
//     body: tweet => tweet.body,
//     Author: (tweet, args) => {
//       console.log('tweet', tweet);
//       console.log(args);
//      return authors.find(author => author.id == tweet.author_id && author.status == args.status)
//     },
// },

  Mutation: {
    async mutationOpera(_, args: MutationOperaInput, ctx: any) {
      const opera = await ctx.connector.opera.mutation(args);
      return opera;
    },

    async deleteOpera(_, args: any, ctx: any) {
      const result = await ctx.connector.opera.delete(args);
      console.log('result', result);
      return result;
    }
  }
}