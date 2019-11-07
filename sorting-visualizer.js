////// TODO: random arr, specific distributions, change no. of elements, specify arr
const random_upper_limit = 50;
const random_lower_limit = 1;
const array_size = 3;

class Path {
    constructor(unsorted_arr) {
        this.steps = -1;
        this.unsorted_arr = unsorted_arr;
        this.paths = {};
        this.unsorted_arr.forEach(l => {
            this.paths[l] = []
        });
        this.log_order(this.unsorted_arr);
    }

    log_order(arr){
        this.steps += 1;
        arr.forEach((l, i) => {
            this.paths[l].push(i);
        });
    }

    print_everything(){
        console.log("steps = ", this.steps);
        console.log("unsorted arr = ", this.unsorted_arr);
        console.log("paths = ", this.paths);
    }
}

let unsorted_arr = generate_numbers();
let path = new Path(unsorted_arr);
bubblesort(path);
path.print_everything();
draw_till_index(path, 0);

function generate_numbers() {
    const arr_size = array_size;
    random = d3.randomUniform(random_lower_limit, random_upper_limit+1);
    let unsorted_arr = [];
    
    while (true) {
        if (unsorted_arr.length == arr_size) break;

        let random_number = Math.floor(random())
        if (!(unsorted_arr.includes(random_number))) {
            unsorted_arr.push(random_number)
        }
    }

    console.log("Generated random aray: ", unsorted_arr)
    return unsorted_arr;
}

function bubblesort(path) {
    arr = path.unsorted_arr;
    console.log("array being sorted- ", arr)
    // start sorting in ascending order
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length-1; j++) {
            if (arr[j] > arr[j+1]) {
                const temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
                path.log_order(arr)
            }
        }
    }
}

function draw_till_index(path, index) {
    return 0;
}

// const steps = path[1].length
// const n = 3
// for (const l in path) {
//     console.log("no. of numbers to sort = ", n)
//     console.log("steps needed to sort = ", steps)
//     console.log(l)
//     console.log(path[l])
// }

//////



////// TODO: make visual

// walkX = d3.scaleLinear()
//     .domain([0, steps-1])
//     .range([10, 590]);
// walkY = d3.scaleLinear()
//     .domain([0, n-1])
//     .range([10, 290]);

// line = d3.line()
//     .x(d => walkX(d.step))
//     .y(d => walkY(d.value));


// var svg = d3.select("body").append("svg")
//     .attr("height", 300)
//     .attr("width", 600);

// svg.append("path")
//     .attr("d", line(path[3]))
//     .attr("stroke", "black")
//     .attr("fill", "none");
//////