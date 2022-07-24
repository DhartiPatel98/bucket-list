const graphQL = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType,
} = graphQL;
const axios = require("axios");

const routes = require("../apiEndpoints");

const ChecklistItemType = new GraphQLObjectType({
  name: "ChecklistItem",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    item: {
      type: GraphQLString,
    },
    isFullfilled: {
      type: GraphQLBoolean,
    },
    wish: {
      type: WishType,
      resolve(parentValue, args) {
        return axios
          .get(`${routes.wishes}/${parentValue.wishId}`)
          .then((res) => res.data);
      },
    },
  }),
});

const ChecklistInputType = new GraphQLInputObjectType({
  name: "ChecklistInputItem",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    item: {
      type: new GraphQLNonNull(GraphQLString),
    },
    isFullfilled: {
      type: GraphQLBoolean,
    },
  }),
});

const WishType = new GraphQLObjectType({
  name: "Wish",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    checklist: {
      type: new GraphQLList(ChecklistItemType),
      resolve(parentValue, args) {
        // parentValue = fetched Wish. So whenever we fetch wish with checklist, GraphQL will check for this resolve function to decide the return value associated with checklist.
        return axios
          .get(`${routes.wishes}/${parentValue.id}/checklist`)
          .then((res) => res.data);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    wishes: {
      type: new GraphQLList(WishType),
      resolve(parentValue, args) {
        return axios.get(routes.wishes).then((res) => res.data);
      },
    },
    wish: {
      type: WishType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios.get(`${routes.wishes}/${args.id}`).then((res) => res.data);
      },
    },
    checklist: {
      type: new GraphQLList(ChecklistItemType),
      args: {
        wishId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios
          .get(`${routes.wishes}/${args.wishId}/checklists`)
          .then((res) => res.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addWish: {
      type: WishType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
        },
        description: {
          type: GraphQLString,
        },
      },
      resolve(parentValue, args) {
        return axios.post(routes.wishes, args).then((res) => res.data);
      },
    },
    updateWish: {
      type: WishType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
        title: {
          type: new GraphQLNonNull(GraphQLString),
        },
        description: {
          type: GraphQLString,
        },
        checklist: {
          type: new GraphQLList(new GraphQLNonNull(ChecklistInputType)),
        },
        deletedIds: {
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve(parentValue, args) {
        let updatedWish;
        const { id, title, description, deletedIds, checklist } = args;
        axios
          .patch(`${routes.wishes}/${args.id}`, {
            id,
            title,
            description,
          })
          .then((res) => {
            console.log("DATA UPDATED - ", res);
            updatedWish = res.data;
            console.log("updated wish - ", updatedWish);
            console.log("res.data - ", res.data);
          })
          .then(async () => {
            // Delete checklist
            let promiseArr = (deletedIds || []).map((id) => {
              return axios.delete(`${routes.checklist}/${id}`);
            });
            await Promise.all(promiseArr);

            // Add or edit checklist
            promiseArr = (checklist || []).map((item) => {
              return item.id
                ? axios.put(`${routes.checklist}/${item.id}`, {
                    id: item.id,
                    item: item.item,
                    isFullfilled: item.isFullfilled,
                    wishId: id,
                  })
                : axios.post(`${routes.checklist}`, {
                    item: item.item,
                    isFullfilled: item.isFullfilled,
                    wishId: id,
                  });
            });

            await Promise.all(promiseArr);
            console.log("updated wish 2 - ", updatedWish);

            return updatedWish;
          });
      },
    },
    deleteWish: {
      type: WishType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parentValue, { id }) {
        return axios.delete(`${routes.wishes}/${id}`).then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
