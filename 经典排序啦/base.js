// 基本排序总结
// 
// 1. 冒泡
// 2. 快速
// 3. 选择
// 4. 插入
// 5. 希尔
// 6. 基数
// 7. 鸡尾酒
// 8. 桶
// 9. 鸽巢
// 10. 归并
// 
// 


// base 
// 生成无序数组
// 
function disorderArr(len){
	let arr = [];
	for(let i =0; i < len; i++){
		let index = Math.floor(Math.random()*100);
		arr.push(index);
	}
	return arr;
}

// 冒泡法排序(Bubble Sort)
// 重复走访数列，一次比较两个元素，如果两个的大小错误，就交换两个元素，直到最后一个，那么最后一个肯定是最大或最小。
// 重复步骤，即可完成排序。
// 
// 之后排列顺序均如此： 平均时间复杂度， 最坏时间复杂度， 最好时间复杂度， 空间复杂度， 稳定性
// 稳定性： 即 a = b 时， 如果 a 原本在 b 前面，排序后仍在。 不稳定即a可能出现在b后面。
// 时间复杂度： O(n2) O(n2) O(n) O(1) 稳定
// 

function bubble(arr){ // 升序排列
	if(arr.length <= 1) return arr;
	for(let i = 0; i < arr.length - 1; i++){ // 比较倒数第二个与第一个
		for(let j = 0; j < arr.length - 1 - i; j++){
			if(arr[j] > arr[j+1]){
				let index = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = index;
			}
		}
	}
	return arr;
}
console.log('bubble: ', bubble(disorderArr(20)));


// 快速排序(Quick Sort)
// 采用分治法进行排序。选择一个基准(pivot)，将list分为两个 子list。比基准大的在一边，小的在另一边，相等的可以在任意一边。数列将以基准排列。称为分区(partition)
// 递归(recursive)的排序。
// 
// 时间复杂度： O(nlog_2 n) O(n2) O(nlog_2 n) O(nlog_2 n) 不稳定
// 

function quick(arr, left, right){ // 升序
	let len = arr.length;
	if(arr.length <= 1) return arr;
	let partitionIndex;
	left = left !== undefined ? left : 0;
	right = right !== undefined ? right : len - 1;
	if(left < right){
		partitionIndex = partition(arr, left, right);
		quick(arr, left, partitionIndex - 1);
		quick(arr, partitionIndex + 1, right);
	}
	return arr;
}
function partition(arr, left, right){ // 分区操作
	let pivot = left;	// 设定基准值
	let index = pivot + 1;
	for(let i = index; i <= right; i++){
		if(arr[i] < arr[pivot]){
			let temp = arr[i];
			arr[i] = arr[index];
			arr[index] = temp;
			index++;
		}
	}

	let temp = arr[pivot];
	arr[pivot] = arr[index - 1];
	arr[index - 1] = temp;
	return index - 1;
}
console.log('quick: ', quick(disorderArr(10)));

// 选择排序(Selection Sort)
// 简单直观，选择数组中最小/大的元素，放在末尾/队首。然后再从剩余元素中依次寻找。直到所有元素排序完毕。
// 
// 时间复杂度: O(n2) O(n2) O(n2) O(1) 不稳定。

function selection(arr){
	for(let i = 0; i < arr.length - 1; i++){ // 升序， 注意长度。
		let min = arr[i];
		let index = i;
		for(let j = i+1; j < arr.length; j++){
			if(arr[j] < min){
				min = arr[j];
				index = j;
			}
		}
		let temp = arr[i];
		arr[i] = min;
		arr[index] = temp;
	}
	return arr;
}
console.log('selection: ', selection(disorderArr(15)));

// 插入排序 (Insertion Sort)
// 简单直观的排序方式，通过构建有序序列，对未排序的数据，在已排序序列中从后向前扫描，找到相应位置并插入。(采用in-place在数组上实现。)
// 
// 从第一个元素开始，认为已排序，取下一个元素比较，若大于/小于新元素，则将该元素移动到下一位置/前一位置。
// 直到找到等于或小于/大于新元素，将新元素插入到这个位置。
// 重复步骤。
// 
// 时间复杂度： O(n2) O(n2) O(n) O(1) 稳定
// 
function insertion(arr){	
	for(let i = 0; i < arr.length; i++){
		if(i > 0){
			let temp = arr[i];
			for(let j = i - 1; j >= 0; j--){
				// console.count('join');
				if(temp < arr[j]){	// 升序
					arr[j+1] = arr[j];
					if(j === 0){
						arr[0] = temp;
					}
				}else{
					arr[j+1] = temp;
					break;
				}
			}
		}
	}
	return arr;
}
function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
        	// console.count('add');
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}
let arr = [11,13,94,24,24,31,53,54,47,32,89,79,82,73];
// console.log('看看自己写的和别人写的效率: 70----59...哎，不行呀，', insertion([1]), insertionSort(arr));
console.log('insertion: ', insertion(disorderArr(10)));
