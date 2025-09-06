import { useState } from "react"
import "./FileExplorer.css"

export const FileExplorer = ({ defaultData }) => {

  const [data, setData] = useState(defaultData)

  const onAddListItem = (parentId) => {
    const name = prompt("Enter folder name");

    if (!name?.trim()) {
      return;
    }

    const updateTree = (data) => {
      return data.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now().toString(),
                name: name,
                isFolder: true,
                children: []
              }
            ]
          }
        }

        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children)
          }
        }

        return node
      })
    }

    setData(prev => updateTree(prev))
  }

  const onRemoveListItem = (nodeId) => {
    const updateTree = (data) => {
      return data.filter(node => node.id !== nodeId).map(node => {
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children)
          }
        }

        return node;
      })
    }

    setData(prev => updateTree(prev))
  }

  return (
    <Tree data={data} onAddListItem={onAddListItem} onRemoveListItem={onRemoveListItem} />
  )
}

const Tree = ({ data = [], onAddListItem, onRemoveListItem }) => {

  const [isExpanded, setIsExpanded] = useState({})

  return (
    <>
      {data.map(node => {
        const _isExpanded = isExpanded[node.name];

        return (
          <div key={node.id} className="container">
            <div className="item">
              {node.isFolder &&
                <span
                  style={{ width: "16px", cursor: "pointer" }}
                  onClick={() => {
                    setIsExpanded(prev => {
                      return {
                        ...prev,
                        [node.name]: !Boolean(prev[node.name])
                      }
                    })
                  }}
                >
                  {_isExpanded ? '-' : "+"}
                </span>
              }
              {node.name}
              {
                node.isFolder &&
                <div className="folder-icons">
                  <img
                    src="https://imgs.search.brave.com/lrqVmA8Rt056SaOu5iV71uE0LXoDWPcN9l4YJVoOl4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3ZncmVwby5jb20v/c2hvdy8yOTQxNjEv/YWRkLWZvbGRlci5z/dmc"
                    alt={node.name}
                    height={"100%"}
                    onClick={() => onAddListItem(node.id)}
                  />

                  <img
                    src="https://imgs.search.brave.com/niAUN9gTO2ptX7DsN6mTmwXUDdQApb5u-rhE0vrTuSM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9kZWxldGUt/Zm9sZGVyLWljb24t/c3ZnLXBuZy1kb3du/bG9hZC03NzgyODkx/LnBuZz9mPXdlYnAm/dz0xMjg"
                    alt={node.name}
                    height={"100%"}
                    onClick={() => onRemoveListItem(node.id)}
                  />
                </div>
              }
            </div>
            {_isExpanded && <Tree data={node?.children} onAddListItem={onAddListItem} onRemoveListItem={onRemoveListItem} />}
          </div>
        )
      })}
    </>
  )
}
