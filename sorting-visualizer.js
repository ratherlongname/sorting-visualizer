////// TODO: random arr, specific distributions, change no. of elements, specify arr

//const unsorted_arr = [14, 3, 15, 6, 2, 8, 9, 11, 1, 12, 10, 5, 4, 7, 13];
const unsorted_arr = [3, 2, 1];

//////


////// TODO: sort and make data array

function log_path(arr, path, index) {
    const n = arr.length
    
    for (let i = 0; i < arr.length; i++) {
        const l = arr[i];
        path[l].push({step: index, value: i})
    }
}

function bubblesort(arr) {
    let path = {}
    index = 0
    arr.forEach(l => {
        path[l] = []
    });
    log_path(arr, path, index)
    index += 1
    // start sorting in ascending order
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length-1; j++) {
            if (arr[j] > arr[j+1]) {
                const temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp

                log_path(arr, path, index)
                index += 1
            }
        }
    }

    return path
}

const path = bubblesort(unsorted_arr)
const steps = path[1].length
const n = 3
for (const l in path) {
    console.log("no. of numbers to sort = ", n)
    console.log("steps needed to sort = ", steps)
    console.log(l)
    console.log(path[l])
}

//////



////// TODO: make visual

walkX = d3.scaleLinear()
    .domain([0, steps-1])
    .range([10, 590]);
walkY = d3.scaleLinear()
    .domain([0, n-1])
    .range([10, 290]);

line = d3.line()
    .x(d => walkX(d.step))
    .y(d => walkY(d.value));


var svg = d3.select("body").append("svg")
    .attr("height", 300)
    .attr("width", 600);

svg.append("path")
    .attr("d", line(path[3]))
    .attr("stroke", "black")
    .attr("fill", "none");
//////