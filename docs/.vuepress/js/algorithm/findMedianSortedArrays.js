export const findMedianSortedArrays_overtime = (nums1 = [], nums2 = []) => {
	const swap = (arr, i, j) => {
		var temp = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	}
	const insertSort = (arr = [], l = 1, r = arr.length - 1) => {
		for (; l <= r; l++) {
			let e = arr[l]
			let j = l
			for (; j > 0 && arr[j - 1] > e; j--) {
				arr[j] = arr[j - 1]
			}
			arr[j] = e
		}
		return arr
	}
	const quickSort = (arr, l = 0, r = arr.length - 1) => {
		if (r - l <= 10) {
			return arr.sort((a, b) => a - b)
		}
		if (r - l > 10 && r - l <= 30) {
			return insertSort(arr, l, r)
		}
		let randomIndex = Math.ceil(Math.random() * (r - l) + l)
		swap(arr, l, randomIndex)
		let v = arr[l],
			lt = l, //arr[l+1,...lt]
			gt = r + 1, // arr[gt,...r]
			i = l + 1 // arr[lt+1,...i]
		while (i < gt) {
			if (arr[i] < v) {
				swap(arr, i, ++lt)
				i++
			} else if (arr[i] > v) {
				swap(arr, i, --gt)
			} else {
				i++
			}
		}
		swap(arr, l, lt)
		quickSort(arr, l, lt - 1)
		quickSort(arr, gt, r)
		return arr
	}
	const arr = quickSort([...nums1, ...nums2])
	const m = ~~(arr.length / 2)
	if (arr.length % 2 === 0) {
		return (arr[m] + arr[m - 1]) / 2
	} else {
		return arr[m]
	}
}


export const findMedianSortedArrays_merge = (nums1, nums2) => {
  const getKth = (arr1, start1, end1, arr2, start2, end2, k) => {
    const len1 = end1 - start1 + 1,
    len2 = end2 - start2 + 1
    if(len1 > len2) return getKth(arr2, start2, end2, arr1, start1, end1, k)
    if(len1 === 0) return arr2[start2 + k - 1]
    if(k === 1) return Math.min(arr1[start1], arr2[start2]) 
    const mid = ~~(k/2), i = mid - 1, j = len1 - 1
    if(start1 + mid > end1) {
      if(arr1[end1] <= arr2[start2 + j]) {
        start1 = end1 + 1
      } else {
        start2 += len1
      }
      k -= len1
      return getKth(arr1, start1, end1, arr2, start2, end2, k)
    }
    if(arr1[start1 + i] > arr2[start2 + i]) start2 += mid
    else start1 += mid
    k -= mid
    return getKth(arr1, start1, end1, arr2, start2, end2, k)
  }
  const n = nums1.length, m = nums2.length
  const left = ~~((n + m + 1)/2),
  right = ~~((n + m + 2)/2)
  // 将奇偶情况合并，如果是奇数，会求两次同样的k
  const l = getKth(nums1, 0, n -1, nums2, 0, m - 1, left)
  const r = getKth(nums1, 0, n -1, nums2, 0, m - 1, right)
  return (l + r) /2
}

export const findMedianSortedArrays = (nums1, nums2) => {
  const m = nums1.length, n = nums2.length
  if(m > n) return findMedianSortedArrays(nums2, nums1)
  let iMin = 0, iMax = m
  while(iMin <= iMax) {
    // 为了保证当m+n为奇数的时候: 左半部分的长度比右半部分大1 
    let i = ~~((iMin + iMax + 1) / 2), j = ~~((m + n + 1) / 2) - i
    if(i < iMax && nums2[j -1] > nums1[i]) {
      iMin = i + 1
    } else if(i > iMin && nums1[i -1] > nums2[j]) {
      iMax = i - 1
    }else {  // 达到要求， 边界单独考虑
      let maxLeft, minRight
      if(i === 0) maxLeft = nums2[j - 1]
      else if(j === 0) maxLeft = nums1[i - 1]
      else maxLeft = Math.max(nums1[i - 1], nums2[j - 1])

      if(i === m) minRight = nums2[j] 
      else if(j === n) minRight = nums1[i] 
      else minRight = Math.min(nums1[i], nums2[j]) 

      let mid 
      if(!maxLeft && maxLeft !== 0) maxLeft = minRight
      if(!minRight && minRight !== 0) minRight = maxLeft
      if((m + n) % 2 === 0) mid = (maxLeft + minRight) / 2
      else mid = Math.min(maxLeft, minRight)
      return mid
    }
  }
}