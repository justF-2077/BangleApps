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

function kmeans(data, k, maxIterations) {
    let centroids = data.slice(0, k);

    let oldCentroids;
    let clusters;
    let iteration = 0;
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
            let sum = data[0].map(() => 0);
            let count = 0;
            for (let j = 0; j < data.length; j++) {
                if (clusters[j] === i) {
                    for (let k = 0; k < data[j].length; k++) {
                        sum[k] += data[j][k];
                    }
                    count++;
                }
            }
            return count ? sum.map(x => x / count) : centroids[i];
        });

        iteration++;
        console.log(`Iteration ${iteration}`);
    } while (!centroids.every((centroid, i) => centroid.every((value, j) => value === oldCentroids[i][j])) && iteration < maxIterations);

    return clusters;
}

let k = 4;

setTimeout(function () {
    let data = [];
    require("health").readDay(
        new Date("2024-04-30 00:00:00"),
        cb => {
            if (cb.temperature >= 27) {
                data.push([cb.movement, cb.bpm]);
            }
        });

    console.log(data);
    console.log("kmeans");
    let clusters = kmeans(data, k, 10);
    console.log(clusters);
}, 100);
