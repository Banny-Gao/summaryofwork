export const binarySearch = (arr = [], target) => {
  let l = 0,
    r = arr.length - 1

  while (l <= r) {
    const mid = (l + r) >> 1
    if (arr[mid] == target) {
      return mid
    }
    if (arr[mid] > target) {
      r = mid - 1
    } else {
      l = mid + 1
    }
  }
  return -1
}

export const binarySearch_recursive = (arr = [], target) => {
  const search = (arr, target, l, r) => {
    if (l > r) return -1

    const mid = (l + r) >> 1

    if (arr[mid] == target) return mid
    if (arr[mid] > target) return search(arr, l, mid - 1, target)

    return search(arr, mid + 1, r, target)
  }
  return search(arr, target, 0, arr.length - 1)
}


export class BST {
  static Node(key, value) {
    return {
      key,
      value,
      left: null,
      right: null
    }
  }
  constructor() {
    this.root = null
  }
  contain(key) {
    return BST.contain(this.root, key)
  }
  insert(key, value) {
    this.root = BST.insert(this.root, key, value)
  }
  search(key) {
    return BST.search(this.root, key)
  }
  preOrder(key) { // 前序遍历
    return BST.preOrder(this.root, key)
  }
  inOrder(key) { // 中序遍历
    return BST.inOrder(this.root, key)
  }
  postOrder(key) { //后序遍历
    return BST.postOrder(this.root, key)
  }
  levelOrder(key) { // 层序遍历
    const q = []
    q.push(this.root)
    while (q.length !== 0) {
      const node = q.pop()
      if (node.key = key) return node.value
      if (node.left) q.push(node.left)
      if (node.right) q.push(node.right)
    }
  }
  minmum() {
    return BST.minmum(this.root)
  }
  maxmum() {
    return BST.maxmum(this.root)
  }
  removeMin() {
    if (this.root) {
      BST.removeMin(this.root)
    }
  }
  removeMax() {
    if (this.root) {
      BST.removeMax(this.root)
    }
  }
  remove(key) {
    const hasKey = this.contain(key)
    if (!hasKey) return this.root
    this.root = BST.remove(this.root, key)
  }

  static insert(node, key, value) {
    if (node === null) {
      return BST.Node(key, value)
    }
    if (key === node.key) {
      node.value = value
    } else if (key < node.key) {
      node.left = BST.insert(node.left, key, value)
    } else {
      node.right = BST.insert(node.right, key, value)
    }
    return node
  }
  static contain(node, key) {
    if (node == null) return false
    if (key == node.key) return true
    if (key < node.key) return BST.contain(node.left, key)
    else return BST.contain(node.right, key)
  }
  static search(node, key) {
    if (node == null) return null
    if (key == node.key) return node.value
    if (key < node.key) return BST.search(node.left, key)
    else return BST.search(node.right, key)
  }
  static preOrder(node, key) {
    if (node !== null) {
      if (node.key == key) return node.value
      BST.preOrder(node.left)
      BST.preOrder(node.right)
    }
  }
  static inOrder(node, key) {
    if (node !== null) {
      BST.inOrder(node.left)
      if (node.key == key) return node.value
      BST.inOrder(node.right)
    }
  }
  static postOrder(node, key) {
    if (node !== null) {
      BST.postOrder(node.left)
      BST.postOrder(node.right)
      if (node.key == key) return node.value
    }
  }
  static minmum(node) {
    if (!node.left) return node
    return BST.minmum(node.left)
  }
  static maxmum(node) {
    if (!node.right) return node
    return BST.maxmum(node.right)
  }
  // 删除掉以node为根的二分搜索树中的最小节点, 递归算法
  // 返回删除节点后新的二分搜索树的根
  static removeMin(node) {
    if (!node.left) {
      const rightNode = node.right
      node = null
      return rightNode
    }
    node.left = BST.removeMin(node.left)
    return node
  }
  static removeMax(node) {
    if (!node.right) {
      const leftNode = node.left
      node = null
      return leftNode
    }
    node.right = BST.removeMax(node.right)
    return node
  }
  // 删除掉以node为根的二分搜索树中键值为key的节点, 递归算法
  // 返回删除节点后新的二分搜索树的根
  static remove(node, key) {
    if (!node) return null
    if (key < node.key) {
      node.left = BST.remove(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = BST.remove(node.right, key)
      return node
    } else {
      if (!node.left) {
        const rightNode = node.right
        node = null
        return rightNode
      }
      if (!node.right) {
        const leftNode = node.left
        node = null
        return leftNode
      }
      // node->left != NULL && node->right != NULL
      const successor = BST.minmum(node.right)
      successor.left = node.left
      successor.right = BST.removeMin(node.right)
      node = null
      return successor
    }
  }
}