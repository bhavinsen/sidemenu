//JSON Data
export const Data = [
  {
    id: 1,
    key: "mammal",
    label: "Mammal",
    nodes: [
      {
        id: 11,
        key: "canidae",
        label: "Canidae",
        test: [
          {
            id: 111,
            key: "dog",
            label: "Dog",
            nodes: [],
            url: "https://en.wikipedia.org/wiki/Dog"
          },
          {
            id: 112,
            key: "fox",
            label: "Fox",
            nodes: [],
            url: "https://en.wikipedia.org/wiki/Fox#References"
          },
          {
            id: 113,
            key: "wolf",
            label: "Wolf",
            nodes: [],
            url: "https://en.wikipedia.org/wiki/Wolf"
          }
        ],
        url: "https://www.google.com/search?q=canidae"
      }
    ],
    url: "https://www.google.com/search?q=mammal"
  },
  {
    id: 2,
    key: "india",
    label: "India",
    nodes: [
      {
        id: 12,
        key: "squamata",
        label: "Squamata",
        test: [
          {
            id: 101,
            key: "Gujarat",
            label: "Gujarat",
            child: [
              {
                id: 1001,
                key: "vapi",
                label: "Vapi"
              },
              {
                id: 1002,
                key: "valsad",
                label: "Valsad"
              },
            ]
          },
          {
            id: 102,
            key: "UP",
            label: "UP",
          }

        ],
        nodes: [
          {
            id: 114,
            key: "lizard",
            label: "Lizard",
            url: "https://en.wikipedia.org/wiki/Lizard"
          },
          {
            id: 115,
            key: "snake",
            label: "Snake",
            url: "https://en.wikipedia.org/wiki/Snake"
          },
          {
            id: 116,
            key: "gekko",
            label: "Gekko",
            url: "https://en.wikipedia.org/wiki/Gekko"
          }
        ],
        url: "https://www.google.com/search?q=squamata"
      }
    ],
    url: "https://www.google.com/search?q=reptile"
  }
]