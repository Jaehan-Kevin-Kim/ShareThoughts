/* eslint-disable no-plusplus */
// import { faker } from "@faker-js/faker";
// "use strict";

const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersData = [];
    const postsData = [];
    const commentsData = [];
    const followsData = [];

    for (let i = 0; i < 20; i++) {
      usersData.push({
        email: `test${i}@test.com`,
        password:
          "$2b$12$Haih7MefS57pBZRRkqyr.OCeKhWW25nuLZAWfwuaZRm5FRIwqDXme",
        nickname: faker.person.firstName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for (let i = 1; i < 40; i++) {
      postsData.push({
        content: faker.lorem.paragraphs(),
        lockStatus: 0,
        userId: i % 20 === 0 ? 2 : i % 20,
        createdAt: new Date(),
        updatedAt: new Date(),
        // 다른 필요한 필드들...
      });
    }

    for (let i = 1; i < 30; i++) {
      commentsData.push({
        content: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: i < 19 ? i + 1 : 2,
        postId: i,
      });
    }

    for (let i = 0; i < 17; i++) {
      followsData.push({
        createdAt: new Date(),
        updatedAt: new Date(),
        followingId: i + 1,
        followerId: i + 2,
      });
    }

    console.log("usersData: ", usersData);
    console.log("postsData: ", postsData);
    console.log("commentsData: ", commentsData);
    console.log("followsData: ", followsData);

    await queryInterface.bulkInsert("Users", usersData, {});
    await queryInterface.bulkInsert("Posts", postsData, {});
    await queryInterface.bulkInsert("Comments", commentsData, {});
    await queryInterface.bulkInsert("Follow", followsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Posts", null, {});
    await queryInterface.bulkDelete("Comments", null, {});
    await queryInterface.bulkDelete("Follow", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
