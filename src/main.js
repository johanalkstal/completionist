import App from "./App.html"

const app = new App({
  target: document.body,
  data: {
    players: []
  }
})

const playersRef = firebase
  .database()
  .ref("players")
  .orderByChild("completed")
playersRef.on("value", snapshot => {
  if (snapshot.exists()) {
    const dbValue = snapshot.val()
    const players = Object.keys(dbValue).map(key => dbValue[key])

    players.sort((a, b) => {
      const aGames = a.games || []
      const aStarted = aGames.length
      const aCompleted = aGames.filter(game => game.completed).length
      const bGames = b.games || []
      const bStarted = bGames.length
      const bCompleted = bGames.filter(game => game.completed).length

      if (aCompleted > bCompleted) {
        return -1
      }

      if (aCompleted < bCompleted) {
        return 1
      }

      if (aStarted > bStarted) {
        return -1
      }

      if (aStarted < bStarted) {
        return 1
      }

      return 0
    })

    app.set({
      players
    })
  }
})

export default app
