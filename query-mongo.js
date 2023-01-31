db.categories.updateMany({}, [
  {
    $set: {
      thumbnail: {
        $replaceOne: {
          input: '$thumbnail',
          find: 'localhost',
          replacement: '192.168.8.110',
        },
      },
    },
  },
])
