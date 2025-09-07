import { useState } from "react"
import "./CheckBoxTree.css"

export const CheckBoxTree = ({ data }) => {

  const [isChecked, setIsChecked] = useState({})

  return (
    <CheckBox treeData={data} data={data} isChecked={isChecked} setIsChecked={setIsChecked} />
  )
}

const CheckBox = ({ treeData, data, isChecked, setIsChecked }) => {

  const handleCheckBoxChange = (checked, node) => {

    setIsChecked(prev => {
      const newIsChecked = {
        ...prev,
        [node.id]: checked
      }

      const updateChildNodes = (node) => {
        node.children?.forEach(n => {
          newIsChecked[n.id] = checked
          n.children && updateChildNodes(n)
        })
      }

      updateChildNodes(node)

      const verifyChecked = (node) => {
        if (!node.children) {
          return Boolean(newIsChecked[node.id])
        }

        const allChildrenChecked = node.children.every(child => {
          return verifyChecked(child)
        })

        newIsChecked[node.id] = allChildrenChecked;

        return allChildrenChecked
      }

      treeData.forEach(n => {
        verifyChecked(n)
      })

      return newIsChecked
    })
  }

  return (
    <>
      {data.map(node => {
        return (
          <div className="tree-container" key={node.id}>
            <input
              type="checkbox"
              name={node.name}
              id={node.id}
              checked={isChecked[node.id] || false}
              onChange={(e) => handleCheckBoxChange(e.target.checked, node)}
            />

            <span>{node.name}</span>

            {node.children &&
              <CheckBox treeData={treeData} data={node.children} isChecked={isChecked} setIsChecked={setIsChecked} />
            }
          </div>
        )
      })}
    </>
  )
}