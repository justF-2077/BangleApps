function distance(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += Math.pow((a[i] - b[i]), 2);
    }
    return Math.sqrt(sum);
  }
  
  function mean(points) {
    let sum = points[0].map(() => 0);
    for (let point of points) {
      for (let i = 0; i < point.length; i++) {
        sum[i] += point[i];
      }
    }
    return sum.map(x => x / points.length);
  }
  
  function kmeans(data, k) {
    let centroids = data.slice(0, k);
  
    let oldCentroids;
    let clusters;
    do {
      oldCentroids = centroids;
  
      clusters = data.map(point => {
        let nearestCentroidIndex = centroids.reduce((minIndex, centroid, index) => {
          let distToCentroid = distance(point, centroid);
          let minDist = distance(point, oldCentroids[minIndex]);
          return distToCentroid < minDist ? index : minIndex;
        }, 0);
        return nearestCentroidIndex;
      });
  
      centroids = centroids.map((_, i) => {
        let pointsInCluster = data.filter((_, pointIndex) => clusters[pointIndex] === i);
        return pointsInCluster.length ? mean(pointsInCluster) : centroids[i];
      });
  
    } while (!centroids.every((centroid, i) => centroid.every((value, j) => value === oldCentroids[i][j])));
  
    return clusters;
  }
  
  let k = 2;
  
  setTimeout(function() {
    let data = [];
    require("health").readDay(
      new Date("2024-05-01 00:00:00"),
      cb => { 
      if (cb.temperature >= 27) {
        data.push([cb.hr + cb.min/60, cb.movement, cb.steps, cb.bpm]);
      }
    });
    
    //console.log(data);
    console.log("kmeans");
    let clusters = kmeans(data, k);
    //console.log(clusters);
  }, 100);
