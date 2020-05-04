//Dynamic programming Held-Karp, possible memoization.

function heldKarp(cities, start) {
	console.log('heldKarp: ');
	console.log(cities,' ', start)
	
	if (cities.length == 2) {
		if(start == 0) {
			console.log('Held-Karp 2x2 distance: ', cities[0][1])
			return cities[0][1]
		} else {
			console.log('Held-Karp 2x2 distance: ', cities[1][0])
			return cities[1][0]
		}
		
	} else {
		var minSet = [];
		for(var inSet = cities.length - 1; inSet > 0; inSet--) {
			console.log('Karp forLoop, inSet: ', inSet);
			var curMin;
			var funcArray = cities.slice(0);
			if(inSet != start) {
				curMin = heldKarp(remStart(funcArray, start), inSet-1) + cities[start][inSet];
				minSet.push(curMin);
			}
		}
		return min(minSet);
	}
}
//findMin([1, [2, 3, 4])
// becomes c1,2 + findMin([2, [3, 4])
//		   c1,3 + findMin([3, [2, 4])
//		   c1,4 + findMin([4, [2, 3])

function min(valArr) {
	var min = valArr[0];
	for(var iter = 0; iter < valArr.length; iter++) {
		if(valArr[iter] < min) {
			min = valArr[iter];
		}
	}
	return min;
}

function remStart(cities, start) {
	console.log(cities, ' ', start);
	cities.splice(start,1);
	console.log(cities, ' ', start);
	for (var iter = 0; iter < cities.length; iter++) {
		cities[iter].splice(start,1);
	}
	console.log(cities, ' ', start);
	return cities;
}

/*   city 1
	[[0, 15   , 10   , 8],
	 [7, 0    , 'INF', 3],
	 [1, 'INF', 0    , 6],
	 [2, 12   , 7    , 0]]
*/
var city1 = [
	 [0, 15, 10, 8],
	 [7, 0, 9, 3],
	 [1, 9, 0, 6],
	 [2, 12, 7, 0]];
	 
var city2 = [
	 [0, 15, 10, 8, 3],
	 [7, 0, 9, 3, 4],
	 [1, 9, 0, 6, 2],
	 [2, 12, 7, 0, 6],
	 [5, 8, 9, 7, 0]];


console.log(heldKarp(city2, 0));