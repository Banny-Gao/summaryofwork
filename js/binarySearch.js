// Basic
// 在有序数组中二分查找target，返回索引index，未找到返回-1
// while二分查找 
const binarySearch = (arr = [], n, target) => {
  //在arr[l...r]中查找target
  let l = 0,
    r = n - 1
  while (l <= r) {
    let mid = l + (r - 1) / 2 //为了防止极端溢出
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
// 递归二分查找
const binarySearch2 = (arr = [], n, target) => {
  return _binarySearch2(arr, 0, n - 1, target)
}
const _binarySearch2 = (arr, l, r, target) => {
  if (l > r) return -1
  let mid = l + (r - 1) / 2
  if (arr[mid] == target)
    return mid
  if (arr[mid] > target)
    return _binarySearch2(arr, l, mid - 1, target)
  else
    return _binarySearch2(arr, mid + 1, r, target)
}

const testFun = (arr, n, fn) => {
  for (let i = 0; i < 2n; i++) {
    const v = fn(arr, n, i)
  }
}
const arr = [],
  n = 1000000
for (let i = 0; i < n; i++) {
  arr[i] = i
}
// 非递归算法在性能上有微弱优势
console.time('while方法：')
testFun(arr, n, binarySearch)
console.timeEnd('while方法：')
console.time('递归方法：')
testFun(arr, n, binarySearch2)
console.timeEnd('递归方法：')

class BST {
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


const testBSTSearch = () => {
  const bst = new BST()
  fetch('../txt/bible.txt')
    .then(response => response.text())
    .then(text => {
      console.log(`圣经总字数:${text.length}`)
      const wordsArr = text.split(/[\.|\s|,]/)
      // 词频统计
      for (let word of wordsArr) {
        let res = bst.search(word)
        if (!res) bst.insert(word, 1)
        else {
          res = res + 1
          bst.insert(word, res)
        }
      }
      console.time('getWordsNum:')
      bst.contain('god') ? console.log(`god一共出现了${bst.search('god')}次`) : console.log('不存在单词god')
      console.timeEnd('getWordsNum:')
    })
}
testBSTSearch()

const testBSTOrder = () => {
  const bst = new BST()
  const N = 1000000,
    M = 1000000
  const keyArr = []
  for (let i = 0; i < N; i++) {
    const key = ~~(Math.random() * M)
    let res = bst.search(key)
    if (!res) {
      bst.insert(key, 1) 
      keyArr.push(key)
    }
    else {
      res = res + 1
      bst.insert(key, res)
    }
  }
  console.time('search:')
  bst.search(9983)
  console.timeEnd('search:')
  console.time('preOrder:')
  bst.preOrder(9983)
  console.timeEnd('preOrder:')
  console.time('inOrder:')
  bst.inOrder(9983)
  console.timeEnd('inOrder:')
  console.time('postOrder:')
  bst.postOrder(9983)
  console.timeEnd('postOrder:')
  console.time('levelOrder:')
  bst.levelOrder(9983)
  console.timeEnd('levelOrder:')
}
testBSTOrder()