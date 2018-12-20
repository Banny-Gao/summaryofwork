//字符串乱序
const _o = {
	shuffle0() {
		return  Array.from(this).sort(() => Math.random() - 0.5).join('')
	},
	shuffle1() {
		const arr = this.split('')
		for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
		return arr.join('')
	},
	shuffle2() {
		let arr = Array.from(this),
			copyArr = Object.create(arr)
		return arr.reduce((result, item) => {
			let i = Math.floor(copyArr.length * Math.random())
			result += copyArr[i]
			copyArr.splice(i, 1)
			return result
		}, '')
	},
	shuffle3(str, obj) {
		str = str || ''
		obj = obj ? obj : this
		const strObj = {}
		Object.keys(obj).forEach((item, index) => strObj[index] = obj[item])
		const l = strObj.__proto__.length = Object.keys(strObj).length
		const i = Math.floor(Math.random() * l)
		if (strObj[i] != undefined) {
			str += strObj[i]
			delete strObj[i]
			const o = Object.assign({}, strObj)
			return String.prototype.shuffle3(str, o)
		} else {
			return str
		}
	}
}
Object.keys(_o).forEach(key=> {
	String.prototype[key] = _o[key]
})