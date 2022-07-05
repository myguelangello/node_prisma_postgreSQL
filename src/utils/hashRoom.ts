    let roomId;
    let isRoom = true;

    while (isRoom) {
      const min = Math.ceil(100000)
      const max = Math.floor(999999)
      roomId = Math.floor(Math.random() * (max - min + 1) + min)
      /* for (let i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 256).toString())
          : (roomId += Math.floor(Math.random() * 10).toString());
      } */
    
      console.log(roomId)
    }