// Create the gauge chart.
var gaugePlot = document.getElementById('gauge');

function create_gauge_plot(score) {
    var gaugeData = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: score,
        title: { text: "<b>Austin Driver Score</b><br>Serious Crash Severity Risk" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {
                range: [null, 5],
                tickmode: "array",
                tickvals: [0, 1, 2, 3, 4, 5],
                ticktext: [0, 1, 2, 3, 4, 5]
            },
            bar: { color: "black" },
            steps: [
                { range: [4, 5], color: "red" },
                { range: [3, 4], color: "orange" },
                { range: [2, 3], color: "yellow" },
                { range: [1, 2], color: "lime" },
                { range: [0, 1], color: "green" }
            ]
        }
    }];

    // Create the layout for the gauge chart.
    var gaugeLayout = {
        autosize: true,
        annotations: [{
            xref: 'paper',
            yref: 'paper',
            x: 0.5,
            xanchor: 'center',
            y: -0.2,
            yanchor: 'center',
            text: "The gauge displays your risk level<br>to get in a serious or fatal crash",
            showarrow: false
        }]
    };
    Plotly.newPlot(gaugePlot, gaugeData, gaugeLayout, { responsive: true });

    // Create the feature importances chart 
    var barData = [{
        x: ['Person Age', 'Vehicle Model Year', 'Vehicle Make', 'Vehicle Body Style', 'Day of Week', 'Person Gender'],
        y: [0.36581053, 0.26173061, 0.18624928, 0.09415793, 0.07626584, 0.0157858],
        type: 'bar'
    }];
    var barLayout = {
        title: 'Feature Importances',
        font: {
            family: 'Raleway, sans-serif'
        },
        showlegend: false,
        xaxis: {
            tickangle: -45
        },
        yaxis: {
            title: 'Importance Score',
            zeroline: false,
            gridwidth: 2,
            tickformat: '.2f'
        },
        bargap: 0.05
    };

    Plotly.newPlot('barPlot', barData, barLayout, { responsive: true });

}

// Function to display inputs after page has reloaded
function repopulate(re_input) {
    console.log(re_input);
    // Check if inputs were entered
    if (!(Object.keys(re_input).length === 0 && re_input.constructor === Object)) {
        document.getElementById("inputAge").value = re_input.selectAge;
        document.getElementById("inputCarYear").value = re_input.carYear;
        document.getElementById(re_input.personGender).checked = true;
        document.getElementById(re_input.carMake).checked = true;
        document.getElementById(re_input.carBody).checked = true;
        document.getElementById(re_input.travelDay).checked = true;
    }
};

document.getElementById("resetButton").onclick = function() { reset() };

function reset() {
    let zero = 0;
    create_gauge_plot(zero);
    document.getElementById("inputAge").value = null;
    document.getElementById("inputCarYear").value = null;
    let genders = document.getElementsByName("personGender");
    genders.forEach((gender) => { gender.checked = false; });
    let makes = document.getElementsByName("carMake");
    makes.forEach((make) => { make.checked = false; });
    let bodies = document.getElementsByName("carBody");
    bodies.forEach((body) => { body.checked = false; });
    let days = document.getElementsByName("travelDay");
    days.forEach((day) => { day.checked = false; });
};