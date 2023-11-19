document.addEventListener("DOMContentLoaded", function () {
  let pokemon = "Pikachu".toLowerCase()

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => response.json())
    .then((data) => {
      const searchBox = document.createElement("div")
      searchBox.id = "searchBox"

      const searchInput = document.createElement("input")
      searchInput.id = "searchInput"

      const searchButton = document.createElement("button")
      searchButton.id = "searchButton"

      searchButton.addEventListener("click", function () {
        pokemon = searchInput.value.toLowerCase()
      })

      const imgButtonSearch = document.createElement("img")
      imgButtonSearch.src = "./public/search.svg"

      searchButton.appendChild(imgButtonSearch)
      searchBox.append(searchInput, searchButton)

      const pokeCard = document.createElement("div")
      pokeCard.id = "pokeCard"

      const heading2 = document.createElement("h2")

      const pokeImage = document.createElement("img")
      pokeImage.alt = "Pokémon Image"
      pokeImage.src = data.sprites.front_default

      // const regex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi
      // const sprites = data.sprites

      // for (const sprite in sprites) {
      //   if (regex.test(sprites[sprite])) {
      //     pokeImage.src = sprites[sprite]
      //     break
      //   }
      // }

      const pokeAbout = document.createElement("div")
      pokeAbout.id = "pokeAbout"

      const pokeName = document.createElement("span")
      pokeName.id = "pokeName"
      pokeName.innerText = data.name

      const pokeType = document.createElement("span")
      pokeType.id = "pokeType"
      pokeType.innerText = data.types[0].type.name

      pokeAbout.append(pokeName, pokeType)

      const pokeAbilities = document.createElement("p")
      pokeAbilities.id = "pokeAbilities"

      let abilitiesString = ""

      for (const i in data.abilities) {
        abilitiesString += `${data.abilities[i].ability.name}/`
      }
      pokeAbilities.innerText = abilitiesString.slice(0, -1)

      const pokeStats = document.createElement("div")
      pokeStats.id = "pokeStats"

      for (const stat in data.stats) {
        const pokeStat = document.createElement("span")
        pokeStat.className = "pokeStat"
        pokeStat.innerText = `${data.stats[stat].stat.name}: ${data.stats[stat].base_stat}`

        pokeStats.appendChild(pokeStat)
      }

      pokeCard.append(heading2, pokeImage, pokeAbout, pokeAbilities, pokeStats)

      document.body.append(searchBox, pokeCard)
    })
    .catch((e) => {
      console.log(e)
      const boxError = document.createElement("div")
      boxError.id = "boxError"

      const heading1 = document.createElement("h1")
      heading1.id = "msgError"
      heading1.innerText = "500"

      const heading2 = document.createElement("h2")
      heading2.innerText = "Erro no Servidor"

      boxError.append(heading1, heading2)
      document.body.appendChild(boxError)
    })
})
