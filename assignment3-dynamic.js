const fs = require('fs');

function tsp_hk(dists){
	var n = dists.length;
	var c = {};
	
	for(var i = 1; i < n; i++){
		var bitPart = 1 << i, i;
		c[[bitPart, i]] = [dists[0][i], 0];
	}
	for(var i = 2; i < n; i++){
		var subsets = combinations(1, n, i);
		for(var subset of subsets){
			var bits = 0;
			for(var bit of subset){
				bits |= 1 << bit;
			}
			for(var k of subset){
				var prev = bits & ~(1 << k);
				
				var res = [];
				for(var m of subset){
					if(m == 0 || m == k){
						continue;
					}
					if(c[[prev,m]] === undefined){
						c[[prev, m]] = [dists[m][k], m];
					}
					res.push([c[[prev, m]][0] + dists[m][k], m]);
				}
				if(res.length == 0){
					continue;
				}
				c[[bits, k]] = res[min(res)];
			}
			if(i >= 11 && subset[0] >= 20) {
				console.log("i: ",i, ", subset: ", subset);
			}
		}
		
	}
	var bits = (2**n - 1) - 1;
	var res = [];
	for(var k = 1; k < n; k++){
		res.push([c[[bits, k]][0] + dists[k][0],k])
	}
	var path = [],
		result = res[min(res)],
		par = result[1];
	for(var i = 0; i < n-1; i++){
		path.push(par);
		new_bits = bits & ~(1 << par);
		par = c[[bits, par]][1];
		bits = new_bits;
	}
	return result[0];
}

function combinations(start, end, r){
	var pool = [...Array(end-start).keys()];
	pool = pool.map(function(value) {
		return value + start;
	});
	
	function getPermutations(array, size) {
		function p(t, i) {
			if (t.length === size) {
				result.push(t);
				return;
			}
			if (i + 1 > array.length) {
				return;
			}
			p(t.concat(array[i]), i + 1);
			p(t, i + 1);
		}
		var result = [];
		p([], 0);
		return result;
	}
	
	return getPermutations(pool, r);
}

	
function min(valArr){
	var min = valArr[0][0];
	var index = 0;
	for(var iter = 0; iter < valArr.length; iter++) {
		if(valArr[iter][0] < min) {
			min = valArr[iter][0];
			index = iter;
		}
	}
	return index;
}


var city1 = [
	 [0, 1, 15, 6],
	 [2, 0, 7, 3],
	 [9, 6, 0, 12],
	 [10, 4, 8, 0]];
var city2 = [
	[0, 2, 9, 10],
    [1, 0, 6, 4],
    [15, 7, 0, 8],
    [6, 3, 12, 0]];
	
var city3 = [
	[0, 1, 999, 999],
	[999, 0, 1, 999],
	[999, 999, 0, 1],
	[1, 999, 999, 0]];

function generateDistances(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		arr[i] = [];
		for(var j = 0; j < n; j++){
			arr[i][j] = Math.floor(Math.random() * 99) + 1;
		}
	}
	return arr;
}

console.log(tsp_hk(generateDistances(21)));
/*
//console.log(generateDistances(20));
console.log(tsp_hk(city1));
console.log(tsp_hk(city2));
console.log(tsp_hk(city3));

function testing(n){
	console.log(start);
	fs.appendFileSync('data.txt',"size,seconds,milliseconds,nanoseconds,distance\n",(err) => {
		if(err)
			console.log(err);
	});
	for(var i = 21; i < 25; i++){
		var size = i;
		var graph = generateDistances(size);
		var start = process.hrtime();
		var d = tsp_hk(generateDistances(size));
		var hrend = process.hrtime(start);
		var output = "" + size + "," + hrend[0] + "," + ( hrend[0] * 1000 + (hrend[1] / 1000000)) + "," + hrend[1] + "," + d + "\n";
		console.log(output);
		fs.appendFileSync('data.txt', output, (err) => {
			if(err) {
				console.log("error");
			}
		});
	}
}



function cKarp(dists) {
	var n = dists.length;
	var best = [...Array((1<<(n-1)))];
	for(var b = 0; b < best.length; ++b) {
		best[b] = Array(n)
		for(var j = 0; j < n; ++j) {
			best[b][j] = 99999;
		}
	}
	console.log(best);
	for(var v = 1; v < (1 << (n-1)); ++v){
		for(var last = 0; last < (n-1); ++last) {
			if(!(v & 1<<last)) continue;
			
			if(v === 1 << last) {
				best[v][last] = dists[n-1][last];
			} else {
				var prev = v ^ 1<<last;
				for(var p = 0; p < (n-1); ++p){
					if(!(prev & 1 << p)) continue;
					best[v][last] = Math.min(best[v][last], dists[last][p] + best[prev][p]);
				}
			}
		}
	}
	console.log(best);0
	var answer = 99999;
	for (var last=0; last<(n-1); ++last) {	
		answer = Math.min( 
			answer, 
			dists[last][n-1] + best[ (1<<(n-1))-1 ][last]
    );
	return answer;
}
}
console.log(cKarp(city1))
console.log(cKarp(city2))
console.log(cKarp(city3))

*/
