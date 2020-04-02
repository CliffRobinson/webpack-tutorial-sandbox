const data = [
  { id:3, room_id:0, user_id: 1, time: 1585802175899, msg: "db: SANPE KILLS DUMBELDORE!!" },
  { id:4, room_id:0, user_id: 2, time: 1585802175950, msg: "db: idk why I hang out with you"},
  { id:5, room_id:1, user_id: 3, time: 1585802175950, msg: "db: anyone in here?" } 
]

exports.data = data

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('chat').del()
    .then(function () {
      // Inserts seed entries
      return knex('chat').insert(data);
    });
};
