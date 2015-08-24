var os = require('os');
var assign = require('object-assign');


module.exports = {
    usage: {
        cpu: function(){
            var cpus = os.cpus();

            return cpus.map(function(core){
                var data  = assign({}, core);
                var times = core.times;

                var total = 0;
                for(var i in times){
                    total += times[i];
                }

                data.times.total = total;
                data.usages = {};
                for(var j in times){
                    data.usages[j] = ((times[j] * 100) / total).toFixed(2);
                }

                return data;
            })
        },
        memory: function(){

        }
    }
}
