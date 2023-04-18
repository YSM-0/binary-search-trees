let arrayData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
      this.root = buildTree(mergeSort(array))
    }

    insert(value) {
      if (arrayData.includes(value)) {
        throw new Error('Already here')
      } else {
        arrayData.push(value)
      }

      let currentNode = this.root
      const newNode = new Node(value)

      while (currentNode !== null) {
        if (value > currentNode.data) {
          if (currentNode.right === null) {
            currentNode.right = newNode;
            break;
          } else {
            currentNode = currentNode.right;
          }
        } else {
          if (currentNode.left === null) {
            currentNode.left = newNode;
            break;
          } else {
            currentNode = currentNode.left;
          }
        }
      }
    }

    delete(value) {
      if (!arrayData.includes(value)) {
        throw new Error('There is not this value')
      } else {
        const index = arrayData.indexOf(value)

        arrayData.splice(index, 1)
      }

      let previousNode = ''
      let direction = ''
      let currentNode = this.root

      while (currentNode.data !== value) {
        if (value < currentNode.data) {
          previousNode = currentNode
          currentNode = previousNode.left
          direction = 'left'
        }
        if (value > currentNode.data) {
          previousNode = currentNode
          currentNode = previousNode.right
          direction = 'right'
        }
      }

      if (currentNode.left == null && currentNode.right == null) {
        if (direction = 'right') {
          previousNode.right = null
        } else {
          previousNode.left = null
        }
      }

      if (currentNode.left == null && currentNode.right != null) {
        if (direction = 'right') {
          previousNode.right = currentNode.right
        } else {
          previousNode.left = currentNode.right
        }
      }

      if (currentNode.left != null && currentNode.right == null) {
        if (direction = 'right') {
          previousNode.right = currentNode.left
        } else {
          previousNode.left = currentNode.left
        }
      }

      if (currentNode.left != null && currentNode.right != null) {
        const delNode = currentNode
        let veryLeftNode = ''

        while (currentNode.right !== null) {
          previousNode = currentNode
          currentNode = previousNode.right
        }

        if (currentNode.left !== null) {
          veryLeftNode = currentNode.left
          delNode.data = veryLeftNode.data
          currentNode.left = null
        }
      }
    }

    find(value) {
      let currentNode = this.root

      if (!arrayData.includes(value)) {
        throw new Error('There is not this value')
      }

      while (currentNode.data !== value) {
        if (value > currentNode.data) {
          currentNode = currentNode.right
        } else {
          currentNode = currentNode.left
        }
      }

      return currentNode
    }

    levelOrder(arr = [], queue= [], root = this.root) {
      if (root == null) {
        return
      }

      arr.push(root.data)

      queue.push(root.left)
      queue.push(root.right)

      while (queue.length) {
        const level = queue[0];
        queue.shift();
        this.levelOrder(arr, queue, level)
      }

      return arr;
    }

    inOrder(arr = [], root = this.root) {
      if (root == null) {
        return
      }

      if (root.left) {
        this.inOrder(arr, root.left)
      }

      arr.push(root.data)

      if (root.right) {
        this.inOrder(arr, root.right)
      }

      return arr
    }

    preOrder(arr = [], root = this.root) {
      if (root == null) {
        return
      }

      arr.push(root.data)

      if (root.left) {
        this.preOrder(arr, root.left)
      }

      if (root.right) {
        this.preOrder(arr, root.right)
      }

      return arr
    }

    postOrder(arr = [], root = this.root) {
      if (root == null) {
        return
      }

      if (root.left) {
        this.postOrder(arr, root.left)
      }

      if (root.right) {
        this.preOrder(arr, root.right)
      }

      arr.push(root.data)

      return arr
    }

    height(root = this.root) {
      if (root == null) {
        return 0
      }

      let leftHeight = this.height(root.left)
      let rightHeight = this.height(root.right)

      if (leftHeight > rightHeight) {
        return leftHeight + 1
      } else {
        return rightHeight + 1
      }
    }

    depth(root = this.root) {
      if (root == null) {
        return
      }

      
    }
}

function mergeSort(array) {
    if (array.length > 1) {
      const mid = array.length / 2
      const left = mergeSort(array.slice(0, mid))
      const right = mergeSort(array.slice(mid, array.length))
      
      let sorted = []
      
      while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
          sorted.push(left[0])
          left.shift()
        } else if (right[0] < left[0]) {
          sorted.push(right[0])
          right.shift()
        } else if (right[0] == left[0]) {
            sorted.push(right[0])
            right.shift()
            left.shift()
        }
      }
      
      while (left.length == 0 && right.length !== 0) {
        sorted.push(right[0])
        right.shift()
      }
      
      while (right.length == 0 && left.length !== 0) {
        sorted.push(left[0])
        left.shift()
      }
      
      return sorted
    }
    
    return array
  }

function buildTree(array) {
  if (array.length > 1) {
    const start = 0
    const end = array.length - 1
    const mid = Math.round((start + end) / 2)
    const rootNode = new Node(array[mid])
    const leftArray = array.slice(start, mid)
    const rightArray = array.slice(mid + 1, end + 1)

    rootNode.left = buildTree(leftArray)
    rootNode.right = buildTree(rightArray)

    return rootNode
  }
  
  if (array.length == 1) {
    return new Node(array[0])
  }

  return null
}

const myTree = new Tree(arrayData)


console.log(myTree.root)
myTree.insert(71123)
myTree.delete(71123)
myTree.delete(4)
console.log(myTree.inOrder())
console.log(myTree.preOrder())
// console.log(myTree.height(myTree.find(8)))
