var _ = require('lodash');

// {
//     "panelId": 1,
//     "range": {
//       "from": "2016-10-31T06:33:44.866Z",
//       "to": "2016-10-31T12:33:44.866Z",
//       "raw": {
//         "from": "now-6h",
//         "to": "now"
//       }
//     },
//     "rangeRaw": {
//       "from": "now-6h",
//       "to": "now"
//     },
//     "interval": "30s",
//     "intervalMs": 30000,
//     "targets": [
//        { "target": "upper_50", "refId": "A", "type": "timeserie" },
//        { "target": "upper_75", "refId": "B", "type": "timeserie" }
//     ],
//     "adhocFilters": [{
//       "key": "City",
//       "operator": "=",
//       "value": "Berlin"
//     }],
//     "format": "json",
//     "maxDataPoints": 550
//   };

// [
//     {
//       "target":"upper_75", // The field being queried for
//       "datapoints":[
//         [622,1450754160000],  // Metric value as a float , unixtimestamp in milliseconds
//         [365,1450754220000]
//       ]
//     },
//     {
//       "target":"upper_90",
//       "datapoints":[
//         [861,1450754160000],
//         [767,1450754220000]
//       ]
//     }
//   ]
class RandomDatasource {
    constructor(series, range) {
        this._series = series.split(',');
        this._range = range.split(',');
        this._span = 60 * 1000;

        console.log(`Generate ${this._series}: ${this._range}`)
    }

    series() {
        return this._series;
    }

    _generate_ts(target, from, to) {
        let result = {
            target: target,
            datapoints: []
        };

        for (let time = from; time < to; time += this._span) {
            result.datapoints.push([Math.floor(Math.random() * (this._range[1] - this._range[0] + 1)) + this._range[0], time])
        }

        return result;
    }

    query(request) {
        let result = [];

        if (request.adhocFilters && request.adhocFilters.length > 0) {
            fakeData = countryTimeseries;
        }

        _.each(request.targets, (target) => {
            if (target.type === 'table') {
                return [];
            } else {
                // var k = _.filter(fakeData, function (t) {
                //     return t.target === target.target;
                // });
                result.push(this._generate_ts(target, Date.parse(request.range.from), Date.parse(request.range.to)))

            }
        });

        return result;
    }
}

module.exports = {
    RandomDatasource
};