import { CheckBoxTree } from "./components/CheckBoxTree"

const treeData = [
  {
    "id": 1,
    "name": "Electronics",
    "children": [
      {
        "id": 2,
        "name": "Smartphones",
        "children": [
          {
            "id": 3,
            "name": "iPhone"
          },
          {
            "id": 4,
            "name": "Samsung Galaxy"
          }
        ]
      },
      {
        "id": 5,
        "name": "Laptops",
        "children": [
          {
            "id": 6,
            "name": "MacBook"
          }
        ]
      },
      {
        "id": 7,
        "name": "Tablets"
      }
    ]
  },
  {
    "id": 8,
    "name": "Books",
    "children": [
      {
        "id": 9,
        "name": "Fiction",
        "children": [
          {
            "id": 10,
            "name": "Mystery"
          },
          {
            "id": 11,
            "name": "Romance"
          }
        ]
      },
      {
        "id": 12,
        "name": "Non-Fiction"
      }
    ]
  },
  {
    "id": 13,
    "name": "Sports Equipment"
  }
]

function App() {
  return (
    <CheckBoxTree data={treeData} />
  )
}

export default App
