const upper_lim_random = 50;
const lower_lim_random = 1;
const class_unsorted_array_div = "unsorted_array"
const class_sorted_array_div = "sorted_array"

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

function do_visual() {
    params = get_params();
    visual_data = make_visual_data(params.sort_algo, params.array_len);
    console.log(visual_data);
    display_visual(visual_data.unsorted_array, visual_data.sorting_path, visual_data.sorted_array);
}

function get_params() {
    return {
        'sort_algo': document.getElementById('sort_algo').value,
        'array_len': document.getElementById('array_len').value
    };
}

function make_visual_data(sort_algo, array_len) {
    unsorted_array = generate_unsorted_array(array_len);
    sorting_path = get_sorting_path(sort_algo, unsorted_array);
    sorted_array = get_sorted_array(unsorted_array);

    return {
        'unsorted_array': unsorted_array,
        'sorting_path': sorting_path,
        'sorted_array': sorted_array
    };
}

function generate_unsorted_array(array_len) {
    random = d3.randomUniform(lower_lim_random, upper_lim_random+1);
    let unsorted_arr = [];

    while (unsorted_arr.length < array_len) {
        const random_number = Math.floor(random())
        if (!(unsorted_arr.includes(random_number))) {
            unsorted_arr.push(random_number)
        }
    }

    return unsorted_arr;
}

function get_sorting_path(sort_algo, unsorted_arr) {
    // do not know format of path...
}

function get_sorted_array(unsorted_array) {
    let unsorted_array_copy = unsorted_array.slice()
    return unsorted_array_copy.sort((a, b) => a - b);
}

function display_visual(unsorted_array, sorting_path, sorted_array) {
    display_unsorted_array(unsorted_array);
    display_sorting_path(sorting_path);
    display_sorted_array(sorted_array);
}

function display_unsorted_array(unsorted_array) {
    display_array(unsorted_array, class_unsorted_array_div)
}

function display_array(array, class_name) {
    d3.select("." + class_name)
        .selectAll("div")
        .data(array)
        .enter().append("div")
        .text(d => d)
        // .style("display", "inline")
}

function display_sorting_path(sorting_path) {
    // TODO
}

function display_sorted_array(sorted_array) {
    display_array(sorted_array, class_sorted_array_div)
}

// let unsorted_arr = generate_numbers();
// let path = new Path(unsorted_arr);
// bubblesort(path);
// path.print_everything();
// draw_till_index(path, 0);

// function bubblesort(path) {
//     arr = path.unsorted_arr;
//     console.log("array being sorted- ", arr)
//     // start sorting in ascending order
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length-1; j++) {
//             if (arr[j] > arr[j+1]) {
//                 const temp = arr[j]
//                 arr[j] = arr[j+1]
//                 arr[j+1] = temp
//                 path.log_order(arr)
//             }
//         }
//     }
// }

// function draw_till_index(path, index) {
//     return 0;
// }

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