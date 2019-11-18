const upper_lim_random = 50;
const lower_lim_random = 1;
const class_unsorted_array_div = "unsorted_array"
const class_sorted_array_div = "sorted_array"
const id_sorting_visual_svg = "sorting_visual"

function do_visual() {
    clear_visual()
    params = get_params();
    visual_data = make_visual_data(params.sort_algo, params.array_len);
    console.log(visual_data);
    display_visual(visual_data.unsorted_array, visual_data.sorting_path, visual_data.sorted_array);
}

function clear_visual() {
    d3.selectAll("." + class_unsorted_array_div + " > *").remove()
    clear_svg()
    d3.selectAll("." + class_sorted_array_div + " > *").remove()
}

function clear_svg() {
    d3.selectAll("svg > *").remove()
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

function get_sorting_path(sort_algo, unsorted_array) {
    let sorting_path = initialize_empty_sorting_path(unsorted_array)

    switch (sort_algo) {
        case 'bubblesort':
            bubblesort(sorting_path, unsorted_array)
            break;

        // TODO

        default:
            break;
    }

    if (get_steps(sorting_path) == 1) {
        log_path(sorting_path, unsorted_array)
    }

    return sorting_path
}

function initialize_empty_sorting_path(unsorted_array) {
    let sorting_path = {}
    unsorted_array.forEach((elem,index) => {
        sorting_path[elem] = []
        sorting_path[elem].push({
            'step': 0,
            'value': index
        });
    });
    return sorting_path;
}

function bubblesort(sorting_path, unsorted_array) {
    array_to_sort = unsorted_array.slice();

    for (let i = 0; i < array_to_sort.length; i++) {
        for (let j = 0; j < array_to_sort.length-1; j++) {
            if (array_to_sort[j] > array_to_sort[j+1]) {
                const temp = array_to_sort[j];
                array_to_sort[j] = array_to_sort[j+1];
                array_to_sort[j+1] = temp;
                log_path(sorting_path, array_to_sort);
            }
        }
    }
}

function log_path(sorting_path, array) {
    step = get_steps(sorting_path)
    array.forEach((elem, index) => {
        sorting_path[elem].push({
            'step': step,
            'value': index
        });
    });
}

function get_steps(sorting_path) {
    for (const key in sorting_path) {
        if (sorting_path.hasOwnProperty(key)) {
            const element = sorting_path[key];
            return element.length
        }
    }
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
}

function display_sorting_path(sorting_path) {
    draw_sorting_path(sorting_path);
    d3.select(window)
      .on("resize", redraw_sorting_path(sorting_path));
}

function draw_sorting_path(sorting_path) {
    const steps = get_steps(sorting_path);
    const array_len = get_array_len(sorting_path);

    const svg_height = steps * 40;
    const svg_width = document.getElementById(id_sorting_visual_svg)
                              .clientWidth;

    walkX = d3.scaleLinear()
        .domain([-1, array_len])
        .range([0, svg_width]);
    walkY = d3.scaleLinear()
        .domain([0, steps-1])
        .range([0, svg_height]);

    line = d3.line()
        .x(d => walkX(d.value))
        .y(d => walkY(d.step));

    var svg = d3.select("svg")
        .attr("height", svg_height)
        .attr("width", svg_width);

    for (const k in sorting_path) {
        if (sorting_path.hasOwnProperty(k)) {
            const element = sorting_path[k];
            svg.append("path")
                .attr("d", line(element))
                .attr("stroke", "black")
                .attr("fill", "none");
        }
    }
}

function get_array_len(sorting_path) {
    return Object.keys(sorting_path).length
}

function redraw_sorting_path(sorting_path) {
    return function() {
        clear_svg();
        draw_sorting_path(sorting_path);
    }
}

function display_sorted_array(sorted_array) {
    display_array(sorted_array, class_sorted_array_div)
}